// pages/MoreProjects.jsx
import { useEffect, useState } from 'react';
import api from '../api';
import NavbarTwo from './NavebarTwo';
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
        <div className="bg-black min-h-screen flex flex-col">
            <NavbarTwo />


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
