
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';


const Home = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Fetch all projects (or implement pagination on backend if preferred)
                const res = await axios.get('https://portfolio-server-ekep.onrender.com/api/projects');
                setProjects(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProjects();
    }, []);

    // Slice to get only the first 6 projects
    const featuredProjects = projects.slice(0, 6);

    return (
        // Add name="home" here for react-scroll to target
        <div name="home" className="font-sans antialiased text-gray-900 bg-[#050510] min-h-screen">
            <Navbar />
            <Hero />
            <About />
            <Projects projects={featuredProjects} showViewMore={true} />
            <div name="contact">
                <Footer />
            </div>
        </div>
    );
};

export default Home;
