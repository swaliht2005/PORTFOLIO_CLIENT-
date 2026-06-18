import React from "react";
import { 
  FaPhone, 
  FaEnvelope, 
  FaLinkedinIn, 
  FaBehance 
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactCard = ({ icon: Icon, label, value, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="group relative bg-[#0e0e0e] border border-white/5 hover:border-[#ffbd39]/30 transition-all duration-500 p-8 rounded-3xl flex flex-col items-center text-center overflow-hidden"
  >
    {/* Diamond badge */}
    <div className="relative mb-8 mt-4">
      <div className="w-14 h-14 bg-gradient-to-tr from-[#ffbd39] to-amber-300 rounded-2xl rotate-45 flex items-center justify-center shadow-[0_0_20px_rgba(255,189,57,0.3)] transition-transform duration-500 group-hover:scale-110">
        <div className="-rotate-45 text-black">
          <Icon size={20} />
        </div>
      </div>
    </div>

    <h3 className="text-lg font-bold text-white mb-2 tracking-wide uppercase">{label}</h3>
    <p className="text-gray-400 text-sm break-all font-medium max-w-full leading-relaxed px-2 transition-colors group-hover:text-gray-300">
      {value}
    </p>
  </a>
);

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col justify-between">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl px-6 pt-36 pb-24 flex-grow flex flex-col justify-center">
        {/* Title */}
        <div className="watermark-container mb-16 relative z-10">
          <span className="watermark-bg">CONTACT</span>
          <h2 className="watermark-fg">Get In Touch</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          <ContactCard 
            icon={FaPhone} 
            label="Phone" 
            value="+91 8095635402" 
            href="tel:+918095635402"
          />
          <ContactCard 
            icon={FaEnvelope} 
            label="Email" 
            value="salumuhammadswalih@gmail.com" 
            href="mailto:salumuhammadswalih@gmail.com"
          />
          <ContactCard 
            icon={FaLinkedinIn} 
            label="LinkedIn" 
            value="linkedin.com/in/muhammed-swalih-3a12b931a/" 
            href="https://www.linkedin.com/in/muhammed-swalih-3a12b931a/"
          />
          <ContactCard 
            icon={FaBehance} 
            label="Behance" 
            value="behance.net/muhammedswalih43" 
            href="https://www.behance.net/muhammedswalih43"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;