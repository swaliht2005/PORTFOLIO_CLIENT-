import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import projects from "../data/projects";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Github,
  Layers,
  ChevronRight,
  FileText,
  Download,
  User,
  Wrench,
} from "lucide-react";
import NavebarTwo from "../components/NavebarTwo";
import Footer from "../components/Footer";
import Magnetic from "../components/Magnetic";

// --- Utils ---
const sanitize = (html = "") =>
  html.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "");

// --- Animation Configs ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
};

// --- Premium Skeleton Loader ---
const Skeleton = () => (
  <div className="min-h-screen bg-[#050505] text-white">
    <div className="max-w-5xl mx-auto px-6 pt-32 animate-pulse">
      <div className="h-5 w-32 bg-zinc-800/80 rounded-full mb-8" />
      <div className="h-16 w-3/4 bg-zinc-800/80 rounded-2xl mb-6" />
      <div className="h-6 w-1/2 bg-zinc-800/80 rounded-xl mb-12" />
      <div className="flex gap-4 mb-20">
        <div className="h-14 w-40 bg-zinc-800/80 rounded-xl" />
        <div className="h-14 w-40 bg-zinc-800/80 rounded-xl" />
      </div>
      <div className="h-80 w-full bg-zinc-800/50 rounded-3xl" />
    </div>
  </div>
);

const ModuleRenderer = ({ module }) => {
  if (module.type === "text") {
    return (
      <motion.section 
        variants={itemVariants}
        className="max-w-4xl mx-auto px-6 py-12"
      >
        <div
          className="prose prose-zinc dark:prose-invert prose-lg max-w-none 
          prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[#ffbd39] prose-p:leading-relaxed text-gray-300 font-light"
          dangerouslySetInnerHTML={{ __html: sanitize(module.content) }}
        />
      </motion.section>
    );
  }

  if (module.type === "image") {
    const imageUrls = module.content.urls || [module.content.url];

    return (
      <motion.section 
        variants={itemVariants}
        className="max-w-5xl mx-auto px-6 py-10"
      >
        <div className="group relative border border-white/5 bg-[#0e0e0e] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-[#ffbd39]/20">
          {imageUrls.map((url, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === imageUrls.length - 1;

            return (
              <img
                key={idx}
                src={url}
                alt={module.content.caption || `Project visual part ${idx + 1}`}
                loading="lazy"
                className={`w-full h-auto object-cover block select-none transition-transform duration-700 hover:scale-[1.005]
                  ${isFirst ? 'rounded-t-3xl' : ''}
                  ${isLast ? 'rounded-b-3xl' : ''}
                `}
                style={{ display: 'block' }}
              />
            );
          })}
        </div>
        {module.content.caption && (
          <p className="mt-4 text-center text-sm font-semibold text-gray-500 italic uppercase tracking-wider">
            — {module.content.caption}
          </p>
        )}
      </motion.section>
    );
  }

  if (module.type === "pdf") {
    return (
      <motion.section 
        variants={itemVariants}
        className="max-w-3xl mx-auto px-6 py-8"
      >
        <div className="flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 border border-white/5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-all hover:border-[#ffbd39]/20 group shadow-xl backdrop-blur-md">
          <div className="p-5 bg-red-500/10 text-red-500 rounded-2xl group-hover:bg-red-500/20 transition-all duration-300">
            <FileText size={36} />
          </div>
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <h4 className="font-bold text-white truncate text-xl">
              {module.content.name || "Project Document"}
            </h4>
            {module.content.caption && (
              <p className="text-sm text-gray-400 mt-2 line-clamp-2 leading-relaxed">{module.content.caption}</p>
            )}
          </div>
          <div className="flex gap-3 w-full sm:w-auto justify-center">
            <Magnetic>
              <a
                href={module.content.url}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 px-6 py-3 bg-white text-black rounded-xl text-sm font-bold hover:bg-zinc-200 transition-colors shadow-lg"
              >
                View PDF
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={module.content.url}
                download
                target="_blank"
                rel="noreferrer"
                className="shrink-0 px-4 py-3 bg-zinc-800/80 text-white rounded-xl text-sm font-bold hover:bg-zinc-700 transition-colors border border-white/10 flex items-center shadow-lg"
                title="Download PDF"
              >
                <Download size={18} />
              </a>
            </Magnetic>
          </div>
        </div>
      </motion.section>
    );
  }

  return null;
};

const ProjectDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  // Find the project synchronously from static data
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Brief delay for a smooth skeleton-to-content transition
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, [id]);

  if (loading) return <Skeleton />;

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white p-6">
        <h2 className="text-4xl font-bold mb-3 tracking-tight">Project Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-md text-center leading-relaxed">The project you're looking for doesn't exist or was relocated.</p>
        <Magnetic>
          <Link to="/" className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition shadow-xl">
            <ArrowLeft size={18} /> Return to Home
          </Link>
        </Magnetic>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] text-zinc-100 min-h-screen selection:bg-[#ffbd39]/30 overflow-x-hidden font-sans">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
        <NavebarTwo />
      </nav>

      {/* Main Stagger Container */}
      <motion.div
        variants={shouldReduceMotion ? {} : containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Hero Section */}
        <header className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
          {/* Immersive Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-tr from-[#ffbd39]/10 to-indigo-500/5 blur-[140px] rounded-full -z-10" />

          <div className="max-w-5xl mx-auto px-6">
            <motion.div variants={itemVariants}>
              <Link
                to="/"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors mb-10"
              >
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                Back to Archive
              </Link>
            </motion.div>

            <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-end">
              <div>
                <motion.h1 
                  variants={itemVariants}
                  className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent leading-none"
                >
                  {project.title}
                </motion.h1>
                <motion.p 
                  variants={itemVariants}
                  className="max-w-2xl text-gray-400 text-xl md:text-2xl leading-relaxed font-light"
                >
                  {project.shortDescription || "Elevating digital standards through thoughtful design and robust engineering."}
                </motion.p>
              </div>

              <motion.div 
                variants={itemVariants}
                className="flex flex-col gap-4 w-full"
              >
                {project.liveLink && (
                  <Magnetic>
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between group rounded-xl bg-[#ffbd39] px-6 py-4 text-black font-bold hover:bg-amber-400 transition-all w-full shadow-lg shadow-[#ffbd39]/15"
                    >
                      View Live Site <ExternalLink size={18} />
                    </a>
                  </Magnetic>
                )}
                {project.repoLink && (
                  <Magnetic>
                    <a
                      href={project.repoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between group rounded-xl border border-white/10 bg-[#0e0e0e]/80 px-6 py-4 text-white font-semibold hover:bg-zinc-900 transition-all w-full shadow-lg"
                    >
                      GitHub Source <Github size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                    </a>
                  </Magnetic>
                )}
                {project.pdfUrl && (
                  <div className="flex gap-3">
                    <Magnetic>
                      <a
                        href={project.pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 group rounded-xl bg-zinc-900 px-4 py-4 text-white font-semibold hover:bg-zinc-800 transition-all border border-white/5 shadow-lg"
                      >
                        View PDF <FileText size={18} />
                      </a>
                    </Magnetic>
                    <Magnetic>
                      <a
                        href={project.pdfUrl}
                        download
                        className="flex items-center justify-center group rounded-xl bg-zinc-900 px-4 py-4 text-white font-semibold hover:bg-zinc-800 transition-all border border-white/5 shadow-lg"
                        title="Download"
                      >
                        <Download size={18} />
                      </a>
                    </Magnetic>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </header>

        {/* Project Meta Grid (Glassmorphism card) */}
        <motion.section 
          variants={itemVariants}
          className="max-w-5xl mx-auto px-6 py-6"
        >
          <div className="rounded-3xl border border-white/5 bg-[#0e0e0e]/60 backdrop-blur-md p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 shadow-2xl relative overflow-hidden">
            {/* Soft grid background detail */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:16px_16px]" />
            
            <div className="relative z-10">
              <span className="block text-[10px] uppercase tracking-[0.25em] text-gray-500 font-bold mb-3">Category</span>
              <span className="text-sm font-semibold flex items-center gap-2 text-white">
                <Layers size={16} className="text-[#ffbd39]" /> {project.category || "Design & Tech"}
              </span>
            </div>
            
            <div className="relative z-10">
              <span className="block text-[10px] uppercase tracking-[0.25em] text-gray-500 font-bold mb-3">Year</span>
              <span className="text-sm font-semibold flex items-center gap-2 text-white">
                <Calendar size={16} className="text-[#ffbd39]" /> {project.year || "2025"}
              </span>
            </div>

            <div className="relative z-10">
              <span className="block text-[10px] uppercase tracking-[0.25em] text-gray-500 font-bold mb-3">Role</span>
              <span className="text-sm font-semibold flex items-center gap-2 text-white">
                <User size={16} className="text-[#ffbd39]" /> {project.role || "Lead Designer"}
              </span>
            </div>

            <div className="relative z-10">
              <span className="block text-[10px] uppercase tracking-[0.25em] text-gray-500 font-bold mb-3">Tech Stack</span>
              <span className="text-sm font-semibold flex items-center gap-2 text-white truncate" title={Array.isArray(project.tools) ? project.tools.join(", ") : project.tools}>
                <Wrench size={16} className="text-[#ffbd39] shrink-0" /> 
                <span className="truncate">
                  {Array.isArray(project.tools) ? project.tools.join(", ") : project.tools || "Figma, React"}
                </span>
              </span>
            </div>
          </div>
        </motion.section>

        {/* Project Gallery */}
        {project.images && project.images.length > 0 && (
          <motion.section 
            variants={itemVariants}
            className="py-16"
          >
            <div className="max-w-7xl mx-auto px-6">
              <h3 className="text-2xl font-bold mb-8 text-white tracking-tight flex items-center gap-3">
                <span className="h-6 w-1 bg-[#ffbd39] rounded-full" />
                Visual Gallery
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {project.images.map((img, idx) => (
                  <div key={img.id || idx} className="relative group overflow-hidden rounded-2xl border border-white/5 bg-[#0e0e0e] aspect-video shadow-xl hover:border-[#ffbd39]/30 transition-all duration-500">
                    <img
                      src={img.url}
                      alt={img.caption || `Gallery ${idx + 1}`}
                      loading="lazy"
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                    />
                    {img.caption && (
                      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-all duration-300">
                        <p className="text-sm text-white font-medium">{img.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Case Study Modules Rendering */}
        <main className="py-12 bg-gradient-to-b from-[#050505] to-black">
          {project.contentModules?.length ? (
            project.contentModules.map((module) => (
              <ModuleRenderer key={module.id} module={module} />
            ))
          ) : (
            <motion.section 
              variants={itemVariants}
              className="max-w-3xl mx-auto px-6 py-12"
            >
              <div
                className="prose prose-zinc dark:prose-invert prose-lg max-w-none text-gray-300 font-light"
                dangerouslySetInnerHTML={{ __html: sanitize(project.description) }}
              />
            </motion.section>
          )}
        </main>

        {/* Premium CTA Block */}
        <motion.section 
          variants={itemVariants}
          className="py-32 px-6 border-t border-white/5 relative overflow-hidden"
        >
          {/* Subtle glow behind card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ffbd39]/5 w-[600px] h-[300px] rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-4xl mx-auto rounded-[2.5rem] bg-gradient-to-b from-white/[0.02] to-transparent border border-white/5 p-12 md:p-16 text-center relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#ffbd39]/30 to-transparent" />
            
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-white leading-none">
              Have a Project in Mind?
            </h2>
            <p className="text-gray-400 mb-12 text-lg max-w-md mx-auto leading-relaxed font-light">
              Let's join forces and build a premium digital product that makes a difference.
            </p>
            
            <div className="flex justify-center">
              <Magnetic>
                <Link
                  to="/contactpage"
                  className="group flex items-center gap-2 rounded-full bg-[#ffbd39] px-10 py-4.5 font-bold hover:bg-amber-400 text-black transition-all shadow-lg shadow-[#ffbd39]/20"
                >
                  Get In Touch <ChevronRight size={18} className="transition-transform group-hover:translate-x-1 duration-300" />
                </Link>
              </Magnetic>
            </div>
          </div>
        </motion.section>
      </motion.div>

      <Footer />
    </div>
  );
};

export default ProjectDetails;