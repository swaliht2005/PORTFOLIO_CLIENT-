// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import AdminLayout from '../../components/AdminLayout';
// import {
//     Eye, ThumbsUp, Layers, TrendingUp, Search, Filter,
//     MoreVertical, Edit3, Trash2, ExternalLink
// } from 'lucide-react';
// import {
//     AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
// } from 'recharts';

// const Dashboard = () => {
//     const [projects, setProjects] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [stats, setStats] = useState({
//         totalViews: 0,
//         totalLikes: 0,
//         totalProjects: 0
//     });
//     const [filter, setFilter] = useState('all');
//     const [search, setSearch] = useState('');

//     useEffect(() => {
//         fetchProjects();
//     }, []);

//     const fetchProjects = async () => {
//         try {
//             const res = await axios.get('http://localhost:5000/api/projects');
//             const data = res.data;
//             setProjects(data);

//             // Calculate Stats
//             const views = data.reduce((acc, curr) => acc + (curr.views || 0), 0);
//             const likes = data.reduce((acc, curr) => acc + (curr.likes || 0), 0);
//             setStats({
//                 totalViews: views,
//                 totalLikes: likes,
//                 totalProjects: data.length
//             });
//             setLoading(false);
//         } catch (err) {
//             console.error(err);
//             setLoading(false);
//         }
//     };

//     const handleDelete = async (id) => {
//         if (!confirm('Delete this project permanently?')) return;
//         try {
//             await axios.delete(`http://localhost:5000/api/projects/${id}`, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//             });
//             fetchProjects(); // Refresh
//         } catch (err) {
//             alert('Failed to delete');
//         }
//     };

//     // Filter Logic
//     const filteredProjects = projects.filter(project => {
//         const matchesFilter = filter === 'all' || (project.status || 'published') === filter;
//         const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase());
//         return matchesFilter && matchesSearch;
//     });

//     // Mock Data for Chart
//     const chartData = [
//         { name: 'Jan', views: 400 },
//         { name: 'Feb', views: 300 },
//         { name: 'Mar', views: 600 },
//         { name: 'Apr', views: 800 },
//         { name: 'May', views: 700 },
//         { name: 'Jun', views: 900 },
//     ];

//     if (loading) return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-50">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         </div>
//     );

//     return (
//         <AdminLayout>
//             <div className="max-w-7xl mx-auto">
//                 {/* Header */}
//                 <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
//                     <div>
//                         <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
//                         <p className="text-gray-500">Welcome back, here's what's happening with your portfolio.</p>
//                     </div>
//                     <Link
//                         to="/admin/add"
//                         className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-500/30 flex items-center gap-2 self-start"
//                     >
//                         <Layers size={18} />
//                         Create Project
//                     </Link>
//                 </div>

//                 {/* Stats Cards */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                     <StatsCard
//                         title="Total Views"
//                         value={stats.totalViews.toLocaleString()}
//                         icon={<Eye size={24} className="text-blue-500" />}
//                         trend="+12%"
//                     />
//                     <StatsCard
//                         title="Appreciations"
//                         value={stats.totalLikes.toLocaleString()}
//                         icon={<ThumbsUp size={24} className="text-purple-500" />}
//                         trend="+5%"
//                     />
//                     <StatsCard
//                         title="Total Projects"
//                         value={stats.totalProjects}
//                         icon={<Layers size={24} className="text-orange-500" />}
//                         trend="Active"
//                     />
//                 </div>

//                 {/* Chart Section */}
//                 <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-8">
//                     <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
//                         <TrendingUp size={20} className="text-gray-400" />
//                         Engagement Analytics
//                     </h3>
//                     <div className="h-[300px] w-full">
//                         <ResponsiveContainer width="100%" height="100%">
//                             <AreaChart data={chartData}>
//                                 <defs>
//                                     <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
//                                         <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
//                                         <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
//                                     </linearGradient>
//                                 </defs>
//                                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
//                                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
//                                 <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
//                                 <Tooltip
//                                     contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
//                                 />
//                                 <Area
//                                     type="monotone"
//                                     dataKey="views"
//                                     stroke="#2563eb"
//                                     strokeWidth={3}
//                                     fillOpacity={1}
//                                     fill="url(#colorViews)"
//                                 />
//                             </AreaChart>
//                         </ResponsiveContainer>
//                     </div>
//                 </div>

//                 {/* Projects Section */}
//                 <div className="mb-8">
//                     <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
//                         <h3 className="text-xl font-bold text-gray-800">Recent Projects</h3>

//                         <div className="flex gap-3 w-full md:w-auto">
//                             <div className="relative flex-1 md:w-64">
//                                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                                 <input
//                                     type="text"
//                                     placeholder="Search projects..."
//                                     className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                                     value={search}
//                                     onChange={(e) => setSearch(e.target.value)}
//                                 />
//                             </div>

//                             <div className="relative group">
//                                 <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-gray-300">
//                                     <Filter size={18} className="text-gray-500" />
//                                     <span className="text-sm font-medium text-gray-700 capitalize">{filter}</span>
//                                 </button>
//                                 {/* Simple Dropdown */}
//                                 <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 hidden group-hover:block z-10">
//                                     {['all', 'published', 'draft', 'archived'].map(f => (
//                                         <button
//                                             key={f}
//                                             onClick={() => setFilter(f)}
//                                             className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 capitalize"
//                                         >
//                                             {f}
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                         {filteredProjects.map((project) => (
//                             <ProjectCard
//                                 key={project._id}
//                                 project={project}
//                                 onDelete={() => handleDelete(project._id)}
//                             />
//                         ))}
//                     </div>

//                     {filteredProjects.length === 0 && (
//                         <div className="text-center py-20 bg-white rounded-xl border border-gray-100 border-dashed">
//                             <Layers className="mx-auto h-12 w-12 text-gray-300 mb-3" />
//                             <h3 className="text-lg font-medium text-gray-900">No projects found</h3>
//                             <p className="text-gray-500">Try adjusting your search or filters.</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </AdminLayout>
//     );
// };

// const StatsCard = ({ title, value, icon, trend }) => (
//     <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
//         <div className="flex justify-between items-start mb-4">
//             <div className="p-3 bg-gray-50 rounded-lg">
//                 {icon}
//             </div>
//             <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend.includes('+') ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
//                 {trend}
//             </span>
//         </div>
//         <h4 className="text-gray-500 text-sm font-medium mb-1">{title}</h4>
//         <h2 className="text-2xl font-bold text-gray-900">{value}</h2>
//     </div>
// );

// const ProjectCard = ({ project, onDelete }) => (
//     <div className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
//         <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
//             <img
//                 src={project.thumbnailUrl || project.imageUrl}
//                 alt={project.title}
//                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//             />
//             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
//                 <Link
//                     to={`/project/${project._id}`}
//                     target="_blank"
//                     className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white hover:text-gray-900 transition"
//                 >
//                     <ExternalLink size={18} />
//                 </Link>
//                 {/* FIXED: Changed from /admin/edit to /admin/add */}
//                 <Link
//                     to={`/admin/add/${project._id}`}
//                     className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white hover:text-blue-600 transition"
//                 >
//                     <Edit3 size={18} />
//                 </Link>
//             </div>
//             <div className="absolute top-3 left-3 flex gap-2">
//                 <span className={`px-2 py-1 text-xs font-bold rounded shadow-sm ${project.status === 'published' ? 'bg-green-500 text-white' :
//                         project.status === 'draft' ? 'bg-yellow-500 text-white' : 'bg-gray-500 text-white'
//                     }`}>
//                     {project.status || 'published'}
//                 </span>
//                 {project.images && project.images.length > 0 && (
//                     <span className="px-2 py-1 text-xs font-bold rounded shadow-sm bg-black/60 text-white backdrop-blur-md flex items-center gap-1">
//                         <Layers size={12} /> {project.images.length}
//                     </span>
//                 )}
//             </div>
//         </div>

//         <div className="p-4 flex-1 flex flex-col">
//             <h3 className="font-bold text-gray-900 mb-1 truncate" title={project.title}>{project.title}</h3>
//             <p className="text-sm text-gray-500 mb-4 line-clamp-2">{project.category || 'Uncategorized'}</p>

//             <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
//                 <div className="flex items-center gap-3 text-gray-400 text-xs">
//                     <span className="flex items-center gap-1"><Eye size={14} /> {project.views || 0}</span>
//                     <span className="flex items-center gap-1"><ThumbsUp size={14} /> {project.likes || 0}</span>
//                 </div>

//                 <button
//                     onClick={onDelete}
//                     className="text-gray-400 hover:text-red-500 transition-colors"
//                 >
//                     <Trash2 size={16} />
//                 </button>
//             </div>
//         </div>
//     </div>
// );

// export default Dashboard;
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import {
    Eye, ThumbsUp, Layers, TrendingUp, Search, Filter,
    MoreVertical, Edit3, Trash2, ExternalLink
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalViews: 0,
        totalLikes: 0,
        totalProjects: 0
    });
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/projects');
            const data = res.data;
            setProjects(data);

            // Calculate Stats
            const views = data.reduce((acc, curr) => acc + (curr.views || 0), 0);
            const likes = data.reduce((acc, curr) => acc + (curr.likes || 0), 0);
            setStats({
                totalViews: views,
                totalLikes: likes,
                totalProjects: data.length
            });
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this project permanently?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/projects/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            fetchProjects(); // Refresh
        } catch (err) {
            alert('Failed to delete');
        }
    };

    // Filter Logic
    const filteredProjects = projects.filter(project => {
        const matchesFilter = filter === 'all' || (project.status || 'published') === filter;
        const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    // Mock Data for Chart
    const chartData = [
        { name: 'Jan', views: 400 },
        { name: 'Feb', views: 300 },
        { name: 'Mar', views: 600 },
        { name: 'Apr', views: 800 },
        { name: 'May', views: 700 },
        { name: 'Jun', views: 900 },
    ];

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                        <p className="text-gray-500">Welcome back, here's what's happening with your portfolio.</p>
                    </div>
                    <Link
                        to="/admin/add"
                        className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-500/30 flex items-center gap-2 self-start"
                    >
                        <Layers size={18} />
                        Create Project
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatsCard
                        title="Total Views"
                        value={stats.totalViews.toLocaleString()}
                        icon={<Eye size={24} className="text-blue-500" />}
                        trend="+12%"
                    />
                    <StatsCard
                        title="Appreciations"
                        value={stats.totalLikes.toLocaleString()}
                        icon={<ThumbsUp size={24} className="text-purple-500" />}
                        trend="+5%"
                    />
                    <StatsCard
                        title="Total Projects"
                        value={stats.totalProjects}
                        icon={<Layers size={24} className="text-orange-500" />}
                        trend="Active"
                    />
                </div>

                {/* Chart Section */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-8">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <TrendingUp size={20} className="text-gray-400" />
                        Engagement Analytics
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="views"
                                    stroke="#2563eb"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorViews)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Projects Section */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <h3 className="text-xl font-bold text-gray-800">Recent Projects</h3>

                        <div className="flex gap-3 w-full md:w-auto">
                            <div className="relative flex-1 md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search projects..."
                                    className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                            <div className="relative group">
                                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-gray-300">
                                    <Filter size={18} className="text-gray-500" />
                                    <span className="text-sm font-medium text-gray-700 capitalize">{filter}</span>
                                </button>
                                {/* Simple Dropdown */}
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 hidden group-hover:block z-10">
                                    {['all', 'published', 'draft', 'archived'].map(f => (
                                        <button
                                            key={f}
                                            onClick={() => setFilter(f)}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 capitalize"
                                        >
                                            {f}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project._id}
                                project={project}
                                onDelete={() => handleDelete(project._id)}
                            />
                        ))}
                    </div>

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-xl border border-gray-100 border-dashed">
                            <Layers className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                            <h3 className="text-lg font-medium text-gray-900">No projects found</h3>
                            <p className="text-gray-500">Try adjusting your search or filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

const StatsCard = ({ title, value, icon, trend }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-gray-50 rounded-lg">
                {icon}
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend.includes('+') ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                {trend}
            </span>
        </div>
        <h4 className="text-gray-500 text-sm font-medium mb-1">{title}</h4>
        <h2 className="text-2xl font-bold text-gray-900">{value}</h2>
    </div>
);

const ProjectCard = ({ project, onDelete }) => (
    <div className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
            <img
                src={project.thumbnailUrl || project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <Link
                    to={`/project/${project._id}`}
                    target="_blank"
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white hover:text-gray-900 transition"
                >
                    <ExternalLink size={18} />
                </Link>
                {/* Edit Project Link */}
                <Link
                    to={`/admin/edit/${project._id}`}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white hover:text-blue-600 transition"
                >
                    <Edit3 size={18} />
                </Link>
            </div>
            <div className="absolute top-3 left-3 flex gap-2">
                <span className={`px-2 py-1 text-xs font-bold rounded shadow-sm ${project.status === 'published' ? 'bg-green-500 text-white' :
                        project.status === 'draft' ? 'bg-yellow-500 text-white' : 'bg-gray-500 text-white'
                    }`}>
                    {project.status || 'published'}
                </span>
                {project.images && project.images.length > 0 && (
                    <span className="px-2 py-1 text-xs font-bold rounded shadow-sm bg-black/60 text-white backdrop-blur-md flex items-center gap-1">
                        <Layers size={12} /> {project.images.length}
                    </span>
                )}
            </div>
        </div>

        <div className="p-4 flex-1 flex flex-col">
            <h3 className="font-bold text-gray-900 mb-1 truncate" title={project.title}>{project.title}</h3>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{project.category || 'Uncategorized'}</p>

            <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-3 text-gray-400 text-xs">
                    <span className="flex items-center gap-1"><Eye size={14} /> {project.views || 0}</span>
                    <span className="flex items-center gap-1"><ThumbsUp size={14} /> {project.likes || 0}</span>
                </div>

                <button
                    onClick={onDelete}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    </div>
);

export default Dashboard;