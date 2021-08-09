import { usePlane } from "@react-three/cannon";
import { Reflector } from '@react-three/drei';

export default function ReflectionPlane({roughnessMap, normalMap, dim, ...props}){

    const [ref] = usePlane(() => ({...props}));
  
    return (
        <Reflector
            ref = {ref}
            args={dim} // PlaneBufferGeometry arguments
            mirror={1} // Mirror environment, 0 = texture colors, 1 = pick up env colors
            mixBlur={8} // How much blur mixes with surface roughness
            mixStrength={1.1} // Strength of the reflections
            resolution={720} // Off-buffer resolution, lower=faster, higher=better quality
            depthScale={50}
            debug={0}
            depthToBlurRatioBias={1}
        >
            {(Material, props) => (
                <Material color="#ffffff" metalness={0.5} roughnessMap={roughnessMap} normalMap={normalMap} normalScale={[0.5, 0.5]} {...props}/>
            )}
        </Reflector>
    );
  }
  //#f0f0f0

