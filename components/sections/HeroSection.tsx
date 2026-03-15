'use client';

import { motion, MotionValue, useTransform, useMotionValue } from 'framer-motion';

interface HeroSectionProps {
    scrollProgress?: MotionValue<number>;
}

export default function HeroSection({ scrollProgress }: HeroSectionProps) {
    const fallbackProgress = useMotionValue(0);
    const fadeOpacity = useTransform(scrollProgress || fallbackProgress, [0, 0.15], [1, 0]);
    const scrollY = useTransform(scrollProgress || fallbackProgress, [0, 0.15], [0, -100]);

    return (
        <motion.section
            style={{ opacity: scrollProgress ? fadeOpacity : 1, y: scrollProgress ? scrollY : 0 }}
            className="w-full flex flex-col items-center justify-center relative z-10 px-6 bg-transparent pointer-events-auto"
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-center z-10 max-w-5xl"
            >
                <h1
                    className="text-5xl md:text-7xl mb-4 tracking-tight text-glow"
                    style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 800 }}
                >
                    Ashwani.
                </h1>
                <p className="text-xs md:text-sm text-white/70 tracking-[0.35em] uppercase mt-6 font-medium">
                    Full Stack Developer
                </p>

                <div className="mt-12 animate-bounce opacity-50">
                    <p className="text-xs font-mono mb-2">SCROLL TO INITIALIZE</p>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-neon-cyan to-transparent mx-auto"></div>
                </div>
            </motion.div>
        </motion.section>
    );
}
