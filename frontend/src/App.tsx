import React, { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {

  //types that are possible
  const typeList:string[] = ["Character", "Planet", "Species", "Starship", "Vehicle"]

  //state to track type and name
  const [type, setType] = useState("character")
  const [name, setName] = useState("")

  const [data, setData] = useState([{name: 'Anakin Skywalker'}])
  const [imageLink, setImageLink] = useState("https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sunset-quotes-21-1586531574.jpg")

  const firstUpdate = useRef(0);
  useEffect(() => {
    if (firstUpdate.current < 2) {
      firstUpdate.current++
      return;
    }

    fetch(`http://127.0.0.1:5000/image-generator?name=${data[0].name}`).then((response) => {
      return response.json()
    }).then((imageUrl) => {
      setImageLink(imageUrl.image_url)
    })
    return
  }, [data]);

  //handleSubmit
  const handleSubmit = (e:any) => {
    e.preventDefault()
    fetch(`http://127.0.0.1:5000/star-wars-data?type=${type}&name=${name}`).then((response) => {
        return response.json()
    }).then((data) => {
        setData(data)
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
      <img alt="sunset" src={imageLink}/>
      <table>
        <thead>
          <tr>
            {
              Object.keys(data[0]).map((headerName, i) => {
                return <th key={i}>{headerName}</th>
              })
            }
          </tr>
        </thead>
        <tbody>
            
            {
            data.map((element, i) => {
              return <tr key={i}>
                {
                  Object.values(element).map((val, i) => {
                    return <td key={i}>{val}</td>
                  })
                }
              </tr>
            })
            }
        </tbody>
      </table>
    </div>
  );
}

export default App;
