import { useState, useEffect } from 'react';
import api from '../../api';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import ImageUpload from '../../components/ImageUpload';
import ProjectBuilder from '../../components/Builder/ProjectBuilder.jsx';
import { Save, ArrowLeft, Layers, PenTool, Layout, Image as ImageIcon } from 'lucide-react';

const AddProject = () => {
    const { id } = useParams(); // This line was commented out in the original, but it's part of the functional code below.
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('essentials');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'UI/UX Design',
        status: 'published',
        imageUrl: '',
        thumbnailUrl: '',
        liveLink: '',
        repoLink: '',
        tags: '',
        client: '',
        year: new Date().getFullYear().toString(),
        role: '',
        tools: '',
        images: [],
        contentModules: [],
    });

    useEffect(() => {
        if (id) {
            const fetchProject = async () => {
                try {
                    // Fetch a single project by its ID for efficiency
                    const res = await api.get(`/projects/${id}`);
                    const project = res.data;
                    if (project) {
                        setFormData({
                            ...project,
                            tags: Array.isArray(project.tags) ? project.tags.join(', ') : project.tags,
                            tools: Array.isArray(project.tools) ? project.tools.join(', ') : project.tools,
                            images: project.images || [],
                            contentModules: project.contentModules || []
                        });
                    }
                } catch (err) {
                    console.error("Failed to fetch project:", err);
                }
            };
            fetchProject();
        }
    }, [id]);

    const handleSubmit = async () => {
        if (!formData.title || !formData.thumbnailUrl) {
            alert('Title and Thumbnail Image are required.');
            return;
        }

        setIsSubmitting(true);

        try {
            // Create a mutable copy of formData to build the payload
            const payload = { ...formData };

            // Convert comma-separated strings to arrays for tags and tools
            if (typeof payload.tags === 'string') {
                payload.tags = payload.tags.split(',').map(t => t.trim()).filter(t => t);
            }
            if (typeof payload.tools === 'string') {
                payload.tools = payload.tools.split(',').map(t => t.trim()).filter(t => t);
            }

            // Ensure images and contentModules are arrays
            payload.images = Array.isArray(payload.images) ? payload.images.filter(img => img && img.url && img.url.trim() !== '') : [];
            payload.contentModules = Array.isArray(payload.contentModules) ? payload.contentModules : [];

            console.log('Submitting project:', id ? 'UPDATE' : 'CREATE', payload);

            if (id) {
                const response = await api.put(`/projects/${id}`, payload);
                console.log('Project updated successfully:', response.data);
            } else {
                const response = await api.post('/projects', payload);
                console.log('Project created successfully:', response.data);
            }
            navigate('/admin/dashboard');
        } catch (err) {
            console.error('Error saving project:', err);

            // The API interceptor will handle 401 errors (token expired) by redirecting.
            if (err.response?.status === 401) {
                // No need to alert, the interceptor handles the redirect.
                return;
            }

            const msg = err.response?.data?.message || err.message || 'Failed to save project. Please try again.';
            alert(`Error: ${msg}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const tabs = [
        { id: 'essentials', label: 'Essentials', icon: <Layout size={18} /> },
        { id: 'details', label: 'Project Details', icon: <PenTool size={18} /> },
        { id: 'media', label: 'Media & Story', icon: <ImageIcon size={18} /> },
    ];

    const categories = [
        "UI/UX Design", "Web Development", "Mobile App", "Branding", "Illustration", "Photography"
    ];

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/admin/dashboard')} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                            <ArrowLeft size={24} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{id ? 'Edit Project' : 'New Project'}</h1>
                            <p className="text-gray-500 text-sm">Showcase your best work</p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <select
                            className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                        </select>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className={`flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-500/30 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            <Save size={18} />
                            {isSubmitting ? 'Saving...' : 'Publish Project'}
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-6 border-b border-gray-200 mb-8">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 pb-4 px-2 text-sm font-medium transition-colors relative ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                            {activeTab === tab.id && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Form Area */}
                    <div className="lg:col-span-2 space-y-8 animate-fade-in">

                        {activeTab === 'essentials' && (
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition"
                                        placeholder="e.g. Modern E-commerce Redesign"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                        <select
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Completion Year</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition"
                                            placeholder="2024"
                                            value={formData.year}
                                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Tags</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition"
                                        placeholder="react, tailwind, minimal, dark mode"
                                        value={formData.tags}
                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    />
                                    <p className="text-xs text-gray-400 mt-1">Comma separated</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'details' && (
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none"
                                            placeholder="Company Name or Personal"
                                            value={formData.client}
                                            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">My Role</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none"
                                            placeholder="Lead Designer, Developer..."
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Tools Used</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none"
                                        placeholder="Figma, VS Code, Adobe XD"
                                        value={formData.tools}
                                        onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Live Demo URL</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none"
                                            placeholder="https://..."
                                            value={formData.liveLink}
                                            onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Repository URL</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none"
                                            placeholder="https://github.com/..."
                                            value={formData.repoLink}
                                            onChange={(e) => setFormData({ ...formData, repoLink: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'media' && (
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                                <ProjectBuilder
                                    modules={formData.contentModules}
                                    onChange={(modules) => setFormData({ ...formData, contentModules: modules })}
                                />
                            </div>
                        )}
                    </div>

                    {/* Sidebar / Preview Helper */}
                    <div>
                        {activeTab !== 'media' && (
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <ImageIcon /> Thumbnail Image
                                </h3>
                                <ImageUpload
                                    label="Upload Thumbnail"
                                    previewUrl={formData.thumbnailUrl}
                                    onUpload={(url) => setFormData({ ...formData, thumbnailUrl: url })}
                                    onRemove={() => setFormData({ ...formData, thumbnailUrl: '' })}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AddProject;
