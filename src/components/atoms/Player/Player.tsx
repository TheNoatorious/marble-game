import { useEffect, useRef } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRapier, RigidBody } from "@react-three/rapier";

const Player = () => {
    const body: any = useRef();
    const [subscribeKeys, getKeys] = useKeyboardControls();
    const { rapier, world } = useRapier();
    const rapierWorld: any = world;

    const jump = () => {
        const origin = body.current.translation();
        const originOffset = 0.31; // Move origin to the bottom
        origin.y -= originOffset;

        const originDirection = { x: 0, y: -1, z: 0 };
        const ray = new rapier.Ray(origin, originDirection);
        const hit = rapierWorld.castRay(ray);

        console.log(hit.timeOfImpact);

        body.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
    };

    useEffect(() => {
        subscribeKeys(
            // Selector function
            (state) => {
                return state.jump;
            },

            (keyPressed) => {
                if (keyPressed) {
                    jump();
                }
            }
        );
    }, []);

    useFrame((state, delta) => {
        const { forward, backward, leftward, rightward } = getKeys();

        const impulse = { x: 0, y: 0, z: 0 }; // Push motion
        const torque = { x: 0, y: 0, z: 0 }; // Rolling motion

        const impulseSpeed = 0.6;
        const torqueSpeed = 0.2;

        const impulseStrength = impulseSpeed * delta;
        const torqueStrength = torqueSpeed * delta;

        // impulseStrength is changed according to what is being pressed

        if (forward) {
            impulse.z -= impulseStrength; // Push marble on the -z-axis
            torque.x -= torqueStrength; // Roll on the x-axis
        }

        if (rightward) {
            impulse.x += impulseStrength;
            torque.z -= torqueStrength;
        }

        if (backward) {
            impulse.z += impulseStrength;
            torque.x += torqueStrength;
        }

        if (leftward) {
            impulse.x -= impulseStrength;
            torque.z += torqueStrength;
        }

        body.current.applyImpulse(impulse);
        body.current.applyTorqueImpulse(torque);
    });

    return (
        <RigidBody
            ref={body}
            canSleep={false}
            colliders="ball"
            restitution={0.2}
            friction={1}
            linearDamping={0.5}
            angularDamping={0.5}
            position={[0, 1, 0]}
        >
            <mesh>
                <icosahedronGeometry args={[0.3, 1]} />
                <meshStandardMaterial color="grey" />
            </mesh>
        </RigidBody>
    );
};

export default Player;
