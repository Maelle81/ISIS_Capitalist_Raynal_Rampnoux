import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { gql, useQuery } from "@apollo/client";
import Main from "./components/Main";
import "./assests/css/style.css"

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
`

function App() {
  const [username, setUsername] = useState("");

  const [usernamechamp, setUsernamechamp] = useState("");

  const {loading, error, data, refetch } = useQuery(GET_WORLD, {
    context: { headers: { "x-user": username } }
  });  

  /*permet de valider son usrname avec un input button
  et de le sauvegarder */

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
}

export default App;
