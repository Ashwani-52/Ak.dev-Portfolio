'use client';

import { useEffect, useRef, useState } from 'react';
import { useSpring, useTransform, useMotionValueEvent, MotionValue } from 'framer-motion';

const TOTAL_FRAMES = 224;

interface ScrollCanvasProps {
    scrollProgress: MotionValue<number>;
}

export default function ScrollCanvas({ scrollProgress }: ScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
    const [imagesLoaded, setImagesLoaded] = useState(0);

    const smoothProgress = useSpring(scrollProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Track the current frame index
    const frameIndex = useTransform(smoothProgress, [0, 1], [1, TOTAL_FRAMES]);

    // Preload images
    useEffect(() => {
        let loadedCount = 0;
        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const indexStr = i.toString().padStart(3, '0');
            const img = new Image();
            img.src = `/frames/ezgif-frame-${indexStr}.jpg`;
            img.onload = () => {
                loadedCount++;
                setImagesLoaded(loadedCount);
            };
            imagesRef.current[i - 1] = img;
        }
    }, []);

    const drawFrame = (frame: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Ensure we don't go out of bounds
        const safeFrame = Math.max(1, Math.min(TOTAL_FRAMES, frame));
        const img = imagesRef.current[safeFrame - 1];

        if (img && img.complete) {
            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = img.width / img.height;

            let drawWidth = canvas.width;
            let drawHeight = canvas.height;
            let offsetX = 0;
            let offsetY = 0;

            if (canvasRatio > imgRatio) {
                drawHeight = canvas.width / imgRatio;
                offsetY = (canvas.height - drawHeight) / 2;
            } else {
                drawWidth = canvas.height * imgRatio;
                offsetX = (canvas.width - drawWidth) / 2;
            }

            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

            // Overlay to make white text pop
            ctx.fillStyle = 'rgba(5, 5, 5, 0.4)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    };

    useMotionValueEvent(frameIndex, "change", (latest) => {
        drawFrame(Math.floor(latest));
    });

    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                drawFrame(Math.floor(frameIndex.get()));
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Init size

        return () => window.removeEventListener('resize', handleResize);
    }, [frameIndex, imagesLoaded]);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center bg-transparent">
            <canvas
                ref={canvasRef}
                className="w-full h-full object-cover"
            />
        </div>
    );
}
