import React, { useState, useMemo, useCallback } from 'react';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Button from '../../../components/common/Button';
import Icon from '../../../components/common/Icon';

const collection = {
    title: 'Heritage Living',
    description: 'We are a results-driven IT consulting team helping businesses unlock efficiency, scale operations, and improve customer experience.',
    thumbnails: [
        'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=200&q=80',
        'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=200&q=80',
        'https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=200&q=80'
    ]
};

const sellerTypes = [
    {
        id: 'manufacture',
        name: 'Manufacture',
        sphereGradient: 'radial-gradient(circle at 32% 28%, #ffffff 0%, #fdba74 25%, #ea580c 60%, #9a3412 100%)',
        accentColor: '#ea580c',
        glowColor: 'rgba(234, 88, 12, 0.35)',
        category: 'PRODUCTION & SUPPLY CHAIN',
        features: [
            { icon: 'Product', label: 'Batch production tracking' },
            { icon: 'Inventory', label: 'Raw material inventory sync' },
            { icon: 'Check', label: 'Automated dispatch verification' }
        ],
        collaboratesWith: ['Trader', 'Stockist']
    },
    {
        id: 'trader',
        name: 'Trader',
        sphereGradient: 'radial-gradient(circle at 32% 28%, #ffffff 0%, #94a3b8 25%, #334155 60%, #0f172a 100%)',
        accentColor: '#334155',
        glowColor: 'rgba(51, 65, 85, 0.35)',
        category: 'COMMODITY & LIQUIDITY',
        features: [
            { icon: 'TrendingUp', label: 'Real-time bid-ask matching' },
            { icon: 'CreditCard', label: 'Margin & credit clearance' },
            { icon: 'Receipt', label: 'Multi-currency settlement' }
        ],
        collaboratesWith: ['Manufacture', 'Wholeseller']
    },
    {
        id: 'vendor',
        name: 'Vendor',
        sphereGradient: 'radial-gradient(circle at 32% 28%, #ffffff 0%, #93c5fd 25%, #2563eb 60%, #1e3a8a 100%)',
        accentColor: '#2563eb',
        glowColor: 'rgba(37, 99, 235, 0.35)',
        category: 'SUPPLIER PROCUREMENT',
        features: [
            { icon: 'Users', label: 'Catalog management' },
            { icon: 'ShoppingBag', label: 'Automated purchase orders' },
            { icon: 'Check', label: 'Quality compliance audits' }
        ],
        collaboratesWith: ['Wholeseller', 'Stockist']
    },
    {
        id: 'stockist',
        name: 'Stockist',
        sphereGradient: 'radial-gradient(circle at 32% 28%, #ffffff 0%, #fde047 25%, #d97706 60%, #78350f 100%)',
        accentColor: '#d97706',
        glowColor: 'rgba(217, 119, 6, 0.35)',
        category: 'BUFFER & INVENTORY DEPOT',
        features: [
            { icon: 'Inventory', label: 'Dynamic reorder triggers' },
            { icon: 'Rotate', label: 'FIFO stock rotation alerts' },
            { icon: 'ShieldCheck', label: 'Multi-depot balancing' }
        ],
        collaboratesWith: ['Manufacture', 'Retailer']
    },
    {
        id: 'wholeseller',
        name: 'Wholeseller',
        sphereGradient: 'radial-gradient(circle at 32% 28%, #ffffff 0%, #d8b4fe 25%, #9333ea 60%, #581c87 100%)',
        accentColor: '#9333ea',
        glowColor: 'rgba(147, 51, 234, 0.35)',
        category: 'BULK FULFILLMENT',
        features: [
            { icon: 'Box', label: 'Volume pricing automation' },
            { icon: 'Truck', label: 'Consignment routing' },
            { icon: 'Orders', label: 'Cross-docking dispatch' }
        ],
        collaboratesWith: ['Vendor', 'Retailer']
    },
    {
        id: 'retailer',
        name: 'Retailer',
        sphereGradient: 'radial-gradient(circle at 32% 28%, #ffffff 0%, #86efac 25%, #16a34a 60%, #14532d 100%)',
        accentColor: '#16a34a',
        glowColor: 'rgba(22, 163, 74, 0.35)',
        category: 'OMNICHANNEL POINT OF SALE',
        features: [
            { icon: 'Cart', label: 'Store POS & barcode sync' },
            { icon: 'Reviews', label: 'Instant consumer checkout' },
            { icon: 'Heart', label: 'Customer loyalty engine' }
        ],
        collaboratesWith: ['Wholeseller', 'Vendor']
    },
    {
        id: 'sector',
        name: 'Sector',
        sphereGradient: 'radial-gradient(circle at 32% 28%, #ffffff 0%, #fca5a5 25%, #dc2626 60%, #7f1d1d 100%)',
        accentColor: '#dc2626',
        glowColor: 'rgba(220, 38, 38, 0.35)',
        category: 'ECOSYSTEM GOVERNANCE',
        features: [
            { icon: 'Network', label: 'Trade corridor coordination' },
            { icon: 'Building', label: 'Regulatory compliance' },
            { icon: 'Globe', label: 'Market index benchmarking' }
        ],
        collaboratesWith: ['Manufacture', 'Trader']
    }
];

const GlossySphere = React.memo(({ gradient, size = 16 }) => (
    <div
        className="rounded-full relative overflow-hidden flex items-center justify-center flex-shrink-0"
        style={{
            width: `${size}px`,
            height: `${size}px`,
            background: gradient,
            boxShadow: 'inset -2px -2px 6px rgba(0,0,0,0.35), inset 2px 3px 5px rgba(255,255,255,0.95), 0 4px 10px rgba(0,0,0,0.12)'
        }}
    >
        <div
            style={{
                position: 'absolute',
                top: '12%',
                left: '16%',
                width: '42%',
                height: '32%',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0) 75%)',
                transform: 'rotate(-25deg)',
                pointerEvents: 'none'
            }}
        />
    </div>
));

const SellerNode = React.memo(({ item, isActive, onClick }) => (
    <div
        onClick={onClick}
        className="bg-white b-shadow absolute cursor-pointer flex items-center gap-8 rounded-20 px-16 py-6 z-20"
        style={{
            top: `${item.y}%`,
            left: `${item.x}%`,
            transform: 'translate(-50%, -50%)',
            border: isActive ? `1px solid ${item.accentColor}` : '1px solid var(--tertiary)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
    >
        <GlossySphere gradient={item.sphereGradient} size={16} />
        <p
            className="small-text font-400 whitespace-nowrap"
            style={{
                color: isActive ? 'var(--dark)' : 'var(--dark)'
            }}
        >
            {item.name}
        </p>
    </div>
));

const ActiveSellerCard = React.memo(({ seller, onSelectCollaborator }) => (
    <div
        className="relative bg-white b-shadow rounded-10 p-13 z-10"
        style={{ minWidth: '239px' }}
    >
        <div className="flex items-center gap-6 bordb pb-6">
            <GlossySphere gradient={seller.sphereGradient} size={16} />
            <h4 className="mid-text text-dark font-600">
                {seller.name}
            </h4>
        </div>

        <p className="mini-text font-500 text-dark mt-6">
            {seller.category}
        </p>

        <div className="grid-cols-1 gap-6 mt-5">
            {seller.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-6">
                    <Icon name={feat.icon} width="14" height="14" stroke="var(--gray)" />
                    <p className="mini-text font-400 text-gray">
                        {feat.label}
                    </p>
                </div>
            ))}
        </div>

        <p className="mini-text font-500 text-dark mt-12">
            COLLABORATES WITH
        </p>

        <div className="flex items-center gap-8 flex-wrap mt-8">
            {seller.collaboratesWith.map((collab, idx) => (
                <p
                    key={idx}
                    onClick={() => onSelectCollaborator(collab)}
                    className="cursor-pointer px-14 py-4 rounded-20 text-dark bg-tertiary mini-text font-500"
                >
                    {collab}
                </p>
            ))}
        </div>

        <Button
            text={`Explore ${seller.name}`}
            version="v3"
            color="white"
            bg='primary'
            className="mt-14 font-500"
        />
    </div>
));

const DetailSection = React.memo(() => {
    const [activeSellerId, setActiveSellerId] = useState('manufacture');

    const computedSellers = useMemo(() => {
        const total = sellerTypes.length;
        const rx = 39;
        const ry = 40.9;
        return sellerTypes.map((item, index) => {
            const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
            const x = Math.round((50 + rx * Math.cos(angle)) * 10) / 10;
            const y = Math.round((50 + ry * Math.sin(angle)) * 10) / 10;
            return { ...item, x, y };
        });
    }, []);

    const activeSeller = useMemo(() => {
        return computedSellers.find((s) => s.id === activeSellerId) || computedSellers[0];
    }, [computedSellers, activeSellerId]);

    const connectorPath = useMemo(() => {
        const targetX = activeSeller.x;
        const targetY = activeSeller.y;
        const startX = 50.5;
        const startY = 50.5;
        const cp1X = startX + (targetX - startX) * 0.35;
        const cp1Y = startY + (targetY - startY) * 0.15;
        const cp2X = startX + (targetX - startX) * 0.75;
        const cp2Y = targetY;
        return `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${targetX} ${targetY}`;
    }, [activeSeller]);

    const handleCollaboratorSelect = useCallback((name) => {
        const found = computedSellers.find((s) => s.name.toLowerCase() === name.toLowerCase());
        if (found) setActiveSellerId(found.id);
    }, [computedSellers]);

    return (
        <Container>
            <div className="grid-cols-2 sm-grid-cols-1 items-center gap-12 w-full py-50">
                <div className="pr-10 sm-pr-1">
                    <p className="mini-text text-dark border-ec w-max px-18 py-6 rounded-20 flex items-center gap-8 font-700 uppercase">
                        <Icon name="Settings" width="14" height="14" className="text-primary" />
                        Feature Collections
                    </p>
                    <h3 className="text-dark large-text font-700 mt-14 sm-mt-6">
                        Delivering Innovative Businesses.
                    </h3>
                    <p className="text-gray small-text font-400 mt-12 sm-mt-6">
                        {collection.description}
                    </p>

                    <div className="grid-cols-4 gap-12 mt-30 sm-mt-14">
                        {collection.thumbnails.map((thumb, idx) => (
                            <div key={idx}>
                                <Image
                                    src={thumb}
                                    alt={`Thumbnail ${idx + 1}`}
                                    className="flex w-full h-150 sm-h-100 object-cover rounded-10"
                                />
                            </div>
                        ))}
                    </div>

                    <Button
                        text="Shop Collection"
                        version="v2"
                        bg="dark"
                        color="white"
                        className="rounded-30 mt-30 sm-mt-20"
                    />
                </div>

                <div className="pl-10 sm-pl-1 sm-mt-20">
                    <div className="relative w-full overflow-hidden flex items-center justify-center h-600">
                        <svg
                            className="absolute top-0 left-0 w-full h-full z-10"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                        >
                            <ellipse cx="50" cy="50" rx="41" ry="41.5" fill="none" stroke="rgba(226, 232, 240, 0.85)" strokeWidth="0.35" />
                            <ellipse cx="50" cy="50" rx="31" ry="31" fill="none" stroke="rgba(226, 232, 240, 0.85)" strokeWidth="0.35" />
                            <ellipse cx="50" cy="50" rx="21" ry="21" fill="none" stroke="rgba(226, 232, 240, 0.85)" strokeWidth="0.35" />

                            <path
                                d={connectorPath}
                                fill="none"
                                stroke={activeSeller.accentColor}
                                strokeWidth="0.6"
                                strokeLinecap="round"
                                style={{
                                    transition: 'all 0.4s ease',
                                    filter: `drop-shadow(0 0 2px ${activeSeller.glowColor})`
                                }}
                            />
                        </svg>

                        {computedSellers.map((item) => (
                            <SellerNode
                                key={item.id}
                                item={item}
                                isActive={item.id === activeSellerId}
                                onClick={() => setActiveSellerId(item.id)}
                            />
                        ))}

                        <ActiveSellerCard
                            seller={activeSeller}
                            onSelectCollaborator={handleCollaboratorSelect}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
});

export default DetailSection;