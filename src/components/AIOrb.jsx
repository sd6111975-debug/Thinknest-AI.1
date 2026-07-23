import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";

function Orb() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#4fd1ff"
          emissive="#00bfff"
          emissiveIntensity={2}
          metalness={0.6}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
}

export default function AIOrb() {
  return (
    <div className="w-[450px] h-[450px]">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[5, 5, 5]} intensity={10} color="#00bfff" />
        <pointLight position={[-5, -5, -5]} intensity={6} color="#8b5cf6" />
        <Orb />
      </Canvas>
    </div>
  );
}