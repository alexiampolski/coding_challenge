import "./App.css";
import React, { useState, useEffect } from "react";

const url ="https://gist.githubusercontent.com/medibank-digital/a1fc81a93200a7b9d5f8b7eae0fac6f8/raw/de10a4fcf717e6c431e88c965072c784808fd6b2/people.json";
let records;

const getJsonData = async () => {
  const responce = await fetch(url);
  const jsonData = await responce.json();

  records = jsonData.map((item) => {
    let cats='';
    let headings = "";
    let petsNumber = item.pets?.length || 0;

    if (petsNumber > 0) {
      let catsTemp='';
      headings = <h4>{item.gender}</h4>;
      catsTemp = item.pets.map(pet=>{return pet.type === "Cat"&& pet.name}).sort(); 
      cats= catsTemp.map(cat=>{return(<h6>{cat}</h6>)})
    }

    return (
      <div>
        {headings}
        {cats}
      </div>
    );
  });
};


function App() {
  const [cats, setCats] = useState(0);
  useEffect(() => {
    getJsonData();
  });

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => setCats(cats + 1)}>Get All Cats</button>
        {records}
      </header>
    </div>
  );
}

export default App;
