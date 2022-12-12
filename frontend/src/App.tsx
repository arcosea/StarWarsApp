import React, { useState } from 'react';
import './App.css';

function App() {

  const typeList:string[] = ["Character", "Planet", "Species", "Starship", "Vehicle"]

  const [type, setType] = useState("")

  const [name, setName] = useState("")

  const onSubmit = (e:any) => {
    e.preventDefault()
    
    fetch("http://127.0.0.1:5000/image-generator", {body: JSON.stringify(
      {type: type, name: name})}).then((response) => {
        return response.json()
    }).then((data) => {
        
    })
    
  }

  const handleNameChange = (e:any) => {
    const { value } = e.target
    setName(value)
  }

  const handleTypeChange = (e:any) => {
    const { value } = e.target
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
                return <option key={i} value={type}>{type}</option>
              })
            }
          </select> 
        </label>
        <label htmlFor="name">
          Name:
          <input id="name" onChange={handleNameChange} value={name}></input>
        </label>
        <button onClick={onSubmit}>Search</button>
      </form>
      <img alt="sunset" src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sunset-quotes-21-1586531574.jpg"/>
    </div>
  );
}

export default App;
