'use client';

import { useState, useRef } from 'react';
import { useScroll } from 'framer-motion';
import Preloader from '@/components/Preloader';
import ScrollCanvas from '@/components/ScrollCanvas';
import HeroSection from '@/components/sections/HeroSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectShowcase from '@/components/ProjectShowcase';
import MilestonesSection from '@/components/sections/MilestonesSection';
import ContactSection from '@/components/sections/ContactSection';
import CodingProfiles from '@/components/sections/CodingProfiles';
import AboutMe from '@/components/AboutMe';
import Education from '@/components/Education';
import Achievements from '@/components/Achievements';
import TypoLoop from '@/components/TypoLoop';

function MainContent() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <>
            {/* 1. Main Scrollytelling Wrapper */}
            <div ref={containerRef} className="relative w-full h-[400vh] bg-[#050505]">

                {/* 2. Sticky Canvas Background */}
                <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-0">
                    <ScrollCanvas scrollProgress={scrollYProgress} />
                </div>

                {/* 3. Hero Text Overlay */}
                <div className="absolute top-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-transparent z-10 pointer-events-none">
                    <HeroSection scrollProgress={scrollYProgress} />
                </div>
            </div>

            {/* 4. Subsequent Content Sections */}
            <div className="relative w-full bg-[#050505] z-20">
                <TypoLoop />
                <div id="services"><SkillsSection /></div>
                <div id="about"><AboutMe /></div>
                <div id="education"><Education /></div>
                <div id="profiles"><CodingProfiles /></div>
                <div id="work"><ProjectShowcase /></div>
                <div id="achievement"><Achievements /></div>
                <div id="certificates"><MilestonesSection /></div>
                <div id="contact"><ContactSection /></div>
            </div>
        </>
    );
}

export default function Home() {
    const [loading, setLoading] = useState(true);

    return (
        <main className="min-h-screen bg-transparent text-white selection:bg-neon-cyan/30 relative">
            {loading ? (
                <Preloader onComplete={() => setLoading(false)} />
            ) : (
                <MainContent />
            )}
        </main>
    );
}
