import React, { useEffect } from 'react';
import './App.css';
import * as THREE from 'three'

function App() {

  useEffect(() => {

    let scene:THREE.Scene;
    let camera:THREE.PerspectiveCamera;
    let renderer:THREE.WebGLRenderer;
    let starGeo:THREE.BufferGeometry;
    let stars;

    function init() {
      //create scene object
      scene = new THREE.Scene();
      
      //setup camera with facing upward
      camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.z = 1;
      camera.rotation.x = Math.PI/2;
      
      //setup renderer
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      starGeo = new THREE.BufferGeometry();

      let verticesArray = []

      for(let i=0;i<18000;i++) {

        let star = Math.random() * 600 - 300
        verticesArray.push(star)
        
      }

      let vertices = Float32Array.from(verticesArray);

      starGeo.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3));

      let sprite = new THREE.TextureLoader().load( 'star.png' );
      let starMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.7,
        map: sprite
      });

      stars = new THREE.Points(starGeo,starMaterial);
      scene.add(stars);

      animate(); 
    }
    //rendering loop
    function animate() {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    
    init();

  }, [])

  return (
    <div className="App">
      <h1 style={{backgroundColor: "white"}}>Hello</h1>
    </div>
  );
}

export default App;
