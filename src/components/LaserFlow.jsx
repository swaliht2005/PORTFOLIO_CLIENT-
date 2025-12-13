import { useRef, useCallback, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import gsap from 'gsap';

const LaserFlow = ({
    glowColor = "132, 0, 255",
    className = "",
    style = {}
}) => {
    const containerRef = useRef(null);
    const coreRef = useRef(null);
    const particlesRef = useRef([]);

    // Create particles
    useEffect(() => {
        if (!containerRef.current) return;

        const createParticle = () => {
            if (!containerRef.current) return;
            const width = containerRef.current.clientWidth;
            const height = containerRef.current.clientHeight;

            const el = document.createElement('div');
            el.className = 'laser-particle';

            // Random position near the center x
            const x = width / 2 + (Math.random() - 0.5) * 60; // Spread around center
            const y = height;

            el.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 20 + 10}px;
            background: rgba(${glowColor}, ${Math.random() * 0.5 + 0.2});
            border-radius: 4px;
            pointer-events: none;
            filter: blur(${Math.random()}px);
            z-index: 10;
        `;

            containerRef.current.appendChild(el);
            particlesRef.current.push(el);

            // Animate up
            gsap.to(el, {
                y: -100,
                opacity: 0,
                duration: Math.random() * 1.5 + 1,
                ease: "power1.out",
                onComplete: () => {
                    el.remove();
                    particlesRef.current = particlesRef.current.filter(p => p !== el);
                }
            });
        };

        const interval = setInterval(createParticle, 50); // density
        return () => {
            clearInterval(interval);
            particlesRef.current.forEach(p => p.remove());
        };
    }, [glowColor]);

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden ${className}`}
            style={{
                ...style,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'end'
            }}
        >
            {/* Central Beam */}
            <motion.div
                ref={coreRef}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: '100%', opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{
                    width: '4px',
                    background: `linear-gradient(to top, rgba(${glowColor}, 0) 0%, rgba(${glowColor}, 1) 50%, rgba(${glowColor}, 0) 100%)`,
                    boxShadow: `0 0 20px 2px rgba(${glowColor}, 0.6), 0 0 40px 10px rgba(${glowColor}, 0.2)`,
                    position: 'absolute',
                    bottom: 0,
                    zIndex: 20
                }}
            />

            {/* Secondary wider glow */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 0.5, duration: 2 }}
                style={{
                    width: '60px',
                    height: '100%',
                    background: `linear-gradient(to top, rgba(${glowColor}, 0) 0%, rgba(${glowColor}, 0.4) 100%)`,
                    filter: 'blur(20px)',
                    position: 'absolute',
                    bottom: 0,
                    zIndex: 15
                }}
            />
        </div>
    );
};

export default LaserFlow;
