import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const floor1Material = new THREE.MeshStandardMaterial({ color: 0xf0f0f0 });

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
const BlockEnd = ({ position = [0, 0, 0] }: any): React.JSX.Element => {
    const hamburger = useGLTF("./hamburger.glb");
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
                <primitive object={hamburger.scene} />
            </group>
        </>
    );
};
export default BlockEnd;
