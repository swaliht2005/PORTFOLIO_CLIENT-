import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const ContactCTA = () => {
    return (
        <section className="w-full py-16 px-4 md:px-8 bg-black flex justify-center">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-5xl rounded-[2.5rem] overflow-hidden relative p-10 md:p-16 text-center"
                style={{
                    background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #3b82f6 100%)'
                }}
            >
                {/* Background glow effects */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-[80px]"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-900/20 rounded-full blur-[80px]"></div>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                        Have a project in mind? <br className="hidden md:block" />
                        Let's build something amazing <br className="hidden md:block" />
                        together.
                    </h2>

                    <p className="text-white/90 text-sm md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                        Whether you're looking for a fresh design or a complete technical overhaul, I'm
                        here to help you bring your vision to life.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                        <a
                            href="mailto:salumuhammadswalih@gmail.com"
                            className="group flex items-center justify-center gap-2 bg-white text-purple-600 px-8 py-3.5 rounded-full font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg min-w-[200px]"
                        >
                            <Mail size={20} className="group-hover:-translate-y-1 transition-transform duration-300" />
                            <span>Send an Email</span>
                        </a>

                        <a
                            href="https://wa.me/918095635402"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-3.5 rounded-full font-semibold transition-all hover:scale-105 active:scale-95 hover:bg-white/30 min-w-[200px]"
                        >
                            <FaWhatsapp size={20} className="group-hover:-translate-y-1 transition-transform duration-300" />
                            <span>Quick WhatsApp</span>
                        </a>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default ContactCTA;
