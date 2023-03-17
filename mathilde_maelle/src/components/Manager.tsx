import { Alert, Button, Snackbar } from "@mui/material";
import { useState } from "react";
import { Palier, Product, World } from "../world";
//import Toast from 'react-bootstrap/Toast';
import { ToastContainer, toast } from "react-toastify";
import "../assests/css/left-menu.css"


type ManagerProps = {
  world: World;
  onClose: () => void;
  showManagers: boolean;
  setShowManagers: (show: boolean) => void;
  money:number;
  updateWorld: (world: World) => void
  setMoney:(money:number)=> void
};

export default function Manager({ setMoney,world, onClose,showManagers, setShowManagers,money, updateWorld}: ManagerProps) {
  //showManagers =true
  //let world = require("../world");
  
  //const url = "https://isiscapitalistgraphql.kk.kurasawa.fr/";
  const url= "http://localhost:4000/"
  const [open ,setOpen] = useState(false)
  const [snackBarMng, setsnackBarMng]=useState(false)
  
  function hireManager(manager: Palier) {
    if (money >= manager.seuil){
      manager.unlocked = true
      setMoney(money - manager.seuil)
      world.products[manager.idcible - 1].managerUnlocked = true
      //setShowManagers(false)
      /*toast(manager.name +' a été embauché !'
       , {         
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,}
      )*/
      setsnackBarMng(true)
     
      updateWorld(world)
      //setOpen(true)     
      
    }
    
  }

  const handleCloseSnackbar = () => {
    setOpen(false)
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
        <Button className="closebutton" onClick={onClose}>
          Close
        </Button>
      </div>
      
    </div>
    )}
    
    <Snackbar 
      className="snackBar"
      open={snackBarMng}
      autoHideDuration={3000}
      onClose={()=> setsnackBarMng(false)}
      message="Le manager a été embauché !"
      >
        <Alert severity="success" sx={{width:'100%'}}>
          Le manager vient d'être d'embauché !
        </Alert>
      </Snackbar>
      
    </div>
  );
}
