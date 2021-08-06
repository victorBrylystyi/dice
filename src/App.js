
import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, CameraShake} from '@react-three/drei';
import { Physics } from "@react-three/cannon";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from 'three';

import PhyPlane from './Plane';
import ReflectionPlane from "./ReflectionPlane";
import PhysDice from "./PhysDice";
import useController from "./Controller";
// import Controller from "./Controller";

import "./styles.css";

useGLTF.preload("/assets/gltf/dice.glb");
useTexture.preload(['/assets/ground/ground.jpeg', '/assets/ground/ground_normal.jpeg']);

function Scene (){

  const node = useMemo(()=>{
 
    const { nodes } = useGLTF('/assets/gltf/dice.glb');

    return nodes;
  },[]);

  const [ floor , normal ] = useMemo(()=>{

    const [ floor, normal ] = useTexture(['/assets/ground/ground.jpeg', '/assets/ground/ground_normal.jpeg']);

    return [ floor, normal ];
  },[]);

  const dices = useRef(null);

  useController({dices});

  return (
    <group>
      <ReflectionPlane roughnessMap={floor} normalMap={normal} dim={[20,20]} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} /> 
      <PhyPlane color= "slateBlue" dim={[20,10]} position={[0, 5, -10]} />
      <PhyPlane color= "red" dim={[20,10]} position={[10, 5, 0]} rotation={[0, -Math.PI / 2, 0]}/>
      <PhyPlane color= "limeGreen" dim={[20,10]} position={[-10, 5, 0]} rotation={[0, Math.PI / 2, 0]}/>
      <PhyPlane color= "darkBlue" dim={[20,10]} position={[0, 5, 10]} rotation={[0, Math.PI , 0]}/>
      <group ref={dices}>
        <PhysDice model= {node} vec={new THREE.Vector3(1,0,1)} color='deepSkyBlue' args={[1,1,1]} mass= {1} position={[2, 0.5, 0]}/>
        <PhysDice model= {node} vec={new THREE.Vector3(0,0.5,1)} color='green' args={[1,1,1]} mass= {1} position={[0, 0.5, 0]}/>
        <PhysDice model= {node} vec={new THREE.Vector3(1,0.5,0)} color='orange' args={[1,1,1]} mass= {1} position={[-2, 0.5, 0]}/>
      </group>
    </group>
  );
}

export default function App() {

  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 2, 5] }}>
      <color attach="background" args={"black"} />
      <ambientLight intensity={0.6} />
      <OrbitControls />
      {/* <CameraShake yawFrequency={0.1} pitchFrequency={0.2} rollFrequency={0.2} /> */}
      <Suspense fallback={null}>
        <Physics gravity={[0, -9.81, 0]}>
          <Scene />
        </Physics>
        <EffectComposer multisampling={8}>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.1} intensity={2} width={1024} height={1024} kernelSize={3} blurPass={undefined}/> 
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}

