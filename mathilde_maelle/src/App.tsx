import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { gql, useApolloClient, useQuery } from "@apollo/client";
import Main from "./components/Main";
import "./assests/css/style.css";
import { ToastContainer } from "react-toastify";
import {ThemeProvider } from "@mui/material/styles";

const GET_WORLD = gql`
  query getWorld {
    getWorld { 
      name
      logo
      score
      money
      totalangels
      activeangels
      angelbonus
      lastupdate
      products {
        id
        name
        logo
        cout
        croissance
        revenu
        vitesse
        quantite
        timeleft
        managerUnlocked
      }
      allunlocks {
        name
        logo
        seuil
        idcible
        ratio
        typeratio
        unlocked
      }
      upgrades {
        name
        logo
        seuil
        idcible
        ratio
        typeratio
        unlocked
      }
      angelupgrades {
        name
        logo
        seuil
        idcible
        ratio
        typeratio
        unlocked
      }
      managers {
        name
        logo
        seuil
        idcible
        ratio
        typeratio
        unlocked
      }
    }
  }
`;

function App() {

  
  const client = useApolloClient();
  //let world= require("./world")

    let lusername = localStorage.getItem("username");
    if (lusername === undefined) {
      lusername = "Artiste " + Math.floor(Math.random() * 10000);
      localStorage.setItem("username", lusername);
    }
    if (!lusername) lusername = ""
     


    const [username, setUsername] = useState(lusername)

  const onUserNameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {

    localStorage.setItem("username", event.currentTarget.value);
    setUsername(event.currentTarget.value);
    client.resetStore()
    //console.log(event.currentTarget.value);

  };
  
  const { loading, error, data, refetch } = useQuery(GET_WORLD, {
    context: { headers: { "x-user": username } }
  });

  let corps = undefined
  if (loading) corps = <div> Loading... </div>
  else if (error) corps = <div> Erreur de chargement du monde ! </div>
  else corps = <Main loadworld={data.getWorld} username={username} />

  

  // c la meme variable n ==> logarithme , U0= wordl.money, q0 ets le taux de croissance, 

  return (
    
    <div>      
      <div> Your ID : </div>
      <input type="text" value={username} onChange={onUserNameChanged} />
      {corps}           
    </div>
    
  );
  }
  /*const [username, setUsername] = useState("");

  const [usernamechamp, setUsernamechamp] = useState("");

  const {loading, error, data, refetch } = useQuery(GET_WORLD, {
    context: { headers: { "x-user": username } }
  });  

  //permet de valider son usrname avec un input button
  //et de le sauvegarder 

  useEffect(() => {
    let username = localStorage.getItem("username");
    console.log(username);
    if (username === undefined || username === "") {
      username = "Artiste" + Math.floor(Math.random() * 1000);
      localStorage.setItem("username", username);
      console.log(username);
    }
    if (username) {
      setUsername(username);
      setUsernamechamp(username);
    }
  }, []);

  const onUserNameChanged = (event: any) => {
    setUsername(usernamechamp);
    localStorage.setItem("username", usernamechamp);
  };  

  let corps = undefined
  if (loading) corps = <div> Loading... </div>
  else if (error) corps = <div> Erreur de chargement du monde ! </div>
  else corps = <Main loadworld={data.getWorld} username={username} />

  return (
    <div className="App">
      <div>
        <label>
          Name:{" "}
          <input
            type="text"
            value={usernamechamp}
            onChange={(event) => setUsernamechamp(event.target.value)}
          />
        </label>
        <input type="button" value="Submit" onClick={onUserNameChanged} />
      </div>
      <div>
        { corps }
      </div>     
    </div>
  );
}*/

export default App;
