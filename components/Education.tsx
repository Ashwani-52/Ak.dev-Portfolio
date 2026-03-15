'use client';

import { motion } from 'framer-motion';

const educationData = [
    {
        id: 1,
        role: "B.Tech in Computer Science",
        institution: "Lovely Professional University (LPU)",
        status: "Pursuing (Ongoing)",
        location: "Jalandhar, Punjab 144411",
        highlight: true
    },
    {
        id: 2,
        role: "12th Standard (Senior Secondary)",
        institution: "Cambridge School",
        status: "Passed • 69%",
        location: "Nalanda, Bihar 803119",
        highlight: false
    },
    {
        id: 3,
        role: "10th Standard (Secondary)",
        institution: "Nalanda Vidya Mandir",
        status: "Passed • 73%",
        location: "Patasang, Bihar 803119",
        highlight: false
    }
];

export default function Education() {
    return (
        <section id="education" className="w-full py-24 px-6 relative z-20 bg-[#050505] flex flex-col items-center justify-center">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <h2 className="text-white/90 text-4xl md:text-5xl font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-syne), sans-serif' }}>
                    ACADEMIC TIMELINE
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-crimson mx-auto mt-6 rounded-full" />
            </motion.div>

            <div className="w-full max-w-4xl relative">
                {/* Vertical Timeline Line */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00f0ff] via-[#ff003c] to-transparent opacity-30 transform md:-translate-x-1/2 rounded-full" />

                <div className="flex flex-col gap-12">
                    {educationData.map((edu, index) => (
                        <motion.div
                            key={edu.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-10%' }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className={`relative flex flex-col md:flex-row items-center justify-between w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                }`}
                        >
                            {/* Empty space for alternating layout on desktop */}
                            <div className="hidden md:block w-5/12" />

                            {/* Node on the timeline */}
                            <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#050505] border-[3px] border-neon-cyan z-10" style={edu.highlight ? { boxShadow: '0 0 15px #00f0ff' } : { borderColor: 'rgba(255,255,255,0.3)' }} />

                            {/* Card Content */}
                            <motion.div
                                whileHover={{ scale: 1.02, x: index % 2 === 0 ? -10 : 10 }}
                                className={`w-[85%] ml-auto md:ml-0 md:w-5/12 glass-panel p-6 rounded-xl border ${edu.highlight ? 'border-neon-cyan/50 shadow-[0_0_20px_rgba(0,240,255,0.1)]' : 'border-white/10'} backdrop-blur-md relative overflow-hidden group transition-all`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <h3 className="text-xl font-bold text-white relative z-10" style={{ fontFamily: 'var(--font-syne), sans-serif' }}>
                                    {edu.role}
                                </h3>

                                <p className="text-base text-white/80 mt-1 relative z-10">
                                    {edu.institution}
                                </p>

                                <div className="flex items-center gap-2 mt-3 relative z-10">
                                    {edu.highlight ? (
                                        <>
                                            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                                            <span className="text-sm font-mono text-neon-cyan/90 tracking-wide uppercase">
                                                {edu.status}
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                                            <span className="text-sm font-mono text-white/60 tracking-wide">
                                                {edu.status}
                                            </span>
                                        </>
                                    )}
                                </div>

                                <p className="text-xs tracking-widest uppercase text-white/40 mt-5 font-mono relative z-10">
                                    {edu.location}
                                </p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>

        </section>
    );
}
