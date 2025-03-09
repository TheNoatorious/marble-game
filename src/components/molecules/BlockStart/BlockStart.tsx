import { BoxGeometry, MeshStandardMaterial } from "three";
import Title from "../../atoms/Title/Title";

const boxGeometry: BoxGeometry = new BoxGeometry(1, 1, 1);
const floor1Material: MeshStandardMaterial = new MeshStandardMaterial({
    color: 0xf0f0f0,
});

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

type BlockStartProps = {
    position: [number, number, number];
};

const BlockStart = ({
    position = [0, 0, 0],
}: BlockStartProps): React.JSX.Element => {
    return (
        <>
            <group position={position}>
                <Title text="MARBLE RACE GAME" textPosition={[0.75, 0.65, 0]} />
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
