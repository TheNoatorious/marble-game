import { Float, Text } from "@react-three/drei";

interface TitleProps {
    text: string;
    textPosition: [number, number, number];
}

const Title = ({ text, textPosition }: TitleProps): React.JSX.Element => {
    return (
        <group>
            <Float floatIntensity={0.25} rotationIntensity={0.25}>
                <Text
                    scale={0.3}
                    maxWidth={0.2}
                    lineHeight={0.75}
                    textAlign="right"
                    position={textPosition}
                    rotation-y={-0.25}
                    font="/bebas-neue-v9-latin-regular.woff"
                >
                    {text}
                    <meshBasicMaterial toneMapped={false} />
                </Text>
            </Float>
        </group>
    );
};

export default Title;
