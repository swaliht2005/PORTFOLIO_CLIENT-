import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import swalihProfile from '../assets/swalih_profile.jpg';
import ModernProfileCard from './ModernProfileCard';
import ParticleBackground from './ParticleBackground';

const Hero = () => {


    return (
        <section name="home" className="relative min-h-screen w-full flex items-center justify-center py-20 md:py-0 overflow-hidden bg-black">

            <ParticleBackground id="hero-particles" />



            <div className="container mx-auto px-6 z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center md:text-left flex flex-col items-center md:items-start order-1"
                >
                    <h2 className="text-lg md:text-2xl font-medium text-gray-300 mb-2 md:mb-4">
                        Hello, I'm
                    </h2>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
                        Muhammed <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e94560] to-[#7f5eff]">Swalih</span>
                    </h1>
                    <h3 className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-6 md:mb-8 max-w-lg mx-auto md:mx-0">
                        UI/UX Designer & Front-End Developer | MERN Stack Developer
                    </h3>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-8 py-3 rounded-full text-white font-semibold overflow-hidden w-fit"
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
                    className="relative order-2 w-full flex justify-center"
                >
                    {/* You can add a 3D spline or personal image here. For now keeping it cleaner per layout */}
                    {/* Profile Image with animated rings */}
                    <div className="relative w-full max-w-[90%] md:max-w-full h-[450px] md:h-[600px] flex justify-center items-center">
                        <ModernProfileCard image={swalihProfile} />

                        {/* Floating gradients around image for depth */}
                        <div className="absolute -z-10 bg-gradient-to-tr from-purple-600/40 to-blue-600/40 w-[300px] h-[300px] rounded-full blur-3xl"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
