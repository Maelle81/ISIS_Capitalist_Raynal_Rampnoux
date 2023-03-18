const { money } = require("./world");
const fs=require("fs").promises


//fonction qui réalise la sauvegarde du monde du joueur
//les places dans le dossier userworlds au nom nomDuJoueur+world.json
function saveWorld(context) {
    fs.writeFile("userworlds/" + context.user + "-world.json", 
    JSON.stringify(context.world), err => {
        if (err) {
            console.error(err)
            throw new Error(
                `Erreur d'écriture du monde coté serveur`)
        }
    })
}

function scoreMAJ (context) {
    context.world.products.forEach(function(p) 
        { 
            //calcul tps écouléy
            var tpsEcouler = String.prototype.toString(Date.now()) - context.world.lastupdate + tpsEcouler
            var nbExecution = 0

            // si manager débloqué
            if (p.managerUnlocked) {
                //retirer temps pas complet pour faire une production complète
                var prodEnCours = tpsEcouler%p.vitesse
                //cb de fois le produit a été exécuté ?
                nbExecution = (tpsEcouler-prodEnCours) / p.vitesse
                //initialise tpsEcouler avec le temps restant, pas assez gros pour production complète
                tpsEcouler=prodEnCours;
            }
            // si manager pas encore débloqué et qu'il avait déjà été lancé
            else if (p.timeleft > 0) {
                //si tps de production pas encore écoulé
                if (p.timeleft - tpsEcouler > 0) {
                    //diminue le tps écoulé à chaque action
                    p.timeleft = p.timeleft - tpsEcouler;
                }
                //si tps de production écoulé
                else {
                    //initialise timeleft à 0
                    p.timeleft = 0;
                    //cré un produit
                    nbExecution = 1;
                }
            }
            //ajoute argent au jeu
            //context.world.money += nbExecution * p.revenu;
            context.world.money += nbExecution * p.revenu * (1 + (context.world.activeangels * context.world.angelbonus / 100));
        
            // calcul des anges total
            context.world.totalangels = 150 * (Math.sqrt(context.world.score/Math.pow(10,15)))-context.world.totalangels;

        }
    );
}
function lesUnlocks (context) {
    //Pour tous les pallier : valeur de deblocquage
    var pallier0 = true;
    var pallier1 = true;
    var pallier2 = true;
    var pallier3 = true;

    //Pour chaque produit : 
    context.world.products.forEach(function(p) 
    {
        // Valider les paliers celon la quantite
        if (p.quantite >= 25) {
            //si le produit est > 25, on valide le premier pallier
            p.paliers[0].unlocked = true;
        }
        else {
            //si un seul des produit est inférieur à 25, le pallier est invalidé (allunlocks)
            var pallier0 = false;
        }
        if (p.quantite >= 50) {
            p.paliers[1].unlocked = true;
        }
        else {
            var pallier1 = false;
        }
        if (p.quantite >= 75) {
            p.paliers[2].unlocked = true;
        }
        else {
            var pallier2 = false;
        }
        if (p.quantite >= 100) {
            p.paliers[3].unlocked = true;
        }
        else {
            var pallier3 = false;
        }
    })
    //MAJ des allunlocks
    context.world.allunlocks[0] = pallier0
    context.world.allunlocks[1] = pallier1
    context.world.allunlocks[2] = pallier2
    context.world.allunlocks[3] = pallier3
}
   
// service GraphQL : resolveur
module.exports = {
    Query: {
        getWorld(parent, args, context) {
            saveWorld(context)      //appel de la fonction saveWorld
            return context.world
        }
    },
    Mutation: {
        //augmenter la quantité du produit en ajoutant à la quantité actuellement possédé
        //déduire de l’argent du monde, le coût de l’achat
        //mettre à jour le cout d’achat du produit
        //sauver le monde pour mémoriser les changements opérés.
        acheterQtProduit(parent, args, context) {
            scoreMAJ(context)
            //trouve le produit (produit passé en paramètre = un des produit de la liste ?)
            let produit = context.world.products.find(p => p.id === args.id)

            //si pas trouvé -> erreur
            if (produit === undefined) {
                throw new Error(
                    `Le produit avec l'id ${args.id} n'existe pas`)
            }

            //incrémente la quantite
            produit.quantite = produit.quantite + args.quantite;
            //console.log("quantite:"+produit.quantite)

            //calcule le pris de la somme des quantités qu'on achète
            let coutSommeAchat = ((1 - Math.pow(produit.croissance, args.quantite) )/(1-produit.croissance));
            //console.log("coutSommeAchat:"+coutSommeAchat)

            //déduit le cout d'achat de l'argent du monde
            context.world.money = context.world.money - coutSommeAchat;
            //console.log("money:"+context.world.money )
            
            //calcul la valeur du prochain cout
            produit.cout = produit.cout * Math.pow(produit.croissance, args.quantite);
            //console.log("nouveau cout:"+produit.cout)
            //mettre à la puissance : math.pow()

            //maj du revenu
            produit.revenu = produit.revenu * produit.croissance * args.quantite

            //MAJ
            context.world.lastupdate = Date.now();

            //MAJ des unlocks
            lesUnlocks(context)

            //sauvegarde le monde modifié
            saveWorld(context);

            //return le produit
            return produit
            scoreMAJ(context)
        },

        //chercher le produit du monde possédant l’identifiant passé en paramètre
        //affecter sa propriété vitesse à sa propriété timeleft
        lancerProductionProduit(parent, args, context) {
            scoreMAJ(context)
            //trouve le produit (produit passé en paramètre = un des produit de la liste ?)
            let produit = context.world.products.find(p => p.id === args.id)

            //si pas trouvé -> erreur
            if (produit === undefined) {
                throw new Error(
                    `Le produit avec l'id ${args.id} n'existe pas`)
            }

            produit.timeleft = produit.vitesse

            //MAJ
            context.world.lastupdate = Date.now();

            saveWorld(context)      //appel de la fonction saveWorld
            return produit
            scoreMAJ(context)
        },

        engagerManager(parent, args, context) {
            scoreMAJ(context)
            //trouve le manager (manager passé en paramètre = un des manager de la liste ?)
            let manager = context.world.managers.find(m => m.name === args.name)

            //si pas trouvé -> erreur
            if (manager === undefined) {
                throw new Error(
                    `Le manager avec le nom ${args.name} n'existe pas`)
            }

            //trouver quel produit est lié au manager
            let produitManager = context.world.products.find(p => p.id === manager.idcible)

            //débloque le manager
            produitManager.managerUnlocked = true;
            manager.unlocked = true;

            //MAJ
            context.world.lastupdate = Date.now();

            saveWorld(context)      //appel de la fonction saveWorld
            return manager
            scoreMAJ(context)
        },

        acheterCashUpgrade(parent, args, context) {
            scoreMAJ(context)
            //trouve le nom de l'upgrade (nom de l'upgrade passé en paramètre = un des nom de l'upgrade de la liste ?)
            let upgrade = context.world.upgrades.find(u => u.name === args.name)

            //si pas trouvé -> erreur
            if (upgrade === undefined) {
                throw new Error(
                    `Le upgrade avec le nom ${args.name} n'existe pas`)
            }

            // debloque l'amélioration upgrade = amélioration repérée à l aide du nom
            context.world.upgrades.forEach(function(u) {
                if (u.name == args.name) {
                    u.unlocked = true;
                }
            }
            )
            //MAJ
            context.world.lastupdate = Date.now();

            saveWorld(context)      //appel de la fonction saveWorld
            return upgrade
        },

        resetWorld(parent, args, context) {
        
        // sauvegarde de coté le score et nb total d'ange
        var nbScore = context.world.score + context.world.money;
        var nbAnges = 150 * (Math.sqrt(nbScore/Math.pow(10,15)))-context.world.totalangels;
        var nbActivAnges = context.world.activeangels;

        // créer un nouveau monde
        let world = require("./world")
        context.world = world;

        // implémente la sauvegare du score et du nombre d'ange total au nouveau monde
        context.world.score = nbScore;
        context.world.activeangels = nbAnges;
        context.world.activeangels = nbActivAnges;

        // sauvegarde le nouveau monde et le retourne
        saveWorld(context);
        return world;
        },
        acheterAngelUpgrade(parent, args, context) {
            scoreMAJ(context)

            let angels = context.world.angelupgrades.find(a => a.name === args.name)

            //si pas trouvé -> erreur
            if (angels === undefined) {
                throw new Error(
                    `Le ange avec le nom ${args.name} n'existe pas`)
            }

            context.world.angelupgrades.forEach(function(a) {
                if (a.name == args.name) {
                    a.unlocked = true;
                }
            }
            )
            //MAJ
            context.world.lastupdate = Date.now();
            
            saveWorld(context)   //appel de la fonction saveWorld
            return angelupgrades
        },
    }
};
