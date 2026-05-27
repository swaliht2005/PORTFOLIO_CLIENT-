import NavbarTwo from './NavebarTwo';
import Footer from '../components/Footer';
import Projects from '../components/Projects';
import projects from '../data/projects';

export default function MoreProjects() {
    return (
        <div className="bg-black min-h-screen flex flex-col">
            <NavbarTwo />
            <Projects projects={projects} showViewMore={false} />
            <Footer />
        </div>
    );
}
