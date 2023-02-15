import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { gql, useQuery } from "@apollo/client";

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

  const {loading, error, data, refetch } = useQuery(GET_WORLD, {
    context: { headers: { "x-user": username } }
  });

  return (
    <div className="App">
      <form>
        <label>
          Name:{" "}
          <input
            type="text"
            value={usernamechamp}
            onChange={(event) => setUsernamechamp(event.target.value)}
          />
        </label>
        <input type="button" value="Submit" onClick={onUserNameChanged} />
      </form>
      <div className="header">
        <div> logo monde </div>
        <div> argent </div>
        <div> multiplicateur </div>
        <div> ID du joueur </div>
      </div>
      <div className="main">
        <div> liste des boutons de menu </div>
        <div className="product">
          <div> premier produit </div>
          <div> second produit </div>
          <div> troisième produit </div>
          <div> quatrième produit </div>
          <div> cinquième produit </div>
          <div> sixième produit </div>
        </div>
      </div>
    </div>
  );
}

export default App;
