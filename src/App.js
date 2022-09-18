import "./App.css";
import React, { useState, useEffect } from "react";

const url ="https://gist.githubusercontent.com/medibank-digital/a1fc81a93200a7b9d5f8b7eae0fac6f8/raw/de10a4fcf717e6c431e88c965072c784808fd6b2/people.json";

let catsForMale = [];
let catsTempM = [];
let catsForFemale = [];
let catsTempF = [];

const getJsonData = async () => {
  const responce = await fetch(url);
  const jsonData = await responce.json();

  jsonData.forEach((item) => {
    let petsNumber = item.pets?.length || 0;

    if (petsNumber > 0) {// check if person has any pets

      if (item.gender == "Male") { //checkk if the person is a male
          item.pets.forEach((pet) => {pet.type === "Cat" && catsTempM.push(pet.name)}); ///extract only if pet is cat
          catsTempM.sort();// sorting all cats names in alphabetical order
          catsForMale = catsTempM.map(cat => {return <h6>{cat}</h6>}); /// outputing the list of all cats names brloning to all males 
      } else {  //otherwise female
          item.pets.forEach((pet) => {pet.type === "Cat" && catsTempF.push(pet.name)});  ///extract only if pet is cat
          catsTempF.sort(); // sorting all cats names in alphabetical order
          catsForFemale = catsTempF.map((cat) => { return <h6>{cat}</h6>});// outputing the list of all cats brloning to all females 
      }

    } 

  });
  catsTempM = [];
  catsTempF = [];
};

function App() {
  const [cats, setCats] = useState(0);
  useEffect(() => {
    getJsonData();
  },[]);

  return (
    <div className="App">
      <header className="App-header">
        <h3>Male</h3>
        {catsForMale}
        <h3>Female</h3>
        {catsForFemale}
        <button onClick={() => setCats('')}>Get All Cats</button>
      </header>
      
    </div>
  );
}

export default App;
