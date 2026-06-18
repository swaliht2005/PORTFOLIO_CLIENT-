import { lazy, Suspense } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import projects from '../data/projects';

const About = lazy(() => import('../components/About'));
const Projects = lazy(() => import('../components/Projects'));
const ContactCTA = lazy(() => import('../components/ContactCTA'));
const Footer = lazy(() => import('../components/Footer'));

const Home = () => {
    // Show first 6 projects on the home page
    const featuredProjects = projects.slice(0, 6);

    return (
        <div name="home" className="font-sans antialiased text-gray-900 bg-black min-h-screen">
            <Navbar />
            <Hero />
            <Suspense fallback={<div className="min-h-24 bg-[#050505]" aria-hidden="true" />}>
                <About />
                <Projects projects={featuredProjects} showViewMore={true} />
                <div name="contact">
                    <ContactCTA />
                    <Footer />
                </div>
            </Suspense>
        </div>
    );
};

export default Home;
