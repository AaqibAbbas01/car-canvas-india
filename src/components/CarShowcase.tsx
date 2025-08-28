import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Float } from "@react-three/drei";
import { motion } from "framer-motion";

// Simple 3D Car Component
function Car3D() {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 6, 0]}>
        {/* Car Body */}
        <boxGeometry args={[4, 1.5, 2]} />
        <meshStandardMaterial color="#ff6b35" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Car Roof */}
      <mesh position={[0.5, 1.2, 0]} rotation={[0, Math.PI / 6, 0]}>
        <boxGeometry args={[2.5, 1, 1.8]} />
        <meshStandardMaterial color="#ff6b35" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Wheels */}
      <mesh position={[-1.3, -0.8, 1.1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[1.3, -0.8, 1.1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[-1.3, -0.8, -1.1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[1.3, -0.8, -1.1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      
      {/* Windshield */}
      <mesh position={[1.2, 0.8, 0]} rotation={[0, Math.PI / 6, Math.PI / 12]}>
        <planeGeometry args={[1.8, 1.2]} />
        <meshStandardMaterial color="#87CEEB" opacity={0.7} transparent />
      </mesh>
    </Float>
  );
}

export const CarShowcase = () => {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -15 }}
      animate={{ opacity: 1, rotateY: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative h-96 w-full"
    >
      <Canvas
        camera={{ position: [5, 2, 5], fov: 60 }}
        className="rounded-2xl"
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight
          position={[-10, 10, 5]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
        />
        
        <Car3D />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
          autoRotate
          autoRotateSpeed={2}
        />
        
        <Environment preset="sunset" />
      </Canvas>
      
      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-lg px-4 py-2 text-white font-semibold"
      >
        360° View
      </motion.div>
      
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
        className="absolute bottom-4 left-4 bg-success/90 backdrop-blur-md rounded-lg px-4 py-2 text-white font-semibold"
      >
        ✓ Verified
      </motion.div>
    </motion.div>
  );
};