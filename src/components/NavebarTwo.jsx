import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import api from '../api';

const NavbarTwo = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [profileLogo, setProfileLogo] = useState('/logo.png');
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
                        <div className="h-12 w-12 rounded-full overflow-hidden border border-white/10">
                            <img
                                src={profileLogo}
                                alt="Logo"
                                className="h-full w-full object-cover"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
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
                        className="md:hidden text-gray-300 hover:text-white transition-colors"
                    >
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden fixed top-0 left-0 w-full h-screen bg-[#050510] z-40 flex flex-col items-center justify-center space-y-8">
                    {navItems.map((link) => (
                        <Link
                            key={link.label}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={`text-2xl font-semibold ${location.pathname === link.path ? 'text-[#7f5eff]' : 'text-white'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
};

export default NavbarTwo;