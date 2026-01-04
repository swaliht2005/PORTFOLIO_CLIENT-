import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-scroll';

gsap.registerPlugin(useGSAP);

const PillNav = ({
    logo,
    logoAlt,
    items,
    activeHref,
    className,
    ease = "power2.easeOut",
    baseColor = "#000000",
    pillColor = "#ffffff",
    hoveredPillTextColor = "#ffffff",
    pillTextColor = "#000000",
    onMobileMenuClick
}) => {
    const containerRef = useRef(null);
    const pillRef = useRef(null);
    const itemsRef = useRef([]);
    const [activeItem, setActiveItem] = useState(null);

    // Find active item index based on activeHref
    useEffect(() => {
        const index = items.findIndex(item => item.href === activeHref);
        if (index !== -1) {
            setActiveItem(index);
        }
    }, [activeHref, items]);

    const { contextSafe } = useGSAP({ scope: containerRef });

    const movePill = contextSafe((target, duration = 0.5) => {
        if (!target || !pillRef.current) return;

        const { offsetLeft, offsetWidth } = target;

        gsap.to(pillRef.current, {
            x: offsetLeft,
            width: offsetWidth,
            duration: duration,
            ease: ease,
            opacity: 1
        });
    });

    const handleMouseEnter = (index, e) => {
        movePill(e.target);
        // Animate text color if needed
    };

    const handleMouseLeave = () => {
        if (activeItem !== null && itemsRef.current[activeItem]) {
            movePill(itemsRef.current[activeItem]);
        } else {
            gsap.to(pillRef.current, { opacity: 0, duration: 0.3 });
        }
    };

    // Initial positioning
    useLayoutEffect(() => {
        if (activeItem !== null && itemsRef.current[activeItem]) {
            // Immediate set for initial load
            const target = itemsRef.current[activeItem];
            gsap.set(pillRef.current, {
                x: target.offsetLeft,
                width: target.offsetWidth,
                opacity: 1
            });
        } else {
            gsap.set(pillRef.current, { opacity: 0 });
        }
    }, [activeItem]);

    return (
        <nav className={`${className} flex items-center justify-between py-4 px-6 md:px-10`} ref={containerRef} style={{ color: baseColor }}>
            {/* Logo */}
            <div className="flex items-center">
                {logo ? <img src={logo} alt={logoAlt} className="h-10 w-auto" /> : <span className="text-2xl font-bold">Logo</span>}
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex relative items-center bg-white/5 backdrop-blur-sm rounded-full p-2 border border-white/10" onMouseLeave={handleMouseLeave}>
                {/* The Pill */}
                <div
                    ref={pillRef}
                    className="absolute top-2 bottom-2 bg-white rounded-full pointer-events-none z-0"
                    style={{ backgroundColor: pillColor, height: 'calc(100% - 16px)' }}
                />

                {items.map((item, index) => (
                    <Link
                        key={index}
                        to={item.href.replace('#', '') || item.href.replace('/', '')} // Adapt for react-scroll
                        smooth={true}
                        duration={500}
                        offset={-100}
                        spy={true}
                        onSetActive={() => setActiveItem(index)}
                        className="relative z-10 px-6 py-2 text-sm font-medium cursor-pointer transition-colors duration-300"

                        ref={el => itemsRef.current[index] = el}
                        onMouseEnter={(e) => handleMouseEnter(index, e)}
                        style={{ color: activeItem === index ? hoveredPillTextColor : baseColor }}
                    >
                        <span className="mix-blend-exclusion">{item.label}</span>
                    </Link>
                ))}
            </div>

            {/* Mobile Menu Trigger (Placeholder) */}
            <div className="md:hidden" onClick={onMobileMenuClick}>
                <div className="space-y-2 cursor-pointer">
                    <div className="w-8 h-0.5 bg-current"></div>
                    <div className="w-8 h-0.5 bg-current"></div>
                    <div className="w-8 h-0.5 bg-current"></div>
                </div>
            </div>
        </nav>
    );
};

export default PillNav;
