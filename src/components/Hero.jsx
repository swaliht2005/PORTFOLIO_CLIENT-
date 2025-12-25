import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { initParticlesEngine, Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const Hero = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesOptions = {
        background: { color: { value: "transparent" } },
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: { enable: true, mode: "push" },
                onHover: { enable: true, mode: "repulse" },
                resize: true,
            },
            modes: {
                push: { quantity: 4 },
                repulse: { distance: 100, duration: 0.4 },
            },
        },
        particles: {
            color: { value: "#ffffff" },
            links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.3,
                width: 1,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: false,
                speed: 1,
                straight: false,
            },
            number: { density: { enable: true, area: 800 }, value: 80 },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
    };

    return (
        <section name="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#050510]">
          
            {/* Background Particles */}
            {init && (
                <div className="absolute inset-0 z-0">
                    <Particles
                        id="tsparticles"
                        options={particlesOptions}
                        className="h-full w-full"
                    />
                </div>
            )}

            {/* Gradient Blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-6 z-10 grid md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-xl md:text-2xl font-medium text-gray-300 mb-4">
                        Hello, I'm
                    </h2>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        Muhammed <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e94560] to-[#7f5eff]">Swalih</span>
                    </h1>
                    <h3 className="text-xl md:text-2xl text-gray-400 mb-8 max-w-lg">
                        UI/UX Designer & Front-End Developer | MERN Stack Developer
                    </h3>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-8 py-3 rounded-full text-white font-semibold overflow-hidden"
                    >
                        <Link to="/projects">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:scale-110"></div>
                        <span className="relative z-10">View My Works</span>
                        </Link>
                    </motion.button>
                </motion.div>

                {/* Hero Illustration/Image Placeholder */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="hidden md:block relative"
                >
                    {/* You can add a 3D spline or personal image here. For now keeping it cleaner per layout */}
                    <div className="relative w-full h-[500px] flex justify-center items-center">
                        {/* Abstract visuals */}
                        <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
                        <div className="absolute inset-4 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
