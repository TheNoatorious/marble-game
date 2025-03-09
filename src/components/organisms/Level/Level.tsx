import { useMemo } from "react";
import BlockAxe from "../../molecules/BlockAxe/BlockAxe";
import BlockEnd from "../../molecules/BlockEnd/BlockEnd";
import BlockLimbo from "../../molecules/BlockLimbo/BlockLimbo";
import BlockSpinner from "../../molecules/BlockSpinner/BlockSpinner";
import BlockStart from "../../molecules/BlockStart/BlockStart";
import Bounds from "../../atoms/Bounds/Bounds";

/**
 * Level component
 *
 * This component serves as a building block for larger
 * environments or levels.
 *
 * @returns {React.JSX.Element} A 3D level consisting of various components
 */

type LevelProps = {
    trapCount: number;
    types?: React.ComponentType<{ position: [number, number, number] }>[];
    seed: number;
};

const Level = ({
    trapCount = 5,
    types = [BlockSpinner, BlockAxe, BlockLimbo],
    seed = 0,
}: LevelProps): React.JSX.Element => {
    const defaultBlocks: number = 2; // Start + end blocks
    // Returns a random set of traps
    const blocks = useMemo(() => {
        const blocks = [];

        for (let i = 0; i < trapCount; i++) {
            const type = types[Math.floor(Math.random() * types.length)];
            blocks.push(type);
        }

        return blocks;
    }, [trapCount, types, seed]);

    return (
        <>
            <BlockStart position={[0, 0, 0]} />
            {blocks.map((Block, index: number) => (
                <Block key={index} position={[0, 0, -(index + 1) * 4]} />
            ))}
            <BlockEnd position={[0, 0, -(trapCount + 1) * 4]} />
            <Bounds length={trapCount + defaultBlocks} />
        </>
    );
};

export default Level;
