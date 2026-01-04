import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { Layers, User, LayoutTemplate, Briefcase, ChevronRight } from 'lucide-react';

const AllPages = () => {
    const pages = [
        {
            id: 'projects',
            name: 'Project Pages',
            path: '/admin/dashboard',
            icon: <Briefcase className="text-blue-500" size={24} />,
            count: 'Dynamic',
            desc: 'Manage your portfolio case studies.'
        },
        {
            id: 'profile',
            name: 'Profile Page',
            path: '/admin/profile',
            icon: <User className="text-purple-500" size={24} />,
            count: 'Static',
            desc: 'Your creative bio and detailed info.'
        },
        {
            id: 'home',
            name: 'Home Page',
            path: '/',
            icon: <LayoutTemplate className="text-green-500" size={24} />,
            count: 'Static',
            desc: 'The main landing page of your portfolio.'
        }
    ];

    return (
        <AdminLayout>
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">All Pages</h1>
                    <p className="text-gray-500">Manage the pages and sections of your portfolio.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pages.map(page => (
                        <Link
                            key={page.id}
                            to={page.path}
                            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-white transition-colors">
                                    {page.icon}
                                </div>
                                <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
                                    {page.count}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                {page.name}
                            </h3>
                            <p className="text-sm text-gray-500 mb-6">
                                {page.desc}
                            </p>
                            <div className="flex items-center text-blue-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                                Manage Page <ChevronRight size={16} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AllPages;
