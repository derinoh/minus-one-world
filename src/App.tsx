import React from "react";
import { Container } from "nes-react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import "./App.css";
import goblin from './goblin.json';
import Typist from 'react-typist';

const { useEffect, useRef } = React;

// custom globe material
const globeMaterial = new THREE.MeshPhongMaterial();
globeMaterial.bumpScale = 10;
new THREE.TextureLoader().load(
  "//unpkg.com/three-globe/example/img/earth-water.png",
  (texture) => {
    globeMaterial.specularMap = texture;
    globeMaterial.specular = new THREE.Color("grey");
    globeMaterial.shininess = 15;
  }
);

const label = [
  {
  lng: -83.375244140625,
  lat: 33.959308210392024,
  label: "Athens, GA"
}
];

const World = () => {
  const globeEl = useRef<any>(null);

  useEffect(() => {
    setTimeout(() => {
      // wait for scene to be populated (asynchronously)
      const directionalLight = globeEl.current
        .scene()
        .children.find(
          (obj3d: { type: string }) => obj3d.type === "DirectionalLight"
        );

      directionalLight && directionalLight.position.set(100, 100, 0.00001); // change light position to see the specularMap's effect

      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.2;
      globeEl.current.controls().enableZoom = true;

      

      globeEl.current.pointOfView(
        {
          lat: 10,
          lng: -50,
          altitude: 4,
        },
        0
      );
    });
  }, [globeEl]);

  

  return (
    <div>
      <Globe
        ref={globeEl}
        globeImageUrl="//minusoneworld.com/lib/images/earth.png"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        labelsData={label}
        labelText={"label"}
        labelSize={2}
        labelDotRadius={1}
        labelResolution={.1}
        labelAltitude={.05}
        labelTypeFace={goblin}
        labelColor={() => 'rgb(253, 97, 58)'}
      />
      <div style={{ display: "none" }}>
          <Container> </Container>
        </div>
      <div
        style={{
          position: "absolute",
          top: "-10vh",
          height: "100vh",
          width: "100vw",
          fontSize: "60px",
          color: "#fff",
          display: "flex",
          zIndex: 0,
          alignItems: "flex-end",
          justifyContent: "center",
          pointerEvents: 'none'
        }}
      >
      <div style={{textAlign: "center"}}>
        <Typist cursor={{show: false}} avgTypingDelay={1000} startDelay={5000}>
          <span>MINUS <span style={{color: 'rgb(253, 97, 58)'}}>ONE</span> WORLD</span>
        </Typist>
      </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "5vh",
          height: "100vh",
          width: "100vw",
          fontSize: "50px",
          color: "rgb(253, 97, 58)",
          display: "flex",
          zIndex: 0,
          alignItems: "flex-start",
          justifyContent: "center",
          pointerEvents: 'none'
        }}
      >
        <div style={{ display: 'flex', justifyContent: "center", textAlign: "center"}}>
          <Typist 
            cursor={{show: false}}
            avgTypingDelay={100}
            stdTypingDelay={20}
            startDelay={2000}
          >
          <div>WARNING</div>
          <Typist.Delay ms={1500} />
          <div style={{fontSize: "20px"}}>
            <span>IMPACT: IMMINENT</span>
            <Typist.Backspace count={16} delay={2500} />
            <span>THREAT LEVEL: LETHAL</span>
            <Typist.Backspace count={20} delay={2500} />
            <span style={{color: 'white'}}>GAME OVER</span>
          </div>
          </Typist>
          
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <header className="App-header"></header>
      {/* <Globe globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg" /> */}
      <World />
    </div>
  );
};

export default App;
