import { motion, useReducedMotion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaBehance } from 'react-icons/fa';

const MotionDiv = motion.div;

const ModernProfileCard = ({ image }) => {
    const shouldReduceMotion = useReducedMotion();

    return (
        <MotionDiv
            layout
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.5 }}
            className="motion-transform relative group w-full max-w-[340px]"
        >
            {/* Animated Gradient Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#ffbd39] via-amber-400 to-[#ffbd39] rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>

            {/* Main Card Container */}
            <div className="relative h-[480px] bg-[#0c0c0c] rounded-2xl p-6 flex flex-col items-center border border-white/5 shadow-2xl overflow-hidden backdrop-blur-sm">

                {/* Decorative Background Mesh */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 -left-4 w-32 h-32 bg-[#ffbd39] rounded-full blur-2xl animate-pulse"></div>
                    <div className="absolute bottom-0 -right-4 w-32 h-32 bg-amber-600 rounded-full blur-2xl animate-pulse delay-1000"></div>
                </div>

                {/* Profile Image Area */}
                <div className="relative z-10 mt-4 mb-6">
                    <MotionDiv
                        layout
                        whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                        className="motion-transform relative w-44 h-44 rounded-full p-[3px] bg-gradient-to-tr from-[#ffbd39] to-amber-300"
                    >
                        <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#0c0c0c]">
                            <img
                                src={image}
                                alt="Muhammed Swalih profile"
                                loading="eager"
                                decoding="async"
                                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                        {/* Status Dot */}
                        <div className="absolute bottom-3 right-3 w-6 h-6 bg-[#0c0c0c] rounded-full flex items-center justify-center">
                            <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-[#0c0c0c] animate-pulse"></div>
                        </div>
                    </MotionDiv>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center w-full">
                    <h3 className="text-2xl font-bold text-white mb-1 tracking-wide group-hover:text-[#ffbd39] transition-colors">
                        Muhammed Swalih
                    </h3>
                    <p className="text-sm font-medium text-gray-400 mb-6 bg-white/5 py-1 px-4 rounded-full border border-white/5">
                        Creative Designer 
                    </p>

                    {/* Tech Flags/Skills */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8 w-full px-2">
                        {['UI/UX','React.js', 'HTML', 'CSS','Wordpress' ].map((tech) => (
                            <span key={tech} className="px-3 py-1 text-xs font-semibold text-gray-300 bg-white/5 border border-white/5 rounded-md hover:bg-white/10 hover:border-[#ffbd39]/30 hover:text-[#ffbd39] transition-all cursor-default">
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-6 mt-auto">
                        <SocialLink Icon={FaGithub} href="https://github.com/swaliht2005/" label="GitHub" />
                        <SocialLink Icon={FaLinkedin} href="https://www.linkedin.com/in/muhammed-swalih-3a12b931a/" label="LinkedIn" />
                        <SocialLink Icon={FaBehance} href="https://www.behance.net/muhammedswalih43" label="Behance" />
                        <SocialLink Icon={FaInstagram} href="https://www.instagram.com/swalee_ui.ux/" label="Instagram" />
                    </div>
                </div>
            </div>
        </MotionDiv>
    );
};

const SocialLink = ({ Icon, href, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="w-11 h-11 flex items-center justify-center text-gray-400 hover:text-[#ffbd39] transform hover:scale-120 hover:-translate-y-1 transition-all duration-300 hover:bg-white/5 rounded-full"
    >
        <Icon size={20} />
    </a>
);

export default ModernProfileCard;
