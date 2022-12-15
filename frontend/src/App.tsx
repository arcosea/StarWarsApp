import React, { useState } from 'react';
import './App.css';

function App() {

  //types that are possible
  const typeList:string[] = ["Character", "Planet", "Species", "Starship", "Vehicle"]

  //state to track type and name
  const [type, setType] = useState("character")
  const [name, setName] = useState("")

  //handleSubmit
  const handleSubmit = (e:any) => {
    e.preventDefault()
    
    fetch(`http://127.0.0.1:5000/image-generator?type=${type}&name=${name}`).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data)
    })
    
  }

  const handleNameChange = (e:any) => {
    const { value } = e.target
    setName(value)
  }

  const handleTypeChange = (e:any) => {
    const { value } = e.target
    console.log(value)
    setType(value)
  }

  return (
    <div className="App">

      {/*
      TODO:
      create a form
      one dropdown for type
      an input, prepulated based on the type
      when user clicks submit, make request to flask

      recieve the request and display image
      */}
      <form>
        <label htmlFor="type">
          Type:
          <select id="type" onChange={handleTypeChange}>
            {
              typeList.map((type, i) => {
                return <option key={i} value={type.toLowerCase()}>{type}</option>
              })
            }
          </select> 
        </label>
        <label htmlFor="name">
          Name:
          <input id="name" onChange={handleNameChange} value={name}></input>
        </label>
        <button onClick={handleSubmit}>Search</button>
      </form>
      <img alt="sunset" src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sunset-quotes-21-1586531574.jpg"/>
    </div>
  );
}

export default App;
