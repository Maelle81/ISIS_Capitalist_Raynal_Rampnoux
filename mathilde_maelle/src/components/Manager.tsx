import { Button } from "@mui/material";
import { useState } from "react";
import { Palier, Product, World } from "../world";
//import "../assests/css/LeftMenu.css"

type ManagerProps = {
  world: World;
  onClose: () => void;
  showManagers: boolean;
  setShowManagers: (show: boolean) => void;
};

export default function Manager({ world, onClose,showManagers,
  setShowManagers, }: ManagerProps) {
  //showManagers =true
  //let world = require("../world");
  
  const url = "https://isiscapitalistgraphql.kk.kurasawa.fr/";

  function hireManager(manager: Palier) {
    if (world.money >= manager.seuil) {
      manager.unlocked = true
      world.money -= manager.seuil
      world.products[manager.idcible - 1].managerUnlocked = true
      setShowManagers(false)
      
    }
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
                <div onClick={() => hireManager(manager)}>
                  <Button disabled={world.money < manager.seuil}>Hire !</Button>
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
    </div>
  );
}
