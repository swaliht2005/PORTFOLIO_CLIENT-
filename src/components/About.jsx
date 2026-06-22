import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ParticleBackground from './ParticleBackground';
import {
    FaPalette, 
    FaFigma, 
    FaReact, 
    FaCss3Alt, 
    FaWordpress,
    FaSitemap,
    FaSearch,
    FaProjectDiagram
} from 'react-icons/fa';

const MotionDiv = motion.div;

const About = () => {
    const shouldReduceMotion = useReducedMotion();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const skills = [
        { name: "UI/UX", icon: FaPalette },
        { name: "Figma", icon: FaFigma },
        { name: "Wireframing", icon: FaSitemap },
        { name: "Prototyping", icon: FaProjectDiagram },
        { name: "User Research", icon: FaSearch },
        { name: "React.js", icon: FaReact },
        { name: "Tailwind", icon: FaCss3Alt },
        { name: "WordPress", icon: FaWordpress }
    ];

    return (
        <section name="about" className="py-24 bg-[#050505] relative overflow-hidden">
            <ParticleBackground id="about-particles" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Watermark Section Header */}
                <div className="watermark-container mb-20">
                    <span className="watermark-bg">ABOUT</span>
                    <h2 className="watermark-fg">About Me</h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                    {/* Bio Column */}
                    <MotionDiv
                        layout
                        ref={ref}
                        initial={shouldReduceMotion ? false : { opacity: 0, x: -50 }}
                        animate={inView || shouldReduceMotion ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: shouldReduceMotion ? 0.01 : 0.6, delay: shouldReduceMotion ? 0 : 0.2 }}
                        className="motion-transform"
                    >
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 leading-normal">
                            UI/UX Designer Bridging <br />
                            <span className="text-[#ffbd39] filter drop-shadow-[0_0_10px_rgba(255,189,57,0.2)]">Design & Development</span>
                        </h3>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            I design user-first interfaces and build them with clean, responsive front-end code.
                            Combining UX thinking with development skills allows me to create products that look great,
                            work flawlessly, and deliver real value to users.
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Whether it's a web application, a mobile app, or a marketing site, I focus on aesthetics,
                            usability, and performance. Let's make something amazing together!
                        </p>
                    </MotionDiv>

                    {/* Toolkit Column (Hex Grid) */}
                    <MotionDiv
                        layout
                        initial={shouldReduceMotion ? false : { opacity: 0, x: 50 }}
                        animate={inView || shouldReduceMotion ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: shouldReduceMotion ? 0.01 : 0.6, delay: shouldReduceMotion ? 0 : 0.4 }}
                        className="motion-transform bg-white/[0.02] backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-white/5 hover:border-[#ffbd39]/10 transition-all duration-500 relative overflow-hidden"
                    >
                        {/* Subtle gold glow behind grid */}
                        <div className="absolute -right-12 -top-12 -z-10 bg-[#ffbd39]/5 w-40 h-40 rounded-full blur-[40px]"></div>

                        <h4 className="text-lg sm:text-xl font-bold text-white mb-10 text-center uppercase tracking-widest text-[#ffbd39]">
                            My Tech Toolkit
                        </h4>

                        <div className="hex-grid">
                            {skills.map((skill, index) => (
                                <div key={index} className="hex-item">
                                    <div className="hex-inner">
                                        <skill.icon size={28} />
                                        <span className="text-[10px] font-bold text-white uppercase tracking-wider text-center px-1">
                                            {skill.name}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </MotionDiv>
                </div>
            </div>
        </section>
    );
};

export default About;
