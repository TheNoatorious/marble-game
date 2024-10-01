import * as THREE from "three";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const floor2Material = new THREE.MeshStandardMaterial({ color: 0xffffff });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });

/**
 * BlockLimbo Component
 *
 * This component represents two meshes: an obstacle on a platform
 * The obstacle moves up and down and physics are applied using Rapier
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
const BlockAxe = ({ position = [0, 0, 0] }: any): React.JSX.Element => {
    const obstacle: any = useRef();
    const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

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
        const amplitude = 1.25;
        const translationX = Math.sin(time + timeOffset) * amplitude;
        const translationY = 0.75;

        obstacle.current.setNextKinematicTranslation({
            x: position[0] + translationX,
            y: position[1] + translationY,
            z: position[2],
        });
    });

    return (
        <>
            <group position={position}>
                <mesh
                    geometry={boxGeometry}
                    material={floor2Material}
                    position={[0, -0.1, 0]}
                    scale={[4, 0.2, 4]}
                    receiveShadow
                />
                <RigidBody
                    ref={obstacle}
                    type="kinematicPosition" // This obstacle will move but won't be affected by physics like gravity or forces.
                    position={[0, 0.3, 0]}
                    restitution={0.2} // The ball will bounce off slightly when it hits (low bounciness).
                    friction={0} // The ball won't experience any friction when interacting with this obstacle
                >
                    <mesh
                        geometry={boxGeometry}
                        material={obstacleMaterial}
                        scale={[1.5, 1.5, 0.3]}
                        castShadow
                        receiveShadow
                    />
                </RigidBody>
            </group>
        </>
    );
};
export default BlockAxe;
