import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ParticleBackground from './ParticleBackground';

const About = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const skills = [
        "UI/UX Design", "Figma", "React.js", "Tailwind CSS",
        "Node.js", "Express.js", "MongoDB", "WordPress"
    ];

    return (
        <section name="about" className="py-24 bg-[#050510] relative overflow-hidden">
            <ParticleBackground id="about-particles" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">About Me</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="text-3xl font-bold text-white mb-6 leading-relaxed">
                            UI/UX Designer Bridging <br />
                            <span className="text-[#7f5eff]">Design & Development</span>
                        </h3>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            I design user-first interfaces and build them with clean, responsive front-end code.
                            Combining UX thinking with development skills allows me to create products that look great,
                            work flawlessly, and deliver real value to users.
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Whether it's a web application, a mobile app, or a marketing site, I focus on aesthetics,
                            usability, and performance.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
                    >
                        <h4 className="text-xl font-bold text-white mb-6">My Toolkit</h4>
                        <div className="flex flex-wrap gap-3">
                            {skills.map((skill, index) => (
                                <span
                                    key={skill}
                                    className="px-4 py-2 bg-[#1a1a2e] text-gray-300 rounded-lg text-sm font-medium border border-white/5 hover:border-[#7f5eff] hover:text-[#7f5eff] transition-colors cursor-default"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
