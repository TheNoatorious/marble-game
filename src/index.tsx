import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./components/templates/Experience/Experience";
import { KeyboardControls } from "@react-three/drei";

const rootElement = document.querySelector("#root");

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);

    root.render(
        <KeyboardControls
            map={[{ name: "forward", keys: ["ArrowUp", "KeyW"] }]}
        >
            <Canvas
                shadows
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [2.5, 4, 6],
                }}
            >
                <Experience />
            </Canvas>
        </KeyboardControls>
    );
} else {
    console.error("Could not find root element to mount to!");
}
