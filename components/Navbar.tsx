'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsMenuOpen(false);
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (!mounted) return null;

    return (
        <>
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="fixed top-0 left-0 w-full z-[9990] px-6 md:px-8 py-5"
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

                    {/* Center Links (Desktop) */}
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

                    <div className="flex items-center gap-6">
                        {/* CV Download Pill (Hidden on mobile to save space, or kept small) */}
                        <a
                            href="/Ashwani_Kumar_CV.pdf"
                            download="Ashwani_Kumar_CV.pdf"
                            className="text-[10px] md:text-[11px] font-semibold tracking-[0.18em] uppercase border border-white/20 px-3 md:px-4 py-1.5 md:py-2 rounded-md text-white/70 hover:bg-white hover:text-black transition-all duration-300"
                            style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                        >
                            CV
                        </a>

                        {/* Hamburger Menu Toggle (Mobile Only) */}
                        <button
                            className="md:hidden text-white/70 hover:text-white transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[9980] bg-[#050505]/95 backdrop-blur-xl pt-24 px-8 md:hidden"
                    >
                        <div className="flex flex-col gap-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={(e) => handleScroll(e, link.href)}
                                    className="text-2xl font-bold tracking-[0.1em] uppercase text-white/40 hover:text-white transition-colors duration-300"
                                    style={{ fontFamily: 'var(--font-syne), sans-serif' }}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
