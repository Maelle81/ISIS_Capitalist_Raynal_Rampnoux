import { useRef, useState } from "react";
import { Product } from "../world";
import { useInterval } from "./MyInterval";
import MyProgressbar, { Orientation } from "./MyProgressbar";
import "../assests/css/product.css";
import { transform } from "../util";
import { Button } from "@mui/material";
import { gql, useMutation } from "@apollo/client";

type ProductProps = {
  product: Product;
  onProductionDone: (product: Product, qt: number) => void;
  qtmulti: string;
  nbQuantity: number;
  money: number;
  onProductBuy: (qt: number, product: Product) => void;
  quantite: number;
  username: string;
};

export default function ProductComponent({
  username,
  quantite,
  product,
  qtmulti,
  onProductionDone,
  nbQuantity,
  money,
  onProductBuy,
}: ProductProps) {
  //const url = "https://isiscapitalistgraphql.kk.kurasawa.fr/";
  const url = "http://localhost:4000/";
  const [timeleft, setTimeLeft] = useState(product.timeleft);
  const lastupdate = useRef(Date.now());
  const [progression, setProgression] = useState(0);

  const LANCER_PRODUCTION = gql`
    mutation lancerProductionProduit($id: Int!) {
      lancerProductionProduit(id: $id) {
        id
      }
    }
  `;
  const [lancerProduction] = useMutation(LANCER_PRODUCTION, {
    context: { headers: { "x-user": username } },
    onError: (error): void => {
      // actions en cas d'erreur
    },
  });

  const startFabrication = () => {
    if (quantite > 0) {
      setTimeLeft(product.vitesse);
      lastupdate.current = Date.now();
      //lancerProduction({ variables: { id: product.id } });
    }
  };

  function calcScore() {
    let timeelapsed = Date.now() - lastupdate.current;
    lastupdate.current = Date.now();
    //console.log('r'+timeelapsed)
    let production = false;
    let productNumber = 0;

    if (timeleft > 0) {
      production = true;
    }
    if (timeelapsed < timeleft) {
      setTimeLeft(timeleft - timeelapsed);
    } else {
      if (!product.managerUnlocked) {
        if (production) {
          productNumber = 1;
          setTimeLeft(0);
        }
      } else {
        productNumber = (timeelapsed - timeleft) / product.vitesse + 1;
        setTimeLeft(timeelapsed % product.vitesse);
      }
      //console.log(timeleft)
    }
    if (productNumber > 0) {
      onProductionDone(product, productNumber);
    }
    /*
    if(timeleft==0){
      setProgression(0)
    }else{
      setProgression(((product.vitesse-product.timeleft)/product.vitesse)*100)
    }*/
  }

  function productCost() {
    return (
      product.cout *
      ((1 - Math.pow(product.croissance, nbQuantity)) /
        (1 - product.croissance))
    );
  }

  useInterval(() => calcScore(), 100);

  //Achat de produit
  /*
  function nbQuantityProduct(){
    switch(qtmulti){
      case "x1":
        setnbQuantity(1)
        break 
      case "x10":
        setnbQuantity(10)
        break
      case "x100":
        setnbQuantity(100)
        break
      case "Max":
        setnbQuantity(calcMaxCanBuy())
        break
      default:
        setnbQuantity(1)
    }
  }*/

  /*
  useEffect(()=>{
    nbQuantityProduct();
  },[nbQuantity])*/

  /*acheter*/

  //console.log("qt:"+nbQuantity)

  function calcMaxCanBuy() {
    let n = 0;
    let cost = product.cout;
    let c = product.croissance;
    let sum = 0;

    while (money >= sum + cost * Math.pow(c, n)) {
      sum += cost * Math.pow(c, n);
      n++;
    }
    return n;

    //x=((cost*(1-c))/cost)
    //  n=Math.log(c,)
  }

  /*
  function productBought(nbQuantity: number, product:Product){
    let qt= nbQuantity
    if(qtmulti=='Max'){
      setnbQuantity(calcMaxCanBuy)
      onProductBuy(nbQuantity, product)
    }
    onProductBuy(nbQuantity, product)

  }*/

  return (
    <div
      //direction="row"
      className="product"
      //className="wrapper"
    >
      <div
        //className="lesdeux"
        className="product-image"
      >
        <div
        //className="one"
        //className="lepremier"
        >
          <img
            className="round"
            src={url + product.logo}
            onClick={startFabrication}
          />
        </div>
        <div
          className="product-quantity"
          //className="two"
          //className="lesecond"
        >
          {quantite}
        </div>
      </div>
      <div className="product-info">
        <div
          className="product-progress"
          //className="three"
        >
          <MyProgressbar
            className="barstyle"
            vitesse={product.vitesse}
            initialvalue={product.vitesse - timeleft}
            run={timeleft > 0 || product.managerUnlocked}
            frontcolor="#ffb99e"
            backcolor="#f9f9f9"
            auto={product.managerUnlocked}
            orientation={Orientation.horizontal}
          />
        </div>
        <div className="product-details">
          <div className="product-time">{timeleft} ms</div>
          <div className="product-price">price {" "}
            <span
              dangerouslySetInnerHTML={{ __html: transform(productCost()) }}
            />
          </div>
          <div className="product-buy">
          <Button
            onClick={() => onProductBuy(nbQuantity, product)}
            disabled={money < productCost()}
            //className="four"
            className="buy-button"
          >
            Buy  {qtmulti}
          </Button>
          </div>          
        </div>
      </div>
    </div>
  );
}
