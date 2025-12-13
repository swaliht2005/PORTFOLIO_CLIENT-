import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ParticleCard, GlobalSpotlight } from './MagicBento'; // Import from extracted component
import { useRef } from 'react';

const ProjectCard = ({ project, index }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full"
        >
            <ParticleCard
                className="group relative bg-[#16213e] rounded-xl overflow-hidden border border-white/5 hover:border-[#7f5eff]/50 transition-all duration-300 flex flex-col h-full"
                enableStars={true}
                enableTilt={true}
                enableMagnetism={true}
                clickEffect={true}
                glowColor="132, 0, 255" // Matches the theme
            >
                {/* Image Container */}
                <Link to={`/project/${project._id}`} className="block h-56 overflow-hidden relative cursor-pointer flex-shrink-0">
                    {/* Overlay for depth */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                    <img
                        src={project.thumbnailUrl || project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                    />
                </Link>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col relative z-20 bg-[#16213e]/80 backdrop-blur-sm"> {/* Added background to ensure text readability over potential particles */}
                    <Link to={`/project/${project._id}`} className="block">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#7f5eff] transition-colors">{project.title}</h3>
                    </Link>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, i) => (
                            <span key={i} className="text-xs text-[#7f5eff] bg-[#7f5eff]/10 px-2 py-1 rounded">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Description (stripped html) */}
                    <Link to={`/project/${project._id}`} className="block mb-6 flex-1">
                        <p className="text-gray-400 text-sm line-clamp-3 hover:text-gray-300 transition-colors">
                            {project.description ? project.description.replace(/<[^>]+>/g, '') : 'No description available.'}
                        </p>
                    </Link>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                        <div className="flex gap-4">
                            {project.liveLink && (
                                <a href={project.liveLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-white hover:text-[#7f5eff] transition-colors" title="Live Demo">
                                    <FaExternalLinkAlt size={14} />
                                </a>
                            )}
                            {project.repoLink && (
                                <a href={project.repoLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors" title="View Code">
                                    <FaGithub size={16} />
                                </a>
                            )}
                        </div>

                        <Link to={`/project/${project._id}`} className="flex items-center gap-1 text-sm font-bold text-[#7f5eff] hover:text-white transition-colors group-hover:translate-x-1 duration-300">
                            Details <FaArrowRight size={12} />
                        </Link>
                    </div>
                </div>
            </ParticleCard>
        </motion.div>
    );
};

const Projects = ({ projects }) => {
    const gridRef = useRef(null);

    return (
        <section name="projects" className="py-24 bg-[#050510] relative bento-section"> {/* Added bento-section class for spotlight */}
            {/* Global Spotlight for the section */}
            <GlobalSpotlight gridRef={gridRef} spotlightRadius={300} glowColor="132, 0, 255" />

            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">My Projects</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Here are some of my recent works showcasing my skills in UI/UX design and full-stack development.
                    </p>
                </div>

                <div
                    ref={gridRef} // Ref for GlobalSpotlight
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto card-grid"
                >
                    {projects.map((project, index) => (
                        <ProjectCard key={project._id} project={project} index={index} />
                    ))}
                </div>

                {projects.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No projects found. Check back later!</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
