import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { ExternalLink, Github, ArrowLeft, Calendar, Layers } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Helper for cleaning HTML content
const sanitize = (html) => html.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, "");

const ModuleRenderer = ({ module }) => {
    switch (module.type) {
        case 'text':
            return (
                <div
                    className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed mb-12"
                    dangerouslySetInnerHTML={{ __html: sanitize(module.content) }}
                />
            );
        case 'image':
            return (
                <div className="mb-12">
                    <img
                        src={module.content.url}
                        alt={module.content.caption || 'Project visual'}
                        className="w-full rounded-xl shadow-lg border border-gray-800"
                    />
                    {module.content.caption && (
                        <p className="text-center text-sm text-gray-500 mt-4">{module.content.caption}</p>
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
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
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
            <div className='fixed top-0 left-0 w-full z-50'>
                <Navbar />
            </div>

            {/* Hero Section */}
            <div className="relative pt-24 pb-12 md:pt-32 md:pb-20 px-4 md:px-8 max-w-7xl mx-auto">
                <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
                    <ArrowLeft size={20} /> Back to Projects
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start animate-fade-in-up">
                    <div className="space-y-6">
                        <div className="flex flex-wrap gap-2">
                            {(project.tags || []).map((tag, i) => (
                                <span key={i} className="px-3 py-1 text-xs font-semibold bg-blue-900/30 text-blue-400 rounded-full border border-blue-900/50">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight ">{project.title}</h1>
                        <div className="flex flex-wrap gap-6 text-gray-400 text-sm md:text-base">
                            {project.category && (
                                <span className="flex items-center gap-2">
                                    <Layers size={18} className="text-blue-500" />
                                    {project.category}
                                </span>
                            )}
                            {project.year && (
                                <span className="flex items-center gap-2">
                                    <Calendar size={18} className="text-blue-500" />
                                    {project.year}
                                </span>
                            )}
                        </div>

                        <div className="pt-6 border-t border-gray-800 grid grid-cols-2 gap-6">
                            {project.client && (
                                <div>
                                    <h4 className="text-gray-500 text-xs uppercase tracking-wider mb-1">Client</h4>
                                    <p className="font-medium">{project.client}</p>
                                </div>
                            )}
                            {project.role && (
                                <div>
                                    <h4 className="text-gray-500 text-xs uppercase tracking-wider mb-1">Role</h4>
                                    <p className="font-medium">{project.role}</p>
                                </div>
                            )}
                            {project.tools && project.tools.length > 0 && (
                                <div className="col-span-2">
                                    <h4 className="text-gray-500 text-xs uppercase tracking-wider mb-1">Tools</h4>
                                    <p className="font-medium text-gray-300">
                                        {Array.isArray(project.tools) ? project.tools.join(', ') : project.tools}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4 pt-4">
                            {project.liveLink && (
                                <a
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition flex items-center gap-2"
                                >
                                    <ExternalLink size={18} /> Visit Site
                                </a>
                            )}
                            {project.repoLink && (
                                <a
                                    href={project.repoLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-6 py-3 bg-gray-800 text-white rounded-full font-semibold hover:bg-gray-700 transition flex items-center gap-2"
                                >
                                    <Github size={18} /> View Code
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="relative group rounded-2xl overflow-hidden border border-gray-800">
                        <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-50" />
                    </div>
                </div>
            </div>

            {/* Content Builder Output */}
            {hasModules ? (
                <div className="bg-neutral-900/50 py-16 md:py-24">
                    <div className="max-w-4xl mx-auto px-4 md:px-8">
                        {project.contentModules.map((module) => (
                            <ModuleRenderer key={module.id} module={module} />
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    {/* Legacy Description */}
                    {(project.description && project.description.replace(/<[^>]*>/g, '').trim()) && (
                        <div className="bg-neutral-900/50 py-16 md:py-24">
                            <div className="max-w-4xl mx-auto px-4 md:px-8">
                                <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 text-white">
                                    <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
                                    Project Story
                                </h2>
                                <div
                                    className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: project.description }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Legacy Gallery Grid */}
                    {project.images && project.images.length > 0 && (
                        <div className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto">
                            <h2 className="text-2xl font-bold mb-12 text-center text-white">
                                Gallery
                                <span className="block text-sm font-normal text-gray-500 mt-2">Visual snapshots</span>
                            </h2>

                            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                                {project.images.map((img, i) => (
                                    <div key={i} className="break-inside-avoid relative group rounded-xl overflow-hidden bg-gray-900 border border-gray-800">
                                        <img
                                            src={typeof img === 'string' ? img : img.url}
                                            alt={typeof img === 'string' ? 'Project image' : (img.caption || 'Project image')}
                                            className="w-full h-auto object-cover transition-opacity duration-300 group-hover:opacity-90"
                                            loading="lazy"
                                        />
                                        {typeof img !== 'string' && img.caption && (
                                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <p className="text-sm text-gray-200 font-medium">{img.caption}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}

            <Footer />
        </div>
    );
};

export default ProjectDetails;
