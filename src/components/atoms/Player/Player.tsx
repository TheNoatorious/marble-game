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
    const handleStart = useGame((state) => state.start);
    const handleEnd = useGame((state) => state.end);
    const handleRestart = useGame((state) => state.restart);

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
        const maxToi: number = 10;
        const hit = rapierWorld.castRay(ray, maxToi, true); // Raycaster, max time of impact, solid

        if (hit && hit.timeOfImpact < 0.15) {
            body.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
        }
    };

    const reset = () => {
        body.current.setTranslation({ x: 0, y: 1, z: 0 });
        body.current.setLinvel({ x: 0, y: 0, z: 0 });
        body.current.setAngvel({ x: 0, y: 0, z: 0 });
    };

    useEffect(() => {
        const unsubscribeReset = useGame.subscribe(
            (state) => state.phase,

            (phase) => {
                if (phase === "ready") {
                    reset();
                }
            }
        );
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
            handleStart();
        });

        // Clean up events
        return () => {
            unsubscribeReset();
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
        // Forward / Backward movement
        // Push marble on the z-axis
        // Roll marble on the x-axis
        if (forward) {
            impulse.z -= impulseStrength;
            torque.x -= torqueStrength;
        } else if (backward) {
            impulse.z += impulseStrength;
            torque.x += torqueStrength;
        }

        // Rightward / Leftward movement
        if (rightward) {
            impulse.x += impulseStrength;
            torque.z -= torqueStrength;
        } else if (leftward) {
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
            handleRestart();
        }

        // Test if the marblePosition is at the end of the level
        if (marblePosition.z < levelBoundsZ) {
            handleEnd(); // End of the game
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
