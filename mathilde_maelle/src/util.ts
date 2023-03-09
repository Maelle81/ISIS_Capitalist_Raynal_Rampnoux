

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

  //Un terme de la suite géo  xn=x0*c^n xn=xn0*c^n-n0
  //La somme des termes est c!=1 : x0*((1-c^(n+1))/1-c)

  export function suiteGeoSomme( x: number, c:number, n:number){
    //c=q la raison, la croissance
    //x = le cout
    if(c!==1){
      return x*((1-Math.pow(c,n+1))/1-c)
    }
  }

export function ephemeralMessage(){}
//message: string | JSX.Element)
 
