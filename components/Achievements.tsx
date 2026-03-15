'use client';

import { motion } from 'framer-motion';
import { Star, TrendingUp, Activity } from 'lucide-react';

type Stat = {
    label: string;
    value: string;
    icon?: React.ReactNode;
    stars?: number;
};

type Achievement = {
    platform: string;
    logo: string;
    glowColor: string;
    textColor: string;
    stats: Stat[];
};

const achievementsData: Achievement[] = [
    {
        platform: "LeetCode",
        logo: "/projects/leetcode.jpeg",
        glowColor: "rgba(255,161,22,0.25)",
        textColor: "text-[#FFA116]",
        stats: [
            { label: "Questions Solved", value: "200+" },
            { label: "Contest Rating", value: "1579", icon: <TrendingUp size={22} className="text-[#FFA116]" /> },
            { label: "Global Rank (Top 150 Qs)", value: "497", icon: <Activity size={22} className="text-[#FFA116]" /> }
        ]
    },
    {
        platform: "HackerRank",
        logo: "/projects/hackerrank.svg",
        glowColor: "rgba(46,200,102,0.25)",
        textColor: "text-[#2EC866]",
        stats: [
            { label: "Golden Badge", value: "Java", stars: 5 },
            { label: "Golden Badge", value: "30 Days of Code" }
        ]
    },
    {
        platform: "GeeksforGeeks",
        logo: "/projects/gfg.svg",
        glowColor: "rgba(47,141,70,0.25)",
        textColor: "text-[#2F8D46]",
        stats: [
            { label: "University Rank", value: "959" }
        ]
    }
];

export default function Achievements() {
    return (
        <section id="achievement" className="w-full py-32 px-6 relative z-20 bg-[#050505] overflow-hidden">
            {/* Ambient Background Glow - Subtler */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-neon-cyan/2 blur-[160px] rounded-[100%] pointer-events-none" />

            <div className="max-w-7xl mx-auto flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24 relative"
                >
                    <h2 className="text-white/90 text-5xl md:text-7xl font-extrabold tracking-tighter uppercase" style={{ fontFamily: 'var(--font-syne), sans-serif', filter: 'drop-shadow(0 0 20px rgba(0, 240, 255, 0.2))' }}>
                        ACHIEVEMENTS
                    </h2>
                    <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mt-6" />
                </motion.div>

                <div className="w-full flex flex-col md:flex-row justify-between gap-16 md:gap-8">
                    {achievementsData.map((achievement, i) => (
                        <motion.div
                            key={achievement.platform}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            className="relative flex-1 flex flex-col items-center group"
                        >
                            {/* Central Hover Glow Aura - Softer */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-700 blur-[60px] rounded-full pointer-events-none z-0"
                                style={{ backgroundColor: achievement.glowColor }}
                            />

                            <div className="flex flex-col items-center z-10 w-full">
                                {/* Logo with precise drop shadow */}
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                                    transition={{ duration: 0.5 }}
                                    className="mb-8 relative"
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={achievement.logo}
                                        alt={`${achievement.platform} logo`}
                                        className="w-20 h-20 object-contain rounded-xl relative z-10"
                                        style={{ filter: `drop-shadow(0 0 15px ${achievement.glowColor})` }}
                                    />
                                </motion.div>

                                <h3 className={`text-2xl font-bold tracking-widest uppercase mb-10 ${achievement.textColor} transition-colors duration-300`} style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', textShadow: `0 0 10px ${achievement.glowColor}` }}>
                                    {achievement.platform}
                                </h3>

                                {/* Minimalist Stats Architecture */}
                                <div className="flex flex-col w-full gap-8 border-l-2 border-white/5 pl-6 group-hover:border-white/20 transition-colors duration-500">
                                    {achievement.stats.map((stat, index) => (
                                        <div key={index} className="flex flex-col origin-left transition-transform duration-300 group-hover:translate-x-2">
                                            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/40 mb-2 font-mono">
                                                {stat.label}
                                            </span>
                                            <div className="flex flex-col gap-2 mt-1">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-1 h-5 rounded-full bg-white/20 group-hover:bg-white transition-colors duration-500`} style={{ boxShadow: `0 0 10px ${achievement.glowColor}` }} />
                                                    <span className="text-2xl md:text-3xl font-bold text-white/90 tracking-wider flex items-center gap-3" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
                                                        {stat.value}
                                                        {stat.icon && <span style={{ filter: `drop-shadow(0 0 8px ${achievement.glowColor})` }}>{stat.icon}</span>}
                                                    </span>
                                                </div>

                                                {/* Golden Stars Rendering */}
                                                {stat.stars && (
                                                    <div className="flex gap-1.5 ml-4 mt-1">
                                                        {[...Array(stat.stars)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                size={16}
                                                                className="text-yellow-400 fill-yellow-400"
                                                                style={{ filter: 'drop-shadow(0 0 8px rgba(250, 204, 21, 0.6))' }}
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
