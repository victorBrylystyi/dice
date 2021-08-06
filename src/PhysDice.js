
import { useBox } from "@react-three/cannon";
import { useMemo } from "react";
import * as THREE from 'three';

export default function PhysDice({model,vec,color,...props}) {

    const [ref, api] = useBox(() => ({ ...props }));

    const cloneMaterial = useMemo(()=>{
        const material = model?.mainBox?.material.clone();
        material.roughness = 0.1;
        material?.color.copy(new THREE.Color(color));

        return material;
    },[model]);

    return ( 
        <group 
            scale = {0.043}
            ref={ref} 
            api={api} 
            onClick={() => api.applyImpulse([10*vec.x, 10*vec.y, -10*vec.z], [0, 0, 0]) }>
            <mesh 
                geometry={model.mainBox.geometry} 
                material={cloneMaterial} 
            />
            <mesh 
                geometry={model.perforatedBox.geometry} 
                material={model.perforatedBox.material}
            />
         </group>
    ); 
  }

