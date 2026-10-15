import React, { useRef, useState, useCallback, useEffect, memo } from 'react';
import Button from '../../common/Button';
import Heading from '../generic/Heading';

export const SlideLayout = memo(({
    version = 'slide',
    col = 4,
    items = [],
    renderItem,
    children,
    gap = '12',
    scrollStep = 280,
    className = '',
    showProgress = true,
    showControls = true,
    title,
    tag,
    headingVersion = 'v2',
    header,
    actionText,
    actionLink,
    btnClass = 'rounded-30',
}) => {
    const scrollRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(100);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateScrollState = useCallback(() => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;

        if (maxScroll <= 1) {
            setScrollProgress(100);
            setCanScrollLeft(false);
            setCanScrollRight(false);
        } else {
            const progress = Math.min(100, Math.max(15, ((scrollLeft + clientWidth) / scrollWidth) * 100));
            setScrollProgress(progress);
            setCanScrollLeft(scrollLeft > 2);
            setCanScrollRight(scrollLeft < maxScroll - 2);
        }
    }, []);

    useEffect(() => {
        if (version === 'grid') return;

        updateScrollState();
        const handleResize = () => updateScrollState();
        window.addEventListener('resize', handleResize);

        let resizeObserver;
        if (typeof ResizeObserver !== 'undefined' && scrollRef.current) {
            resizeObserver = new ResizeObserver(() => updateScrollState());
            resizeObserver.observe(scrollRef.current);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            if (resizeObserver) resizeObserver.disconnect();
        };
    }, [version, items, children, updateScrollState]);

    const scroll = useCallback((direction) => {
        if (scrollRef.current) {
            const amount = direction === 'left' ? -scrollStep : scrollStep;
            scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
        }
    }, [scrollStep]);

    // ─── 1. Grid Version ───────────────────────────────────────────────────
    if (version === 'grid') {
        return (
            <div
                className={`grid-cols-${col} sm-grid-cols-2 ${className || ''}`}
                style={{ gap: `${gap}px` }}
            >
                {children || (items && renderItem && items.map((item, index) => renderItem(item, index)))}
            </div>
        );
    }

    // ─── 2. Top-Button Slider Version (btnslide) ──────────────────────────
    if (version === 'btnslide') {
        return (
            <div className={className}>
                {(title || header || showControls) && (
                    <div className="flex items-end justify-between">
                        {header || (title ? (
                            <Heading
                                version={headingVersion}
                                tag={tag}
                                title={title}
                                actionText={actionText}
                                actionLink={actionLink}
                            />
                        ) : <div />)}

                        {showControls && (
                            <div className="flex items-center gap-8">
                                <Button
                                    aria-label="Previous"
                                    icon="ChevronLeft"
                                    version="icon"
                                    variant="outline"
                                    border="tertiary"
                                    bg="transparent"
                                    color={canScrollLeft ? 'dark' : 'gray'}
                                    style={{
                                        opacity: canScrollLeft ? 1 : 0.4,
                                        cursor: canScrollLeft ? 'pointer' : 'not-allowed',
                                        pointerEvents: canScrollLeft ? 'auto' : 'none'
                                    }}
                                    className={btnClass}
                                    onClick={() => scroll('left')}
                                />
                                <Button
                                    aria-label="Next"
                                    icon="ChevronRight"
                                    version="icon"
                                    variant="outline"
                                    border="tertiary"
                                    bg="transparent"
                                    color={canScrollRight ? 'dark' : 'gray'}
                                    style={{
                                        opacity: canScrollRight ? 1 : 0.4,
                                        cursor: canScrollRight ? 'pointer' : 'not-allowed',
                                        pointerEvents: canScrollRight ? 'auto' : 'none'
                                    }}
                                    className={btnClass}
                                    onClick={() => scroll('right')}
                                />
                            </div>
                        )}
                    </div>
                )}

                <div
                    ref={scrollRef}
                    onScroll={updateScrollState}
                    style={{
                        scrollBehavior: 'smooth',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        gap: `${gap}px`
                    }}
                    className="flex overflow-auto mt-25"
                >
                    {children || (items && renderItem && items.map((item, index) => renderItem(item, index)))}
                </div>
            </div>
        );
    }

    // ─── 3. Default Slider with Bottom Progress & Buttons (slide) ─────────
    return (
        <div className={className}>
            <div
                ref={scrollRef}
                onScroll={updateScrollState}
                style={{
                    scrollBehavior: 'smooth',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    gap: `${gap}px`
                }}
                className="flex overflow-auto"
            >
                {children || (items && renderItem && items.map((item, index) => renderItem(item, index)))}
            </div>

            {(showProgress || showControls) && (
                <div className="flex items-center justify-between mt-20">
                    {showProgress && (
                        <div style={{ height: '3px' }} className="w-80 sm-w-60 bg-tertiary relative">
                            <div
                                style={{
                                    height: '3px',
                                    width: `${scrollProgress}%`,
                                    transition: 'width 0.25s ease'
                                }}
                                className="top-0 left-0 bg-primary absolute"
                            />
                        </div>
                    )}

                    {showControls && (
                        <div className="flex items-center gap-12">
                            <Button
                                aria-label="Scroll Previous"
                                onClick={() => scroll('left')}
                                icon="ArrowLeft"
                                iconWidth="18"
                                iconHeight="18"
                                iconStrokeWidth="2"
                                variant="outline"
                                version="icon"
                                color={canScrollLeft ? 'primary' : 'gray'}
                                style={{
                                    opacity: canScrollLeft ? 1 : 0.4,
                                    cursor: canScrollLeft ? 'pointer' : 'not-allowed',
                                    pointerEvents: canScrollLeft ? 'auto' : 'none'
                                }}
                                className="border-primary rounded-30"
                            />
                            <Button
                                aria-label="Scroll Next"
                                onClick={() => scroll('right')}
                                icon="ArrowRight"
                                iconWidth="18"
                                iconHeight="18"
                                iconStrokeWidth="2"
                                variant="outline"
                                version="icon"
                                color={canScrollRight ? 'primary' : 'gray'}
                                style={{
                                    opacity: canScrollRight ? 1 : 0.4,
                                    cursor: canScrollRight ? 'pointer' : 'not-allowed',
                                    pointerEvents: canScrollRight ? 'auto' : 'none'
                                }}
                                className="border-primary rounded-30"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
});

SlideLayout.displayName = 'SlideLayout';
export default SlideLayout;
