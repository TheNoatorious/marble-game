import { RigidBody } from "@react-three/rapier";

const Player = () => {
    return (
        <RigidBody
            canSleep={false}
            colliders="ball"
            restitution={0.2}
            friction={1}
            position={[0, 1, 0]}
        >
            <mesh>
                <icosahedronGeometry args={[0.3, 1]} />
                <meshStandardMaterial color="grey" />
            </mesh>
        </RigidBody>
    );
};

export default Player;
