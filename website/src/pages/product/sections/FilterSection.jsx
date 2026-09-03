import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Icon from '../../../components/common/Icon';

const initialProducts = [
    {
        id: 1,
        isBanner: true,
        title: 'Saving $30 for Lighting',
        subtitle: 'Home & Decor',
        buttonText: 'Shop Now',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 2,
        name: 'Loop Sofa Armrest',
        category: 'SOFA',
        price: 3289.00,
        originalPrice: 3369.00,
        badges: [{ text: 'Sale', bg: '#C8281E' }],
        colors: ['#8096A6', '#ADC5D6'],
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
        inStock: true
    },
    {
        id: 3,
        name: 'Spoke Sofa TonePlay',
        category: 'SOFAS',
        price: 3429.00,
        badges: [
            { text: 'Best Choice!', bg: '#1D4ED8' },
            { text: 'New', bg: '#15803D' }
        ],
        colors: ['#E6DFD5'],
        image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=600&q=80',
        inStock: true
    },
    {
        id: 4,
        name: 'Feast Chair',
        category: 'CHAIRS',
        price: 390.00,
        colors: ['#C4A484'],
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80',
        inStock: true
    },
    {
        id: 5,
        name: 'Shell Velvet Armchair',
        category: 'CHAIRS',
        price: 480.00,
        badges: [{ text: 'Best Choice!', bg: '#1D4ED8' }],
        colors: ['#4682B4'],
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80',
        inStock: true
    },
    {
        id: 6,
        name: 'Leather Dining Chair',
        category: 'CHAIRS',
        price: 290.00,
        colors: ['#5C4033'],
        image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80',
        inStock: true
    },
    {
        id: 7,
        name: 'Minimal Yellow Chair',
        category: 'CHAIRS',
        price: 180.00,
        badges: [{ text: 'New', bg: '#15803D' }],
        colors: ['#FACC15'],
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
        inStock: true
    },
    {
        id: 8,
        name: 'Cross Wooden Chair',
        category: 'CHAIRS',
        price: 320.00,
        originalPrice: 380.00,
        badges: [{ text: 'Sale', bg: '#C8281E' }],
        colors: ['#A0522D', '#2F4F4F'],
        image: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=600&q=80',
        inStock: true
    },
    {
        id: 4,
        name: 'Feast Chair',
        category: 'CHAIRS',
        price: 390.00,
        colors: ['#C4A484'],
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80',
        inStock: true
    },
    {
        id: 5,
        name: 'Shell Velvet Armchair',
        category: 'CHAIRS',
        price: 480.00,
        badges: [{ text: 'Best Choice!', bg: '#1D4ED8' }],
        colors: ['#4682B4'],
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80',
        inStock: true
    },
    {
        id: 6,
        name: 'Leather Dining Chair',
        category: 'CHAIRS',
        price: 290.00,
        colors: ['#5C4033'],
        image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80',
        inStock: true
    },
    {
        id: 7,
        name: 'Minimal Yellow Chair',
        category: 'CHAIRS',
        price: 180.00,
        badges: [{ text: 'New', bg: '#15803D' }],
        colors: ['#FACC15'],
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
        inStock: true
    }
];

const colorFilters = [
    { name: 'Blue', color: '#60A5FA', count: 3 },
    { name: 'Brown', color: '#9A3412', count: 1 },
    { name: 'Charcoal', color: '#374151', count: 2 },
    { name: 'Chocolate', color: '#451A03', count: 4 },
    { name: 'Grey', color: '#D1D5DB', count: 2 },
    { name: 'Light Beige', color: '#F3E8FF', count: 3 },
    { name: 'Olive', color: '#365314', count: 3 },
    { name: 'Red', color: '#DC2626', count: 1 },
    { name: 'Soft Green', color: '#86EFAC', count: 3 },
    { name: 'Yellow', color: '#FDE047', count: 2 }
];

const FilterSection = () => {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('grid');
    const [compareEnabled, setCompareEnabled] = useState(false);
    const [priceMax, setPriceMax] = useState(3429);
    const [selectedColors, setSelectedColors] = useState([]);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [isFilterVisible, setIsFilterVisible] = useState(true);

    const toggleColor = (name) => {
        setSelectedColors((prev) =>
            prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
        );
    };

    return (
        <Container version="v2" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="w-full py-40">
                {/* Header Controls Bar */}
                <div
                    className='flex items-center w-full gap-12 justify-between'
                >
                    {/* Left Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <button
                            onClick={() => setIsFilterVisible(!isFilterVisible)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '8px 22px',
                                borderRadius: '30px',
                                border: '1px solid #E2E8F0',
                                backgroundColor: isFilterVisible ? '#F8FAFC' : '#FFFFFF',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#0F172A'
                            }}
                        >
                            <Icon name="Filter" width="16" height="16" stroke="#0F172A" />
                            <span>Filter</span>
                        </button>
                        <span style={{ fontSize: '14px', color: '#64748B' }}>14 products</span>
                    </div>

                    {/* Right Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
                        {/* Compare Toggle */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '14px', fontWeight: '500', color: '#0F172A' }}>Compare:</span>
                            <div
                                onClick={() => setCompareEnabled(!compareEnabled)}
                                style={{
                                    width: '42px',
                                    height: '22px',
                                    borderRadius: '12px',
                                    backgroundColor: compareEnabled ? '#0F172A' : '#CBD5E1',
                                    padding: '2px',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s ease',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <div
                                    style={{
                                        width: '18px',
                                        height: '18px',
                                        borderRadius: '50%',
                                        backgroundColor: '#FFFFFF',
                                        transform: compareEnabled ? 'translateX(20px)' : 'translateX(0)',
                                        transition: 'transform 0.2s ease'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Sort Dropdown */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '14px', color: '#0F172A', fontWeight: '500' }}>Sort by:</span>
                            <select
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    border: '1px solid #E2E8F0',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#0F172A',
                                    backgroundColor: '#FFFFFF',
                                    outline: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="featured">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="newest">Newest Arrivals</option>
                            </select>
                        </div>

                        {/* View Mode Toggle */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '14px', color: '#64748B' }}>View as:</span>
                            <button
                                onClick={() => setViewMode('grid')}
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    backgroundColor: viewMode === 'grid' ? '#0F172A' : '#F1F5F9',
                                    color: viewMode === 'grid' ? '#FFFFFF' : '#0F172A',
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                <Icon name="Grid" width="16" height="16" stroke={viewMode === 'grid' ? '#FFFFFF' : '#0F172A'} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    backgroundColor: viewMode === 'list' ? '#0F172A' : '#F1F5F9',
                                    color: viewMode === 'list' ? '#FFFFFF' : '#0F172A',
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                <Icon name="List" width="16" height="16" stroke={viewMode === 'list' ? '#FFFFFF' : '#0F172A'} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className='mt-30 flex items-start gap-12'>
                    {isFilterVisible && (
                        <div className='w-20'>
                            {/* Availability Filter */}
                            <div style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: '24px', marginBottom: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                    <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A', margin: 0 }}>Availability</h4>
                                    <span style={{ fontSize: '18px', fontWeight: '400', color: '#64748B', cursor: 'pointer' }}>−</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontSize: '14px', color: '#475569' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <input
                                                type="checkbox"
                                                checked={inStockOnly}
                                                onChange={(e) => setInStockOnly(e.target.checked)}
                                                style={{ width: '16px', height: '16px', accentColor: '#0F172A', cursor: 'pointer' }}
                                            />
                                            <span>In stock</span>
                                        </div>
                                        <span style={{ color: '#94A3B8', fontSize: '13px' }}>14</span>
                                    </label>
                                    <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontSize: '14px', color: '#475569' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <input type="checkbox" style={{ width: '16px', height: '16px', accentColor: '#0F172A', cursor: 'pointer' }} />
                                            <span>Out of stock</span>
                                        </div>
                                        <span style={{ color: '#94A3B8', fontSize: '13px' }}>0</span>
                                    </label>
                                </div>
                            </div>

                            {/* Price Range Filter */}
                            <div style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: '24px', marginBottom: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A', margin: 0 }}>Price</h4>
                                    <span style={{ fontSize: '18px', fontWeight: '400', color: '#64748B', cursor: 'pointer' }}>−</span>
                                </div>
                                <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 16px 0' }}>
                                    The highest price is $3,429.00
                                </p>
                                {/* Slider Track */}
                                <input
                                    type="range"
                                    min="0"
                                    max="3429"
                                    value={priceMax}
                                    onChange={(e) => setPriceMax(Number(e.target.value))}
                                    style={{ width: '100%', accentColor: '#0F172A', cursor: 'pointer', marginBottom: '16px' }}
                                />
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                    <div style={{ flex: 1, backgroundColor: '#F1F5F9', borderRadius: '20px', padding: '8px 14px', fontSize: '13px', color: '#0F172A' }}>
                                        $ 0
                                    </div>
                                    <span style={{ color: '#94A3B8' }}>$</span>
                                    <div style={{ flex: 1, backgroundColor: '#F1F5F9', borderRadius: '20px', padding: '8px 14px', fontSize: '13px', color: '#0F172A', fontWeight: '600' }}>
                                        {priceMax}
                                    </div>
                                </div>
                            </div>

                            {/* Color Filter */}
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                    <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A', margin: 0 }}>Color</h4>
                                    <span style={{ fontSize: '18px', fontWeight: '400', color: '#64748B', cursor: 'pointer' }}>−</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {colorFilters.map((c) => {
                                        const isSelected = selectedColors.includes(c.name);
                                        return (
                                            <div
                                                key={c.name}
                                                onClick={() => toggleColor(c.name)}
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    cursor: 'pointer',
                                                    fontSize: '14px',
                                                    color: isSelected ? '#0F172A' : '#475569',
                                                    fontWeight: isSelected ? '600' : '400'
                                                }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <span
                                                        style={{
                                                            width: '16px',
                                                            height: '16px',
                                                            borderRadius: '3px',
                                                            backgroundColor: c.color,
                                                            border: '1px solid rgba(0,0,0,0.15)'
                                                        }}
                                                    />
                                                    <span>{c.name}</span>
                                                </div>
                                                <span style={{ color: '#94A3B8', fontSize: '13px' }}>{c.count}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={viewMode ? 'w-80 pl-20' : 'w-full'}>
                        <div
                            className="grid-cols-4 gap-12"
                        >
                            {initialProducts.map((item) => {
                                if (item.isBanner) {
                                    return (
                                        <div
                                            key={item.id}
                                            className='h-350 overflow-hidden rounded-10 relative'
                                        >
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                className='h-350 object-cover flex w-full filter-b5'
                                            />
                                            <div className='absolute bottom-0 left-0 px-10 py-20'>
                                                <p className='text-white font-500 mini-text text-muted'>
                                                    {item.subtitle}
                                                </p>
                                                <h3 className='text-white font-600 mid-text'>
                                                    {item.title}
                                                </h3>
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => navigate('/product-detail')}
                                        style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                                    >
                                        {/* Product Card Box */}
                                        <div
                                            className='h-250 rounded-10 overflow-hidden'
                                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
                                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                                        >
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                className='h-250 w-full flex object-cover'
                                            />
                                        </div>

                                        {/* Product Info below Card */}
                                        <div className='mt-8'>
                                            <p
                                                className='font-500 mini-text text-gray line-clamp-1 uppercase'
                                            >
                                                {item.category}
                                            </p>
                                            <h4
                                                className='font-600 mid-text text-dark line-clamp-2 uppercase'
                                            >
                                                {item.name}
                                            </h4>
                                            <div className='flex items-center gap-6 mt-4'>
                                                <span className='font-600 mini-text' style={{ color: item.originalPrice ? '#C8281E' : '#0F172A' }}>
                                                    ${item.price.toFixed(2)}
                                                </span>
                                                {item.originalPrice && (
                                                    <span className='font-500 mini-text' style={{ color: '#94A3B8', textDecoration: 'line-through' }}>
                                                        ${item.originalPrice.toFixed(2)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Container >
    );
};

export default FilterSection;