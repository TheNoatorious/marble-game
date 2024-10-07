import { MeshReflectorMaterial, Reflector } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import * as THREE from "three";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const wallMaterial = new THREE.MeshStandardMaterial({ color: "0xffffff" });

const Bounds = ({ length = 1 }: any) => {
    return (
        <>
            <RigidBody type="fixed" restitution={0.2} friction={0}>
                {/* WALL RIGHT */}
                <mesh
                    position={[2.15, 0.75, -(length * 2) + 2]}
                    geometry={boxGeometry}
                    material={wallMaterial}
                    scale={[0.3, 1.5, 4 * length]}
                    castShadow
                />
                {/* WALL LEFT */}
                <mesh
                    position={[-2.15, 0.75, -(length * 2) + 2]}
                    geometry={boxGeometry}
                    material={wallMaterial}
                    scale={[0.3, 1.5, 4 * length]}
                    receiveShadow
                />
                {/* WALL END */}
                <mesh
                    position={[0, 0.75, -(length * 4) + 2]}
                    geometry={boxGeometry}
                    material={wallMaterial}
                    scale={[4, 1.5, 0.3]}
                    receiveShadow
                />{" "}
                <CuboidCollider
                    args={[2, 0.1, 2 * length]}
                    position={[0, -0.1, -(length * 2) + 2]}
                    restitution={0.2}
                    friction={1}
                />
            </RigidBody>
        </>
    );
    console.log(<mesh />);
};

export default Bounds;
