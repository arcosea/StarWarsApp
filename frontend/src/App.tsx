import React, { useEffect } from 'react';
import './App.css';
import * as THREE from 'three'
import { Vector3 } from 'three';

function App() {

  // Moving through space background
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
      document.body.appendChild(renderer.domElement);

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
      space.translateY(0.01);
      space.rotateX(0.005);
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    init();

  }, [])

  return (
    <div className="App">
      <h1 style={{ backgroundColor: "white" }}>Hello</h1>
    </div>
  );
}

export default App;
