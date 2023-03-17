import { useRef, useState } from "react";
import { Product} from "../world";
import { useInterval } from "./MyInterval";
import MyProgressbar, { Orientation } from "./MyProgressbar";
import "../assests/css/product.css"
import { transform } from "../util";
import { Button } from "@mui/material";


type ProductProps = {
  product: Product;
  onProductionDone: (product: Product, qt : number) => void;
  //onProductBy:(product:Product)=> void;
  qtmulti : string;
  nbQuantity:number;
  money:number;
  onProductBuy:(qt:number, product:Product)=> void
  quantite : number
};

export default function ProductComponent({ quantite, product, qtmulti, onProductionDone, nbQuantity, money, onProductBuy }: ProductProps) {
  
  //const url = "https://isiscapitalistgraphql.kk.kurasawa.fr/";
  const url= "http://localhost:4000/"
  
  const [timeleft, setTimeLeft] = useState(product.timeleft);
  //const [quantite, setQuantite] = useState(product.quantite)
  

  //const [lastupdate, setLastupdate] = useState(product.lastupdate);
  const lastupdate = useRef(Date.now())
  //const quantite = useRef(product.quantite)

  const startFabrication = () => {
    if(quantite >0){
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

  function productCost(){
    return (product.cout*((1-Math.pow(product.croissance, nbQuantity))/(1-product.croissance)))
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

  
  function calcMaxCanBuy(){
    let n = 0
    let cost=product.cout
    let c = product.croissance
    let sum=0
    
    while(money >= sum+cost*Math.pow(c,n)){      
      sum +=cost*(Math.pow(c,n))
      n++
    }
    return n   
    
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
        >{quantite}</div>
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
            auto={product.managerUnlocked}
            orientation={Orientation.horizontal}
          />
      </div>
      <Button 
        onClick={() => onProductBuy(nbQuantity, product) } 
        disabled={money < productCost()} 
        className="four">
          {qtmulti}
          </Button>
      <div className="five">{timeleft} ms</div>
      <div>Prix : <span dangerouslySetInnerHTML={{ __html: transform(productCost())}}/> </div>
      </div>
    </div>
  );
}

