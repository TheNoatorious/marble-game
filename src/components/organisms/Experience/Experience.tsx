import * as THREE from "three";
import { Physics } from "@react-three/rapier";
import {
    Cloud,
    Clouds,
    Environment,
    OrbitControls,
    Sky,
} from "@react-three/drei";
import Lights from "../../atoms/Lights/Lights";
import Level from "../../molecules/Level/Level";

const Experience = () => {
    return (
        <>
            <OrbitControls makeDefault />
            <Physics debug>
                <Lights />
                <Level />
            </Physics>
            <Clouds material={THREE.MeshBasicMaterial} position={[0, 4, -10]}>
                <Cloud segments={10} bounds={[10, 2, 2]} volume={10} />

                <Cloud seed={1} scale={2} volume={5} color="white" fade={100} />
            </Clouds>

            <Environment preset="dawn" />
            <Sky />
        </>
    );
};

export default Experience;
