// BlockSpinner.test.tsx
import { create } from "@react-three/test-renderer";
import BlockSpinner from "./BlockSpinner";
import { waitFor } from "@testing-library/react";
import { Physics } from "@react-three/rapier";
import * as THREE from "three";

let renderer: Awaited<ReturnType<typeof create>>;

beforeEach(async () => {
    renderer = await create(
        <Physics>
            <BlockSpinner position={[1, 1, 1]} />
        </Physics>
    );

    await renderer.advanceFrames(2, 0.016); // Ensure the scene has time to render
});

test("group to have two children", async () => {
    // Verify the scene has children
    await waitFor(() => {
        expect(renderer.scene.children.length).toBeGreaterThan(0);
    });

    const group = renderer.scene.children[0]; // Get the group from the scene
    expect(group.allChildren.length).toBe(2); // Expect the group to have two children
});

test("Each mesh should have a geometry and a material", async () => {
    // Find all meshes in the scene
    const meshes = renderer.scene.findAllByType("Mesh");

    // Ensure that at least one mesh exists
    expect(meshes.length).toBeGreaterThan(0);

    // Check that each mesh has a geometry and material
    meshes.forEach((mesh) => {
        const threeMesh = mesh._fiber as unknown as THREE.Mesh; // Cast _fiber to a Three.js Mesh

        expect(threeMesh.geometry).toBeDefined();
        expect(threeMesh.material).toBeDefined();
    });
});
