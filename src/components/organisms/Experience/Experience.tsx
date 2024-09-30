import { OrbitControls } from "@react-three/drei";
import Lights from "../../atoms/Lights/Lights";
import Level from "../../molecules/Level/Level";

const Experience = () => {
    return (
        <>
            <OrbitControls makeDefault />

            <Lights />
            <Level />
        </>
    );
};

export default Experience;
