import { usePlane } from "@react-three/cannon";
import { Reflector } from '@react-three/drei';

export default function ReflectionPlane({roughnessMap, normalMap, dim, ...props}){

    const [ref] = usePlane(() => ({...props}));
  
    return (
        <Reflector
            ref = {ref}
            args={dim} // PlaneBufferGeometry arguments
            blur={[512, 512]} // Blur ground reflections (width, heigt), 0 skips blur
            mirror={1} // Mirror environment, 0 = texture colors, 1 = pick up env colors
            mixBlur={8} // How much blur mixes with surface roughness
            mixStrength={1} // Strength of the reflections
            resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality
            minDepthThreshold={0.25}
            maxDepthThreshold={1}
            depthScale={50}
            depthToBlurRatioBias={1}
        >
            {(Material, props) => (
                <Material color="#f0f0f0" metalness={0} roughnessMap={roughnessMap} normalMap={normalMap} normalScale={[1, 1]} {...props}/>
            )}
        </Reflector>
    );
  }

