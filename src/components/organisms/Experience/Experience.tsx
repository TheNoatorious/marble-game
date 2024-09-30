import { OrbitControls } from "@react-three/drei";
import React from "react";
import Lights from "../../atoms/Lights/Lights";

const Experience = () => {
    return (
        <>
            <OrbitControls makeDefault />

            <Lights />
        </>
    );
};

export default Experience;
