
import { useBox } from "@react-three/cannon";
import * as THREE from 'three';

export default function PhysDice({model,vec,color,...props}) {

    const [ref, api] = useBox(() => ({ ...props })); 

    model.mainBox.material.color.copy(new THREE.Color(color));

    return ( 
        <group 
            scale = {0.043}
            ref={ref} 
            api={api} 
            onClick={() => api.applyImpulse([10*vec.x, 10*vec.y, -10*vec.z], [0, 0, 0]) }>
            <mesh 
                geometry={model.mainBox.geometry} 
                material={model.mainBox.material.clone()} 
            />
            <mesh 
                geometry={model.perforatedBox.geometry} 
                material={model.perforatedBox.material}
            />
         </group>
    ); 
  }

