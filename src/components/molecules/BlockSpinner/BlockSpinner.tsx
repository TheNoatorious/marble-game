import * as THREE from "three";
import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const floor2Material = new THREE.MeshStandardMaterial({ color: 0xffffff });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });

/**
 * BlockSpinner Component
 *
 * This component represents two meshes: an obstacle and a platform
 * It rotates in random directions with Rapier, applying two different materials with a color.
 *
 * @param {Array<number>} [position=[0, 0, 0]] - The position of the obstacle in 3D space.
 *        Defaults to the origin if not provided.
 *        [x, y, z] where:
 *        - `x` is the horizontal position,
 *        - `y` is the vertical position,
 *        - `z` is the depth position.
 *
 * @returns {React.JSX.Element} A ThreeJS group containing two meshes representing a platform and an obstacle.
 */

type BlockSpinnerProps = {
    position: [number, number, number];
};

const BlockSpinner = ({
    position = [0, 0, 0],
}: BlockSpinnerProps): React.JSX.Element => {
    const obstacle = useRef<RapierRigidBody | null>(null);
    const groupRef = useRef<THREE.Group | null>(null); // Create ref for the group
    const minimumSpeed: number = 0.2;
    const counterRotation: number = Math.random() < 0.5 ? -1 : 1; // counter- or clockwiserotation
    const [speed] = useState(
        () => Math.random() + minimumSpeed * counterRotation
    );

    // Memoize the quaternion to prevent recreation every frame
    const rotation: THREE.Quaternion = useMemo(
        () => new THREE.Quaternion(),
        []
    );
    const euler: THREE.Euler = useMemo(() => new THREE.Euler(0, 0, 0), []); // Create Euler object once

    /**
     * Rotates obstacle on the Y-axis using elapsed time.
     *
     * This is executed on every frame via `useFrame`, which provides the `state`
     * containing the clock.
     *
     * @param {Object} state - The state object provided by `useFrame`, including the clock.
     */
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        // Update the Euler angles (no new object created)
        euler.y = time * speed; // Update only the Y-axis rotation
        rotation.setFromEuler(euler); // time used as the angle to rotate

        if (obstacle.current) {
            obstacle.current.setNextKinematicRotation(rotation);
        }
    });

    return (
        <>
            <group ref={groupRef} position={position}>
                <mesh
                    geometry={boxGeometry}
                    material={floor2Material}
                    position={[0, -0.1, 0]}
                    scale={[4, 0.2, 4]}
                    receiveShadow
                />
                <RigidBody
                    ref={obstacle}
                    type="kinematicPosition" // Kinematic type allows manual rotation/position control
                    position={[0, 0.3, 0]}
                    restitution={0.2}
                    friction={0}
                >
                    <mesh
                        geometry={boxGeometry}
                        material={obstacleMaterial}
                        scale={[3.5, 0.3, 0.3]}
                        castShadow
                        receiveShadow
                    />
                </RigidBody>
            </group>
        </>
    );
};
export default BlockSpinner;
