"use client";

import { useEffect, useRef } from "react";
import Parallax from "parallax-js";

interface ParallaxLayerProps {
    children: React.ReactNode;
    depth?: number;
}

export default function ParallaxLayer({
    children,
    depth = 0.2,
}: ParallaxLayerProps) {
    const sceneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sceneRef.current) return;
        const parallax = new Parallax(sceneRef.current, {
            relativeInput: true,
            clipRelativeInput: true,
            hoverOnly: false,
            selector: ".parallax-layer",
            pointerEvents: true,
            scalarX: depth * 10,
            scalarY: depth * 10,
        });

        return () => {
            parallax.disable();
        };
    }, [depth]);

    return (
        <div ref={sceneRef} className="fixed inset-0">
            <div className="parallax-layer" data-depth={depth}>
                {children}
            </div>
        </div>
    );
}