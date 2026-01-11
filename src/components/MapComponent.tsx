// src/components/MapComponent.tsx

'use client';

import { useEffect, useRef } from 'react';

export default function MapComponent({ className = '' }: { className?: string }) {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Dynamic import of leaflet
    const loadMap = async () => {
      if (typeof window === 'undefined' || !mapRef.current) return;
      
      try {
        // Dynamic import of Leaflet
        const L = (await import('leaflet')).default;
        
        // Instead of importing the CSS file directly, we'll add it to the head
        if (!document.getElementById('leaflet-css')) {
          const link = document.createElement('link');
          link.id = 'leaflet-css';
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
          link.crossOrigin = '';
          document.head.appendChild(link);
        }
        
        // San Francisco coordinates
        const sanFranciscoCoords: [number, number] = [37.7749, -122.4194];

        // Check if map is already initialized
        if (!mapRef.current.classList.contains('leaflet-container')) {
          const map = L.map(mapRef.current).setView(sanFranciscoCoords, 13);

          // Add dark theme tile layer
          L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            maxZoom: 19,
          }).addTo(map);

          // Add custom marker
          const markerIcon = L.divIcon({
            className: 'custom-pin',
            html: `<div class="pin-marker bg-jarvis-blue-500 shadow-jarvis-glow animate-pulse"></div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
          });

          L.marker(sanFranciscoCoords, { icon: markerIcon }).addTo(map)
            .bindPopup("Nikhil Bindal<br>San Francisco, CA")
            .openPopup();
          
          // Custom styles
          const style = document.createElement('style');
          style.textContent = `
            .custom-pin .pin-marker {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              border: 2px solid #fff;
              box-shadow: 0 0 15px rgba(25, 118, 255, 0.7);
            }
            .leaflet-popup-content-wrapper {
              background-color: #0d0d0d;
              color: white;
              border: 1px solid rgba(25, 118, 255, 0.3);
            }
            .leaflet-popup-tip {
              background-color: #0d0d0d;
            }
          `;
          document.head.appendChild(style);
        }
      } catch (error) {
        console.error('Error loading map:', error);
      }
    };
    
    loadMap();
  }, []);
  
  return (
    <div 
      ref={mapRef} 
      className={`w-full h-full rounded-lg overflow-hidden ${className}`}
      style={{ minHeight: '300px' }}
    />
  );
}