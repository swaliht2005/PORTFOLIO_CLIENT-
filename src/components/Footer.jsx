import { FaFacebook, FaLinkedin, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer name="contact" className="bg-white text-gray-800 pt-16 pb-8 border-t border-gray-100">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand / About */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-xl font-bold mb-4">About</h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-6">
                            Designing clean, meaningful, and user-friendly digital experiences.
                            Let's build something creative together.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                                <FaFacebook size={14} />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                                <FaLinkedin size={14} />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all">
                                <FaInstagram size={14} />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                                <FaLinkedin size={14} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Quick Links</h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Home</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Projects</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Support</h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Design Process</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Case Studies</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Resume</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Contact Info</h3>
                        <ul className="space-y-4 text-sm text-gray-600">
                            <li className="flex items-start gap-3">
                                <FaPhone className="mt-1 text-gray-400" />
                                <span>+91 8095635402</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaEnvelope className="mt-1 text-gray-400" />
                                <span className="break-all">salumuhammadswalih@gmail.com</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaMapMarkerAlt className="mt-1 text-gray-400" />
                                <span>Malappuram, Kerala, India</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-100 pt-8 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Muhammed Swalih. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
