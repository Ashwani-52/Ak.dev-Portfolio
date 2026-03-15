'use client';

import { motion } from 'framer-motion';

export default function TypoLoop() {
    const words = ["CODE", "DESIGN", "BUILD", "INNOVATE"];

    // We create a sequence array big enough to easily cover the screen
    // 4 repetitions of the full set
    const sequence = [...words, ...words, ...words, ...words];

    const marqueeRow = (
        <motion.div
            className="flex shrink-0 items-center will-change-transform"
            style={{ translateZ: 0 }} // Force hardware acceleration to prevent text blurring
            animate={{ x: [0, "-100%"] }}
            transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 40, // Smooth scrolling speed
            }}
        >
            {sequence.map((word, i) => {
                // Alternating solid vs outlined hollow text
                const isOutlined = i % 2 !== 0;

                return (
                    <div key={i} className="flex items-center">
                        <h2
                            className={`text-6xl md:text-8xl font-black uppercase tracking-wider mx-8 
                                ${isOutlined
                                    ? 'text-transparent' // Hollow
                                    : 'text-white/90 text-glow' // Solid
                                }`
                            }
                            style={isOutlined ? {
                                WebkitTextStroke: '2px rgba(255, 255, 255, 0.4)',
                                fontFamily: 'var(--font-syne)',
                                filter: 'drop-shadow(0 0 12px rgba(0, 240, 255, 0.2))'
                            } : {
                                fontFamily: 'var(--font-syne)',
                                filter: 'drop-shadow(0 0 16px rgba(0, 240, 255, 0.4))'
                            }}
                        >
                            {word}
                        </h2>
                        {/* Dot Separator */}
                        <span className="text-neon-cyan/50 text-4xl mx-4 animate-pulse">
                            ✦
                        </span>
                    </div>
                );
            })}
        </motion.div>
    );

    return (
        <section className="relative w-full overflow-hidden bg-[#050505] py-20 border-y border-white/5 pt-32 pb-16">
            <div className="flex whitespace-nowrap">
                {/* Two identical rows pushed side-by-side to continuously loop */}
                {marqueeRow}
                {marqueeRow}
            </div>

            {/* Gradient overlays to soften the left/right edges */}
            <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>
        </section>
    );
}
