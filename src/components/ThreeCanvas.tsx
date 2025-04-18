"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

function ParticleSystem({ scrollY }: { scrollY: number }) {
    const pointsRef = useRef<THREE.Points>(null);
    const [starOpacity, setStarOpacity] = useState(0);

    useEffect(() => {
        // Fade to stars when on landing section
        setStarOpacity(scrollY < 100 ? 1 : 0);
    }, [scrollY]);

    useFrame(() => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += 0.002;
            const scale = 1 + scrollY / 1000; // Scale with scroll
            pointsRef.current.scale.set(scale, scale, scale);
        }
    });

    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const starVertices = [];
    for (let i = 0; i < 1000; i++) {
        vertices.push(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
        );
        starVertices.push(
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50
        );
    }
    geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
    );
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(starVertices, 3)
    );

    return (
        <>
            <points ref={pointsRef}>
                <bufferGeometry attach="geometry" {...geometry} />
                <pointsMaterial
                    color={0x1976ff}
                    size={0.1}
                    transparent
                    opacity={1 - starOpacity}
                />
            </points>
            <points>
                <bufferGeometry attach="geometry" {...starGeometry} />
                <pointsMaterial
                    color={0xffffff}
                    size={0.05}
                    transparent
                    opacity={starOpacity}
                />
            </points>
        </>
    );
}

export default function ThreeCanvas() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 30], fov: 50 }}>
                <ParticleSystem scrollY={scrollY} />
                <OrbitControls
                    autoRotate
                    autoRotateSpeed={1}
                    enableZoom={false}
                />
            </Canvas>
        </div>
    );
}
