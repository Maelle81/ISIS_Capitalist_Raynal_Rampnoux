import { Alert, Button, Snackbar } from "@mui/material";
import { useState } from "react";
import { World } from "../world";
import "../assests/css/left-menu.css";

type UnlockProps = {
  world: World;
  onClose: () => void;
  show: boolean;
  setShow: (show: boolean) => void;
  money: number;
  updateWorld: (world: World) => void;
  setMoney: (money: number) => void;
  setsnackBar: (snackBar: boolean) => void;
  snackBar: boolean;
};

export default function Unlock({
  setsnackBar,
  snackBar,
  setMoney,
  world,
  onClose,
  show,
  setShow,
  money,
  updateWorld,
}: UnlockProps) {

  //const url = "https://isiscapitalistgraphql.kk.kurasawa.fr/";
  const url = "http://localhost:4000/";
  const [open, setOpen] = useState(false);
  const [showUnlock, setshowUnlock]=useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  function getUnlock(){
    let unlocks =[]
    let paliers = world.products.flatMap(product=>product.paliers)
    let allunlock =0
    world.products.forEach(product=>{
      if(showUnlock){
        paliers.forEach(palier =>{
          if(palier.unlocked && palier.idcible === product.id ){
            unlocks.push(palier)
          }}          
        )
      }else{
        /*
        allunlock=world.allunlocks.find(unlock => !unlock.unlocked)
        if(allunlock) unlocks.push(allunlock)
        */
      }
    })

    if(showUnlock){
      world.allunlocks.forEach(
        unlock => unlock.unlocked ? unlocks.push(unlock) :null
      )
    }else{
      let allUnlock = world.allunlocks.find(unlock => !unlock.unlocked)
      if(allUnlock){
        unlocks.push(allUnlock)
      }
    }

  }

  return (
    <div className="modal">
      {show && (
        <div className="scroller">
          <div>
            <h1 className="title">Unlocks !</h1>
          </div>
          <div className="object">
            {
              world.allunlocks
                .filter((allunlock) => !allunlock.unlocked)
                //.unlocked !== true
                .map((allunlock) => (
                  <div key={allunlock.idcible} className="grid">
                    <div>
                      <div className="logo">
                        <img
                          //alt=" logo"
                          className="round"
                          src={url + allunlock.logo}
                        />
                      </div>
                    </div>
                    <div className="infos">
                      <div className="name"> {allunlock.name} </div>
                      
                      <div className="cost"> {allunlock.seuil} </div>
                    </div>
                  </div>
                ))
              //onClick={onClose}
            }
            <Button className="closebutton" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      )}
      {/*
      <Snackbar
        className="snackBar"
        open={snackBar}
        autoHideDuration={3000}
        onClose={() => setsnackBar(false)}
      >
        <Alert severity="info" sx={{ width: "100%" }}>
          L'unlock a été débloqué !
        </Alert>
      </Snackbar>*/}
    </div>
  );
}
