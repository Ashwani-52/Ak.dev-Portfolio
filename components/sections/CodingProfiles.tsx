'use client';

import { motion } from 'framer-motion';

const profiles = [
    {
        name: "LeetCode",
        link: "https://leetcode.com/u/Ashwani60/",
        logo: "/projects/leetcode.jpeg",
        glowColor: "rgba(255, 161, 22, 0.5)" // LeetCode Orange Glow
    },
    {
        name: "HackerRank",
        link: "https://www.hackerrank.com/profile/ashwanikumar6064",
        logo: "/projects/hackerrank.svg",
        glowColor: "rgba(46, 200, 102, 0.5)" // HackerRank Green Glow
    },
    {
        name: "GeeksforGeeks",
        link: "https://www.geeksforgeeks.org/profile/singhrishigqi",
        logo: "/projects/gfg.svg",
        glowColor: "rgba(47, 141, 70, 0.5)" // GfG Green Glow
    },
];

export default function CodingProfiles() {
    return (
        <section id="profiles" className="w-full py-24 px-6 relative z-20 bg-[#050505] flex flex-col items-center justify-center">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <h2 className="text-white/90 text-4xl md:text-5xl font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-syne), sans-serif' }}>
                    CODING PROFILES
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-crimson mx-auto mt-6 rounded-full" />
            </motion.div>

            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
                {profiles.map((profile, i) => (
                    <motion.div
                        key={profile.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="group relative flex flex-col items-center justify-center p-10 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                    >
                        {/* Magnetic Pull Effect Overlay (subtle) */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" />

                        {/* Logo Container with colored glow */}
                        <div
                            className="w-24 h-24 mb-8 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2 relative"
                        >
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl rounded-full"
                                style={{ backgroundColor: profile.glowColor }}
                            />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={profile.logo}
                                alt={`${profile.name} logo`}
                                className="w-full h-full object-contain relative z-10 rounded-md"
                            />
                        </div>

                        {/* Platform Name and Link */}
                        <div className="flex flex-col items-center z-10">
                            <h3 className="text-white/80 text-sm uppercase tracking-widest font-medium mb-3" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                                {profile.name}
                            </h3>

                            <a
                                href={profile.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neon-cyan/80 text-xs font-mono tracking-widest uppercase hover:text-white transition-colors duration-300 relative"
                            >
                                <span className="group-hover:text-shadow-cyan transition-all duration-300">
                                    View Profile ↗
                                </span>
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>

        </section>
    );
}
