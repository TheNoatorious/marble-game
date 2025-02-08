import { Float, Text } from "@react-three/drei";

const Title = (): React.JSX.Element => {
    return (
        <group>
            <Float>
                <Text scale={4}>Marble Race</Text>
            </Float>
        </group>
    );
};

export default Title;
