import { usePlane } from "@react-three/cannon";
import { Plane } from '@react-three/drei';

export default function PhyPlane({color, dim, ...props}) {

    const [ref] = usePlane(() => ({...props}));
  
    return (
      <Plane ref={ref} args={dim} >
        <meshStandardMaterial color={color}  />
      </Plane>
    );
}