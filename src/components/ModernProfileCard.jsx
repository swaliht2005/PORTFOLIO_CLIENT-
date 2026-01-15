import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaBehance } from 'react-icons/fa';

const ModernProfileCard = ({ image }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative group w-[300px] sm:w-[340px]"
        >
            {/* Animated Gradient Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#e94560] via-[#ff4d4d] to-[#7f5eff] rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>

            {/* Main Card Container */}
            <div className="relative h-[480px] bg-[#0a0a16] rounded-2xl p-6 flex flex-col items-center border border-white/10 shadow-2xl overflow-hidden backdrop-blur-sm">

                {/* Decorative Background Mesh */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-0 -left-4 w-32 h-32 bg-purple-600 rounded-full blur-2xl animate-pulse"></div>
                    <div className="absolute bottom-0 -right-4 w-32 h-32 bg-blue-600 rounded-full blur-2xl animate-pulse delay-1000"></div>
                </div>

                {/* Profile Image Area */}
                <div className="relative z-10 mt-4 mb-6">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative w-44 h-44 rounded-full p-[3px] bg-gradient-to-tr from-[#e94560] to-[#7f5eff]"
                    >
                        <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#0a0a16]">
                            <img
                                src={image}
                                alt="Profile"
                                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                        {/* Status Dot */}
                        <div className="absolute bottom-3 right-3 w-6 h-6 bg-[#0a0a16] rounded-full flex items-center justify-center">
                            <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-[#0a0a16] animate-pulse"></div>
                        </div>
                    </motion.div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center w-full">
                    <h3 className="text-2xl font-bold text-white mb-1 tracking-wide group-hover:text-[#e94560] transition-colors">
                        Muhammed Swalih
                    </h3>
                    <p className="text-sm font-medium text-gray-400 mb-6 bg-white/5 py-1 px-4 rounded-full border border-white/5">
                        Creative Designer 
                    </p>

                    {/* Tech Flags/Skills */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8 w-full px-2">
                        {['UI/UX','React.js', 'HTML', 'CSS','Wordpress' ].map((tech) => (
                            <span key={tech} className="px-3 py-1 text-xs font-semibold text-gray-300 bg-white/5 border border-white/10 rounded-md hover:bg-white/10 hover:border-white/20 transition-all cursor-default">
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-6 mt-auto">
                        <SocialLink Icon={FaGithub} href="https://github.com/swaliht2005/" />
                        <SocialLink Icon={FaLinkedin} href="https://www.linkedin.com/in/muhammed-swalih-3a12b931a/" />
                        <SocialLink Icon={FaBehance} href="www.behance.net/muhammedswalih43" />
                        <SocialLink Icon={FaInstagram} href="https://www.instagram.com/swalee_ui.ux/" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const SocialLink = ({ Icon, href }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white transform hover:scale-120 hover:-translate-y-1 transition-all duration-300 p-2 hover:bg-white/10 rounded-full"
    >
        <Icon size={20} />
    </a>
);

export default ModernProfileCard;
