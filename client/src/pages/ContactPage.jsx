import React from "react";
import { 
  MessageCircle, 
  Linkedin, 
  Instagram, 
  Palette, 
  Mail, 
  ArrowUpRight,
  Copy
} from "lucide-react";
import NavebarTwo from "../components/NavebarTwo";
import Footer from "../components/Footer";

const ContactCard = ({ icon: Icon, label, title, href, color }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-zinc-700 hover:bg-zinc-900"
  >
    <div className="flex items-start justify-between">
      <div className={`rounded-xl bg-zinc-800 p-3 text-white transition-colors group-hover:bg-white group-hover:text-black`}>
        <Icon size={24} />
      </div>
      <ArrowUpRight className="text-zinc-600 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" size={20} />
    </div>
    
    <div>
      <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">{label}</p>
      <h3 className="mt-1 text-xl font-semibold text-white">{title}</h3>
    </div>
  </a>
);

const ContactPage = () => {
  const email = "muhammedswalih8095@gmail.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    alert("Email copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100">
      <NavebarTwo />

      <main className="mx-auto max-w-5xl px-6 pt-32 pb-20">
        {/* Header Section */}
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Let's build <br /> 
            <span className="text-zinc-500 italic">something great.</span>
          </h1>
          <p className="max-w-xl text-lg text-zinc-400 leading-relaxed">
            I’m always open to discussing new projects, creative ideas, or 
            opportunities to be part of your visions.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Email Card (Spans 2 columns) */}
          <div className="md:col-span-2 relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black p-8">
            <div>
              <Mail className="text-blue-500 mb-6" size={32} />
              <h2 className="text-3xl font-bold text-white mb-2">Email me directly</h2>
              <p className="text-zinc-500">I usually respond within 24 hours.</p>
            </div>
            
            <div className="mt-12 flex items-center justify-between rounded-xl bg-black/50 border border-zinc-800 p-4">
              <span className="font-mono text-zinc-300 md:text-lg truncate">{email}</span>
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium hover:bg-zinc-700 transition"
              >
                <Copy size={16} /> Copy
              </button>
            </div>
          </div>

          {/* Social Links Grid */}
          <ContactCard 
            icon={Linkedin} 
            label="Professional" 
            title="LinkedIn" 
            href="https://www.linkedin.com/in/muhammed-swalih-3a12b931a/" 
          />
          <ContactCard 
            icon={MessageCircle} 
            label="Fast Chat" 
            title="WhatsApp" 
            href="https://wa.me/8095635402" 
          />
          <ContactCard 
            icon={Palette} 
            label="Portfolio" 
            title="Behance" 
            href="https://www.behance.net/muhammedswalih43" 
          />
          <ContactCard 
            icon={Instagram} 
            label="Social" 
            title="Instagram" 
            href="https://www.instagram.com/swalee_ui.ux/" 
          />

        </div>

        {/* Location/Status Footer */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-zinc-900 pt-12">
          <div className="flex items-center gap-4">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span className="text-sm font-medium text-zinc-400">Available for new projects</span>
          </div>
          <p className="text-sm text-zinc-600">Based in [Your City, Timezone]</p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;