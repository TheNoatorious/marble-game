import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./components/templates/Experience/Experience";
import { KeyboardControls } from "@react-three/drei";
import Interface from "./components/organisms/PlayerInterface/PlayerInterface";

const rootElement = document.querySelector("#root");

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);

    root.render(
        <KeyboardControls
            map={[
                { name: "forward", keys: ["ArrowUp", "KeyW"] },
                { name: "backward", keys: ["ArrowDown", "KeyS"] },
                { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
                { name: "rightward", keys: ["ArrowRight", "KeyD"] },
                { name: "jump", keys: ["Space"] },
            ]}
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
            <Interface />
        </KeyboardControls>
    );
} else {
    console.error("Could not find root element to mount to!");
}
