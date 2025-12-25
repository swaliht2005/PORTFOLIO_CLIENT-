import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Github,
  Layers,
  ChevronRight,
} from "lucide-react";
import NavebarTwo from "../components/NavebarTwo";
import Footer from "../components/Footer";

// --- Utils ---
const sanitize = (html = "") =>
  html.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "");

// --- Enhanced Skeleton Loader ---
const Skeleton = () => (
  <div className="min-h-screen bg-[#0a0a0a] text-white">
    <div className="max-w-5xl mx-auto px-6 pt-32 animate-pulse">
      <div className="h-4 w-24 bg-zinc-800 rounded mb-8" />
      <div className="h-16 w-3/4 bg-zinc-800 rounded mb-6" />
      <div className="h-4 w-1/2 bg-zinc-800 rounded mb-10" />
      <div className="flex gap-4 mb-20">
        <div className="h-12 w-32 bg-zinc-800 rounded-lg" />
        <div className="h-12 w-32 bg-zinc-800 rounded-lg" />
      </div>
      <div className="h-64 w-full bg-zinc-800 rounded-2xl" />
    </div>
  </div>
);

const ModuleRenderer = ({ module }) => {
  if (module.type === "text") {
    return (
      <section className="max-w-3xl mx-auto px-6 py-10">
        <div
          className="prose prose-zinc dark:prose-invert prose-lg max-w-none 
          prose-headings:font-semibold prose-a:text-blue-400 prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: sanitize(module.content) }}
        />
      </section>
    );
  }

  if (module.type === "image") {
    return (
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
          <img
            src={module.content.url}
            alt={module.content.caption || "Project visual"}
            className="w-full transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>
        {module.content.caption && (
          <p className="mt-4 text-center text-sm font-medium text-zinc-500 italic">
            — {module.content.caption}
          </p>
        )}
      </section>
    );
  }

  return null;
};

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProject = async () => {
      try {
        const { data } = await axios.get("https://portfolio-server-ekep.onrender.com/api/projects");
        setProject(data.find((p) => p._id === id));
      } catch (err) {
        console.error(err);
      } finally {
        setTimeout(() => setLoading(false), 500); // Slight delay for smooth transition
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <Skeleton />;

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white">
        <h2 className="text-3xl font-bold mb-2">Project Not Found</h2>
        <p className="text-zinc-500 mb-8">The project you're looking for doesn't exist or was moved.</p>
        <Link to="/" className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition">
          <ArrowLeft size={18} /> Return to Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] text-zinc-100 min-h-screen selection:bg-blue-500/30">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#0a0a0a]/70 backdrop-blur-xl">
        <NavebarTwo />
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-16 overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full -z-10" />

        <div className="max-w-5xl mx-auto px-6">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-white transition-colors mb-12"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Archive
          </Link>

          <div className="grid lg:grid-cols-[1fr_300px] gap-12 items-end">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                {project.title}
              </h1>
              <p className="max-w-2xl text-zinc-400 text-xl leading-relaxed font-light">
                {project.shortDescription || "Elevating digital standards through thoughtful design and robust engineering."}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between group rounded-xl bg-white px-6 py-4 text-black font-semibold hover:bg-zinc-200 transition-all"
                >
                  View Live Site <ExternalLink size={18} />
                </a>
              )}
              {project.repoLink && (
                <a
                  href={project.repoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between group rounded-xl border border-zinc-800 bg-zinc-900/50 px-6 py-4 text-white font-medium hover:bg-zinc-800 transition-all"
                >
                  GitHub Source <Github size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Project Meta Grid */}
      <section className="border-y border-zinc-800/50 bg-zinc-900/20 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2">Category</span>
            <span className="text-sm font-medium flex items-center gap-2">
              <Layers size={14} className="text-blue-500" /> {project.category || "Development"}
            </span>
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2">Year</span>
            <span className="text-sm font-medium flex items-center gap-2">
              <Calendar size={14} className="text-blue-500" /> {project.year || "2024"}
            </span>
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2">Role</span>
            <span className="text-sm font-medium">{project.role || "Lead Developer"}</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2">Stack</span>
            <span className="text-sm font-medium truncate block">
              {Array.isArray(project.tools) ? project.tools.join(", ") : project.tools || "React, Tailwind"}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="py-20 bg-gradient-to-b from-[#0a0a0a] to-black">
        {project.contentModules?.length ? (
          project.contentModules.map((module) => (
            <ModuleRenderer key={module.id} module={module} />
          ))
        ) : (
          <section className="max-w-3xl mx-auto px-6">
            <div
              className="prose prose-zinc dark:prose-invert prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: sanitize(project.description) }}
            />
          </section>
        )}
      </main>

      {/* Professional CTA */}
      <section className="py-32 px-6 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto rounded-[2rem] bg-gradient-to-b from-zinc-900 to-black border border-zinc-800 p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          <h2 className="text-4xl font-bold mb-6 italic tracking-tight">Ready to start a project?</h2>
          <p className="text-zinc-400 mb-10 text-lg max-w-md mx-auto">
            I'm currently accepting new freelance opportunities and full-time collaborations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contactpage"
              className="group flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 font-bold hover:bg-blue-500 transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
              Get In Touch <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectDetails;