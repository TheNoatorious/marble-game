import { DirectionalLight } from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Lights = () => {
    const light = useRef<DirectionalLight | null>(null);
    const moveLightForward: number = 4; // Move target and light

    useFrame((state) => {
        if (light.current) {
            light.current.position.z =
                state.camera.position.z + 1 - moveLightForward;
            light.current.target.position.z =
                state.camera.position.z - moveLightForward;
            light.current.target.updateMatrixWorld();
        }
    });

    return (
        <>
            <directionalLight
                ref={light}
                castShadow
                position={[4, 4, 1]}
                intensity={4.5}
                shadow-mapSize={[1024, 1024]}
                shadow-camera-near={1}
                shadow-camera-far={10}
                shadow-camera-top={10}
                shadow-camera-right={10}
                shadow-camera-bottom={-10}
                shadow-camera-left={-10}
            />
            <ambientLight intensity={1.5} />
        </>
    );
};

export default Lights;
