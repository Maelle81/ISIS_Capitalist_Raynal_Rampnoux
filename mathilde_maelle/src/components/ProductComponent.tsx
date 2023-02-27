import { useState } from "react";
import { Product } from "../world";
import { useInterval } from "./MyInterval";
import MyProgressbar, { Orientation } from "./MyProgressbar";

type ProductProps = {
  product: Product;
};

export default function ProductComponent({ product }: ProductProps) {
  const url = "https://isiscapitalistgraphql.kk.kurasawa.fr/";

  const [timeleft, setTimeLeft] = useState(product.timeleft);

  if (!product.lastupdate) {
    product.lastupdate = Date.now();
  }

  const startFabrication = () => {
    setTimeLeft(product.vitesse);
  };

  
  function calcScore(){
    
  }

  useInterval(() => calcScore(), 100);

  return (
    <div>
      <div className="lesdeux">
        <div className="lepremier">
          <img
            className="round"
            src={url + product.logo}
            onClick={startFabrication}
          />
        </div>
        <div className="lesecond">{product.quantite}</div>
      </div>
      <MyProgressbar
        className="barstyle"
        vitesse={product.vitesse}
        initialvalue={product.vitesse - timeleft}
        run={timeleft > 0 || product.managerUnlocked}
        frontcolor="#ff8800"
        backcolor="#ffffff"
        auto={product.managerUnlocked}
        orientation={Orientation.horizontal}
      />
    </div>
  );
}
