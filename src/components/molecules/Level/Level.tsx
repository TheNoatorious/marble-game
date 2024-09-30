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
            <BlockStart position={[0, 0, 0]} />
        </>
    );
};

export default Level;
