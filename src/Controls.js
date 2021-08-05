import { useEffect, useRef } from "react";

function useKeyPress(target, event){

    useEffect(()=>{

        const downHandler = ({code}) => target.indexOf(code) !== -1 && event(true);
        const upHandler = ({code}) => target.indexOf(code) !== -1 && event(false);
        
        
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);

        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        }

    },[]);

}

export default function useControls() {

    const keys = useRef({reset: false,impulse: false, color: false});

    useKeyPress(['KeyR'], (pressed) => (keys.current.reset = pressed));
    useKeyPress(['KeyI'], (pressed) => (keys.current.impulse = pressed));
    useKeyPress(['KeyC'], (pressed) => (keys.current.color = pressed));

    return keys;
} 
