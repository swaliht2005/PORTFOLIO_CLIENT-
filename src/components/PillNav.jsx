import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-scroll';

const PillNav = ({
    logo,
    logoAlt,
    items,
    activeHref,
    className,
    ease = "power2.easeOut",
    baseColor = "rgba(255, 255, 255, 0.4)",
    pillColor = "#ffffff",
    hoveredPillTextColor = "#000000",
    pillTextColor = "#000000",
    onMobileMenuClick,
    mobileMenuOpen = false
}) => {
    const containerRef = useRef(null);
    const pillRef = useRef(null);
    const itemsRef = useRef([]);
    const itemMetricsRef = useRef([]);
    const [activeItem, setActiveItem] = useState(null);

    // Find active item index based on activeHref
    useEffect(() => {
        const index = items.findIndex(item => item.href === activeHref);
        if (index !== -1) {
            setActiveItem(index);
        }
    }, [activeHref, items]);

    const { contextSafe } = useGSAP({ scope: containerRef });

    const movePill = useCallback((index, duration = 0.5) => {
        contextSafe(() => {
            if (index === null || !pillRef.current || !itemMetricsRef.current[index]) return;

            const { offsetLeft, offsetWidth } = itemMetricsRef.current[index];

            gsap.to(pillRef.current, {
                x: offsetLeft,
                width: offsetWidth,
                duration: duration,
                ease: ease,
                opacity: 1,
                overwrite: 'auto'
            });
        })();
    }, [contextSafe, ease]);

    const handleMouseEnter = (index) => {
        movePill(index);
    };

    const handleMouseLeave = () => {
        if (activeItem !== null && itemMetricsRef.current[activeItem]) {
            movePill(activeItem);
        } else {
            gsap.to(pillRef.current, { opacity: 0, duration: 0.3 });
        }
    };

    // Initial positioning
    useLayoutEffect(() => {
        if (activeItem !== null && itemMetricsRef.current[activeItem]) {
            const metrics = itemMetricsRef.current[activeItem];
            gsap.set(pillRef.current, {
                x: metrics.offsetLeft,
                width: metrics.offsetWidth,
                opacity: 1
            });
        } else {
            gsap.set(pillRef.current, { opacity: 0 });
        }
    }, [activeItem]);

    useLayoutEffect(() => {
        const updateMetrics = () => {
            itemMetricsRef.current = itemsRef.current.map(el => el ? {
                offsetLeft: el.offsetLeft,
                offsetWidth: el.offsetWidth
            } : null);
            if (activeItem !== null && itemMetricsRef.current[activeItem]) {
                const metrics = itemMetricsRef.current[activeItem];
                gsap.set(pillRef.current, {
                    x: metrics.offsetLeft,
                    width: metrics.offsetWidth,
                });
            }
        };
        
        updateMetrics();
        window.addEventListener('resize', updateMetrics);
        return () => window.removeEventListener('resize', updateMetrics);
    }, [activeItem, items.length]);

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
            <div 
                ref={containerRef}
                className="hidden md:flex relative items-center gap-1 bg-white/5 backdrop-blur-sm rounded-full p-2 border border-white/10" 
                onMouseLeave={handleMouseLeave}
            >
                {/* Moving Pill Background */}
                <div 
                    ref={pillRef} 
                    className="absolute top-2 bottom-2 left-0 rounded-full" 
                    style={{ backgroundColor: pillColor, pointerEvents: 'none', zIndex: 0 }} 
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
                        className="relative z-10 px-6 py-2 text-sm font-medium cursor-pointer transition-colors duration-300 rounded-full"
                        ref={el => itemsRef.current[index] = el}
                        onMouseEnter={() => handleMouseEnter(index)}
                        style={{ color: activeItem === index ? hoveredPillTextColor : baseColor }}
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
