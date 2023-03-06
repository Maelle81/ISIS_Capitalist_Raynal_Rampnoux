

// fonction qui prend en paramètre un nombre flottant et qui produit son formatage en
//puissance de dix, avec quatre chiffres significatifs.
//p28

export function transform(valeur: number): string {
    let res : string = "";
    if (valeur < 1000)
        res = valeur.toFixed(2);
    else if (valeur < 1000000)
        res = valeur.toFixed(0);
    else if (valeur >= 1000000) {
        res = valeur.toPrecision(4);
        res = res.replace(/e\+(.*)/, " 10<sup>$1</sup>");
    }
    return res;
}