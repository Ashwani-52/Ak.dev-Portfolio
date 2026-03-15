'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [mounted, setMounted] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const posRef = useRef({ x: -200, y: -200 });
    const [smoothPos, setSmoothPos] = useState({ x: -200, y: -200 });
    const [mainPos, setMainPos] = useState({ x: -200, y: -200 });
    const trailPos = useRef({ x: -200, y: -200 });
    const rafRef = useRef<number>(0);

    useEffect(() => {
        setMounted(true);

        const onMove = (e: MouseEvent) => {
            posRef.current = { x: e.clientX, y: e.clientY };
            setMainPos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', onMove);

        // Delegate hover events on clickable elements
        const handleOver = (e: MouseEvent) => {
            const el = e.target as HTMLElement;
            if (el.closest('a, button, [role="button"], input, textarea, select')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };
        window.addEventListener('mouseover', handleOver);

        // Smoothly animate trailing dot
        const animate = () => {
            trailPos.current.x += (posRef.current.x - trailPos.current.x) * 0.1;
            trailPos.current.y += (posRef.current.y - trailPos.current.y) * 0.1;
            setSmoothPos({ x: trailPos.current.x, y: trailPos.current.y });
            rafRef.current = requestAnimationFrame(animate);
        };
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseover', handleOver);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    // Don't render on server — prevents hydration mismatch
    if (!mounted) return null;

    const size = isHovering ? 40 : 28;

    return (
        <>
            {/* Main crosshair — spring tracks mouse directly */}
            <motion.div
                animate={{ x: mainPos.x - size / 2, y: mainPos.y - size / 2, scale: isHovering ? 1.4 : 1 }}
                transition={{ type: 'spring', stiffness: 600, damping: 35, mass: 0.2 }}
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
                style={{ width: size, height: size }}
            >
                <div
                    className="w-full h-full"
                    style={{
                        border: '1.5px solid #00f0ff',
                        borderRadius: 2,
                        boxShadow: '0 0 6px rgba(0,240,255,0.5)',
                    }}
                />
                {/* Corner accents */}
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-[#00f0ff]" />
                <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-[#00f0ff]" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-[#00f0ff]" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-[#00f0ff]" />
            </motion.div>

            {/* Crimson trailing dot — follows with RAF lag */}
            <div
                className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
                style={{
                    width: 6,
                    height: 6,
                    background: '#ff003c',
                    boxShadow: '0 0 8px rgba(255,0,60,0.8)',
                    transform: `translate(${smoothPos.x - 3}px, ${smoothPos.y - 3}px)`,
                }}
            />
        </>
    );
}
