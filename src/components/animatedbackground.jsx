import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] }}>
        {/* Background Color */}
        <color attach="background" args={["#050816"]} />

        {/* Animated Stars */}
        <Stars
          radius={100}
          depth={50}
          count={6000}
          factor={5}
          saturation={0}
          fade
          speed={1}
        />

        {/* Slow Galaxy Rotation */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.15}
        />
      </Canvas>

      {/* Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-purple-500/5"></div>
    </div>
  );
}

export default AnimatedBackground;