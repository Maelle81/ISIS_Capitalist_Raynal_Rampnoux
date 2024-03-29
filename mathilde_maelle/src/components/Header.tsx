import { AppBar, Avatar, Box, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { transform } from "../util";
import { World } from "../world";
//import Typography from "@mui/material/Typography";
import  "../assests/css/header.css";
import Button from "@mui/material/Button";

type HeaderProps = {
  username: string;
  qtmulti: string;
  loadworld: World;
  positionButton:()=>void
  money:number
  //onChangeMulti:()=>string
};

export default function Header({ username, qtmulti, loadworld, positionButton, money}: HeaderProps) {
  const [world, setWorld] = useState(
    JSON.parse(JSON.stringify(loadworld)) as World
  );

  useEffect(() => {
    setWorld(JSON.parse(JSON.stringify(world)) as World);
  }, [loadworld]);

  const url= "http://localhost:4000/"
  //const url ="https://isiscapitalistgraphql.kk.kurasawa.fr/"
  //onClick={onChangeMulti}

  //console.log('money header'+money)

  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <Avatar sx={{ mr: 2 }} alt="Nom Monde" src={ url+ world.logo}/>
        <Typography sx={{ flexGrow: 1 }}>{world.name}</Typography>
        <Box>
            <Typography>{username}</Typography>
            <Typography dangerouslySetInnerHTML={{ __html: transform(money) }}></Typography>
            <Button className="button" onClick={positionButton}  variant="contained" >{qtmulti}</Button>
        </Box>       
        
      </Toolbar>
    </AppBar>
  );
}
