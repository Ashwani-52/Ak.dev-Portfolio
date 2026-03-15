'use client';

import { motion } from 'framer-motion';

const stats = [
    { value: '2+', label: 'Years Web Dev' },
    { value: 'MERN', label: 'Stack Specialist' },
    { value: '100%', label: 'Eager to Learn' },
];

export default function AboutMe() {
    return (
        <section className="w-full bg-[#050505] py-24 px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* ── Left: Visual Panel ── */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-10%' }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                    className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden"
                    style={{
                        border: '1px solid rgba(0,240,255,0.12)',
                        boxShadow: '0 0 60px rgba(0,240,255,0.06), inset 0 0 40px rgba(0,0,0,0.4)',
                    }}
                >
                    {/* Animated gradient background as image placeholder */}
                    <motion.div
                        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                        transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
                        className="absolute inset-0"
                        style={{
                            background: 'linear-gradient(135deg, #050505 0%, #0d1a1a 40%, #0a0a12 70%, #050505 100%)',
                            backgroundSize: '200% 200%',
                        }}
                    />

                    {/* Grid lines overlay */}
                    <div
                        className="absolute inset-0 opacity-[0.06]"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(0,240,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,1) 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                        }}
                    />

                    {/* Floating code lines decoration */}
                    <div className="absolute inset-0 flex flex-col justify-center px-8 gap-3">
                        {[
                            'const developer = {',
                            '  name: "Ashwani Kumar",',
                            '  stack: ["MERN"],',
                            '  passion: "UI/UX",',
                            '  status: "available",',
                            '};',
                        ].map((line, i) => (
                            <motion.p
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                                className="font-mono text-sm"
                                style={{
                                    color: i === 0 || i === 5 ? 'rgba(255,255,255,0.5)'
                                        : line.includes('name') ? '#00f0ff'
                                            : line.includes('status') ? '#ff003c'
                                                : 'rgba(255,255,255,0.3)',
                                }}
                            >
                                {line}
                            </motion.p>
                        ))}
                    </div>

                    {/* Bottom neon line accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff]/50 to-transparent" />

                    {/* Corner accents */}
                    <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#00f0ff]/40 rounded-tl-sm" />
                    <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#00f0ff]/40 rounded-tr-sm" />
                    <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#00f0ff]/40 rounded-bl-sm" />
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#00f0ff]/40 rounded-br-sm" />
                </motion.div>

                {/* ── Right: Content ── */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-10%' }}
                    transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
                    className="flex flex-col justify-center"
                >
                    {/* Label */}
                    <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-neon-cyan/60 mb-4">
                        Who I Am
                    </span>

                    {/* Heading */}
                    <h2
                        className="text-4xl md:text-5xl font-black tracking-tight text-white mb-8 leading-tight text-glow"
                        style={{ fontFamily: 'var(--font-syne), sans-serif' }}
                    >
                        About Me.
                    </h2>

                    {/* Bio paragraphs */}
                    <div className="flex flex-col gap-5 text-white/60 text-[15px] leading-relaxed" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
                        <p>
                            I am <span className="text-white/90 font-semibold">Ashwani Kumar</span>, a Full-Stack Web Developer specializing in the{' '}
                            <span className="text-[#00f0ff]/90">MERN stack</span> with a deep passion for crafting intuitive UI/UX experiences. Over the past 2+ years at Lovely Professional University, I have honed my skills by architecting and deploying custom websites for academic faculty and independent clients, successfully bridging the gap between aesthetic design and robust engineering.
                        </p>
                        <p>
                            While I am seeking my first formal industry role, my background in competitive programming fuels my analytical and competitive problem-solving approach. I am a quick learner and an active listener with proven leadership qualities. I am eager to collaborate with and learn from seasoned developers in a dynamic, product-driven environment.
                        </p>
                    </div>

                    {/* Stat counters */}
                    <div className="flex flex-wrap gap-10 mt-12 pt-10 border-t border-white/[0.08]">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                                className="flex flex-col gap-1"
                            >
                                <span
                                    className="text-2xl font-black tracking-tight"
                                    style={{
                                        color: '#00f0ff',
                                        textShadow: '0 0 20px rgba(0,240,255,0.5)',
                                        fontFamily: 'var(--font-syne), sans-serif',
                                    }}
                                >
                                    {stat.value}
                                </span>
                                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/35">
                                    {stat.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
