import { Alert, Button, Snackbar } from "@mui/material";
import { useState } from "react";
import { Palier, World } from "../world";
import "../assests/css/left-menu.css";

type UpgradeProps = {
  world: World;
  show: boolean;
  setShow: (show: boolean) => void;
  money: number;
  updateWorld: (world: World) => void;
  setMoney: (money: number) => void;
  setsnackBar: (snackBar: boolean) => void;
  snackBar: boolean;
  buyCashUpgrade:(upagrde:Palier)=>void
};

export default function Upgrade({
  setsnackBar,
  snackBar,
  setMoney,
  world,
  show,
  setShow,
  money,
  updateWorld,
  buyCashUpgrade
}: UpgradeProps) {

  //const url = "https://isiscapitalistgraphql.kk.kurasawa.fr/";
  const url = "http://localhost:4000/";
  const [open, setOpen] = useState(false);
  const [showUnlock, setshowUnlock]=useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  function onCloseUpg() {
   setShow(false)
  }

 
  return (
    <div className="modal">
      {show && (
        <div className="scroller">
          <div>
            <h1 className="title">Cash Upgrades ! 💶</h1>
          </div>
          <div className="object">
            {
              world.upgrades
                .filter((upgrade) => !upgrade.unlocked)
                .map((upgrade) => (
                    <div key={upgrade.idcible} className="grid">
                    <div>
                      <div className="logo">
                        <img
                          //alt="logo"
                          className="round"
                          src={url + upgrade.logo}
                        />
                      </div>
                    </div>
                    <div className="infos">
                      <div className="name"> {upgrade.name} </div>
                      <div className="cible">
                        {world.products[upgrade.idcible - 1].name}
                      </div>
                      <div className="cost"> {upgrade.seuil} </div>
                    </div>
                    <div>
                      <Button
                      className="button"
                      onClick={() => (buyCashUpgrade(upgrade))} 
                      disabled={money < upgrade.seuil }
                      //|| world.products[.idcible-1].quantite <=0
                      >Buy !</Button>
                    </div>
                  </div>
                ))
              //onClick={onClose}
            }
            <Button className="closebutton" onClick={onCloseUpg}>
              Close
            </Button>
          </div>
        </div>
      )}
      <Snackbar
        className="snackBar"
        open={snackBar}
        autoHideDuration={3000}
        onClose={() => setsnackBar(false)}
      >
        <Alert severity="info" sx={{ width: "100%" }}>
        ✨L'upgrade a été debloqué !✨
        </Alert>
      </Snackbar>
    </div>
  );
}