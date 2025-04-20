import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

function Brain({ scrollY }: { scrollY: number }) {
  const brainRef = useRef<THREE.Group | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const connectionsRef = useRef<THREE.LineSegments | null>(null);
  
  useFrame(({ clock }) => {
    if (brainRef.current) {
      // Moderate rotation based on time
      brainRef.current.rotation.y = clock.getElapsedTime() * 0.08 + scrollY * 0.0008;
      brainRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.15) * 0.08;
    }
  });

  const { camera } = useThree();
  
  // Generate brain-like structure
  useEffect(() => {
    if (!brainRef.current) return;
    
    // Initialize camera position
    camera.position.set(0, 0, 30);
    
    // Create brain nodes
    const nodes: THREE.Vector3[] = [];
    const nodeCount = 300; // More points than previous version
    const brainRadius = 12; // Larger radius to be more visible
    
    for (let i = 0; i < nodeCount; i++) {
      // Create points in a brain-like ellipsoid shape
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      // Slightly flattened ellipsoid shape
      const x = brainRadius * 1.2 * Math.sin(phi) * Math.cos(theta);
      const y = brainRadius * Math.sin(phi) * Math.sin(theta);
      const z = brainRadius * 0.8 * Math.cos(phi);
      
      // Add controlled randomness
      const jitter = 1.8;
      nodes.push(
        new THREE.Vector3(
          x + (Math.random() - 0.5) * jitter,
          y + (Math.random() - 0.5) * jitter,
          z + (Math.random() - 0.5) * jitter
        )
      );
    }
    
    // Create nodes geometry
    const nodesGeometry = new THREE.BufferGeometry().setFromPoints(nodes);
    const nodesMaterial = new THREE.PointsMaterial({
      color: 0x1976ff,
      size: 0.12, // Larger points
      transparent: true,
      opacity: 0.75, // More visible
    });
    
    const pointsObject = new THREE.Points(nodesGeometry, nodesMaterial);
    pointsRef.current = pointsObject;
    brainRef.current.add(pointsObject);
    
    // Create connections between nearby nodes with balanced density
    const connections: number[] = [];
    const connectionDistance = 2.3;
    
    // Connect points strategically to create a balanced network
    for (let i = 0; i < nodes.length; i++) {
      let connectionCount = 0;
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < connectionDistance && connectionCount < 2 && Math.random() > 0.3) {
          connections.push(nodes[i].x, nodes[i].y, nodes[i].z);
          connections.push(nodes[j].x, nodes[j].y, nodes[j].z);
          connectionCount++;
        }
      }
    }
    
    const connectionsGeometry = new THREE.BufferGeometry();
    connectionsGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(connections, 3)
    );
    
    const connectionsMaterial = new THREE.LineBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.25, // More visible but not overwhelming
    });
    
    const connectionsObject = new THREE.LineSegments(
      connectionsGeometry,
      connectionsMaterial
    );
    connectionsRef.current = connectionsObject;
    brainRef.current.add(connectionsObject);
    
    return () => {
      if (brainRef.current) {
        while (brainRef.current.children.length) {
          brainRef.current.remove(brainRef.current.children[0]);
        }
      }
    };
  }, [camera]);

  return (
    <group 
      ref={brainRef} 
      position={[0, 0, -3]} // Closer to the camera
    />
  );
}

// More visible background stars
function BackgroundStars() {
  const starsRef = useRef<THREE.Points | null>(null);
  
  useEffect(() => {
    if (!starsRef.current) return;
    
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];
    
    // More stars
    for (let i = 0; i < 800; i++) {
      const radius = 35 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      vertices.push(x, y, z);
    }
    
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05, // Larger stars
      transparent: true,
      opacity: 0.5, // More visible
    });
    
    const points = new THREE.Points(geometry, material);
    starsRef.current.add(points);
    
    return () => {
      if (starsRef.current && starsRef.current.children.length) {
        starsRef.current.remove(starsRef.current.children[0]);
      }
    };
  }, []);
  
  return <points ref={starsRef} position={[0, 0, -20]} />;
}

export default function ThreeCanvas() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-jarvis-dark-900">
      <div className="absolute inset-0 opacity-70"> {/* Higher opacity for more visibility */}
        <Canvas camera={{ position: [0, 0, 30], fov: 45 }}>
          <ambientLight intensity={0.2} /> {/* More light */}
          <directionalLight position={[5, 5, 5]} intensity={0.4} /> {/* More light */}
          
          <Brain scrollY={scrollY} />
          <BackgroundStars />
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.4} // Moderate rotation speed
            rotateSpeed={0.4}
          />
        </Canvas>
      </div>
      {/* Subtle gradient overlay for improved readability without losing visual appeal */}
      <div className="absolute inset-0 bg-gradient-to-b from-jarvis-dark-900/40 via-transparent to-jarvis-dark-900/40 pointer-events-none"></div>
    </div>
  );
}