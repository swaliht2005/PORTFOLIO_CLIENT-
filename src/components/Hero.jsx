import { motion, useReducedMotion } from 'framer-motion';
<<<<<<< HEAD
import { Link as ScrollLink } from 'react-scroll';
=======
import { Link } from 'react-scroll';
>>>>>>> origin/main
import { useEffect, useState } from 'react';
import swalihProfile from '../assets/swalih_profile.jpg';
import ModernProfileCard from './ModernProfileCard';
import ParticleBackground from './ParticleBackground';
import { Sparkles, Code2, Paintbrush, Cpu, Layout, Download } from 'lucide-react';

const ROLES = ["UI/UX Designer", "Front-End Developer", "Web Developer"];
const MotionDiv = motion.div;
const MotionButton = motion.button;

const Hero = () => {
    const shouldReduceMotion = useReducedMotion();
    // Custom typing text animation loop
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        if (shouldReduceMotion) {
            return undefined;
        }

        let timer;
        const role = ROLES[currentRoleIndex];
        const typingSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && currentText === role) {
            timer = setTimeout(() => setIsDeleting(true), 1500); // Wait before deleting
        } else if (isDeleting && currentText === "") {
            timer = setTimeout(() => {
                setIsDeleting(false);
                setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
            }, typingSpeed);
        } else {
            timer = setTimeout(() => {
                setCurrentText(
                    isDeleting
                        ? role.substring(0, currentText.length - 1)
                        : role.substring(0, currentText.length + 1)
                );
            }, typingSpeed);
        }

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentRoleIndex, shouldReduceMotion]);

    const fadeInLeft = shouldReduceMotion
        ? { initial: false, animate: { opacity: 1, x: 0 }, transition: { duration: 0.01 } }
        : { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8 } };

    const fadeInScale = shouldReduceMotion
        ? { initial: false, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.01 } }
        : { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.8, delay: 0.2 } };

    return (
        <section name="home" className="relative min-h-screen w-full flex items-center justify-center py-20 md:py-0 overflow-hidden bg-[#050505]">
            <ParticleBackground id="hero-particles" />

            {/* Glowing background highlights */}
            <div className="absolute top-1/4 left-1/4 -z-10 bg-gradient-to-tr from-[#ffbd39]/15 to-transparent w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-6 z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
<<<<<<< HEAD
                <motion.div
                    initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center md:text-left flex flex-col items-center md:items-start order-1"
=======
                <MotionDiv
                    layout
                    {...fadeInLeft}
                    className="motion-transform text-center md:text-left flex flex-col items-center md:items-start order-1"
>>>>>>> origin/main
                >
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#ffbd39] text-xs font-semibold uppercase tracking-wider mb-6">
                        <Sparkles size={12} className="animate-pulse" />
                        Available for Freelance
                    </div>

                    <h2 className="text-lg md:text-2xl font-medium text-gray-400 mb-2 md:mb-4">
                        Hello, I'm
                    </h2>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight tracking-tight">
                        Muhammed <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffbd39] via-amber-300 to-white filter drop-shadow-[0_0_20px_rgba(255,189,57,0.3)]">
                            Swalih
                        </span>
                    </h1>

                    <div className="h-8 mb-8">
                        <h3 className="text-lg sm:text-xl md:text-2xl text-gray-300 font-medium max-w-lg mx-auto md:mx-0" aria-label={`I am a ${ROLES.join(', ')}`}>
                            <span aria-hidden="true">I am a </span>
                            <span aria-hidden="true" className="text-[#ffbd39] border-r-2 border-[#ffbd39] pr-1.5 motion-safe:animate-pulse font-semibold">{shouldReduceMotion ? ROLES[0] : currentText}</span>
                            <span className="sr-only">I am a {ROLES.join(', ')}.</span>
                        </h3>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                        <MotionButton
                            layout
                            whileHover={shouldReduceMotion ? undefined : { scale: 1.05, y: -3 }}
                            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                            className="motion-transform group relative px-8 py-3.5 rounded-full text-black font-bold text-sm tracking-widest uppercase overflow-hidden w-full sm:w-auto shadow-[0_0_20px_rgba(255,189,57,0.3)] hover:shadow-[0_0_30px_rgba(255,189,57,0.6)] transition-all duration-300"
                        >
                            <ScrollLink to="projects" smooth={true} duration={500} offset={-80} className="cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#ffbd39] to-amber-400 transition-all duration-300"></div>
                                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/40 opacity-40 group-hover:animate-shine" />
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    View My Works <Code2 size={16} />
                                </span>
<<<<<<< HEAD
                            </ScrollLink>
                        </motion.button>
=======
                            </Link>
                        </MotionButton>
>>>>>>> origin/main

                        <a
                            href="/SwalihRessume.pdf"
                            download
                            className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-[#111111] border border-white/10 text-white font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:bg-white/5 hover:text-[#ffbd39] shadow-[0_0_15px_rgba(0,0,0,0.2)] w-full sm:w-auto"
                        >
                            <Download size={18} className="text-[#ffbd39]" />
                            Download Resume
                        </a>
                    </div>
                </MotionDiv>

                {/* Hero Illustration/Image with Floating Badges */}
<<<<<<< HEAD
                <motion.div
                    initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative order-2 w-full flex justify-center"
=======
                <MotionDiv
                    layout
                    {...fadeInScale}
                    className="motion-transform relative order-2 w-full flex justify-center"
>>>>>>> origin/main
                >
                    <div className="relative w-full max-w-[90%] md:max-w-full h-[450px] md:h-[600px] flex justify-center items-center">
                        <ModernProfileCard image={swalihProfile} />

                        {/* Floating gradients around image for depth */}
                        <div className="absolute -z-10 bg-gradient-to-tr from-[#ffbd39]/20 to-amber-500/10 w-[300px] h-[300px] rounded-full blur-3xl"></div>

                        {/* Floating Badge 1: Figma/Design */}
<<<<<<< HEAD
                        <motion.div
                            animate={shouldReduceMotion ? {} : { y: [0, -15, 0] }}
=======
                        <MotionDiv
                            layout
                            animate={shouldReduceMotion ? undefined : { y: [0, -15, 0] }}
>>>>>>> origin/main
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="motion-transform absolute top-16 left-4 md:left-8 bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-2xl flex items-center gap-3 shadow-2xl hover:border-[#ffbd39]/50 transition-colors"
                            aria-hidden="true"
                        >
                            <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-[#ffbd39]">
                                <Paintbrush size={20} />
                            </div>
                            <div className="text-left">
                                <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider">Expertise</span>
                                <span className="text-xs font-bold text-white">UI/UX Design</span>
                            </div>
                        </MotionDiv>

                        {/* Floating Badge 2: Frontend/React */}
<<<<<<< HEAD
                        <motion.div
                            animate={shouldReduceMotion ? {} : { y: [0, 15, 0] }}
=======
                        <MotionDiv
                            layout
                            animate={shouldReduceMotion ? undefined : { y: [0, 15, 0] }}
>>>>>>> origin/main
                            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
                            className="motion-transform absolute bottom-20 right-4 md:right-8 bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-2xl flex items-center gap-3 shadow-2xl hover:border-[#ffbd39]/50 transition-colors"
                            aria-hidden="true"
                        >
                            <div className="w-10 h-10 rounded-xl bg-[#ffbd39]/15 flex items-center justify-center text-[#ffbd39]">
                                <Layout size={20} />
                            </div>
                            <div className="text-left">
                                <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider">Development</span>
                                <span className="text-xs font-bold text-white">React & Tailwind</span>
                            </div>
                        </MotionDiv>

                        {/* Floating Badge 3: Tech Stack */}
<<<<<<< HEAD
                        <motion.div
                            animate={shouldReduceMotion ? {} : { x: [0, 12, 0] }}
=======
                        <MotionDiv
                            layout
                            animate={shouldReduceMotion ? undefined : { x: [0, 12, 0] }}
>>>>>>> origin/main
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.2 }}
                            className="motion-transform absolute top-1/2 -right-2 bg-black/40 backdrop-blur-md border border-white/10 w-12 h-12 rounded-full flex items-center justify-center text-[#ffbd39] shadow-2xl hover:border-[#ffbd39]/50 transition-colors"
                            aria-hidden="true"
                        >
                            <Cpu size={20} />
                        </MotionDiv>
                    </div>
                </MotionDiv>
            </div>
        </section>
    );
};

export default Hero;
