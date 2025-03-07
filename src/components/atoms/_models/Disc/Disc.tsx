import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

/**
 * Disc Component
 *
 * @param {Object} props - The props passed to the component.
 *
 *
 * @returns {React.JSX.Element} A ThreeJS primitive object representing the hamburger model.
 */
const Disc = ({ color, ...props }: any): React.JSX.Element => {
    const { scene } = useGLTF("/models/lowpoly_cd.glb");

    // Traverse the scene and update the material color
    scene.traverse((child: THREE.Object3D) => {
        if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
        }
    });
    return (
        <>
            <RigidBody
                type="fixed"
                colliders="hull"
                restitution={0.2}
                friction={0}
                position={[0, 0.25, 0]}
            >
                <primitive object={scene} {...props} />
            </RigidBody>
        </>
    );
};
export default Disc;
