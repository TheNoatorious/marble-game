import { useEffect, useRef, useState } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame, Vector3 } from "@react-three/fiber";
import { useRapier, RigidBody } from "@react-three/rapier";
import useGame from "../../../stores/useGame";
import * as THREE from "three";

const Player = () => {
    const body: any = useRef();
    const [subscribeKeys, getKeys] = useKeyboardControls();
    const { rapier, world } = useRapier();
    const rapierWorld = world;

    // Retrieve start method from the store)
    const start = useGame((state) => state.start);
    const end = useGame((state) => state.end);
    const restart = useGame((state) => state.restart);

    const blocksCount = useGame((state) => state.blocksCount);

    const [smoothedCameraPosition, setSmoothedCameraPosition] =
        useState<THREE.Vector3>(() => new THREE.Vector3(10, 10, 10));
    const [smoothedCameraTarget, setSmoothedCameraTarget] =
        useState<THREE.Vector3>(() => new THREE.Vector3());

    const jump = () => {
        const origin: { x: number; y: number; z: number } =
            body.current.translation();
        const originOffset: number = 0.31; // Move origin to the bottom

        origin.y -= originOffset;

        const originDirection: { x: number; y: number; z: number } = {
            x: 0,
            y: -1,
            z: 0,
        };
        const ray = new rapier.Ray(origin, originDirection);
        const hit = rapierWorld.castRay(ray, 10, true); // Raycaster, Max time of impact, solid

        if (hit && hit.timeOfImpact < 0.15) {
            body.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
        }
    };

    useEffect(() => {
        const unsubscribeJump = subscribeKeys(
            // Selector function
            (state) => {
                return state.jump;
            },

            (keyPressed) => {
                if (keyPressed) jump();
            }
        );

        const unsubscribeAny = subscribeKeys(() => {
            start();
        });

        // Clean up events
        return () => {
            unsubscribeJump();
            unsubscribeAny();
        };
    }, []);

    /**
     * Controls
     */
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

    /**
     * Camera
     *
     * The camera has to follow the the marble which the Player controls
     * The Vector3 has to be set so the camera knows where to look
     * and is set slightly above the marble
     */
    useFrame((state, delta) => {
        const marblePosition: any = body.current.translation(); // Position of the marble
        const cameraPosition: Vector3 = new THREE.Vector3();
        const damping: number = 5; // Interpolation factor for smoothing
        const blockOffset: number = 2;
        const blockSize: number = 4;
        const levelBoundsY: number = -4;
        const levelBoundsZ: number = -(blocksCount * blockSize + blockOffset);

        cameraPosition.copy(marblePosition);
        cameraPosition.y += 0.65;
        cameraPosition.z += 2.25;

        const cameraTarget: Vector3 = new THREE.Vector3();
        cameraTarget.copy(marblePosition);
        cameraTarget.y += 0.25;

        // Apply lerp to smooth the camera's movement
        const newCameraPosition = smoothedCameraPosition
            .clone()
            .lerp(cameraPosition, 5 * delta);
        const newCameraTarget: any = smoothedCameraTarget
            .clone()
            .lerp(cameraTarget, 5 * delta);

        setSmoothedCameraPosition(newCameraPosition);
        setSmoothedCameraTarget(newCameraTarget);

        smoothedCameraPosition.lerp(cameraPosition, damping * delta);
        smoothedCameraTarget.lerp(cameraTarget, damping * delta);

        state.camera.position.copy(cameraPosition);
        state.camera.lookAt(cameraTarget);

        // Test if the marblePosition is falling
        if (marblePosition.y < levelBoundsY) {
            restart();
        }

        // Test if the marblePosition is at the end of the level
        if (marblePosition.z < levelBoundsZ) {
            end(); // End of the game
        }
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
