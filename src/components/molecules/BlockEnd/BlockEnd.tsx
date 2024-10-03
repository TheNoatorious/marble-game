import * as THREE from "three";
import Disc from "../../atoms/_models/Disc/Disc";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const floor1Material = new THREE.MeshStandardMaterial({ color: 0xf0f0f0 });

/**
 * BlockEnd Component
 *
 * This component creates a basic platform using a box geometry, and applies a standard material with a color.
 * The block is placed at a configurable position and is can be used as an end block of a level.
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
const BlockEnd = ({ position = [0, 0, 0] }: any): React.JSX.Element => {
    return (
        <>
            <group position={position}>
                <mesh
                    geometry={boxGeometry}
                    material={floor1Material}
                    position={[0, 0, 0]}
                    receiveShadow
                    scale={[4, 0.2, 4]}
                />

                <Disc
                    scale={0.2}
                    color={0xffff33}
                    position={[2, 0.8, 2]}
                    rotation={[-0.2, 0.5, 0]}
                />
            </group>
        </>
    );
};
export default BlockEnd;
