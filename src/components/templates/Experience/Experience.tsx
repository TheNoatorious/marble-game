import * as THREE from "three";
import { Physics } from "@react-three/rapier";
import { Cloud, Clouds, OrbitControls, Sky } from "@react-three/drei";
import Lights from "../../atoms/Lights/Lights";
import Level from "../../organisms/Level/Level";
import Player from "../../atoms/Player/Player";
import useGame from "../../../stores/useGame";

const Experience = () => {
    const { blocksSeed, blocksCount } = useGame.getState();

    return (
        <>
            <OrbitControls makeDefault />
            <Clouds material={THREE.MeshBasicMaterial} position={[0, 4, -35]}>
                <Cloud segments={2} bounds={[10, 2, 2]} volume={10} />

                <Cloud seed={1} scale={2} volume={2} color="white" fade={100} />
            </Clouds>

            <Sky />

            <Physics debug>
                <Lights />
                <Level trapCount={blocksCount} seed={blocksSeed} />
                <Player />
            </Physics>
        </>
    );
};

export default Experience;
