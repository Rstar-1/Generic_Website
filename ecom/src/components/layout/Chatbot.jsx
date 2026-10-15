import React, { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../common/Button';
import Icon from '../common/Icon';
import Image from '../common/Image';
import Fields from '../forms/Fields';

import { productsData } from '../../utils/apiData';
import { resolveImagePath } from '../../utils/imageResolver';

const QUICK_ACTIONS = [
    {
        id: 'firstaid',
        title: 'Industrial First Aid',
        subtitle: 'Factories Act Types A, B, C',
        icon: 'Shield',
        iconBg: '#dc2626',
        reply: 'Shreehari Surgicals & Co. (SUPPORT) manufactures CE-certified emergency first aid kits conforming strictly to Section 45 of the Indian Factories Act:\n\n• **Type A Kit**: For heavy industrial units and factories with 50+ workers (38 items).\n• **Type B Kit**: Designed for mid-scale facilities with 20 to 50 personnel.\n• **Type C Kit**: Compact heavy-gauge sheet metal & ABS boxes for workshops up to 20 workers.\n• **Wall-Mount Medical Cabinets**: Key-locked stainless steel cabinets with clear observation windows.',
        cta: { text: 'View First Aid Kits', path: '/product?category=First%20Aid%20%26%20Emergency%20Care' }
    },
    {
        id: 'holloware',
        title: 'Hospital Holloware',
        subtitle: 'Dressing Drums & Trays',
        icon: 'Layers',
        iconBg: '#2563eb',
        reply: 'Goonj & CYNOR manufacture hospital-grade AISI 304 non-magnetic stainless steel holloware:\n\n• **Dressing Drums**: Seamless jointed & jointless deep-drawn autoclave drums.\n• **Surgical Instrument Trays**: Trays with snug-fit flat lids, catheter trays, and Mayo table trays.\n• **Patient Care Utensils**: Kidney dishes, gallipots, bedpans, and male urinals.\n• **Autoclave Proof**: Tested for sterilization up to 134°C with smooth mirror polish.',
        cta: { text: 'Explore Holloware Range', path: '/product?category=Hospital%20Holloware' }
    },
    {
        id: 'otlights',
        title: 'O.T. Lights & Autoclaves',
        subtitle: 'Shadowless LED & Sterilizers',
        icon: 'Sun',
        iconBg: '#d97706',
        reply: 'Precision clinical operation theatre, suction, and sterilization equipment:\n\n• **Cold LED OT Lights**: 7, 12, and 20 LED surgical lights with shadow-free optics (50,000h lifespan).\n• **Deluxe Steam Autoclaves**: 12x12 & 14x15 stainless steel sterilizers with dial pressure gauges.\n• **Suction Apparatus**: High-vacuum 1/4 HP heavy-duty ward and theatre suction units.',
        cta: { text: 'View OT & Sterilization', path: '/product?category=Sterilization%20%26%20Suction' }
    },
    {
        id: 'contact',
        title: 'Tenders & Wholesale',
        subtitle: 'Delhi & Mumbai Central Hubs',
        icon: 'Phone',
        iconBg: '#059669',
        reply: `Connect with our central coordination offices for institutional hospital tenders, wholesale rate cards, and bulk cargo supply:\n\n• **Delhi Hub (Goonj)**: ${import.meta.env.VITE_GOONJ_PHONE || '+91 98731 98731'} | ${import.meta.env.VITE_GOONJ_EMAIL || 'info@goonjcom.in'}\n• **Mumbai Hub (Shreehari)**: ${import.meta.env.VITE_SHREEHARI_PHONE || '+91 98179 26992'} | ${import.meta.env.VITE_SHREEHARI_EMAIL || 'shreeharisurgicals@gmail.com'}\n• **Pan-India Dispatch**: Express logistics with real-time transit consignment tracking.`,
        cta: { text: 'Submit Institutional Inquiry', path: '/connect' }
    }
];

const generateBotReply = (userText) => {
    const q = (userText || '').toLowerCase().trim();
    const allProducts = (productsData || []).filter((p) => !p.isBanner);

    // 1. First Aid & Emergency Kits / Cabinets
    if (q.includes('first aid') || q.includes('kit') || q.includes('type a') || q.includes('type b') || q.includes('type c') || q.includes('cabinet') || q.includes('burn') || q.includes('relief') || q.includes('factory act') || q.includes('support')) {
        const matching = allProducts.filter(p => (p.category || '').toLowerCase().includes('first aid') || (p.subCategory || '').toLowerCase().includes('first aid') || (p.name || '').toLowerCase().includes('first aid')).slice(0, 3);
        return {
            text: 'Shreehari Surgicals & Co. (brand SUPPORT) provides CE-certified industrial first aid equipment conforming to Section 45 of the Indian Factories Act:\n\n• **Types A, B & C Kits**: Equipped with 28 to 38 medical components, burn dressings, and multilingual resuscitation charts.\n• **Stainless Steel Wall Cabinets**: Heavy-gauge steel and SS 304 lockable medical stations.\n• **Trauma & Relief Kits**: Compact family, vehicle, and civil relief kits.',
            products: matching,
            cta: { text: 'Explore First Aid Kits', path: '/product?category=First%20Aid%20%26%20Emergency%20Care' }
        };
    }

    // 2. Emergency Stretchers & Evacuation
    if (q.includes('stretcher') || q.includes('scoop') || q.includes('spine') || q.includes('evacuation') || q.includes('stair') || q.includes('chair') || q.includes('slide') || q.includes('transfer')) {
        const matching = allProducts.filter(p => (p.name || '').toLowerCase().includes('stretcher') || (p.name || '').toLowerCase().includes('spine') || (p.name || '').toLowerCase().includes('slide') || (p.subCategory || '').toLowerCase().includes('stretcher') || (p.subCategory || '').toLowerCase().includes('chair')).slice(0, 3);
        return {
            text: 'We manufacture certified patient immobilisation and emergency rescue stretchers:\n\n• **Aluminium Scoop Stretcher**: Decouple clutch hinges enable gentle sliding under patients without spinal flexion.\n• **HDPE Spine Board**: 100% X-ray translucent, buoyant water rescue spinal immobilizer.\n• **Evacuation Stair Chair**: Wheeled compact folding chair for multi-floor stair evacuation.',
            products: matching,
            cta: { text: 'View Emergency Stretchers', path: '/product?category=First%20Aid%20%26%20Emergency%20Care' }
        };
    }

    // 3. Hospital Holloware & Utensils
    if (q.includes('holloware') || q.includes('drum') || q.includes('tray') || q.includes('catheter') || q.includes('kidney') || q.includes('bedpan') || q.includes('urinal') || q.includes('gallipot') || q.includes('stainless steel') || q.includes('ss 304')) {
        const matching = allProducts.filter(p => (p.category || '').toLowerCase().includes('holloware') || (p.name || '').toLowerCase().includes('drum') || (p.name || '').toLowerCase().includes('tray')).slice(0, 3);
        return {
            text: 'Goonj & CYNOR offer premium hospital-grade AISI 304 stainless steel holloware:\n\n• **Dressing Drums**: Autoclave sterilizing drums with perforated body vents.\n• **Instrument Trays**: With recessed flat lids, Mayo stand trays, and Cidex trays.\n• **Patient Utensils**: Contoured fracture bedpans, male urinals, and seamless kidney dishes.',
            products: matching,
            cta: { text: 'View Hospital Holloware', path: '/product?category=Hospital%20Holloware' }
        };
    }

    // 4. OT Surgical & Examination Lights
    if (q.includes('light') || q.includes('ot') || q.includes('led') || q.includes('lamp') || q.includes('theatre') || q.includes('shadowless') || q.includes('examination')) {
        const matching = allProducts.filter(p => (p.category || '').toLowerCase().includes('light') || (p.name || '').toLowerCase().includes('light')).slice(0, 3);
        return {
            text: 'Our surgical illumination range features high-efficiency cold LED optical domes:\n\n• **7 & 12 LED Lights**: Compact mobile stand procedural lamps with 35,000–50,000 Lux.\n• **20 LED OT Surgical Light**: High-intensity shadowless dome delivering up to 100,000 Lux.\n• **50,000h Diode Life**: Energy-efficient, cool beam preventing tissue dehydration.',
            products: matching,
            cta: { text: 'View OT Surgical Lights', path: '/product?category=O.T.%20%26%20Examination%20Lights' }
        };
    }

    // 5. Autoclaves & Suction Apparatus
    if (q.includes('autoclave') || q.includes('steril') || q.includes('suction') || q.includes('vacuum') || q.includes('steam')) {
        const matching = allProducts.filter(p => (p.category || '').toLowerCase().includes('sterilization') || (p.name || '').toLowerCase().includes('autoclave') || (p.name || '').toLowerCase().includes('suction')).slice(0, 3);
        return {
            text: 'Sterilization & suction apparatus built for rigorous clinical environments:\n\n• **12x12 & 14x15 Deluxe Autoclaves**: Heavy stainless steel steam pressure vessels with safety valves.\n• **Triple-Wall Radial Locking Autoclaves**: Microprocessor-controlled automatic vacuum cycle.\n• **Electric Suction Machines**: Heavy-duty 1/4 HP oil-free pump with twin glass/polycarbonate bottles.',
            products: matching,
            cta: { text: 'View Autoclaves & Suction', path: '/product?category=Sterilization%20%26%20Suction' }
        };
    }

    // 6. Hospital Furniture & Crash Carts
    if (q.includes('furniture') || q.includes('bed') || q.includes('crash cart') || q.includes('cart') || q.includes('trolley') || q.includes('ecg') || q.includes('icu') || q.includes('fowler')) {
        const matching = allProducts.filter(p => (p.category || '').toLowerCase().includes('furniture') || (p.name || '').toLowerCase().includes('cart') || (p.name || '').toLowerCase().includes('bed') || (p.name || '').toLowerCase().includes('trolley')).slice(0, 3);
        return {
            text: 'Heavy-duty hospital furniture engineered for patient comfort and emergency response:\n\n• **SSP Emergency Crash Carts**: Multi-tier locking drawers with cardiac backboard & IV pole.\n• **Stainless Steel ECG & Drug Trolleys**: Two and three-tier smooth rolling utility carts.\n• **ICU & Ward Beds**: Multi-position motorized and mechanical fowler hospital beds.',
            products: matching,
            cta: { text: 'View Hospital Furniture', path: '/product?category=Hospital%20Furniture' }
        };
    }

    // 7. Hospital Linen, Gowns & Disposables
    if (q.includes('linen') || q.includes('gown') || q.includes('scrub') || q.includes('mask') || q.includes('n95') || q.includes('ppe') || q.includes('apron') || q.includes('disposable')) {
        const matching = allProducts.filter(p => (p.category || '').toLowerCase().includes('linen') || (p.name || '').toLowerCase().includes('gown') || (p.name || '').toLowerCase().includes('mask')).slice(0, 3);
        return {
            text: 'Sterile protective apparel and hospital ward linen:\n\n• **Disposable Surgical Gowns**: Hydrophobic SMS/SMMS liquid barrier, EO sterile packed.\n• **Doctor Lab Coats & Scrubs**: Premium reusable combed cotton surgeon suits.\n• **N95 Respirators & 3-Ply Masks**: High-filtration particulate surgical masks.',
            products: matching,
            cta: { text: 'View Hospital Linen & PPE', path: '/product?category=Hospital%20Linen%20%26%20Disposables' }
        };
    }

    // 8. Wholesale / Price / Tender / Quotation
    if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('wholesale') || q.includes('quote') || q.includes('quotation') || q.includes('tender') || q.includes('bulk')) {
        const matching = allProducts.slice(0, 3);
        return {
            text: 'We provide direct manufacturer wholesale pricing and institutional tender quotations:\n\n• **Direct Factory Rates**: Zero distributor markups on hospital holloware, OT lights, and first aid kits.\n• **Bulk Tenders**: Custom specifications, rate contracts, and GST invoices provided.\n• **Pan-India Logistics**: Fast containerized cargo transit from Delhi and Mumbai warehouses.',
            products: matching,
            cta: { text: 'Request Wholesale Quotation', path: '/connect' }
        };
    }

    // 9. Contact / Address / Helplines
    if (q.includes('contact') || q.includes('phone') || q.includes('call') || q.includes('whatsapp') || q.includes('mail') || q.includes('address') || q.includes('where') || q.includes('location') || q.includes('delhi') || q.includes('mumbai')) {
        return {
            text: `Contact our verified manufacturer hubs directly:\n\n• **Delhi Hub (Goonj & CYNOR)**: 58-B, Damodar Park, Dilshad Garden, Delhi - 110095\n  Phone: +91 98731 98731 / +91 98732 98731\n  Email: info@goonjcom.in\n\n• **Mumbai Hub (Shreehari Surgicals - SUPPORT)**: Samuel Street, Masjid Bunder (W), Mumbai - 400003\n  Phone: +91 98179 26992 / +91 98205 60982\n  Email: shreeharisurgicals@gmail.com\n\n• **Business Hours**: Mon–Sat: 09:00 AM – 07:00 PM IST (Emergency Dispatch: 24/7)`,
            cta: { text: 'Go to Contact Page', path: '/connect' }
        };
    }

    // 10. General search fallback with matching products
    const matching = allProducts.filter(p =>
        p.name?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.subCategory?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.vendor?.toLowerCase().includes(q)
    ).slice(0, 3);

    if (matching.length > 0) {
        return {
            text: `Here are matching healthcare and surgical equipment items for "${userText}":`,
            products: matching,
            cta: { text: 'View Products', path: `/product?category=${encodeURIComponent(matching[0].category || 'Hospital Holloware')}` }
        };
    }

    // 11. Default friendly healthcare fallback
    return {
        text: 'I can assist you with CE-certified industrial first aid kits, emergency scoop stretchers, AISI 304 hospital holloware, shadowless cold LED surgical lights, autoclaves, and institutional wholesale tenders. How can I help you today?',
        products: allProducts.slice(0, 2),
        cta: { text: 'Explore All Products', path: '/product' }
    };
};

const ProductItem = memo(({ product, onSelect }) => {
    const rawImg = resolveImagePath(product.image || product.images?.[0] || '/products/enhanced/hd_first_aid_box.jpg');
    const priceDisplay = product.priceFormatted || (product.price != null ? `₹${product.price}` : 'Factory Pricing');
    const handleClick = useCallback(() => onSelect(product), [onSelect, product]);

    return (
        <div
            onClick={handleClick}
            className="flex items-center gap-12 p-8 bordb cursor-pointer hover:bg-forth transition-all"
        >
            <div className="rounded-6 overflow-hidden flex-shrink-0 bg-forth border-ec" style={{ width: '56px', height: '56px' }}>
                <Image
                    src={rawImg}
                    alt={product.name}
                    className="w-full h-full object-contain p-2"
                />
            </div>
            <div className="flex-1 min-w-0">
                <h5 className="headmini-text font-600 text-dark line-clamp1 m-0">{product.name}</h5>
                <p className="mini-text text-gray font-500 m-0 mt-2">
                    Brand: <span className="font-600 text-dark">{product.brand || product.vendor?.split(' ')[0]}</span> • <span className="font-600 text-danger">{priceDisplay}</span>
                </p>
            </div>
        </div>
    );
});

ProductItem.displayName = 'ProductItem';

const ProductSearch = memo(({ searchQuery, onSearchChange, onSelect, onBack }) => {
    const products = useMemo(() => {
        const q = (searchQuery || '').trim().toLowerCase();
        const list = (productsData || []).filter((p) => !p.isBanner);
        const seen = new Set();
        const matched = [];
        for (const p of list) {
            const isMatch = !q ||
                p.name?.toLowerCase().includes(q) ||
                p.category?.toLowerCase().includes(q) ||
                p.subCategory?.toLowerCase().includes(q) ||
                p.vendor?.toLowerCase().includes(q) ||
                p.brand?.toLowerCase().includes(q);
            if (isMatch && !seen.has(p.name)) {
                seen.add(p.name);
                matched.push(p);
            }
        }
        return matched;
    }, [searchQuery]);

    return (
        <div className="flex flex-column h-full bg-white" data-no-cursor="true">
            <div className="p-12 bordb bg-white">
                <div className="relative flex items-center">
                    <Fields
                        type="input"
                        version="v0"
                        placeholder="Search first aid, drums, lights, autoclaves..."
                        value={searchQuery}
                        onChange={onSearchChange}
                        icon="Search"
                        iconPosition="right"
                        className="w-full"
                    />
                    {searchQuery && (
                        <div className="absolute right-0 top-0 h-full flex items-center z-1 mx-3">
                            <Button
                                version="icon"
                                icon="Close"
                                iconWidth="13"
                                iconHeight="13"
                                iconStroke="var(--gray)"
                                bg="forth"
                                onClick={() => onSearchChange('')}
                                aria-label="Clear search"
                            />
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between mt-8">
                    <Button
                        text="Back to Chat"
                        icon="ChevronLeft"
                        version="none"
                        bg="transparent"
                        color="primary"
                        onClick={onBack}
                        className="font-500 w-max mini-text rounded-5 p-1"
                    />
                    <p className="mini-text text-gray font-500">
                        {products.length} {products.length === 1 ? 'Product' : 'Products'} Available
                    </p>
                </div>
            </div>

            <div className="overflow-auto p-8 flex-1 bg-white">
                {products.length > 0 ? (
                    products.map((p) => (
                        <ProductItem key={p.id} product={p} onSelect={onSelect} />
                    ))
                ) : (
                    <div className="p-24 text-center text-gray">
                        <Icon name="Search" width="28" height="28" stroke="var(--gray)" className="mx-auto mb-8 opacity-50" />
                        <p className="small-text font-500 text-dark m-0">No medical products found</p>
                        <p className="mini-text text-gray m-0 mt-4">Try searching for "First Aid", "Dressing Drum", "OT Light", "Autoclave", or "Stretcher"</p>
                    </div>
                )}
            </div>
        </div>
    );
});

ProductSearch.displayName = 'ProductSearch';

const ChatTeaser = memo(({ onOpen, onDismiss }) => {
    const handleDismissClick = useCallback((e) => {
        e.stopPropagation();
        onDismiss();
    }, [onDismiss]);

    return (
        <div
            onClick={onOpen}
            className="b-shadow p-10 rounded-5 cursor-pointer bg-white border-ec"
            style={{ width: '250px', maxWidth: 'calc(100vw - 48px)', animation: 'fadeInUp 0.3s ease-out' }}
            data-no-cursor="true"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-6 text-primary">
                    <Icon name="Shield" width="16" height="16" stroke="currentColor" />
                    <p className="small-text font-600 text-dark uppercase tracking-wider">HEALTHCARE DESK</p>
                </div>
                <Button
                    version="icon"
                    icon="Close"
                    iconWidth="14"
                    iconHeight="14"
                    iconStroke="var(--dark)"
                    bg="forth"
                    aria-label="Dismiss teaser"
                    onClick={handleDismissClick}
                />
            </div>
            <p className="mini-text text-dark font-500 m-0 leading-tight">
                Hi! 👋 Need hospital holloware, OT equipment, or certified first aid kits? Let's chat!
            </p>
        </div>
    );
});

ChatTeaser.displayName = 'ChatTeaser';

const ChatHeader = memo(({ onClose, activeMode, onToggleMode }) => (
    <div className="flex items-center justify-between p-14 bg-white bordb" data-no-cursor="true">
        <div className="flex items-center gap-10">
            <div className="icon-lg bg-primary relative rounded-30 flex items-center justify-center">
                <Icon name="Bot" width="20" height="20" stroke="var(--white)" strokeWidth="2" />
                <span className="absolute bg-success dot rounded-full bottom-0 right-0" />
            </div>
            <div>
                <h4 className="headmini-text font-600 text-dark m-0">
                    {activeMode === 'search' ? 'Medical Product Catalog' : 'Healthcare Assistant'}
                </h4>
                <p className="mini-text font-400 text-success m-0 mt-1">● Goonj & Shreehari Verified Live</p>
            </div>
        </div>

        <div className="flex items-center gap-6">
            <Button
                version="icon"
                icon={activeMode === 'search' ? 'Bot' : 'Search'}
                iconWidth="15"
                iconHeight="15"
                iconStroke={activeMode === 'search' ? 'var(--white)' : 'var(--dark)'}
                bg={activeMode === 'search' ? 'primary' : 'forth'}
                aria-label={activeMode === 'search' ? 'Switch to Chat' : 'Search Catalog'}
                title={activeMode === 'search' ? 'Switch to Chat' : 'Search Catalog'}
                onClick={onToggleMode}
                className="rounded-full"
            />
            <Button
                version="icon"
                icon="Close"
                iconWidth="15"
                iconHeight="15"
                iconStroke="var(--gray)"
                iconStrokeWidth="2"
                bg="forth"
                aria-label="Close Assistant"
                title="Close"
                onClick={onClose}
            />
        </div>
    </div>
));

ChatHeader.displayName = 'ChatHeader';

const ChatWelcome = memo(({ onActionClick }) => (
    <div className="h-350" data-no-cursor="true">
        <h2 className="title-text text-dark font-700 capitalize m-0">
            Healthcare Supply Desk 👋<br />
            How can we <span className="text-primary">help you</span>?
        </h2>

        <p className="mini-text text-gray mt-6 m-0 leading-relaxed">
            Explore certified first aid boxes, AISI 304 holloware, OT surgical lights, or request factory wholesale tenders.
        </p>

        <div className="grid-cols-2 gap-8 mt-12">
            {QUICK_ACTIONS.map((card) => (
                <div
                    key={card.id}
                    onClick={() => onActionClick(card)}
                    className="bg-white rounded-10 p-12 cursor-pointer hover:shadow-sm border-ec transition-shadow"
                >
                    <div
                        className="icon rounded-30 flex items-center justify-center"
                        style={{ backgroundColor: card.iconBg }}
                    >
                        <Icon name={card.icon} width="13" height="13" stroke="var(--white)" strokeWidth="2.2" />
                    </div>
                    <div className="mt-6">
                        <h5 className="headmini-text font-600 text-dark m-0">{card.title}</h5>
                        <p className="mini-text text-gray m-0 mt-2 line-clamp1">{card.subtitle}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
));

ChatWelcome.displayName = 'ChatWelcome';

const ChatMessages = memo(({ messages, isTyping, onReset, onCtaClick, onSelectProduct, messagesEndRef }) => (
    <div className="h-350" data-no-cursor="true">
        <Button
            text="Back to topics"
            icon="ChevronLeft"
            version="none"
            bg="transparent"
            color="primary"
            onClick={onReset}
            className="p-1 font-500 w-max mb-8"
        />

        {messages.map((msg, idx) => {
            const isUser = msg.sender === 'user';
            return (
                <div
                    key={idx}
                    className="flex flex-column"
                    style={{ alignItems: isUser ? 'flex-end' : 'flex-start', width: '100%' }}
                >
                    <div
                        className={`mini-text p-10 mb-8 ${isUser ? 'bg-primary text-white' : 'bg-white text-dark'}`}
                        style={{
                            maxWidth: '90%',
                            borderRadius: isUser ? '10px 10px 4px 10px' : '10px 10px 10px 4px',
                            border: isUser ? 'none' : '0.5px solid var(--tertiary)',
                            whiteSpace: 'pre-line'
                        }}
                    >
                        <p className="mini-text font-400 m-0">{msg.text}</p>
                        {msg.products && msg.products.length > 0 && (
                            <div className="mt-8 grid-cols-1 gap-6 w-full pt-6 bordt">
                                {msg.products.map((product) => (
                                    <ProductItem
                                        key={product.id}
                                        product={product}
                                        onSelect={onSelectProduct}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {msg.cta && (
                        <Button
                            text={msg.cta.text}
                            icon="ArrowRight"
                            iconPosition="right"
                            iconWidth="12"
                            iconHeight="12"
                            version="v0"
                            bg="dark"
                            color="white"
                            className="mt-4 mb-8"
                            onClick={() => onCtaClick(msg.cta.path)}
                        />
                    )}
                </div>
            );
        })}

        {isTyping && (
            <div
                className="bg-white rounded-16 p-10 flex items-center gap-4 b-shadow mb-8"
                style={{ width: 'fit-content', border: '1px solid #e2e8f0' }}
            >
                <span className="rounded-full bg-primary" style={{ width: '6px', height: '6px', animation: 'bounce 1s infinite' }} />
                <span className="rounded-full bg-primary" style={{ width: '6px', height: '6px', animation: 'bounce 1s infinite 0.2s' }} />
                <span className="rounded-full bg-primary" style={{ width: '6px', height: '6px', animation: 'bounce 1s infinite 0.4s' }} />
            </div>
        )}
        <div ref={messagesEndRef} />
    </div>
));

ChatMessages.displayName = 'ChatMessages';

const ChatInput = memo(({ inputValue, onChange, onSend }) => {
    const hasText = Boolean(inputValue?.trim());

    return (
        <div className="p-12 bg-white relative" data-no-cursor="true">
            <form onSubmit={onSend} className="relative flex items-center w-full">
                <Fields
                    type="input"
                    version="v2"
                    placeholder="Ask about first aid kits, drums, lights, quotes..."
                    value={inputValue}
                    onChange={onChange}
                    className="w-full"
                />
                <div className="absolute right-0 top-0 my-4 mx-2">
                    <Button
                        type="submit"
                        version="icon"
                        icon="Send"
                        iconWidth="18"
                        iconHeight="18"
                        iconStroke="var(--white)"
                        iconStrokeWidth="2"
                        bg={hasText ? 'primary' : 'gray'}
                        disabled={!hasText}
                        onClick={onSend}
                        aria-label="Send message"
                        title="Send"
                        className="rounded-30 p-6"
                    />
                </div>
            </form>
        </div>
    );
});

ChatInput.displayName = 'ChatInput';

const Chatbot = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [showTeaser, setShowTeaser] = useState(true);
    const [activeMode, setActiveMode] = useState('chat'); // 'chat' or 'search'
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            scrollToBottom();
        }
    }, [messages, isTyping, scrollToBottom]);

    const handleOpen = useCallback(() => {
        setIsOpen(true);
        setShowTeaser(false);
    }, []);

    const handleClose = useCallback(() => setIsOpen(false), []);
    const handleDismissTeaser = useCallback(() => setShowTeaser(false), []);
    const handleReset = useCallback(() => setMessages([]), []);

    const handleCtaClick = useCallback((path) => {
        navigate(path);
        setIsOpen(false);
    }, [navigate]);

    const handleSelectProduct = useCallback((product) => {
        navigate(`/product/${product.id}`);
        setIsOpen(false);
    }, [navigate]);

    const handleActionClick = useCallback((action) => {
        setMessages((prev) => [...prev, { sender: 'user', text: action.title }]);
        setIsTyping(true);

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { sender: 'bot', text: action.reply, cta: action.cta }
            ]);
            setIsTyping(false);
        }, 350);
    }, []);

    const handleChatInputChange = useCallback((val) => {
        setInputValue(val);
    }, []);

    const handleSend = useCallback((e) => {
        e?.preventDefault();
        const trimmed = inputValue.trim();
        if (!trimmed) return;

        setMessages((prev) => [...prev, { sender: 'user', text: trimmed }]);
        setInputValue('');
        setIsTyping(true);

        setTimeout(() => {
            const replyObj = generateBotReply(trimmed);
            setMessages((prev) => [
                ...prev,
                { sender: 'bot', text: replyObj.text, products: replyObj.products, cta: replyObj.cta }
            ]);
            setIsTyping(false);
        }, 400);
    }, [inputValue]);

    const handleToggleMode = useCallback(() => {
        setActiveMode((prev) => (prev === 'search' ? 'chat' : 'search'));
    }, []);

    const handleBackToChat = useCallback(() => {
        setActiveMode('chat');
        setInputValue('');
        setSearchQuery('');
    }, []);

    return (
        <>
            {!isOpen && (
                <div
                    style={{ position: 'fixed', bottom: '30px', right: '6px', zIndex: '88' }}
                    className="flex items-end justify-end gap-6"
                >
                    {showTeaser && (
                        <ChatTeaser
                            onOpen={handleOpen}
                            onDismiss={handleDismissTeaser}
                        />
                    )}

                    <Button
                        version="icon"
                        icon="Bot"
                        iconWidth="32"
                        iconHeight="32"
                        iconStroke="var(--white)"
                        iconStrokeWidth="2"
                        bg="primary"
                        aria-label="Open AI Assistant"
                        title="Open AI Assistant"
                        onClick={handleOpen}
                        className="rounded-30"
                    />
                </div>
            )}

            {isOpen && (
                <div
                    data-no-cursor="true"
                    style={{
                        position: 'fixed',
                        bottom: '10px',
                        right: '5px',
                        width: '360px',
                        height: '490px',
                        animation: 'fadeInUp 0.25s ease-out',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
                    }}
                    className="bg-white rounded-10 overflow-hidden z-999 flex flex-column"
                >
                    <ChatHeader
                        onClose={handleClose}
                        activeMode={activeMode}
                        onToggleMode={handleToggleMode}
                    />

                    {activeMode === 'search' ? (
                        <ProductSearch
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            onSelect={handleSelectProduct}
                            onBack={handleBackToChat}
                        />
                    ) : (
                        <>
                            <div className="overflow-auto p-16 bg-forth flex-1">
                                {messages.length === 0 ? (
                                    <ChatWelcome onActionClick={handleActionClick} />
                                ) : (
                                    <ChatMessages
                                        messages={messages}
                                        isTyping={isTyping}
                                        onReset={handleReset}
                                        onCtaClick={handleCtaClick}
                                        onSelectProduct={handleSelectProduct}
                                        messagesEndRef={messagesEndRef}
                                    />
                                )}
                            </div>

                            <ChatInput
                                inputValue={inputValue}
                                onChange={handleChatInputChange}
                                onSend={handleSend}
                            />
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default memo(Chatbot);
