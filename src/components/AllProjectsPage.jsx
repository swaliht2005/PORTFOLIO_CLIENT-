import { useEffect, useState } from 'react';
import Projects from '../components/Projects';
import NavbarSimple from './NavbarSimple'; // Import the new simple navbar

const AllProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Replace with your actual data fetching logic
        const fetchProjects = async () => {
            try {
                // Example: const response = await fetch('/api/projects');
                // const data = await response.json();
                // setProjects(data);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    if (loading) return <div>Loading projects...</div>;

    // Render the Projects component without the "View More" button
    return (
        <div className="bg-[#050510] min-h-screen">
            <NavbarSimple />
            <Projects projects={projects} showViewMore={false} />
        </div>
    );
};

export default AllProjectsPage;
