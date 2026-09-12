import React, { useState, useMemo, useCallback } from 'react';
import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';
import Icon from '../../../components/common/Icon';
import Modal from '../../../components/common/Modal';
import FormBuilder from '../../../components/forms/FormBuilder';

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
        glowColor: 'rgba(220, 38, 38, 0.35)',
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

const SELLER_DETAILS = {
    manufacture: {
        tagline: 'Primary Producer & Automated Factory Engine',
        description: 'Drives large-scale raw material processing, multi-stage assembly runs, quality batch serialization, and dock-ready dispatch fulfillment for downstream trade partners.',
        metrics: [
            { label: 'Monthly Output', value: '250K Units', icon: 'Box' },
            { label: 'Defect Rate', value: '< 0.08%', icon: 'ShieldCheck' },
            { label: 'On-Time Dispatch', value: '99.4%', icon: 'Truck' },
            { label: 'QA Compliance', value: '100% ISO', icon: 'Check' }
        ],
        capabilities: [
            {
                title: 'Batch Serialization & BOM Tracking',
                desc: 'Full traceability from raw commodity lot numbers through to finished goods and digital certificates of analysis.',
                icon: 'Product'
            },
            {
                title: 'Factory-Floor IoT & Telemetry Sync',
                desc: 'Real-time telemetry measuring machine throughput, cycle times, downtime alerts, and automated preventive maintenance.',
                icon: 'AI'
            },
            {
                title: 'Automated Dock Gatepass & Manifests',
                desc: 'Digital electronic waybills, weight-bridge clearances, and instant dock release notifications for hauliers.',
                icon: 'Receipt'
            }
        ],
        channels: {
            sourcing: 'Raw Material Refiners & Mining Syndicates',
            dispatch: 'Trading Desks, Regional Depots & Bulk Wholesalers'
        },
        techStack: ['OPC-UA / MQTT IoT', 'SAP / ERP Sync', 'Automated ASN (EDI 856)', 'E-Waybill API']
    },
    trader: {
        tagline: 'Commodity Arbitrage & Liquidity Settlement Desk',
        description: 'Facilitates high-speed spot and forward contract clearance, bilateral counterparty risk management, multi-currency escrow, and volume liquidity balancing across global markets.',
        metrics: [
            { label: 'Daily Liquidity', value: '$4.2M+', icon: 'TrendingUp' },
            { label: 'Order Matching', value: '< 24 ms', icon: 'Zap' },
            { label: 'FX Optimization', value: '0.12% Spread', icon: 'Receipt' },
            { label: 'Escrow Settlement', value: 'T+0 Instant', icon: 'CreditCard' }
        ],
        capabilities: [
            {
                title: 'Real-Time Bid-Ask Matching Engine',
                desc: 'Sub-second order placement, continuous limit books, market depth analytics, and automated quote spreads.',
                icon: 'TrendingUp'
            },
            {
                title: 'Margin & Counterparty Credit Clearance',
                desc: 'Dynamic collateral calculation, multi-tier credit scoring, automated margin calls, and default hedging.',
                icon: 'CreditCard'
            },
            {
                title: 'Multi-Currency Settlement & Smart Escrow',
                desc: 'Instant cross-border conversions, locked smart escrow vaults, and automated release upon digital bill of lading receipt.',
                icon: 'Receipt'
            }
        ],
        channels: {
            sourcing: 'Primary Fabricators & International Refineries',
            dispatch: 'Tier-1 Wholesalers, Commodity Hubs & Import Consortia'
        },
        techStack: ['FIX Protocol 5.0', 'Multi-Currency Clearing', 'Smart Escrow Contracts', 'Real-Time Webhooks']
    },
    vendor: {
        tagline: 'Component Supplier & Specialized Catalog Provider',
        description: 'Supplies vetted industrial sub-assemblies, spare components, specialized catalog items, and contract replenishment feeds directly into enterprise corporate procurement workflows.',
        metrics: [
            { label: 'Active Catalog', value: '18,500+ SKUs', icon: 'Product' },
            { label: 'PO Turnaround', value: '< 15 Mins', icon: 'Clock' },
            { label: 'Order Fill Rate', value: '98.9%', icon: 'ShoppingCart' },
            { label: 'Vendor Rating', value: '4.9 / 5.0', icon: 'Star' }
        ],
        capabilities: [
            {
                title: 'Dynamic Electronic Catalog Management',
                desc: 'PunchOut cXML integration, live tiered pricing, inventory reservation, and rich attribute-based search.',
                icon: 'Users'
            },
            {
                title: 'Automated Purchase Requisition Routing',
                desc: 'Direct integration with enterprise ERPs to receive, parse, and confirm bulk purchase orders automatically.',
                icon: 'ShoppingBag'
            },
            {
                title: 'Quality Verification & Compliance Audit',
                desc: 'Automated verification of ISO, RoHS, and CE certifications with tamper-evident digital records.',
                icon: 'Check'
            }
        ],
        channels: {
            sourcing: 'OEM Component Fabricators & Specialty Foundries',
            dispatch: 'Regional Wholesalers & Buffer Stockists'
        },
        techStack: ['cXML PunchOut', 'EDI 850 / 855', 'GS1 Standard Barcodes', 'REST API Catalog Feed']
    },
    stockist: {
        tagline: 'Regional Buffer Depot & Cross-Dock Distribution Hub',
        description: 'Maintains strategic safety stocks, minimizes storage carrying costs via algorithmic demand forecasting, prevents stockouts, and balances stock levels across nationwide hub networks.',
        metrics: [
            { label: 'Depot Footprint', value: '1.2M sq. ft.', icon: 'Building' },
            { label: 'Inventory Turn', value: '14.2x / Year', icon: 'Rotate' },
            { label: 'FIFO Precision', value: '99.9%', icon: 'ShieldCheck' },
            { label: 'Local Dispatch', value: '< 4 Hours', icon: 'Truck' }
        ],
        capabilities: [
            {
                title: 'Dynamic Reorder & Safety Buffer Triggers',
                desc: 'Predictive lead-time algorithms that compute restock thresholds based on seasonal velocity and carrier delays.',
                icon: 'Inventory'
            },
            {
                title: 'FIFO Stock Rotation & Expiry Monitoring',
                desc: 'Lot aging alerts, batch rotation workflows, and automated markdowns for expiring perishable items.',
                icon: 'Rotate'
            },
            {
                title: 'Multi-Depot Balance & Inter-Hub Transfers',
                desc: 'Autonomous stock balancing between primary central warehouses and urban micro-fulfillment nodes.',
                icon: 'ShieldCheck'
            }
        ],
        channels: {
            sourcing: 'Domestic Producers & Import Traders',
            dispatch: 'High-Velocity Retailers & Local Merchants'
        },
        techStack: ['WMS Warehouse Sync', 'RFID / 2D Matrix Scanners', 'Automated Reorder Crons', 'Multi-Location APIs']
    },
    wholeseller: {
        tagline: 'Volume B2B Distributor & Consignment Router',
        description: 'Aggregates massive volumes across hundreds of manufacturers and suppliers, breaks bulk into commercial carton quantities, and provides regional credit terms to store networks.',
        metrics: [
            { label: 'Daily Shipments', value: '3,800+ Packs', icon: 'Box' },
            { label: 'Volume Tiering', value: 'Up to 34%', icon: 'Percent' },
            { label: 'Fleet Route Eff.', value: '95.2%', icon: 'Truck' },
            { label: 'Credit Line Auth', value: 'NET 30 / 60', icon: 'Receipt' }
        ],
        capabilities: [
            {
                title: 'Volume-Tiered Pricing Matrix Engine',
                desc: 'Automates customer tier discounts, promotional rebates, and bulk contract minimum order incentives.',
                icon: 'Box'
            },
            {
                title: 'Cross-Docking Consignment Routing',
                desc: 'Direct trailer-to-truck routing with zero floor dwell time, speeding up cross-state deliveries by 40%.',
                icon: 'Truck'
            },
            {
                title: 'Automated Account Receivable & Credit Limits',
                desc: 'Monitors real-time payment history, auto-holds orders when caps are breached, and auto-releases on credit clearance.',
                icon: 'Orders'
            }
        ],
        channels: {
            sourcing: 'Direct Manufacturers, Traders & Vendors',
            dispatch: 'Retail Store Chains, Supermarkets & Co-ops'
        },
        techStack: ['Fleet GPS Telematics', 'Dynamic Route Engine', 'Automated Invoicing Engine', 'B2B Portal API']
    },
    retailer: {
        tagline: 'Omnichannel POS & Last-Mile Consumer Storefront',
        description: 'Unifies brick-and-mortar checkout registers, digital storefronts, mobile point-of-sale systems, customer loyalty programs, and click-and-collect fulfillment channels.',
        metrics: [
            { label: 'Daily Shoppers', value: '48,000+', icon: 'Users' },
            { label: 'Scan-To-Pay', value: '< 10 Sec', icon: 'Cart' },
            { label: 'Repeat Loyalty', value: '68.5%', icon: 'Heart' },
            { label: 'Stock Sync Latency', value: '< 1.5 Sec', icon: 'Rotate' }
        ],
        capabilities: [
            {
                title: 'Store POS & Barcode Catalog Sync',
                desc: 'Fast barcode scanning, offline-resilient cash register sync, and unified inventory across all physical outlets.',
                icon: 'Cart'
            },
            {
                title: 'Instant Multi-Payment Checkout',
                desc: 'Supports contactless cards, UPI, digital wallets, split tenders, and instant digital receipt SMS/email delivery.',
                icon: 'Reviews'
            },
            {
                title: 'Loyalty Tiering & Dynamic Promotions',
                desc: 'Points accrual, targeted promotional coupons, VIP club memberships, and automated push campaign triggers.',
                icon: 'Heart'
            }
        ],
        channels: {
            sourcing: 'Wholesale Distributors & Regional Stockists',
            dispatch: 'Walk-in Shoppers, Delivery Couriers & Online Customers'
        },
        techStack: ['Cloud POS System', 'Unified Cart APIs', 'Payment Gateway Terminals', 'Loyalty Webhooks']
    },
    sector: {
        tagline: 'Cross-Industry Registry & Trade Governance Hub',
        description: 'Monitors cross-border trade corridors, enforces tax transparency, ensures ESG and labor standard adherence, and provides market index benchmarks to protect all participants.',
        metrics: [
            { label: 'Monitored Hubs', value: '14,000+ Nodes', icon: 'Network' },
            { label: 'Regulatory Rating', value: '100% Tax Compliant', icon: 'ShieldCheck' },
            { label: 'Audit Speed', value: '< 24 Hours', icon: 'Clock' },
            { label: 'ESG Benchmark', value: 'Grade AAA', icon: 'Globe' }
        ],
        capabilities: [
            {
                title: 'Trade Corridor Digital Coordination',
                desc: 'Coordinates customs clearances, bill-of-lading verifications, and cross-border transit status in real time.',
                icon: 'Network'
            },
            {
                title: 'Regulatory & Tax Compliance Engine',
                desc: 'Automates tax authority reporting, e-invoice authentication, and compliance auditing across trade groups.',
                icon: 'Building'
            },
            {
                title: 'Market Index & Pricing Benchmarks',
                desc: 'Aggregates anonymized transaction volume and price feeds to prevent price gouging and unfair cartels.',
                icon: 'Globe'
            }
        ],
        channels: {
            sourcing: 'Government Registries, Customs Portals & Trade Councils',
            dispatch: 'Registered Producers, Trading Desks & Financial Institutions'
        },
        techStack: ['Regulatory Clearing APIs', 'Audit Vault Ledger', 'National Tax Gateway Sync', 'Public Data Feeds']
    }
};

const sellerNames = sellerTypes.map((s) => s.name);

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
        className="bg-white b-shadow absolute cursor-pointer flex items-center gap-8 rounded-20 px-16 py-6"
        style={{
            top: `${item.y}%`,
            left: `${item.x}%`,
            transform: 'translate(-50%, -50%)',
            border: isActive ? `1.5px solid ${item.accentColor}` : '1px solid var(--tertiary)',
            backgroundColor: 'var(--white)',
            zIndex: isActive ? 30 : 25,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
    >
        <GlossySphere gradient={item.sphereGradient} size={16} />
        <p className="small-text font-400 whitespace-nowrap text-dark">
            {item.name}
        </p>
    </div>
));

const ActiveSellerCard = React.memo(({ seller, onSelectCollaborator, onExplore }) => (
    <div
        className="relative bg-white b-shadow rounded-10 p-13 z-20"
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
            className="mt-14 font-500 cursor-pointer w-full"
            onClick={onExplore}
        />
    </div>
));

const SellerDetailContent = React.memo(({ seller, onSelectCollaborator, onApplyRole }) => {
    const details = SELLER_DETAILS[seller.id] || SELLER_DETAILS.manufacture;

    return (
        <div className="grid-cols-1 gap-16 pb-20">
            {/* Hero Role Badge & Tagline */}
            <div
                className="rounded-10 p-16"
                style={{
                    backgroundColor: 'var(--forth, #f8fafc)',
                    border: `1.5px solid ${seller.accentColor}33`,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                }}
            >
                <div className="flex items-center justify-between gap-8 flex-wrap">
                    <div className="flex items-center gap-8">
                        <GlossySphere gradient={seller.sphereGradient} size={24} />
                        <div>
                            <h4 className="title-text font-700 text-dark">{seller.name}</h4>
                            <span
                                className="mini-text font-600 uppercase tracking-wider"
                                style={{ color: seller.accentColor }}
                            >
                                {seller.category}
                            </span>
                        </div>
                    </div>
                    <span
                        className="mini-text px-10 py-4 rounded-20 font-600"
                        style={{
                            backgroundColor: `${seller.accentColor}15`,
                            color: seller.accentColor
                        }}
                    >
                        Verified Ecosystem Role
                    </span>
                </div>

                <p className="small-text font-600 text-dark mt-12">
                    {details.tagline}
                </p>
                <p className="mini-text text-gray mt-6 leading-relaxed">
                    {details.description}
                </p>
            </div>

            {/* Performance & Operational KPIs */}
            <div>
                <p className="mini-text font-700 text-dark uppercase tracking-wider mb-8">
                    Key Performance Indicators
                </p>
                <div className="grid grid-cols-2 gap-8">
                    {details.metrics.map((metric, idx) => (
                        <div
                            key={idx}
                            className="bg-white border-ec rounded-8 p-10 flex items-center gap-10"
                            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                        >
                            <div
                                className="center-div rounded-8 flex-shrink-0"
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    backgroundColor: `${seller.accentColor}15`,
                                    color: seller.accentColor
                                }}
                            >
                                <Icon name={metric.icon} width="16" height="16" />
                            </div>
                            <div className="overflow-hidden">
                                <p className="small-text font-700 text-dark leading-tight">
                                    {metric.value}
                                </p>
                                <p className="mini-text text-gray truncate font-400 mt-2">
                                    {metric.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Core Capabilities & Modules */}
            <div>
                <p className="mini-text font-700 text-dark uppercase tracking-wider mb-8">
                    Core Automated Capabilities
                </p>
                <div className="grid-cols-1 gap-8">
                    {details.capabilities.map((cap, idx) => (
                        <div
                            key={idx}
                            className="border-ec rounded-8 p-12 bg-white flex gap-10"
                            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                        >
                            <div
                                className="center-div rounded-full flex-shrink-0 mt-2"
                                style={{
                                    width: '28px',
                                    height: '28px',
                                    backgroundColor: 'var(--tertiary)',
                                    color: 'var(--primary)'
                                }}
                            >
                                <Icon name={cap.icon} width="14" height="14" stroke="currentColor" />
                            </div>
                            <div>
                                <h5 className="mini-text font-600 text-dark">
                                    {cap.title}
                                </h5>
                                <p className="mini-text text-gray mt-2 font-400 leading-relaxed">
                                    {cap.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Supply & Sourcing Channels */}
            <div
                className="rounded-8 p-12"
                style={{ backgroundColor: 'var(--forth)', border: '1px solid var(--tertiary)' }}
            >
                <p className="mini-text font-700 text-dark uppercase tracking-wider mb-8">
                    Trade Corridor Channels
                </p>
                <div className="grid-cols-1 gap-6 mini-text">
                    <div className="flex items-start gap-6">
                        <span className="font-600 text-dark whitespace-nowrap">Inflow:</span>
                        <span className="text-gray">{details.channels.sourcing}</span>
                    </div>
                    <div className="flex items-start gap-6">
                        <span className="font-600 text-dark whitespace-nowrap">Outflow:</span>
                        <span className="text-gray">{details.channels.dispatch}</span>
                    </div>
                </div>
            </div>

            {/* Collaboration Network */}
            <div>
                <p className="mini-text font-700 text-dark uppercase tracking-wider mb-8">
                    Direct Collaborators in Network
                </p>
                <p className="mini-text text-gray mb-8">
                    Click any connected trade role below to inspect their operational profile:
                </p>
                <div className="flex items-center gap-8 flex-wrap">
                    {seller.collaboratesWith.map((collab, idx) => (
                        <button
                            type="button"
                            key={idx}
                            onClick={() => onSelectCollaborator(collab)}
                            className="cursor-pointer px-12 py-6 rounded-20 border-0 flex items-center gap-6"
                            style={{
                                backgroundColor: 'var(--white)',
                                border: '1px solid var(--tertiary)',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <span
                                className="rounded-full"
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    backgroundColor: seller.accentColor
                                }}
                            />
                            <span className="mini-text font-600 text-dark">{collab}</span>
                            <Icon name="ArrowRight" width="12" height="12" stroke="var(--gray)" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Tech Stack Integration Tags */}
            <div>
                <p className="mini-text font-700 text-dark uppercase tracking-wider mb-8">
                    System Interoperability & Standards
                </p>
                <div className="flex items-center gap-6 flex-wrap">
                    {details.techStack.map((tech, idx) => (
                        <span
                            key={idx}
                            className="mini-text px-8 py-4 rounded-5 text-gray font-500"
                            style={{
                                backgroundColor: 'var(--tertiary)',
                                fontSize: '11px'
                            }}
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-10 pt-10 bordt">
                <Button
                    text={`Select ${seller.name} for Demo`}
                    version="v3"
                    color="white"
                    bg="primary"
                    className="flex-1 font-600 cursor-pointer"
                    onClick={onApplyRole}
                />
            </div>
        </div>
    );
});

SellerDetailContent.displayName = 'SellerDetailContent';

const Step1 = React.memo(() => {
    const [activeSellerId, setActiveSellerId] = useState('manufacture');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleFormSubmit = useCallback((data) => {
        alert('Thank you! Your enquiry has been submitted.');
    }, []);

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
        const startX = 50;
        const startY = 50;
        const dx = activeSeller.x - startX;
        const dy = activeSeller.y - startY;
        const dist = Math.hypot(dx, dy) || 1;
        const offset = 3.5;
        const targetX = activeSeller.x - (dx / dist) * offset;
        const targetY = activeSeller.y - (dy / dist) * offset;
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

    const handleRoleChange = useCallback((roleName) => {
        const found = computedSellers.find((s) => s.name.toLowerCase() === roleName?.toLowerCase());
        if (found) setActiveSellerId(found.id);
    }, [computedSellers]);

    const handleCategoryChange = useCallback((catName) => {
        const found = computedSellers.find((s) => s.category.toLowerCase() === catName?.toLowerCase());
        if (found) setActiveSellerId(found.id);
    }, [computedSellers]);

    const enquiryFields = useMemo(() => [
        { name: 'name', label: 'Name', type: 'text', placeholder: 'Name', validation: { required: true } },
        { name: 'email', label: 'Email *', type: 'email', placeholder: 'Email', validation: { required: true } },
        { name: 'phone', label: 'Phone Number *', type: 'tel', placeholder: 'Phone Number', validation: { required: true } },
        {
            name: 'tradeRole',
            label: 'Seller Type',
            type: 'select',
            fieldClassName: "col-span-2",
            value: activeSeller.name,
            options: sellerNames,
            onChange: handleRoleChange,
            validation: { required: true }
        }
    ], [activeSeller.name, handleRoleChange]);

    return (
        <Container version='v0'>
            <div className="grid-cols-2 sm-grid-cols-1 gap-12 w-full h-100">
                <div className="px-30 flex items-center bg-forth">
                    <div className="relative w-full overflow-hidden flex items-center justify-center h-600">
                        <svg
                            className="absolute top-0 left-0 w-full h-full pointer-events-none"
                            style={{ zIndex: 5 }}
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
                            onExplore={() => setIsSidebarOpen(true)}
                        />
                    </div>
                </div>
                <div className="px-30 flex items-center">
                    <div>
                        <p className="mini-text text-primary border-primary w-max px-16 py-8 rounded-20 flex items-center gap-8 font-600 uppercase">
                            <Icon name="Settings" width="14" height="14" className="text-primary" />
                            Feature Collections
                        </p>
                        <h3 className="text-dark head-text uppercase font-700 mt-16 sm-mt-6">
                            Delivering Innovative Businesses.
                        </h3>
                        <p className="text-gray small-text font-400 mt-8 sm-mt-6">
                            {collection.description}
                        </p>

                        <div className='mt-20'>
                            <FormBuilder
                                version='3'
                                fields={enquiryFields}
                                onSubmit={handleFormSubmit}
                                submitType="json"
                                col="2"
                                submitText="Submit Now"
                                buttonVersion="v2"
                                buttonBg="dark"
                                buttonClassName="flex items-center justify-start mt-20"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                type="sidebar"
                placement="right"
                size="md"
                title={
                    <div className="flex items-center gap-8">
                        <GlossySphere gradient={activeSeller.sphereGradient} size={20} />
                        <span className="font-600 text-dark">{activeSeller.name} Role Details</span>
                    </div>
                }
                footer={null}
            >
                <SellerDetailContent
                    seller={activeSeller}
                    onSelectCollaborator={handleCollaboratorSelect}
                    onApplyRole={() => setIsSidebarOpen(false)}
                />
            </Modal>
        </Container>
    );
});

export default Step1;