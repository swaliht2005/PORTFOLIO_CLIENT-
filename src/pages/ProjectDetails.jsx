import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { ExternalLink, Github, ArrowLeft, Calendar, Layers, Heart, Eye } from 'lucide-react';
import NavebarTwo from '../components/NavebarTwo';
import Footer from '../components/Footer';

// Helper for cleaning HTML content
const sanitize = (html) => html.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, "");

const ModuleRenderer = ({ module }) => {
    switch (module.type) {
        case 'text':
            return (
                <div className="w-full max-w-5xl mx-auto px-6 md:px-12 py-12">
                    <div
                        className="prose prose-invert prose-xl max-w-none text-gray-300 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: sanitize(module.content) }}
                    />
                </div>
            );
        case 'image':
            return (
                <div className="w-full">
                    <img
                        src={module.content.url}
                        alt={module.content.caption || 'Project visual'}
                        className="w-full h-auto object-cover"
                    />
                    {module.content.caption && (
                        <div className="max-w-5xl mx-auto px-6 md:px-12 py-4">
                            <p className="text-sm text-gray-500 italic">{module.content.caption}</p>
                        </div>
                    )}
                </div>
            );
        default:
            return null;
    }
};

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProject = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/projects');
                const p = res.data.find(proj => proj._id === id);
                setProject(p);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
    );

    if (!project) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
            <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
            <Link to="/" className="text-blue-500 hover:underline">Back to Home</Link>
        </div>
    );

    const hasModules = project.contentModules && project.contentModules.length > 0;

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">
            <div className='fixed top-0 left-0 w-full z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800'>
                <NavebarTwo />
            </div>

            {/* Hero Section - Full Width */}
            <div className="pt-20 md:pt-24">
                
                {/* Project Title & Meta */}
                <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-16">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                        {project.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-400 mb-8">
                        {project.category && (
                            <span className="flex items-center gap-2">
                                <Layers size={16} className="text-blue-500" />
                                {project.category}
                            </span>
                        )}
                        {project.year && (
                            <span className="flex items-center gap-2">
                                <Calendar size={16} className="text-blue-500" />
                                {project.year}
                            </span>
                        )}
                        <span className="flex items-center gap-2">
                            <Eye size={16} />
                            {Math.floor(Math.random() * 5000 + 1000)} views
                        </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {(project.tags || []).map((tag, i) => (
                            <span key={i} className="px-3 py-1.5 text-xs font-medium bg-gray-900 text-gray-300 rounded-md hover:bg-gray-800 transition-colors cursor-pointer border border-gray-800">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-3">
                        {project.liveLink && (
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noreferrer"
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-500/20"
                            >
                                <ExternalLink size={18} /> Visit Live Site
                            </a>
                        )}
                        {project.repoLink && (
                            <a
                                href={project.repoLink}
                                target="_blank"
                                rel="noreferrer"
                                className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition flex items-center gap-2 border border-gray-800"
                            >
                                <Github size={18} /> View Code
                            </a>
                        )}
                    </div>
                </div>

                {/* Project Info Bar */}
                {(project.client || project.role || project.tools) && (
                    <div className="bg-gray-900/50 border-t border-b border-gray-800 py-8">
                        <div className="max-w-5xl mx-auto px-6 md:px-12">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                                {project.client && (
                                    <div>
                                        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Client</h4>
                                        <p className="text-base font-medium text-white">{project.client}</p>
                                    </div>
                                )}
                                {project.role && (
                                    <div>
                                        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Role</h4>
                                        <p className="text-base font-medium text-white">{project.role}</p>
                                    </div>
                                )}
                                {project.tools && project.tools.length > 0 && (
                                    <div>
                                        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Tools Used</h4>
                                        <p className="text-base font-medium text-white">
                                            {Array.isArray(project.tools) ? project.tools.join(', ') : project.tools}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Content Builder Output - Full Width Images */}
            {hasModules ? (
                <div className="py-12">
                    {project.contentModules.map((module) => (
                        <ModuleRenderer key={module.id} module={module} />
                    ))}
                </div>
            ) : (
                <>
                    {/* Legacy Description */}
                    {(project.description && project.description.replace(/<[^>]*>/g, '').trim()) && (
                        <div className="py-16 md:py-20">
                            <div className="max-w-5xl mx-auto px-6 md:px-12">
                                <h2 className="text-2xl md:text-3xl font-bold mb-8">
                                    About This Project
                                </h2>
                                <div
                                    className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: sanitize(project.description) }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Legacy Gallery - Full Width Images Stacked */}
                    {project.images && project.images.length > 0 && (
                        <div className="py-8 space-y-8">
                            {project.images.map((img, i) => (
                                <div key={i} className="w-full">
                                    <img
                                        src={typeof img === 'string' ? img : img.url}
                                        alt={typeof img === 'string' ? 'Project image' : (img.caption || 'Project image')}
                                        className="w-full h-auto object-cover"
                                        loading="lazy"
                                    />
                                    {typeof img !== 'string' && img.caption && (
                                        <div className="max-w-5xl mx-auto px-6 md:px-12 py-4">
                                            <p className="text-sm text-gray-500 italic">{img.caption}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Bottom CTA */}
            <div className="bg-gray-900/30 border-t border-gray-800 py-16 mt-12">
                <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                        Like what you see?
                    </h3>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Explore more projects or get in touch to discuss your next big idea.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link to="/" className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20">
                            View More Projects
                        </Link>
                        <Link to="/contact" className="px-8 py-3 bg-gray-900 text-white border border-gray-800 rounded-lg font-semibold hover:bg-gray-800 transition">
                            Get In Touch
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProjectDetails;