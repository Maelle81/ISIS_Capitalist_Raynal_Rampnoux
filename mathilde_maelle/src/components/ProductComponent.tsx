import { useEffect, useRef, useState } from "react";
import { Product} from "../world";
import { useInterval } from "./MyInterval";
import MyProgressbar, { Orientation } from "./MyProgressbar";
import "../assests/css/product.css"
import { suiteGeoSomme } from "../util";
import { Button,  Stack } from "@mui/material";


type ProductProps = {
  product: Product;
  onProductionDone: (product: Product, qt : number) => void;
  //onProductBy:(product:Product)=> void;
  qtmulti : string;
  quantity:number;
};

export default function ProductComponent({ product, qtmulti, onProductionDone, quantity }: ProductProps) {
  
  const url = "https://isiscapitalistgraphql.kk.kurasawa.fr/";
  //const url= "http://localhost:4000/graphql/"
  
  const [timeleft, setTimeLeft] = useState(product.timeleft);
  

  //const [lastupdate, setLastupdate] = useState(product.lastupdate);
  const lastupdate = useRef(Date.now())

  const startFabrication = () => {
    if(product.quantite >0){
    setTimeLeft(product.vitesse);
    lastupdate.current = Date.now();
    }
  }
  
  function calcScore(){

    let timeelapsed = Date.now()-lastupdate.current
    lastupdate.current=Date.now()
    //console.log('r'+timeelapsed)
    let production =false
    let productNumber=0

    if(timeleft > 0){
      production=true
    }
    if(timeelapsed < timeleft){
      setTimeLeft(timeleft-timeelapsed)
    }else{
      if(!product.managerUnlocked){
        if(production){
          productNumber=1
          setTimeLeft(0)
        }        
      }else{
        productNumber=((timeelapsed -timeleft)/product.vitesse)+1
        setTimeLeft(timeelapsed % product.vitesse)
      }
      //console.log(timeleft)      
    }
    if(productNumber>0){
      onProductionDone(product, productNumber)
    }
    
  } 

  useInterval(() => calcScore(), 100);

  //Achat de produit
  /*
  function quantityProduct(){
    switch(qtmulti){
      case "x1":
        setQuantity(1)
        break 
      case "x10":
        setQuantity(10)
        break
      case "x100":
        setQuantity(100)
        break
      case "Max":
        setQuantity(calcMaxCanBuy())
        break
      default:
        setQuantity(1)
    }
  }*/
  /*
  useEffect(()=>{
    quantityProduct();
  },[quantity])*/

  /*acheter*/


  function calcMaxCanBuy(){
    let n = 1
    let x=product.cout
    /*
    while(x < world.money){
      n++
      x=suiteGeoSomme(product.cout, product.croissance, n)
      //onProductBy(n, product)
    }*/
    return product.cout
  }

  return (
    <div
    //direction="row" className="product"
    className="wrapper"
    >
      <div 
      //className="lesdeux" 
      >
        <div className="one"
        //className="lepremier"
        >
          <img
            className="round"
            src={url + product.logo}
            onClick={startFabrication}
          />
        </div>
        <div 
        className="two"
        //className="lesecond"
        >{product.quantite}</div>
      </div>
      <div >
        <div className="three">
          <MyProgressbar
            className="barstyle"
            vitesse={product.vitesse}
            initialvalue={product.vitesse - timeleft}
            run={timeleft > 0 || product.managerUnlocked}
            frontcolor="#ffb99e"
            backcolor="#ffffff"
            //auto={product.managerUnlocked}
            orientation={Orientation.horizontal}
          />
      </div>
      <Button className="four">{quantity}</Button>
      <div className="five">{timeleft} ms</div>
      </div>
    </div>
  );
}
