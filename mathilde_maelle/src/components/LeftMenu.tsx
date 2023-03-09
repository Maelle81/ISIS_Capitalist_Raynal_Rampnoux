import { Button } from "@mui/material";
import { useState } from "react";
import { Palier, World} from "../world";
import Manager from "./Manager";
import "../assests/css/leftMenu.css"

type  LeftMenuProps = { 
  //manager:Palier;
  loadworld:World
}

export default function LeftMenu({loadworld}:LeftMenuProps) {

  //const [isVisible, setIsVisible] = useState(false);
  const [showManagers, setShowManagers] = useState(false);
  
  const [world, setWorld] = useState(JSON.parse(JSON.stringify(loadworld)) as World)

  const handleManagerClick = () => {
    setShowManagers(true);
    //setIsVisible(true)
  };

  function onClose() {
    setShowManagers(false);
    //setIsVisible(false)
  }

  return (
    <div>
        <button onClick={handleManagerClick} >Managers</button>        
        {showManagers && <Manager world={world} onClose={onClose} showManagers={showManagers} setShowManagers={setShowManagers}></Manager>
        } 
        
    </div>
  );
}



