import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ParticleCard } from './MagicBento';
import { useRef } from 'react';
import ParticleBackground from './ParticleBackground';
import Magnetic from './Magnetic';

const MotionDiv = motion.div;

const ProjectCard = ({ project, index }) => {
    const shouldReduceMotion = useReducedMotion();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <MotionDiv
            layout
            ref={ref}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 50 }}
            animate={inView || shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.5, delay: shouldReduceMotion ? 0 : index * 0.1 }}
            className="motion-transform h-full"
        >
            <ParticleCard
                className="group relative bg-[#0e0e0e] rounded-xl overflow-hidden border border-white/5 hover:border-[#ffbd39]/50 transition-all duration-300 flex flex-col h-full shine-effect"
                disableAnimations={shouldReduceMotion}
                enableStars={!shouldReduceMotion}
                enableTilt={!shouldReduceMotion}
                enableMagnetism={!shouldReduceMotion}
                clickEffect={!shouldReduceMotion}
                glowColor="255, 189, 57" // Gold theme RGB
            >
                {/* Image Container */}
                <Link to={`/project/${project.id}`} className="block h-56 overflow-hidden relative cursor-pointer flex-shrink-0">
                    {/* Overlay for depth */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors z-10" />
                    <img
                        src={project.thumbnailUrl || project.imageUrl}
                        alt={project.title}
                        loading={index > 1 ? 'lazy' : 'eager'}
                        decoding="async"
                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                    />
                </Link>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col relative z-20 bg-[#0e0e0e]/90 backdrop-blur-sm">
                    <Link to={`/project/${project.id}`} className="block">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#ffbd39] transition-colors">{project.title}</h3>
                    </Link>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, i) => (
                            <span key={i} className="text-xs text-[#ffbd39] bg-[#ffbd39]/10 px-2.5 py-1 rounded-md font-medium border border-[#ffbd39]/10">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Description (stripped html) */}
                    <Link to={`/project/${project.id}`} className="block mb-6 flex-1">
                        <p className="text-gray-400 text-sm line-clamp-3 hover:text-gray-300 transition-colors leading-relaxed">
                            {project.description ? project.description.replace(/<[^>]+>/g, '') : 'No description available.'}
                        </p>
                    </Link>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                        <div className="flex gap-4">
                            {project.liveLink && (
                                <a href={project.liveLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-[#ffbd39] transition-colors" title="Live Demo" aria-label={`Open live demo for ${project.title}`}>
                                    <FaExternalLinkAlt size={14} />
                                </a>
                            )}
                            {project.repoLink && (
                                <a href={project.repoLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-[#ffbd39] transition-colors" title="View Code" aria-label={`View code for ${project.title}`}>
                                    <FaGithub size={16} />
                                </a>
                            )}
                        </div>

                        <Link to={`/project/${project.id}`} className="flex items-center gap-1 text-sm font-bold text-[#ffbd39] hover:text-white transition-colors group-hover:translate-x-1 duration-300">
                            Details <FaArrowRight size={12} />
                        </Link>
                    </div>
                </div>
            </ParticleCard>
        </MotionDiv>
    );
};

const Projects = ({ projects, showViewMore = false }) => {
    const gridRef = useRef(null);

    return (
        <section name="projects" className="py-24 bg-[#050505] relative overflow-hidden">
            <ParticleBackground id="projects-particles" />

            {/* Header */}
            <div className="watermark-container mb-20 relative z-10">
                <span className="watermark-bg">PORTFOLIO</span>
                <h2 className="watermark-fg">Featured Projects</h2>
            </div>

            {/* Grid */}
            <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto card-grid relative z-10 px-6">
                {projects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
            </div>

            {/* Conditional Button Rendering */}
            {showViewMore && projects.length >= 6 && (
                <div className="flex flex-wrap justify-center gap-4 mt-16 relative z-10">
                    <Link to="/projects">
                        <Magnetic>
                            <button className="bg-[#ffbd39] hover:bg-amber-400 text-black font-bold py-3.5 px-8 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(255,189,57,0.2)] hover:shadow-[0_0_35px_rgba(255,189,57,0.5)]">
                                View More Projects
                            </button>
                        </Magnetic>
                    </Link>
                </div>
            )}
        </section>
    );
};

export default Projects;
