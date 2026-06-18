import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const MotionDiv = motion.div;

const ContactCTA = () => {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section className="w-full py-24 px-4 md:px-8 bg-[#050505] flex justify-center relative overflow-hidden">
            {/* Soft gold backdrop glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 bg-[#ffbd39]/5 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none"></div>

            <MotionDiv
                layout
                initial={shouldReduceMotion ? false : { opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 0.8 }}
                className="motion-transform w-full max-w-5xl rounded-[2.5rem] overflow-hidden relative p-10 md:p-16 text-center bg-white/[0.02] border border-white/5 hover:border-[#ffbd39]/20 transition-all duration-500 backdrop-blur-md"
            >
                {/* Background glow effects */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#ffbd39]/5 rounded-full blur-[80px]"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px]"></div>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                    {/* Watermark header */}
                    <div className="watermark-container mb-10">
                        <span className="watermark-bg">CONNECT</span>
                        <h2 className="watermark-fg text-2xl md:text-4xl">Let's Build Together</h2>
                    </div>

                    <h3 className="text-xl md:text-3xl font-bold text-white mb-6 leading-relaxed max-w-3xl">
                        Have a project in mind? Let's turn your vision into an extraordinary digital experience.
                    </h3>

                    <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-12 leading-relaxed">
                        Whether you are looking for a state-of-the-art interface design, a robust web build, 
                        or a complete digital redesign, I'm here to translate your concepts into reality.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
                        <a
                            href="mailto:salumuhammadswalih@gmail.com"
                            className="group flex items-center justify-center gap-2 bg-[#ffbd39] hover:bg-amber-400 text-black px-8 py-4 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,189,57,0.2)] hover:shadow-[0_0_35px_rgba(255,189,57,0.5)] transform hover:-translate-y-0.5 min-w-[200px]"
                        >
                            <Mail size={18} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
                            <span>Send an Email</span>
                        </a>

                        <a
                            href="https://wa.me/918095635402"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-[#ffbd39] border border-[#ffbd39]/30 hover:border-[#ffbd39]/70 px-8 py-4 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-300 transform hover:-translate-y-0.5 min-w-[200px]"
                        >
                            <FaWhatsapp size={18} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
                            <span>Quick WhatsApp</span>
                        </a>
                    </div>
                </div>
            </MotionDiv>
        </section>
    );
};

export default ContactCTA;
