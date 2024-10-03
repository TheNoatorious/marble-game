import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./components/templates/Experience/Experience";

const rootElement = document.querySelector("#root");

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);

    root.render(
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
    );
} else {
    console.error("Could not find root element to mount to!");
}
