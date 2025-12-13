import { useState, useEffect } from 'react';
import api from '../../api';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AdminLayout from '../../components/AdminLayout';
import ImageUpload from '../../components/ImageUpload';
import ProjectBuilder from '../../components/Builder/ProjectBuilder';
import { Save, ArrowLeft, Layers, PenTool, Layout, Image as ImageIcon } from 'lucide-react';

const AddProject = () => {
    const { id } = useParams();
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
                    const res = await api.get('/projects');
                    const project = res.data.find(p => p._id === id);
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
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/5b73d0de-fbd6-4c18-8606-043bbb911494',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AddProject.jsx:58',message:'handleSubmit entry',data:{hasTitle:!!formData.title,hasThumbnail:!!formData.thumbnailUrl,title:formData.title,thumbnailUrl:formData.thumbnailUrl},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        
        if (!formData.title || !formData.thumbnailUrl) {
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/5b73d0de-fbd6-4c18-8606-043bbb911494',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AddProject.jsx:60',message:'Validation failed - missing required fields',data:{title:formData.title,thumbnailUrl:formData.thumbnailUrl},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
            // #endregion
            alert('Title and Thumbnail Image are required.');
            return;
        }

        setIsSubmitting(true);
        
        // Clean and format the payload
        const payload = {
            title: formData.title,
            thumbnailUrl: formData.thumbnailUrl,
            category: formData.category || 'Uncategorized',
            status: formData.status || 'published',
            tags: typeof formData.tags === 'string' 
                ? formData.tags.split(',').map(t => t.trim()).filter(t => t) 
                : (Array.isArray(formData.tags) ? formData.tags.filter(t => t) : []),
            tools: typeof formData.tools === 'string' 
                ? formData.tools.split(',').map(t => t.trim()).filter(t => t) 
                : (Array.isArray(formData.tools) ? formData.tools.filter(t => t) : []),
            images: Array.isArray(formData.images) ? formData.images.filter(img => img && img.url) : [],
            contentModules: Array.isArray(formData.contentModules) ? formData.contentModules : []
        };
        
        // Add optional fields only if they have values
        if (formData.description) payload.description = formData.description;
        if (formData.imageUrl) payload.imageUrl = formData.imageUrl;
        if (formData.liveLink) payload.liveLink = formData.liveLink;
        if (formData.repoLink) payload.repoLink = formData.repoLink;
        if (formData.client) payload.client = formData.client;
        if (formData.year) payload.year = formData.year;
        if (formData.role) payload.role = formData.role;

        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/5b73d0de-fbd6-4c18-8606-043bbb911494',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AddProject.jsx:81',message:'Payload before request',data:{payloadKeys:Object.keys(payload),title:payload.title,thumbnailUrl:payload.thumbnailUrl,imagesCount:payload.images?.length,contentModulesCount:payload.contentModules?.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        // #endregion

        const token = localStorage.getItem('token');
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/5b73d0de-fbd6-4c18-8606-043bbb911494',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AddProject.jsx:92',message:'Token check',data:{hasToken:!!token,tokenLength:token?.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        if (!token) {
            alert('You must be logged in to save projects.');
            setIsSubmitting(false);
            navigate('/admin');
            return;
        }

        try {
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/5b73d0de-fbd6-4c18-8606-043bbb911494',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AddProject.jsx:104',message:'Before API call',data:{method:id?'PUT':'POST',url:id?`/projects/${id}`:'/projects',payloadSize:JSON.stringify(payload).length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
            // #endregion
            console.log('Submitting project:', id ? 'UPDATE' : 'CREATE', payload);
            if (id) {
                const response = await api.put(`/projects/${id}`, payload);
                // #region agent log
                fetch('http://127.0.0.1:7242/ingest/5b73d0de-fbd6-4c18-8606-043bbb911494',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AddProject.jsx:107',message:'Update success',data:{status:response.status,projectId:response.data?._id},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
                // #endregion
                console.log('Project updated successfully:', response.data);
            } else {
                const response = await api.post('/projects', payload);
                // #region agent log
                fetch('http://127.0.0.1:7242/ingest/5b73d0de-fbd6-4c18-8606-043bbb911494',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AddProject.jsx:110',message:'Create success',data:{status:response.status,projectId:response.data?._id},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
                // #endregion
                console.log('Project created successfully:', response.data);
            }
            navigate('/admin/dashboard');
        } catch (err) {
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/5b73d0de-fbd6-4c18-8606-043bbb911494',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AddProject.jsx:113',message:'Error caught',data:{hasResponse:!!err.response,status:err.response?.status,statusText:err.response?.statusText,errorMessage:err.response?.data?.message,errorData:err.response?.data,errorName:err.name,errorMsg:err.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
            // #endregion
            console.error('Error saving project:', err);
            console.error('Error response:', err.response?.data);
            console.error('Error status:', err.response?.status);
            console.error('Full error:', JSON.stringify(err.response?.data || err, null, 2));
            
            // Handle 401 errors (token expired) - api interceptor will handle redirect automatically
            if (err.response?.status === 401) {
                // The api interceptor already redirected to /admin, just return without showing error
                return;
            }
            
            // Extract error message properly
            let msg = 'Failed to save project';
            if (err.response?.data?.message) {
                msg = err.response.data.message;
            } else if (typeof err.response?.data === 'string') {
                msg = err.response.data;
            } else if (err.response?.data?.error) {
                msg = err.response.data.error;
            } else if (err.message) {
                msg = err.message;
            } else if (typeof err === 'string') {
                msg = err;
            }
            
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/5b73d0de-fbd6-4c18-8606-043bbb911494',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AddProject.jsx:128',message:'Error message extracted',data:{finalMessage:msg},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
            // #endregion
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
                                    <ImageIcon size={16} /> Thumbnail Image
                                </h3>
                                <ImageUpload
                                    label="Upload Thumbnail"
                                    previewUrl={formData.thumbnailUrl}
                                    onUpload={(url) => setFormData({ ...formData, thumbnailUrl: url })}
                                    onRemove={() => setFormData({ ...formData, thumbnailUrl: '' })}
                                />
                                <p className="text-xs text-gray-400 mt-3 text-center">For grid view (4:3 aspect)</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AddProject;
