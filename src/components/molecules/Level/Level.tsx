import BlockAxe from "../BlockAxe/BlockAxe";
import BlockEnd from "../BlockEnd/BlockEnd";
import BlockLimbo from "../BlockLimbo/BlockLimbo";
import BlockSpinner from "../BlockSpinner/BlockSpinner";
import BlockStart from "../BlockStart/BlockStart";

/**
 * Level component
 *
 * This component serves as a building block for larger
 * environments or levels.
 *
 * @returns {React.JSX.Element} A 3D level consisting of various components
 */

const Level = (): React.JSX.Element => {
    return (
        <>
            <BlockStart position={[0, 0, 16]} />
            <BlockSpinner position={[0, 0, 12]} />
            <BlockLimbo position={[0, 0, 8]} />
            <BlockAxe position={[0, 0, 4]} />
            <BlockEnd position={[0, 0, 0]} />
        </>
    );
};

export default Level;
