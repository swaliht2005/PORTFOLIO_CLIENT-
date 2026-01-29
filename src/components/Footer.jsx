import { FaGithub, FaLinkedin, FaInstagram, FaBehance, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer name="contact" className="bg-black text-gray-300 pt-20 pb-10 border-t border-white/10 relative overflow-hidden">

            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px]"></div>
                <div className="absolute top-1/2 -right-24 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    {/* Brand / About */}
                    <div className="col-span-1">
                        <h3 className="text-2xl font-bold text-white mb-6 tracking-wide">
                            Muhammed <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e94560] to-[#7f5eff]">Swalih</span>
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed mb-6">
                            Crafting seamless digital experiences with pixel-perfect design and robust code. Let's create something extraordinary.
                        </p>
                        <div className="flex gap-4">
                            <SocialLink Icon={FaGithub} href="https://github.com/swaliht2005/" />
                            <SocialLink Icon={FaLinkedin} href="https://www.linkedin.com/in/muhammed-swalih-3a12b931a/" />
                            <SocialLink Icon={FaBehance} href="https://www.behance.net/muhammedswalih43" />
                            <SocialLink Icon={FaInstagram} href="https://www.instagram.com/swalee_ui.ux/" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-sm">
                            <li><FooterLink href="#" label="Home" /></li>
                            <li><FooterLink href="#" label="About" /></li>
                            <li><FooterLink href="#" label="Projects" /></li>
                            <li><FooterLink href="#" label="Contact" /></li>
                        </ul>
                    </div>

                    {/* Services/Support */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6">Services</h4>
                        <ul className="space-y-3 text-sm">
                            <li><FooterLink href="#" label="UI/UX Design" /></li>
                            <li><FooterLink href="#" label="Web Development" /></li>
                            <li><FooterLink href="#" label="Mobile Apps Design" /></li>
                            <li><FooterLink href="#" label="Consulting" /></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6">Contact Info</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3 text-gray-400 group">
                                <FaPhone className="mt-1 text-[#e94560] group-hover:text-[#7f5eff] transition-colors" />
                                <span className="group-hover:text-white transition-colors">+91 8095635402</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-400 group">
                                <FaEnvelope className="mt-1 text-[#e94560] group-hover:text-[#7f5eff] transition-colors" />
                                <span className="break-all group-hover:text-white transition-colors">salumuhammadswalih@gmail.com</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-400 group">
                                <FaMapMarkerAlt className="mt-1 text-[#e94560] group-hover:text-[#7f5eff] transition-colors" />
                                <span className="group-hover:text-white transition-colors">Malappuram, Kerala, India</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Muhammed Swalih. All rights reserved.</p>
                    <p className="mt-2 md:mt-0">
                        Designed & Built with <span className="text-red-500">♥</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

const SocialLink = ({ Icon, href }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-gradient-to-r hover:from-[#e94560] hover:to-[#7f5eff] hover:text-white hover:border-transparent transform hover:-translate-y-1 transition-all duration-300"
    >
        <Icon size={18} />
    </a>
);

const FooterLink = ({ href, label }) => (
    <a href={href} className="text-gray-400 hover:text-[#e94560] transition-colors relative group">
        <span className="relative z-10">{label}</span>
        <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#e94560] group-hover:w-full transition-all duration-300"></span>
    </a>
);

export default Footer;
