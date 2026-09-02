import React, { useEffect, useState, useRef } from 'react';

const Cursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const ringRef = useRef(null);
    const dotRef = useRef(null);
    const mouseRef = useRef({ x: -100, y: -100 });
    const ringPosRef = useRef({ x: -100, y: -100 });
    const isHoveredRef = useRef(false);

    useEffect(() => {
        // Disable on touch devices without fine hover pointers
        if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: none)').matches) {
            return;
        }

        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
            setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        const handleMouseEnter = () => {
            setIsVisible(true);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            if (!target) return;
            const isInteractive = !!target.closest(
                'a, button, input, select, textarea, label, summary, [role="button"], [role="tab"], .interactive, [class*="cursor-pointer"]'
            );
            if (isHoveredRef.current !== isInteractive) {
                isHoveredRef.current = isInteractive;
                setIsHovered(isInteractive);
            }
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);
        window.addEventListener('mouseover', handleMouseOver, { passive: true });

        let animationFrameId;
        const animate = () => {
            // Lerp ring position towards mouse position
            const lerp = 0.18;
            ringPosRef.current.x += (mouseRef.current.x - ringPosRef.current.x) * lerp;
            ringPosRef.current.y += (mouseRef.current.y - ringPosRef.current.y) * lerp;

            const scaleRing = isHoveredRef.current ? 1.6 : 1;
            const scaleDot = isHoveredRef.current ? 0.6 : 1;

            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0px) translate(-50%, -50%) scale(${scaleRing})`;
            }
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${mouseRef.current.x}px, ${mouseRef.current.y}px, 0px) translate(-50%, -50%) scale(${scaleDot})`;
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
            window.removeEventListener('mouseover', handleMouseOver);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div
            style={{
                pointerEvents: 'none',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 999999,
                overflow: 'hidden'
            }}
        >
            {/* Trailing Large Soft Ring */}
            <div
                ref={ringRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '44px',
                    height: '44px',
                    backgroundColor: isHovered ? 'rgba(255, 81, 0, 0.25)' : 'rgba(228, 162, 146, 0.45)',
                    border: isHovered ? '1.5px solid #FF5100' : '1px solid rgba(217, 68, 54, 0.3)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 999999,
                    willChange: 'transform',
                    transition: 'opacity 0.3s ease, background-color 0.3s ease, border-color 0.3s ease'
                }}
            />

            {/* Instant Small Solid Dot */}
            <div
                ref={dotRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '12px',
                    height: '12px',
                    backgroundColor: isHovered ? '#FF5100' : '#D94436',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 1000000,
                    willChange: 'transform',
                    transition: 'background-color 0.3s ease'
                }}
            />
        </div>
    );
};

export default Cursor;