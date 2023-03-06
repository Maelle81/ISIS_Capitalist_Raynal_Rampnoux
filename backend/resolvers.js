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
            var tpsEcouler = Date.now() - context.world.lastupdate + tpsEcouler
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
            context.world.money += nbExecution * p.revenu;
        }
    );
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
            console.log("quantite:"+produit.quantite)

            //calcule le pris de la somme des quantités qu'on achète
            let coutSommeAchat = ((1 - Math.pow(produit.croissance, args.quantite) )/(1-produit.croissance));
            console.log("coutSommeAchat:"+coutSommeAchat)

            //déduit le cout d'achat de l'argent du monde
            context.world.money = context.world.money - coutSommeAchat;
            console.log("money:"+context.world.money )
            
            //calcul la valeur du prochain cout
            produit.cout = produit.cout * Math.pow(produit.croissance, args.quantite);
            console.log("nouveau cout:"+produit.cout)
            //mettre à la puissance : math.pow()

            //sauvegarde le monde modifié
            saveWorld(context);

            //MAJ
            context.world.lastupdate = Date.now();

            //return le produit
            return produit
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
        },
    }
};
