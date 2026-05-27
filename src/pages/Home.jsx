import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import ContactCTA from '../components/ContactCTA';
import projects from '../data/projects';

const Home = () => {
    // Show first 6 projects on the home page
    const featuredProjects = projects.slice(0, 6);

    return (
        <div name="home" className="font-sans antialiased text-gray-900 bg-black min-h-screen">
            <Navbar />
            <Hero />
            <About />
            <Projects projects={featuredProjects} showViewMore={true} />
            <div name="contact">
                <ContactCTA />
                <Footer />
            </div>
        </div>
    );
};

export default Home;
