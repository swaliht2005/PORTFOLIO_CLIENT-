import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import PillNav from './PillNav';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [profileLogo, setProfileLogo] = useState('/logo.png'); // Default logo

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
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await axios.get('https://portfolio-server-ekep.onrender.com/api/auth/profile', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    // Use 'avatar' to match the Profile component
                    if (res.data && res.data.avatar) {
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
                className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#050510]/90  backdrop-blur-md shadow-lg' : 'bg-transparent'}`}
                baseColor="#e0e0e0"
                pillColor="#7f5eff"
                hoveredPillTextColor="#ffffff"
                pillTextColor="#ffffff"
                onMobileMenuClick={() => setIsOpen(!isOpen)}
            />

            {/* Mobile Menu Dropdown (Reused) */}
            {isOpen && (
                <div className="md:hidden fixed top-20 left-0 w-full bg-[#050510] border-t border-white/10 shadow-xl z-40">
                    <div className="flex flex-col py-4">
                        {navItems.map((link) => (
                            <Link
                                key={link.label}
                                activeClass="active-mobile-link" // Optional: for styling the active link
                                to={link.href}
                                spy={true}
                                smooth={true}
                                duration={500}
                                onSetActive={(to) => setActiveSection(to)}
                                onClick={() => setIsOpen(false)}
                                // Add a class for the active state
                                className={`py-3 px-6 cursor-pointer transition-colors ${activeSection === link.href ? 'text-white bg-[#7f5eff]/20' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;