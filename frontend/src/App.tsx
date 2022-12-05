import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [flaskData, setFlaskData] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/").then((response) => {
        return response.json()
    }).then((data) => {
      setFlaskData(data.value)
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>{flaskData}</p>
      </header>
    </div>
  );
}

export default App;
