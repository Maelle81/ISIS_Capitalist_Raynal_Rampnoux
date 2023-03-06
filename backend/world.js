module.exports =       
    {
    "name": "Nom du monde",
    "logo": "icones/logomonde.jpg",
    "money": 10,
    "score": 0,
    "totalangels": 0,
    "activeangels": 0,
    "angelbonus": 2,
    "lastupdate": 0,
    "products": [
        {
        "id": 1,
        "name": "Esquisse au gris",
        "logo": "icones/drawing1.png",
        "cout": 1,
        "croissance": 1.07,
        "revenu": 1,
        "vitesse": 500,
        "quantite": 0,
        "timeleft": 0,
        "managerUnlocked": false,
        "palliers": [
            {
            "name": "Nom du premier palier",
            "logo": "icones/premierpalier.jpg",
            "seuil": 20,
            "idcible": 1,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": "false"
            },
            {
            "name": "Nom deuxième palier",
            "logo": "icones/deuxiemepalier.jpg",
            "seuil": 75,
            "idcible": 1,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": "false"
            }
        ]
        },
        {
        "id": 2,
        "name": "Portait au gris",
        "logo": "icones/drawing2.png",
        "cout": 4,
        "croissance": 1.07,
        "revenu": 1,
        "vitesse": 500,
        "quantite": 1,
        "timeleft": 0,
        "managerUnlocked": false,
        "palliers": [
            {
            "name": "Nom du premier palier",
            "logo": "icones/premierpalier.jpg",
            "seuil": 20,
            "idcible": 1,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": "false"
            },
            {
            "name": "Nom deuxième palier",
            "logo": "icones/deuxiemepalier.jpg",
            "seuil": 75,
            "idcible": 1,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": "false"
            }
        ]
        }
    ],

    "allunlocks": [
        {
        "name": "Nom du premier unlock général",
        "logo": "icones/premierunlock.jpg",
        "seuil": 30,
        "idcible": 0,
        "ratio": 2,
        "typeratio": "gain",
        "unlocked": "false"
        },
        ],
    "upgrades": [
        {
        "name": "Nom du premier upgrade",
        "logo": "icones/premierupgrade.jpg",
        "seuil": 1e3,
        "idcible": 1,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": "false"
        },
        ],
    "angelupgrades": [
        {
        "name": "Angel Sacrifice",
        "logo": "icones/angel.png",
        "seuil": 10,
        "idcible": 0,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": "false"
        },
        ],
    "managers": [
        {
        "name": "manager1",
        "logo": "icones/WangariMaathai.jpg",
        "seuil": 10,
        "idcible": 1,
        "ratio": 0,
        "typeratio": "gain",
        "unlocked": "false"
        },
    ]
};