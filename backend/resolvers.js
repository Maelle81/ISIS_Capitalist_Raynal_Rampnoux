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
   
// service GraphQL : resolveur
module.exports = {
    Query: {
    getWorld(parent, args, context) {
        saveWorld(context)      //appel de la fonction saveWorld
        return context.world
    }
    },
    Mutation: {
        acheterQtProduit(parent, args, context) {

            //trouve le produit (produit passé en paramètre = un des produit de la liste ?)
            let produit = context.world.products.find(p => p.id === args.id)

            if (produit === undefined) {
                throw new Error(
                    `Le produit avec l'id ${args.id} n'existe pas`)
            }

            //.find pour trouver

            return args.id, args.quantite
        },
        lancerProductionProduit(parent, args, context) {
            saveWorld(context)      //appel de la fonction saveWorld
            return context.world
        }
    }
};
