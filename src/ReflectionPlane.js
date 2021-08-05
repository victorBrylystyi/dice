import { usePlane } from "@react-three/cannon";
import { Reflector } from '@react-three/drei';

export default function ReflectionPlane({roughnessMap, normalMap, dim, ...props}){

    const [ref] = usePlane(() => ({...props}));
  
    return (
        <Reflector
            ref = {ref}
            args={dim} // PlaneBufferGeometry arguments
            blur={[300, 120]} // Blur ground reflections (width, heigt), 0 skips blur
            mirror={0.9} // Mirror environment, 0 = texture colors, 1 = pick up env colors
            mixBlur={6} // How much blur mixes with surface roughness
            mixStrength={0.25} // Strength of the reflections
            resolution={512} // Off-buffer resolution, lower=faster, higher=better quality
            minDepthThreshold={0.25}
            maxDepthThreshold={1}
            depthScale={50}
            depthToBlurRatioBias={0.1}
        >
            {(Material, props) => (
                <Material color="#f0f0f0" metalness={0} roughnessMap={roughnessMap} normalMap={normalMap} normalScale={[0.6, 0.6]} {...props}/>
            )}
        </Reflector>
    );
  }

