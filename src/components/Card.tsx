"use client";

import { motion } from "framer-motion";

interface CardProps {
    title: string;
    description: string;
    tags?: string[];
    children?: React.ReactNode;
}

export default function Card({
    title,
    description,
    tags,
    children,
}: CardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
                scale: 1.02,
                boxShadow:
                    "0 0 24px rgba(25, 118, 255, 0.5), 0 0 48px rgba(25, 118, 255, 0.3)", // Enhanced glow on hover
            }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-b from-jarvis-dark-400 to-jarvis-dark-500 rounded-lg p-6 shadow-jarvis-glow animate-float-smooth flex flex-col h-[220px] justify-between border border-transparent hover:border-jarvis-blue-500 transition-colors duration-300"
        >
            <div className="flex flex-col">
                <h3 className="text-xl font-display text-jarvis-blue-500 font-semibold">
                    {title}
                </h3>
                <p className="mt-3 text-gray-200 font-display text-sm min-h-[40px] line-clamp-2 overflow-hidden">
                    {description}
                </p>
                {tags && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs font-display text-gray-200 bg-jarvis-dark-600 px-3 py-1 rounded-full border border-jarvis-blue-600/30 hover:bg-jarvis-blue-600/20 transition-colors duration-200"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            {children && <div className="mt-4">{children}</div>}
        </motion.div>
    );
}