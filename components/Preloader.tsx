'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);
    const [text, setText] = useState('INITIALIZING SECURE CONNECTION...');

    useEffect(() => {
        const sequences = [
            { p: 15, t: 'ESTABLISHING NEURAL LINK...' },
            { p: 35, t: 'BYPASSING FIREWALLS...' },
            { p: 65, t: 'DECRYPTING ASSETS...' },
            { p: 85, t: 'COMPILING ARCHITECTURE...' },
            { p: 100, t: 'ACCESS GRANTED' }
        ];

        const interval = setInterval(() => {
            setProgress(prev => {
                const next = prev + 1;

                const activeSequence = sequences.find(s => next >= s.p && prev < s.p);
                if (activeSequence) {
                    setText(activeSequence.t);
                }

                if (next >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 800);
                    return 100;
                }
                return next;
            });
        }, 30);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="fixed inset-0 z-[100] flex flex-col items-center justify-center text-white font-mono"
                style={{ backgroundColor: '#050505' }}
            >
                <div className="w-full max-w-md px-6">
                    <div className="mb-4 flex justify-between items-end">
                        <span className="text-neon-cyan text-sm sm:text-base text-glow animate-pulse">
                            [ {text} ]
                        </span>
                        <span className="text-neon-crimson text-glow">{progress}%</span>
                    </div>

                    <div className="h-1 w-full bg-white/10 rounded overflow-hidden">
                        <motion.div
                            className="h-full bg-neon-cyan"
                            style={{ width: `${progress}%` }}
                            layout
                        />
                    </div>

                    <div className="mt-8 text-xs text-white/40 flex flex-col gap-1">
                        <p>{'>'} sys.load_module(&quot;core_engine&quot;)</p>
                        {progress > 30 && <p>{'>'} sys.load_module(&quot;ui_components&quot;)</p>}
                        {progress > 60 && <p className="text-neon-cyan/50">{'>'} OK: All systems operational</p>}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
