import * as THREE from "three";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const floor1Material = new THREE.MeshStandardMaterial({ color: 0xffffff });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "orangered" });
const wallMaterial = new THREE.MeshStandardMaterial({ color: "slategrey" });

/**
 * BlockStart Component
 *
 * This component creates a basic platform using a box geometry, and applies a standard material with a color.
 * The block is placed at a configurable position and can be used as a starting point
 *
 * @param {Array<number>} [position=[0, 0, 0]] - The position of the block in 3D space.
 *        Defaults to the origin if not provided.
 *        [x, y, z] where:
 *        - `x` is the horizontal position,
 *        - `y` is the vertical position,
 *        - `z` is the depth position.
 *
 * @returns {React.JSX.Element} A ThreeJS group containing a single mesh representing a block.
 */
const BlockStart = ({ position = [0, 0, 0] }: any): React.JSX.Element => {
    return (
        <>
            <group position={position}>
                <mesh
                    geometry={boxGeometry}
                    material={floor1Material}
                    position={[0, -0.1, 0]}
                    receiveShadow
                    scale={[4, 0.2, 4]}
                />
            </group>
        </>
    );
};
export default BlockStart;
