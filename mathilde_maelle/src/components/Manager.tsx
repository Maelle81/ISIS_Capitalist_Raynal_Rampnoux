import { Alert, Button, IconButton, Snackbar } from "@mui/material";
import { useState } from "react";
import { Palier, Product, World } from "../world";
//import Toast from 'react-bootstrap/Toast';
import { ToastContainer, toast } from "react-toastify";
import "../assests/css/left-menu.css"
import { gql, useMutation } from "@apollo/client";


type ManagerProps = {
  world: World;
  showManagers: boolean;
  setShowManagers: (show: boolean) => void;
  money:number;
  updateWorld: (world: World) => void
  setMoney:(money:number)=> void
  hireManager: (manager:Palier)=> void
  setsnackBar:( snackBar :boolean)=> void
  snackBar: boolean
};

export default function Manager({ setsnackBar,snackBar,hireManager, setMoney,world, showManagers, setShowManagers,money, updateWorld}: ManagerProps) {
  //showManagers =true
  //let world = require("../world");
  
  //const url = "https://isiscapitalistgraphql.kk.kurasawa.fr/";
  const url= "http://localhost:4000/"
  const [open ,setOpen] = useState(false)

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  function onCloseMng() {
    //setShow(false);
    //setIsVisible(false)
    setShowManagers(false)
  }


  return (
    <div className="modal">    
      {showManagers &&(
      <div className="scroller">       
      <div>
        <h1 className="title">Managers make you feel better !</h1>
      </div>
      <div>
        {
          world.managers
            .filter((manager) => !manager.unlocked)
            //manager.unlocked !== true
            .map((manager) => (
              <div key={manager.idcible} className="managergrid">
                <div>
                  <div className="logo">
                    <img
                      alt="manager logo"
                      className="round"
                      src={url + manager.logo}
                    />
                  </div>
                </div>
                <div className="infosmanager">
                  <div className="managername"> {manager.name} </div>
                  <div className="managercible">
                    {world.products[manager.idcible - 1].name}
                  </div>
                  <div className="managercost"> {manager.seuil} </div>
                </div>
                <div>
                  <Button
                  onClick={() => hireManager(manager)} 
                  disabled={money < manager.seuil }
                  //|| world.products[manager.idcible-1].quantite <=0
                  >Hire !</Button>
                </div>
              </div>
            ))
          //onClick={onClose}
        }
        <Button className="closebutton" onClick={onCloseMng}>
          Close
        </Button>
      </div>
      
    </div>
    )}
    
    <Snackbar 
      className="snackBar"
      open={snackBar}
      autoHideDuration={3000}
      onClose={()=> setsnackBar(false)}
     
      >
        <Alert severity="info" sx={{width:'100%'}}>
          Le manager vient d'être d'embauché !
        </Alert>
    </Snackbar>
      
    </div>
  );
}
