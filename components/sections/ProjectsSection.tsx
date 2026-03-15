'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
    {
        title: "orderSmartly",
        description: "A Blinkit-style interactive ordering platform for cafes with real-time sync, Super Admin dashboard, and dynamic menu cataloging.",
        tech: ["Next.js", "MongoDB", "Tailwind CSS", "Framer Motion"],
        github: "#",
        live: "#"
    },
    {
        title: "Neural Gen-AI Sandbox",
        description: "An AI experimentation environment integrating various LLMs, vision APIs, and custom RAG pipelines for advanced document analysis.",
        tech: ["Python", "React", "FastAPI", "OpenAI"],
        github: "#",
        live: "#"
    },
    {
        title: "Crypto Dashboard Pro",
        description: "Real-time cryptocurrency tracking dashboard with WebSockets, advanced charting, and localized fiat conversions.",
        tech: ["React.js", "Node.js", "Chart.js", "Express"],
        github: "#",
        live: "#"
    }
];

export default function ProjectsSection() {
    return (
        <section className="min-h-[150vh] w-full flex flex-col items-center justify-start relative px-6 py-20 pb-40">
            <div className="max-w-5xl w-full z-10 flex flex-col items-end pt-[30vh]">
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 text-right w-full"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-2 tracking-tighter text-glow">
                        INITIATIVE & ARCHITECTURE
                    </h2>
                    <p className="text-xl text-white/60 font-mono">
                        Collection of Works showcasing deep problem-solving.
                    </p>
                </motion.div>

                <div className="w-full flex flex-col gap-12">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            whileHover={{ x: -10 }}
                            className="glass-panel group p-8 rounded-2xl border-l-4 border-l-neon-cyan/50 hover:border-l-neon-cyan transition-all w-full relative overflow-hidden"
                        >
                            {/* Decorative circuit lines */}
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                                <svg width="100" height="100" viewBox="0 0 100 100">
                                    <path d="M10 10 L50 10 L80 40 L80 90" fill="none" stroke="#00f3ff" strokeWidth="2" />
                                    <circle cx="80" cy="90" r="4" fill="#00f3ff" />
                                </svg>
                            </div>

                            <div className="relative z-10 flex flex-col md:flex-row gap-6 justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="text-3xl font-bold mb-3 text-white/90">{project.title}</h3>
                                    <p className="text-white/60 mb-6 max-w-2xl leading-relaxed">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map(tech => (
                                            <span key={tech} className="px-3 py-1 bg-white/5 rounded-full text-xs font-mono border border-white/10 text-neon-cyan/70">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-row md:flex-col gap-4 mt-6 md:mt-0">
                                    <a href={project.github} className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-neon-cyan transition-colors border border-white/10">
                                        <Github size={20} />
                                    </a>
                                    <a href={project.live} className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-neon-crimson transition-colors border border-white/10">
                                        <ExternalLink size={20} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
