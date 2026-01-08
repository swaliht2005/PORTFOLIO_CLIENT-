import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import api from '../api';
import swalihProfile from '../assets/swalih_profile.jpg';

const NavbarTwo = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [profileLogo, setProfileLogo] = useState(swalihProfile);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await api.get('/auth/profile');
                    if (res.data?.avatar) {
                        setProfileLogo(res.data.avatar);
                    }
                } catch (error) {
                    console.error('Failed to fetch profile logo:', error);
                }
            }
        };
        fetchProfile();
    }, []);

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'About', path: '/about' },
        { label: 'Projects', path: '/projects' },
        { label: 'Contact', path: '/contact' },
    ];

    return (
        <>
            <nav className={`fixed w-full z-50 transition-all duration-300 px-4 sm:px-10 ${scrolled ? 'bg-[#050510]/90 backdrop-blur-md py-3' : 'bg-transparent py-5'
                }`}>
                <div className="max-w-7xl mx-auto flex items-center justify-between">

                    {/* Logo - Circular as per screenshot */}
                    <Link to="/" className="flex-shrink-0">
                        <div className="h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden border border-white/10 transition-all duration-300 hover:scale-105 hover:border-purple-500/50">
                            <img
                                src={profileLogo}
                                alt="Logo"
                                className="h-full w-full object-cover"
                                onError={(e) => { e.target.src = swalihProfile; }}
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation - Pill Style */}
                    <div className="hidden md:flex items-center p-1.5 bg-[#12121e]/50 backdrop-blur-lg rounded-full border border-white/10">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.label}
                                    to={item.path}
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                                        ? 'bg-[#7f5eff] text-white shadow-lg shadow-purple-500/20'
                                        : 'text-gray-400 hover:text-white  hover:bg-[#7f5eff]'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-gray-300 hover:text-white transition-colors p-2 active:scale-95"
                    >
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden fixed inset-0 bg-[#050510]/98 backdrop-blur-xl z-[60] flex flex-col items-center justify-center space-y-8"
                    >
                        {/* Close button inside the menu */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
                        >
                            <FaTimes size={28} />
                        </button>

                        <div className="flex flex-col items-center gap-8">
                            {navItems.map((link, index) => (
                                <motion.div
                                    key={link.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`text-2xl sm:text-3xl font-bold tracking-tight transition-all duration-300 ${location.pathname === link.path
                                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600'
                                            : 'text-gray-300 hover:text-white'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default NavbarTwo;