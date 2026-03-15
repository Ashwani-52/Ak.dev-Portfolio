'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (!mounted) return null;

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="fixed top-0 left-0 w-full z-[9990] px-8 py-5"
            style={{
                background: 'linear-gradient(to bottom, rgba(5,5,5,0.6) 0%, transparent 100%)',
                backdropFilter: 'blur(4px)',
            }}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* Logo / Wordmark */}
                <span
                    className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/50"
                    style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
                >
                    AK.DEV
                </span>

                {/* Center Links */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={(e) => handleScroll(e, link.href)}
                            className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors duration-300"
                            style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* CV Download Pill */}
                <a
                    href="/Ashwani_Kumar_CV.pdf"
                    download="Ashwani_Kumar_CV.pdf"
                    className="text-[11px] font-semibold tracking-[0.18em] uppercase border border-white/20 px-4 py-2 rounded-md text-white/70 hover:bg-white hover:text-black transition-all duration-300"
                    style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                >
                    CV
                </a>
            </div>
        </motion.nav>
    );
}
