import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import * as THREE from 'three'


function App() {

  // Moving through space effect
  useEffect(() => {
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let starGeo: THREE.BufferGeometry;
    let space: THREE.Points;

    function init() {
      // Create scene object
      scene = new THREE.Scene();

      // Setup camera with facing upward
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.z = 100;
      camera.rotation.x = Math.PI / 2;

      // Setup renderer
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      window.addEventListener("resize", (event) => {
        renderer.setSize(window.innerWidth, window.innerHeight);
      })
      document.getElementById("root")?.appendChild(renderer.domElement)

      // Create geoemtry for stars & vertices for
      starGeo = new THREE.BufferGeometry();
      let starPoints = []
      let numStars = 50000;

      // Create random vertices for stars
      for (let i = 0; i < numStars; i++) {
        let x = Math.random() * 600 - 300
        let y = Math.random() * 600 - 300
        let z = Math.random() * 600 - 300
        let star = new THREE.Vector3(x, y, z);
        starPoints.push(star);

      }
      starGeo.setFromPoints(starPoints);

      // Create Texture for vertices
      let sprite = new THREE.TextureLoader().load('star.png');
      let starMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.7,
        map: sprite
      });

      // Add stars to scene
      space = new THREE.Points(starGeo, starMaterial);
      scene.add(space);

      animate();
    }
    // Rendering loop
    function animate() {
      //space.translateY(0.01);
      space.rotateX(0.005);
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    init();
  }, []);


  // Types that are possible
  const typeList: string[] = ["Character", "Planet", "Species", "Starship", "Vehicle"]

  // State to track type and name
  const [type, setType] = useState("character")
  const [name, setName] = useState("")
  const [data, setData] = useState([{ name: 'Anakin Skywalker' }])
  const [imageLink, setImageLink] = useState("https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sunset-quotes-21-1586531574.jpg")

  // Request for image
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

  // Handles Submits
  const handleSubmit = (e: any) => {
    e.preventDefault()
    fetch(`http://127.0.0.1:5000/star-wars-data?type=${type}&name=${name}`).then((response) => {
      return response.json()
    }).then((data) => {
      setData(data)
    })

  }


  const handleNameChange = (e: any) => {
    const { value } = e.target
    setName(value)
  }

  const handleTypeChange = (e: any) => {
    const { value } = e.target
    setType(value)
  }



  return (
    <div className="App">
      {/* 
        Form for request to database & openAI
      */}
      <form>
        <label className="user-type" htmlFor="type">
          Type:
          <select id="type" onChange={handleTypeChange}>
            {
              typeList.map((type, i) => {
                return <option key={i} value={type.toLowerCase()}>{type}</option>
              })
            }
          </select>
        </label>
        <label className="user-type" htmlFor="name">
          Name:
          <input id="name" onChange={handleNameChange} value={name}></input>
        </label>
        <button onClick={handleSubmit}>Search</button>
      </form>
      <img alt="sunset" src={imageLink} />

      {/* 
        Results from database
      */}
      <table className="results">
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
    </div >
  );
}

export default App;
