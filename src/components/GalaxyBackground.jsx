import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

function GalaxyBackground() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 75,
        }}
      >
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
      </Canvas>
    </div>
  );
}

export default GalaxyBackground;