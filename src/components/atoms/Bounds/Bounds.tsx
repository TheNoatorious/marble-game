import { MeshReflectorMaterial, Reflector } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const floor2Material = new THREE.MeshStandardMaterial({ color: 0xffffff });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
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
                />
            </RigidBody>
        </>
    );
    console.log(<mesh />);
};

export default Bounds;
