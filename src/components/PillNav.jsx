import React, { useState } from 'react';
import { Link } from 'react-scroll';

const PillNav = ({
    logo,
    logoAlt,
    items,
    activeHref,
    className,
    baseColor = "#000000",
    pillColor = "#ffffff",
    pillTextColor = "#000000",
    onMobileMenuClick,
    mobileMenuOpen = false
}) => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const activeItem = items.findIndex(item => item.href === activeHref);

    return (
        <nav className={`${className} flex items-center justify-between py-4 px-6 md:px-10`} style={{ color: baseColor }} aria-label="Primary navigation">
            {/* Logo */}
            <div className="flex items-center">
                {logo ? (
                    typeof logo === 'string' ? (
                        <img src={logo} alt={logoAlt} className="h-10 w-auto" />
                    ) : (
                        logo
                    )
                ) : (
                    <span className="text-2xl font-bold">Logo</span>
                )}
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex relative items-center gap-1 bg-white/5 backdrop-blur-sm rounded-full p-2 border border-white/10" onMouseLeave={() => setHoveredItem(null)}>
                {items.map((item, index) => (
                    <Link
                        key={index}
                        to={item.href.replace('#', '') || item.href.replace('/', '')} // Adapt for react-scroll
                        smooth={true}
                        duration={500}
                        offset={-100}
                        spy={true}
                        aria-current={activeItem === index ? 'page' : undefined}
                        className="relative z-10 px-6 py-2 text-sm font-medium cursor-pointer rounded-full transition-[background-color,color,transform] duration-300"
                        onMouseEnter={() => setHoveredItem(index)}
                        style={{
                            backgroundColor: hoveredItem === index || activeItem === index ? pillColor : 'transparent',
                            color: hoveredItem === index || activeItem === index ? pillTextColor : baseColor
                        }}
                    >
                        <span>{item.label}</span>
                    </Link>
                ))}
            </div>

            {/* Mobile Menu Trigger (Placeholder) */}
            <button
                type="button"
                className="md:hidden text-current"
                onClick={onMobileMenuClick}
                aria-label="Open navigation menu"
                aria-expanded={mobileMenuOpen}
            >
                <div className="space-y-2 cursor-pointer">
                    <div className="w-8 h-0.5 bg-current"></div>
                    <div className="w-8 h-0.5 bg-current"></div>
                    <div className="w-8 h-0.5 bg-current"></div>
                </div>
            </button>
        </nav>
    );
};

export default PillNav;
