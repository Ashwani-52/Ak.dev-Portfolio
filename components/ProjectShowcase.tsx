'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// ─── Tech logo map via devicons ───────────────────────────────────────────────
const TECH_LOGOS: Record<string, string> = {
    'React.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'Express': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    'TailwindCSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    'Html': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    'css': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    'Javascript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'php': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    'Mongodb': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
};

// ─── GitHub SVG icon ──────────────────────────────────────────────────────────
function GithubIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
    );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const projectShowcaseData = [
    {
        id: '01',
        title: 'Restroon',
        description: 'A full-stack digital platform connecting local cafés and vendors with their customers. Features real-time order sync, Super Admin dashboard, dynamic menu cataloging, and UPI payment integration.',
        techList: ['React.js', 'Node.js', 'MongoDB', 'Express', 'TailwindCSS'],
        images: [
            '/projects/Restroon01.png',
            '/projects/Restroon1.png',
            '/projects/Restroon9.png',
            '/projects/Restroon6.png',
            '/projects/Restroon2.png',
            '/projects/Restroon3.png',
            '/projects/Restroon12.png',
            '/projects/Restroon15.png',
            '/projects/Restroon14.png',
        ],
        githubLink: 'https://github.com/Ashwani-52/Restroon',
    },
    {
        id: '02',
        title: 'PriceMate',
        description: 'A smart price comparison platform that aggregates product prices from multiple online retailers, enabling users to find the best deals instantly with intelligent search and filtering.',
        techList: ['React.js', 'Node.js', 'MongoDB', 'Express', 'TailwindCSS'],
        images: [
            '/projects/Pricemate.png',
            '/projects/Pricemate1.png',
            '/projects/Pricemate2.png',
            '/projects/Pricemate3.png',
            '/projects/Pricemate4.png',
            '/projects/Pricemate5.png',
        ],
        githubLink: 'https://github.com/Ashwani-52/PriceMate-Smart-Price-Comparison-Platform/tree/master',
    },
    {
        id: '03',
        title: 'Naachoo',
        description: 'A comprehensive dance studio management platform featuring class scheduling, student enrollment, batch management, and an instructor portal with dynamic content management.',
        techList: ['Html', 'css', 'Javascript', 'php', 'TailwindCSS', 'Mongodb'],
        images: [
            '/projects/Nachoo.png',
            '/projects/Nachoo2.png',
            '/projects/Nachoo3.png',
            '/projects/Nachoo4.png',
            '/projects/Nachoo5.png',
        ],
        githubLink: 'https://github.com/BIBEKRAJ12322567/NAACHOO-DANCE-STUDIO',
    },
];

// ─── Slideshow Sub-Component ──────────────────────────────────────────────────
function ProjectSlideshow({ images, title }: { images: string[]; title: string }) {
    const [current, setCurrent] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const next = useCallback(() => setCurrent(c => (c + 1) % images.length), [images.length]);
    const prev = () => setCurrent(c => (c - 1 + images.length) % images.length);

    // Reset to 0 and track visibility with IntersectionObserver
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setCurrent(0); // always restart from first image
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Only advance while visible and not hovered
    useEffect(() => {
        if (!isVisible || isHovered) return;
        const timer = setInterval(next, 3500);
        return () => clearInterval(timer);
    }, [isVisible, isHovered, next]);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full min-h-[380px] rounded-2xl overflow-hidden group bg-[#0d0d0d]"
            style={{ border: '1px solid rgba(0, 240, 255, 0.15)', boxShadow: '0 0 40px rgba(0,240,255,0.06), 0 0 60px rgba(255,0,60,0.04)' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image crossfade */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className="absolute inset-0"
                >
                    <Image
                        src={images[current]}
                        alt={`${title} screenshot ${current + 1}`}
                        fill
                        className="object-contain"
                        unoptimized
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Prev / Next arrows — only visible on hover */}
            <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100 z-10"
            >
                ‹
            </button>
            <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100 z-10"
            >
                ›
            </button>

            {/* Pagination dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`rounded-full transition-all duration-300 ${i === current ? 'w-5 h-1.5 bg-[#00f0ff]' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'}`}
                    />
                ))}
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ProjectShowcase() {
    return (
        <section className="w-full bg-[#050505] py-24 px-6">
            <div className="max-w-6xl mx-auto">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-20 flex flex-col items-start"
                >
                    <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-neon-cyan/60 mb-4">Selected Work</span>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight text-glow" style={{ fontFamily: 'var(--font-syne), sans-serif' }}>
                        INITIATIVE &<br className="hidden md:block" /> ARCHITECTURE
                    </h2>
                    <div className="w-16 h-[2px] bg-gradient-to-r from-neon-cyan to-neon-crimson mt-6" />
                </motion.div>

                {/* Project Cards */}
                <div className="flex flex-col gap-32">
                    {projectShowcaseData.map((project, idx) => (
                        <motion.div
                            key={project.id + project.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-10%' }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}
                        >
                            {/* Left: Slideshow */}
                            <div className="w-full aspect-video lg:aspect-auto lg:h-[420px]">
                                <ProjectSlideshow images={project.images} title={project.title} />
                            </div>

                            {/* Right: Details */}
                            <div className="flex flex-col justify-center gap-6">
                                {/* Counter */}
                                <span className="text-[11px] font-mono tracking-[0.35em] text-white/30 uppercase">
                                    {project.id} / 0{projectShowcaseData.length}
                                </span>

                                {/* Title */}
                                <h3
                                    className="text-4xl md:text-5xl font-black tracking-tight text-white leading-none"
                                    style={{ fontFamily: 'var(--font-syne), sans-serif' }}
                                >
                                    {project.title}
                                </h3>

                                {/* Description */}
                                <p className="text-white/55 text-sm leading-relaxed max-w-md" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
                                    {project.description}
                                </p>

                                {/* Tech Stack Logos */}
                                <div className="flex flex-wrap items-center gap-3 mt-2">
                                    {project.techList.map((tech) => (
                                        <motion.div
                                            key={tech}
                                            whileHover={{ scale: 1.15, y: -2 }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                            className="group relative flex flex-col items-center gap-1"
                                            title={tech}
                                        >
                                            <div className="w-9 h-9 p-2 rounded-lg bg-white/5 border border-white/10 hover:border-neon-cyan/40 transition-all duration-300 hover:shadow-[0_0_12px_rgba(0,240,255,0.25)]">
                                                {TECH_LOGOS[tech] ? (
                                                    <Image
                                                        src={TECH_LOGOS[tech]}
                                                        alt={tech}
                                                        width={20}
                                                        height={20}
                                                        className="w-full h-full object-contain"
                                                        unoptimized
                                                    />
                                                ) : (
                                                    <span className="text-[9px] font-mono text-white/60">{tech.slice(0, 2)}</span>
                                                )}
                                            </div>
                                            {/* Tooltip */}
                                            <span className="absolute -bottom-6 text-[9px] font-mono text-white/40 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                {tech}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* GitHub CTA */}
                                <motion.a
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="mt-4 self-start group relative inline-flex items-center gap-3 px-6 py-3 border border-white/15 rounded-lg text-sm font-mono tracking-wider text-white/70 hover:text-white hover:border-neon-cyan/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-300 overflow-hidden"
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-400 ease-out" />
                                    <GithubIcon className="w-4 h-4 relative z-10" />
                                    <span className="relative z-10 uppercase tracking-[0.15em]">View Source Code</span>
                                </motion.a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
