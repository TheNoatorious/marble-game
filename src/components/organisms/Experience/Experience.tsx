import { Physics } from "@react-three/rapier";
import { OrbitControls } from "@react-three/drei";
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
        </>
    );
};

export default Experience;
