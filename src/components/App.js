import React from "react";
import {useEffect, useState} from 'react'
function App() {
const [doggos, setDoggos]= useState([])
const [displayDoggo, setDisplayDoggo]= useState({name: '', isGoodDog: '', image: ''})
const [goodDogs, setGoodDogs] = useState([])
const [filter, setFilter] = useState(false)
useEffect(()=> {
const getData = async ()=> {
  let req = await fetch("http://localhost:3001/pups");
  let res = await req.json()
setDoggos(res)
setGoodDogs(res.filter(dog => dog.isGoodDog))
}
getData()
},[])
const handleDoggoChange = () => {
setDisplayDoggo({...displayDoggo, isGoodDog: !displayDoggo.isGoodDog})
const patchDoggo = async () => {
   fetch(`http://localhost:3001/pups/${displayDoggo.id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(displayDoggo)
  });

}
  patchDoggo();
}

const handleFilter = () => {
if (filter){
  return (goodDogs)
}else {
  return (doggos)

}
}


  return (
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter" onClick={()=> {setFilter(prev => !prev)}}>Filter good dogs: OFF</button>
      </div>
      <div id="dog-bar">{
        handleFilter().map(dog => {
          return (
            <span key={dog.id}
            onClick={()=> {setDisplayDoggo(dog)}}
            >{dog.name}</span>
          )
        })
      }</div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
          <img src={displayDoggo.image} alt={displayDoggo} />
          <h2>{displayDoggo.name}</h2>
          <button onClick={()=> {handleDoggoChange()}}>{displayDoggo.isGoodDog? 'Good dog': 'Bad dog'}</button>
        </div>
      </div>
    </div>
  );
}

export default App;