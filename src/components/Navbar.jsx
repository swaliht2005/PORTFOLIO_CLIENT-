// import { useState, useEffect } from 'react';
// import { Link } from 'react-scroll';
// import { Link as RouterLink } from 'react-router-dom';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import { AnimatePresence, motion } from 'framer-motion';
// import siteData from '../data/site';
// import PillNav from './PillNav';

// const Navbar = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [scrolled, setScrolled] = useState(false);
//     const [activeSection, setActiveSection] = useState('home');
//     const profileLogo = siteData.profileLogo; // Static profile image from local assets

//     useEffect(() => {
//         const handleScroll = () => {
//             if (window.scrollY > 50) {
//                 setScrolled(true);
//             } else {
//                 setScrolled(false);
//             }
//         };
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     const navItems = [
//         { label: 'Home', href: 'home' }, // Use 'href' for consistency
//         { label: 'About', href: 'about' },
//         { label: 'Projects', href: 'projects' },
//         { label: 'Contact', href: 'contact' },
//     ];

//     return (
//         <>
//             <PillNav
//                 logo={
//                     <RouterLink to="/" aria-label="Home">
//                         <img src={profileLogo} alt="Swalih" className="h-8 w-8 rounded-full object-cover" />
//                     </RouterLink>
//                 }
//                 // The logoAlt prop is no longer needed as the alt text is inside the logo element
//                 logoAlt="Swalih"
//                 items={navItems}
//                 activeHref={activeSection}
//                 className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90  backdrop-blur-md shadow-lg' : 'bg-transparent'}`}
//                 baseColor="#e0e0e0"
//                 pillColor="#7f5eff"
//                 hoveredPillTextColor="#ffffff"
//                 pillTextColor="#ffffff"
//                 onMobileMenuClick={() => setIsOpen(!isOpen)}
//             />

//             {/* Mobile Menu Dropdown (Reused) */}
//             {/* Mobile Menu Dropdown */}
//             <AnimatePresence>
//                 {isOpen && (
//                     <motion.div
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: 'auto', opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         transition={{ duration: 0.3, ease: 'easeInOut' }}
//                         className="md:hidden fixed top-20 left-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/10 shadow-2xl z-40 overflow-hidden"
//                     >
//                         <div className="flex flex-col py-6 space-y-2">
//                             {navItems.map((link) => (
//                                 <Link
//                                     key={link.label}
//                                     activeClass="active-mobile-link"
//                                     to={link.href}
//                                     spy={true}
//                                     smooth={true}
//                                     duration={500}
//                                     onSetActive={(to) => setActiveSection(to)}
//                                     onClick={() => setIsOpen(false)}
//                                     className={`py-4 px-8 text-lg font-medium transition-all border-l-4 ${activeSection === link.href
//                                         ? 'border-[#7f5eff] text-white bg-white/5'
//                                         : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
//                                         }`}
//                                 >
//                                     {link.label}
//                                 </Link>
//                             ))}
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </>
//     );
// };

// export default Navbar;

import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import PillNav from './PillNav';

import profileLogo from '../assets/swalih_profile.jpg';

const MotionDiv = motion.div;

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        const sentinel = document.querySelector('[data-nav-sentinel]');
        if (!sentinel || !('IntersectionObserver' in window)) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => setScrolled(!entry.isIntersecting),
            { rootMargin: '-50px 0px 0px 0px', threshold: 0 }
        );

        observer.observe(sentinel);

        return () => observer.disconnect();
    }, []);

    const navItems = [
        { label: 'Home', href: 'home' },
        { label: 'About', href: 'about' },
        { label: 'Projects', href: 'projects' },
        { label: 'Contact', href: 'contact' },
    ];

    return (
        <>
            <div data-nav-sentinel className="absolute top-0 h-px w-px" aria-hidden="true" />
            <PillNav
                logo={
                    <RouterLink to="/" aria-label="Go to home">
                        <div className="flex items-center gap-2">
                            <img
                                src={profileLogo}
                                alt="Swalih"
                                className="w-10 h-10 rounded-full object-cover border border-[#ffbd39]"
                            />
                            <span className="font-bold text-white text-lg tracking-wider hidden sm:inline">
                                S<span className="text-[#ffbd39]">WALIH</span>
                            </span>
                        </div>
                    </RouterLink>
                }
                logoAlt="Swalih"
                items={navItems}
                activeHref={activeSection}
                className={`fixed w-full z-50 transition-all duration-300 ${
                    scrolled
                        ? 'bg-[#050505]/95 backdrop-blur-md shadow-lg border-b border-white/5'
                        : 'bg-transparent'
                }`}
                baseColor="#a9adb8"
                pillColor="#ffbd39"
                hoveredPillTextColor="#000000"
                pillTextColor="#000000"
                onMobileMenuClick={() => setIsOpen(!isOpen)}
                mobileMenuOpen={isOpen}
            />

            <AnimatePresence>
                {isOpen && (
                    <MotionDiv
                        layout
                        initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                        transition={{ duration: shouldReduceMotion ? 0.01 : 0.25, ease: 'easeOut' }}
                        className="motion-transform md:hidden fixed top-20 left-0 w-full bg-[#050505]/95 backdrop-blur-xl border-t border-white/10 shadow-2xl z-40 overflow-hidden"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Mobile navigation"
                    >
                        <div className="flex flex-col py-6 space-y-2">
                            {navItems.map((link) => (
                                <Link
                                    key={link.label}
                                    to={link.href}
                                    spy={true}
                                    smooth={true}
                                    duration={500}
                                    onSetActive={(to) => setActiveSection(to)}
                                    onClick={() => setIsOpen(false)}
                                    aria-current={activeSection === link.href ? 'page' : undefined}
                                    className={`py-4 px-8 text-lg font-medium transition-all border-l-4 ${
                                        activeSection === link.href
                                            ? 'border-[#ffbd39] text-[#ffbd39] bg-white/5'
                                            : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </MotionDiv>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
