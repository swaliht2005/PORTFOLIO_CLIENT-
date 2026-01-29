import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import api from '../api';
import PillNav from './PillNav';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [profileLogo, setProfileLogo] = useState('/swalih.png'); // Default logo

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/auth/admin-profile');
                if (res.data && res.data.avatar) {
                    setProfileLogo(res.data.avatar);
                }
            } catch (error) {
                console.error('Failed to fetch profile logo:', error);
            }
        };
        fetchProfile();
    }, []);

    const navItems = [
        { label: 'Home', href: 'home' }, // Use 'href' for consistency
        { label: 'About', href: 'about' },
        { label: 'Projects', href: 'projects' },
        { label: 'Contact', href: 'contact' },
    ];

    return (
        <>
            <PillNav
                logo={
                    <RouterLink to="/" aria-label="Home">
                        <img src={profileLogo} alt="Swalih" className="h-8 w-8 rounded-full object-cover" />
                    </RouterLink>
                }
                // The logoAlt prop is no longer needed as the alt text is inside the logo element
                logoAlt="Swalih"
                items={navItems}
                activeHref={activeSection}
                className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90  backdrop-blur-md shadow-lg' : 'bg-transparent'}`}
                baseColor="#e0e0e0"
                pillColor="#7f5eff"
                hoveredPillTextColor="#ffffff"
                pillTextColor="#ffffff"
                onMobileMenuClick={() => setIsOpen(!isOpen)}
            />

            {/* Mobile Menu Dropdown (Reused) */}
            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="md:hidden fixed top-20 left-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/10 shadow-2xl z-40 overflow-hidden"
                    >
                        <div className="flex flex-col py-6 space-y-2">
                            {navItems.map((link) => (
                                <Link
                                    key={link.label}
                                    activeClass="active-mobile-link"
                                    to={link.href}
                                    spy={true}
                                    smooth={true}
                                    duration={500}
                                    onSetActive={(to) => setActiveSection(to)}
                                    onClick={() => setIsOpen(false)}
                                    className={`py-4 px-8 text-lg font-medium transition-all border-l-4 ${activeSection === link.href
                                        ? 'border-[#7f5eff] text-white bg-white/5'
                                        : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;