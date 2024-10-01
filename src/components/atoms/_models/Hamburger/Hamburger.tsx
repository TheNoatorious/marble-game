import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

/**
 * Hamburger Component
 *
 * @param {Object} props - The props passed to the component.
 *
 *
 * @returns {React.JSX.Element} A ThreeJS primitive object representing the hamburger model.
 */
const Hamburger = ({ color, ...props }: any): React.JSX.Element => {
    const { scene } = useGLTF("./hamburger.glb");

    // Traverse the scene and update the material color
    scene.traverse((child: THREE.Object3D) => {
        if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (mesh.material) {
                mesh.material = new THREE.MeshStandardMaterial({ color });
            }
        }
    });
    return (
        <>
            <primitive object={scene} {...props} />
        </>
    );
};
export default Hamburger;
