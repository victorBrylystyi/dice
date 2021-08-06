import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import useControls from "./Controls";

export default function useController(props) {

  const { dices } = props
  const controls = useControls();

  const [newReset, setNewReset] = useState(false);
  const [newImpulse, setNewImpulse] = useState(false);
  const [newColor, setNewColor] = useState(false);

  const getRandomIntInclusive = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '0x';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useFrame(() => {
      const { reset, impulse, color } = controls.current;
  
      setNewReset(reset);
      setNewImpulse(impulse);
      setNewColor(color);

  });

  useEffect(() => {  
      if (newReset){
        for (let i = 0; i < dices.current.children.length; i++){
          dices.current.children[i].api.position.copy(dices.current.children[i].position);
          dices.current.children[i].api.rotation.set(0,0,0);
          dices.current.children[i].api.velocity.set(0, 0, 0);
        }
      }    
  }, [newReset]);

  useEffect(() => {  
      if (newImpulse){
        for (let i = 0; i < dices.current.children.length; i++){
          dices.current.children[i].api.applyImpulse([getRandomIntInclusive(-10,10),getRandomIntInclusive(0,10),getRandomIntInclusive(-10,10)], [0, 0, 0]);
        }
      }    
    }, [newImpulse]);

  useEffect(() => {  
      if (newColor){
        for (let i = 0; i < dices.current.children.length; i++){
          dices.current.children[i].children[0].material.color.setHex(getRandomColor());
        }

      }    
  }, [newColor]);

  return null;
}