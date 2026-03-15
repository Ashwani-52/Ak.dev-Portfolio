'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Send, Terminal, Mail, Phone, MapPin } from 'lucide-react';

export default function ContactSection() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <section className="min-h-screen w-full flex flex-col items-center justify-center relative px-6 py-20 pb-0">
            <div className="max-w-4xl w-full z-10 flex flex-col pt-[10vh]">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-2 tracking-tighter text-glow">
                        INITIATE CONNECTION
                    </h2>
                    <p className="text-xl text-white/60 font-mono">
                        Drop a direct message. Establish a link.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 w-full">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-3 glass-panel p-8 rounded-2xl border border-white/10 relative overflow-hidden"
                    >
                        {status === 'success' && (
                            <div className="absolute inset-0 bg-[#050505]/95 z-20 flex flex-col items-center justify-center font-mono text-neon-cyan">
                                <Terminal size={48} className="mb-4" />
                                <p>TRANSMISSION SUCCESSFUL</p>
                                <button onClick={() => setStatus('idle')} className="mt-6 px-6 py-2 border border-neon-cyan/50 hover:bg-neon-cyan/10 rounded">
                                    SEND ANOTHER
                                </button>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div>
                                <label className="block text-xs font-mono text-white/50 mb-2 uppercase">Your Designation [Name]</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded p-4 text-white focus:outline-none focus:border-neon-cyan transition-colors font-mono"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-white/50 mb-2 uppercase">Return Address [Email]</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded p-4 text-white focus:outline-none focus:border-neon-cyan transition-colors font-mono"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-white/50 mb-2 uppercase">Encrypted Payload [Message]</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded p-4 text-white focus:outline-none focus:border-neon-cyan transition-colors font-mono resize-none"
                                    placeholder="Type your message here..."
                                ></textarea>
                            </div>

                            <button
                                disabled={status === 'loading'}
                                className="w-full mt-2 bg-white/5 hover:bg-neon-cyan/20 border border-white/20 hover:border-neon-cyan flex items-center justify-center gap-2 p-4 rounded font-mono text-white uppercase tracking-widest transition-all group disabled:opacity-50"
                            >
                                {status === 'loading' ? 'Encrypting...' : 'Transmit Data'}
                                <Send size={18} className="group-hover:text-neon-cyan group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </motion.div>

                    {/* Social Links & Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 flex flex-col gap-6"
                    >
                        {/* Direct Contact Info */}
                        <div className="glass-panel p-8 rounded-2xl border border-white/10 flex flex-col gap-6 relative overflow-hidden">
                            <h3 className="text-lg font-bold text-white font-mono mb-2">Direct Contact</h3>

                            <a href="mailto:ashwanikumar6064@gmail.com" className="flex items-start gap-4 group">
                                <div className="p-3 bg-white/5 rounded-full text-white/60 group-hover:text-neon-cyan group-hover:bg-neon-cyan/10 transition-colors">
                                    <Mail size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-mono text-white/40 uppercase">Email</span>
                                    <span className="text-sm text-white/80 group-hover:text-neon-cyan transition-colors mt-1 hover:underline">ashwanikumar6064@gmail.com</span>
                                </div>
                            </a>

                            <a href="tel:+916205106008" className="flex items-start gap-4 group">
                                <div className="p-3 bg-white/5 rounded-full text-white/60 group-hover:text-neon-cyan group-hover:bg-neon-cyan/10 transition-colors">
                                    <Phone size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-mono text-white/40 uppercase">Phone</span>
                                    <span className="text-sm text-white/80 group-hover:text-neon-cyan transition-colors mt-1 hover:underline">+91 6205106008</span>
                                </div>
                            </a>

                            <div className="flex items-start gap-4 group cursor-default">
                                <div className="p-3 bg-white/5 rounded-full text-white/60 group-hover:text-neon-cyan group-hover:bg-neon-cyan/10 transition-colors">
                                    <MapPin size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-mono text-white/40 uppercase">Location</span>
                                    <span className="text-sm text-white/80 mt-1 leading-relaxed">Saurabh Vihar, Badarpur<br />New Delhi - 110044</span>
                                </div>
                            </div>
                        </div>

                        {/* Social Links Row */}
                        <div className="grid grid-cols-2 gap-6">
                            <a href="https://github.com/Ashwani-52" target="_blank" rel="noopener noreferrer"
                                className="glass-panel group p-6 rounded-2xl border border-white/10 hover:border-neon-cyan transition-all flex flex-col items-center justify-center gap-3 relative overflow-hidden">
                                <div className="absolute inset-0 bg-neon-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <Github size={32} className="text-white/80 group-hover:text-neon-cyan transition-colors" />
                                <span className="text-sm font-bold text-white font-mono">GitHub</span>
                            </a>

                            <a href="https://www.linkedin.com/in/ashwani-kumar-a4710b297/" target="_blank" rel="noopener noreferrer"
                                className="glass-panel group p-6 rounded-2xl border border-white/10 hover:border-neon-crimson transition-all flex flex-col items-center justify-center gap-3 relative overflow-hidden">
                                <div className="absolute inset-0 bg-neon-crimson/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <Linkedin size={32} className="text-white/80 group-hover:text-neon-crimson transition-colors" />
                                <span className="text-sm font-bold text-white font-mono">LinkedIn</span>
                            </a>
                        </div>
                    </motion.div>
                </div>

                <footer className="w-full mt-32 pb-8 flex justify-between items-center text-xs font-mono text-white/30 border-t border-white/10 pt-8">
                    <p>© {new Date().getFullYear()} Ashwani Kumar. All rights reserved.</p>
                    <p className="text-white/20">Built with Next.js 14 + Framer Motion</p>
                </footer>
            </div>

            {/* Back to Top Vertical Button */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-6 z-20">
                <div className="w-[1px] h-24 bg-gradient-to-b from-transparent to-white/20" />
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-xs font-semibold tracking-[0.4em] uppercase text-white/40 hover:text-neon-cyan transition-all duration-300 hover:-translate-y-2 flex flex-col items-center gap-4"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                    Back To Top
                    <span className="text-lg">↑</span>
                </button>
            </div>
        </section>
    );
}
