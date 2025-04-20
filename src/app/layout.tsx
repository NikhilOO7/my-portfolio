import type { Metadata } from 'next';
import './globals.css';
import ParallaxLayer from '@/components/ParallaxLayer';
import Header from '@/components/Header';
import ControlPanel from '@/components/ControlPanel';
import ThreeCanvasWrapper from '@/components/ThreeCanvasWrapper';
import { ChatbotProvider } from '@/components/ChatbotContext';

export const metadata: Metadata = {
  title: 'Nikhil Bindal | Portfolio',
  description: 'A futuristic portfolio showcasing software engineering and AI skills.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ChatbotProvider>
          <ThreeCanvasWrapper />
          <ParallaxLayer depth={0.1}>
            <div className="absolute inset-0 bg-jarvis-grid opacity-10" />
          </ParallaxLayer>
          <Header />
          <main className="bg-jarvis-dark-500 text-white relative font-display overflow-x-hidden z-10 pt-16">
            {children}
          </main>
          <ControlPanel />
        </ChatbotProvider>
      </body>
    </html>
  );
}