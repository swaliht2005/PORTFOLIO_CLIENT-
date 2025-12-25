// pages/MoreProjects.jsx
import { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Projects from '../components/Projects';

export default function MoreProjects() {
    const [allProjects, setAllProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await api.get('/projects');
                setAllProjects(res.data);
            } catch (err) {
                console.error("Error fetching projects:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    return (
        <div className="bg-[#050510] min-h-screen flex flex-col">
            <Navbar />

            <div className="pt-24 pb-12 px-6">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        All Projects
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A complete archive of my work in UI/UX design.
                    </p>
                </div>
            </div>

            {loading ? (
                <div className="text-white text-center py-20">Loading...</div>
            ) : (
                // Pass false to hide the "View More" button on this page
                <Projects projects={allProjects} showViewMore={false} />
            )}

            <Footer />
        </div>
    );
}
