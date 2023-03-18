import { Badge, Button } from "@mui/material";
import { useState } from "react";
import { Palier, World } from "../world";
import Manager from "./Manager";
import "../assests/css/left-menu.css";
import Unlock from "./Unlock";
import Upgrade from "./Upgrade";

type LeftMenuProps = {
  loadworld: World;
  money: number;
  updateWorld: (world: World) => void;
  setMoney: (money: number) => void;
  username: string;
  hireManager: (manager: Palier) => void;
  setsnackBar: (snackBar: boolean) => void;
  snackBar: boolean;
  buyCashUpgrade: (upgrade: Palier) => void;
};

export default function LeftMenu({
  setsnackBar,
  snackBar,
  hireManager,
  username,
  loadworld,
  money,
  updateWorld,
  setMoney,
  buyCashUpgrade
}: LeftMenuProps) {
  //const [isVisible, setIsVisible] = useState(false);
  const [showManagers, setShowManagers] = useState(false);
  const [showUnlocks, setShowUnlocks] = useState(false);
  const [showUpgrades, setShowUpgrades] = useState(false);
  const [world, setWorld] = useState(
    JSON.parse(JSON.stringify(loadworld)) as World
  );

  
  /*
   <div>
        {/*
    <Badge badgeContent={nbUnlockMangers} color="secondary">*/
  //<button onClick={handleClick}>Unlocks</button>
  /*</Badge> */
  /*
    {show && (
      <Unlock
        setsnackBar={setsnackBar}
        snackBar={snackBar}
        setMoney={setMoney}
        world={world}
        onClose={onClose}
        updateWorld={updateWorld}
        show={show}
        setShow={setShow}
        money={money}
      ></Unlock>
    )}
  </div>
  */

  return (
    <div>
      <div>
        {/*
        <Badge badgeContent={nbUnlockMangers} color="secondary">*/}
        <button onClick={()=>setShowManagers(true)}>Managers</button>
        {/*</Badge> */}
        {showManagers && (
          <Manager
            setsnackBar={setsnackBar}
            snackBar={snackBar}
            hireManager={hireManager}
            setMoney={setMoney}
            world={world}
            updateWorld={updateWorld}
            showManagers={showManagers}
            setShowManagers={setShowManagers}
            money={money}
          ></Manager>
        )}
      </div>
      <div>
        {/*<Badge badgeContent={nbUnlockMangers} color="secondary">*/}
        <button onClick={()=>setShowUnlocks(true)}>Unlocks</button>
        {/*</Badge> */}
        {showUnlocks && (
          <Unlock
            setsnackBar={setsnackBar}
            snackBar={snackBar}
            setMoney={setMoney}
            world={world}
            onClose={()=>setShowUnlocks(false)}
            updateWorld={updateWorld}
            show={showUnlocks}
            setShow={setShowUnlocks}
            money={money}
          ></Unlock>
        )}
      </div>
      <div>
        {/*<Badge badgeContent={nbUnlockMangers} color="secondary">*/}
        <button onClick={()=>setShowUpgrades(true)}>Cash Upgrades</button>
        {/*</Badge> */}
        {showUpgrades && (
          <Upgrade
            setsnackBar={setsnackBar}
            snackBar={snackBar}
            setMoney={setMoney}
            world={world}
            updateWorld={updateWorld}
            show={showUpgrades}
            setShow={setShowUpgrades}
            money={money}
            buyCashUpgrade={buyCashUpgrade}
          ></Upgrade>
        )}
      </div>
    </div>
  );
}
