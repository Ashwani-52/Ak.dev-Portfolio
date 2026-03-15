'use client';

import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

// ─── Logo paths — served from /public root ────────────────────────────────────
const LOGO_CDN: Record<string, string> = {
    'AMD': '/amd1.svg',
    'Amazon Web Services (AWS)': '/aws.svg',
    'NPTEL': '/Nptel.png',
    'Anthropic': '/Anthropic.svg',
    'MongoDB': '/mongoDB.svg',
    'iamNeo': '/iamNeo.png',
    'freeCodeCamp': '/freecodecamp.svg',
};

const certificationsData = [
    {
        id: '01',
        title: 'AI Agents 101: Building AI Agents with MCP and Open-Source Inference',
        issuer: 'AMD',
        credentialUrl: 'https://academy.amd.com/certs/31042/81F1A3FB767B465D9C258B99B19BEE61166281.pdf',
    },
    {
        id: '02',
        title: 'Foundations of Prompt Engineering',
        issuer: 'Amazon Web Services (AWS)',
        credentialUrl: 'https://skillbuilder.aws/learn/63KTRM86DQ/amazon-bedrock-getting-started/SC2Y3HMAUE',
    },
    {
        id: '03',
        title: 'NPTEL Cloud Computing — IIT Kharagpur',
        issuer: 'NPTEL',
        credentialUrl: 'https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL25CS11S143730109604230845',
    },
    {
        id: '04',
        title: 'Claude Code in Action',
        issuer: 'Anthropic',
        credentialUrl: 'http://verify.skilljar.com/c/ya59x3mq75y3',
    },
    {
        id: '05',
        title: 'Building AI Agents with MongoDB',
        issuer: 'MongoDB',
        credentialUrl: 'https://www.credly.com/badges/21ae4643-1bf9-48e9-9e28-56e24ef7a793/linked_in_profile',
    },
    {
        id: '06',
        title: 'Programming in C# Certification',
        issuer: 'iamNeo',
        credentialUrl: undefined,
    },
    {
        id: '07',
        title: 'Responsive Web Design',
        issuer: 'freeCodeCamp',
        credentialUrl: 'https://freecodecamp.org/certification/fccad07ac21-9ffa-4184-9d42-683184d43861/responsive-web-design',
    },
];

// ─── Single cert card ─────────────────────────────────────────────────────────
function CertCard({ cert, index }: { cert: typeof certificationsData[0]; index: number }) {
    const logoSrc = LOGO_CDN[cert.issuer];

    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.5, delay: index * 0.07 }}
            whileHover={{ scale: 1.02, borderColor: 'rgba(0,240,255,0.4)' }}
            className="glass-panel p-5 flex items-start gap-5 rounded-xl border border-white/10 transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(0,240,255,0.08)]"
        >
            {/* Logo block */}
            <div
                className="flex-shrink-0 w-14 h-14 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center p-2"
                style={{ filter: 'drop-shadow(0 0 8px rgba(0,240,255,0.15))' }}
            >
                {logoSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={logoSrc}
                        alt={cert.issuer}
                        className="w-full h-full object-contain"
                    />
                ) : (
                    <span className="text-[10px] font-mono text-white/50 text-center leading-tight">
                        {cert.issuer.slice(0, 4)}
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase mb-1">
                    {cert.id}
                </span>
                <h3 className="text-sm font-semibold text-white/90 leading-snug mb-1">
                    {cert.title}
                </h3>
                <p className="text-xs text-white/45 font-mono mb-3" style={{ fontFamily: 'var(--font-jetbrains)' }}>
                    {cert.issuer}
                </p>
                {cert.credentialUrl ? (
                    <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] tracking-[0.2em] uppercase font-mono text-[#00f0ff]/70 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5 self-start"
                    >
                        Show Credential ↗
                    </a>
                ) : (
                    <span className="text-[10px] tracking-[0.18em] uppercase font-mono text-white/20">
                        Credential Pending
                    </span>
                )}
            </div>
        </motion.div>
    );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function MilestonesSection() {
    return (
        <section className="min-h-screen w-full flex flex-col items-center justify-center relative px-6 py-20">
            <div className="max-w-5xl w-full z-10">

                {/* Heading — PRESERVED */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-20%' }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-2 tracking-tighter text-glow">
                        MILESTONES &amp; CERTIFICATIONS
                    </h2>
                    <p className="text-xl text-white/60 font-mono">
                        A dynamic extension of my CV.
                    </p>
                </motion.div>


                {/* Certifications grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                    {certificationsData.map((cert, i) => (
                        <CertCard key={cert.id} cert={cert} index={i} />
                    ))}
                </div>

                {/* Download CV — PRESERVED */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <a
                        href="/Ashwani_Kumar_CV.pdf"
                        download="Ashwani_Kumar_CV.pdf"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-neon-cyan/10 border border-white/20 hover:border-neon-cyan rounded-full font-mono text-white/80 hover:text-neon-cyan transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,243,255,0.3)]"
                    >
                        <FileText size={18} />
                        [ DOWNLOAD CV_PDF ]
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
