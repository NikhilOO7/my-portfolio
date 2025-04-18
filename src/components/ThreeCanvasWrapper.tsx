'use client';

import dynamic from 'next/dynamic';

const ThreeCanvas = dynamic(() => import('./ThreeCanvas'), { ssr: false });

export default function ThreeCanvasWrapper() {
  return <ThreeCanvas />;
}