import { Badge, Button } from "@mui/material";
import { useState } from "react";
import { Palier, World} from "../world";
import Manager from "./Manager";
import "../assests/css/left-menu.css"

type  LeftMenuProps = { 
  //manager:Palier;
  loadworld:World
  money:number
  updateWorld: (world: World) => void
  setMoney:(money:number)=>void
  //nbUnlockMangers : number
}

export default function LeftMenu({loadworld, money,updateWorld,setMoney}:LeftMenuProps) {

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
        {/*
        <Badge badgeContent={nbUnlockMangers} color="secondary">*/} 
          <button onClick={handleManagerClick}>Managers</button>
         {/*</Badge> */}
              
        {showManagers && <Manager 
          setMoney={setMoney}
          world={world}
          onClose={onClose}
          updateWorld={updateWorld}
          showManagers={showManagers}
          setShowManagers={setShowManagers}
          money={money}></Manager>
        } 
        
    </div>
  );
}



