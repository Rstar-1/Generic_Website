import React, { useState, useMemo, useCallback, useEffect, memo } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';

import Button from '../../../components/common/Button';
import Fields from '../../../components/forms/Fields';
import Modal from '../../../components/common/Modal';
import ProductCard from '../../../components/layout/sections/CardLayout';
import { products, categories, filterData } from '../../../utils/apiData';
import { getItemSlug, getStickyTop, findCategory, navigateToProduct } from '../../../utils/utils';

const SORT_OPTIONS = filterData.sortOptions || [
    { label: 'Trending', value: 'trending' },
    { label: 'Price: Low to High', value: 'price-low' },
    { label: 'Price: High to Low', value: 'price-high' },
];

const FilterTopBar = memo(({
    isFilterVisible,
    totalCount,
    activeCount,
    compareEnabled,
    sortBy,
    onToggleFilter,
    onCompareChange,
    onSortChange
}) => (
    <div className="flex sm-grid-cols-1 items-center w-full gap-12 justify-between">
        <div className="flex items-center gap-12">
            <Button
                onClick={onToggleFilter}
                icon="Filter"
                text={`Filter By${activeCount ? ` (${activeCount})` : ''}`}
                iconWidth="11"
                iconHeight="11"
                version="v2"
                variant={isFilterVisible ? 'primary' : 'outline'}
                color={isFilterVisible ? 'white' : 'dark'}
                bg={isFilterVisible ? 'dark' : 'tertiary'}
                className="rounded-30 font-500"
            />
            <p className="small-text text-gray font-500">{totalCount} Products</p>
        </div>

        <div className="flex items-center gap-12">
            <div className="flex items-center gap-8">
                <p className="small-text font-500 text-dark">Compare:</p>
                <Fields type="switch" value={compareEnabled} onChange={onCompareChange} />
            </div>

            <div className="flex items-center gap-8">
                <p className="small-text font-500 text-dark">Sort by:</p>
                <div style={{ width: '170px' }}>
                    <Fields
                        type="select"
                        version="v2"
                        value={sortBy}
                        onChange={onSortChange}
                        options={SORT_OPTIONS}
                    />
                </div>
            </div>
        </div>
    </div>
));
FilterTopBar.displayName = 'FilterTopBar';

const FilterSidebarContent = memo(({
    priceMax,
    maxPriceLimit,
    onPriceChange,
    checkboxSections,
    colorFilters,
    selectedColors,
    onToggleColor
}) => (
    <div className="pr-10 pl-5 pb-50 sm-pb-5">
        <div className="bordb pb-20">
            <h4 className="headmini-text font-500 text-dark mb-12">{filterData.price?.title || 'Price Range'}</h4>
            <Fields
                type="slider"
                min={filterData.price?.min || 0}
                max={maxPriceLimit}
                step={filterData.price?.step || 10}
                value={priceMax}
                onChange={onPriceChange}
            />
        </div>

        {checkboxSections.map(({ title, options, value, onChange }) => (
            <div key={title} className="bordb py-20">
                <h4 className="headmini-text font-500 text-dark mb-12">{title}</h4>
                <Fields type="checkbox" options={options} position="y" value={value} onChange={onChange} />
            </div>
        ))}

        <div className="py-20">
            <h4 className="headmini-text font-500 text-dark mb-12">{filterData.colors?.title || 'Color'}</h4>
            <div className="flex flex-column gap-10">
                {colorFilters.map((c) => {
                    const isSelected = selectedColors.includes(c.color.toLowerCase());
                    return (
                        <div
                            key={c.color}
                            onClick={() => onToggleColor(c.color.toLowerCase())}
                            className="flex items-center justify-between cursor-pointer"
                        >
                            <div className="flex items-center gap-8">
                                <span
                                    style={{
                                        width: '16px',
                                        height: '16px',
                                        borderRadius: '10px',
                                        backgroundColor: c.color,
                                        outline: isSelected ? '1px solid var(--danger)' : '1px solid var(--white)',
                                        outlineOffset: '2px'
                                    }}
                                />
                                <p className={`small-text font-400 ${isSelected ? 'text-danger' : 'text-gray'}`}>{c.name}</p>
                            </div>
                            <p className={`mini-text font-400 ${isSelected ? 'text-danger' : 'text-gray'}`}>{c.count}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
));
FilterSidebarContent.displayName = 'FilterSidebarContent';

const ProductGrid = memo(({ productsList, isFilterVisible, onProductClick }) => (
    <div className={`${isFilterVisible ? 'grid-cols-4' : 'grid-cols-5'} sm-grid-cols-2 gap-12`}>
        {productsList.map((item) => (
            <ProductCard
                key={item.id}
                item={item}
                onProductClick={onProductClick}
                isFluid={true}
            />
        ))}
    </div>
));
ProductGrid.displayName = 'ProductGrid';

const FilterSection = ({ stickyTop = getStickyTop() }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const location = useLocation();

    const maxPriceLimit = useMemo(() => {
        const defaultMax = filterData.price?.max || 300;
        const maxVal = Math.max(
            ...products.filter((p) => !p.isBanner && typeof p.price === 'number').map((p) => p.price),
            defaultMax
        );
        return Math.ceil(maxVal / 50) * 50;
    }, []);

    const [compareEnabled, setCompareEnabled] = useState(false);
    const [sortBy, setSortBy] = useState('trending');
    const [priceMax, setPriceMax] = useState(maxPriceLimit);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [availability, setAvailability] = useState([]);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    useEffect(() => {
        const catQuery =
            searchParams.get('category') ||
            searchParams.get('categoryId') ||
            location.state?.categoryId ||
            location.state?.categoryName ||
            location.state?.category;

        if (catQuery) {
            const matched = findCategory(categories, catQuery);
            setSelectedCategories([String(matched ? matched.id : catQuery)]);
            if (window.innerWidth > 768) setIsFilterVisible(true);
        }
    }, [searchParams, location.state]);

    const categoryOptions = useMemo(() => {
        return (categories || []).map((cat) => {
            const count = products.filter(
                (p) => !p.isBanner && (String(p.categoryId) === String(cat.id) || p.category === cat.name || p.category === cat.title)
            ).length;
            return {
                label: `${cat.name || cat.title}${count ? ` (${count})` : ''}`,
                value: String(cat.id)
            };
        });
    }, []);

    const brandOptions = useMemo(() => {
        const counts = {};
        products.forEach((p) => {
            if (!p.isBanner) {
                const b = p.brand || p.vendor || 'Others';
                counts[b] = (counts[b] || 0) + 1;
            }
        });
        return (filterData.brands?.options || []).map((b) => ({
            label: `${b.label || b.value} (${counts[b.value] || 0})`,
            value: b.value
        }));
    }, []);

    const availabilityOptions = useMemo(() => {
        const inStockCount = products.filter((p) => !p.isBanner && p.inStock).length;
        const outOfStockCount = products.filter((p) => !p.isBanner && !p.inStock).length;
        return (filterData.availability?.options || []).map((opt) => ({
            label: `${opt.label} (${opt.value === 'in-stock' ? inStockCount : outOfStockCount})`,
            value: opt.value
        }));
    }, []);

    const colorFilters = useMemo(() => {
        const counts = {};
        products.forEach((p) => {
            if (!p.isBanner && Array.isArray(p.colors)) {
                p.colors.forEach((hex) => {
                    if (hex) counts[hex.toLowerCase().trim()] = (counts[hex.toLowerCase().trim()] || 0) + 1;
                });
            }
        });
        return (filterData.colors?.options || []).map((c) => ({
            ...c,
            count: counts[c.color.toLowerCase()] || 0
        }));
    }, []);

    const handleToggleFilter = useCallback(() => {
        if (window.innerWidth <= 768) setIsMobileFilterOpen(true);
        else setIsFilterVisible((prev) => !prev);
    }, []);

    const handleToggleColor = useCallback((color) => {
        setSelectedColors((prev) =>
            prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
        );
    }, []);

    const handleResetFilters = useCallback(() => {
        setPriceMax(maxPriceLimit);
        setSelectedCategories([]);
        setSelectedBrands([]);
        setSelectedColors([]);
        setAvailability([]);
    }, [maxPriceLimit]);

    const handleProductClick = useCallback((item) => {
        navigateToProduct(navigate, item);
    }, [navigate]);

    const filteredProducts = useMemo(() => {
        return products
            .filter((item) => {
                if (item.isBanner) return true;
                if (availability.length === 1 && item.inStock !== (availability[0] === 'in-stock')) return false;

                if (selectedCategories.length > 0) {
                    const match = selectedCategories.some((catVal) => {
                        const catObj = categories.find((c) => String(c.id) === String(catVal) || c.name === catVal);
                        return (
                            String(item.categoryId) === String(catVal) ||
                            item.category === catVal ||
                            (catObj && (item.category === catObj.name || item.category === catObj.title || String(item.categoryId) === String(catObj.id)))
                        );
                    });
                    if (!match) return false;
                }

                if (selectedBrands.length > 0 && !selectedBrands.includes(item.brand || item.vendor || 'Others')) return false;
                if (typeof item.price === 'number' && item.price > priceMax) return false;
                if (selectedColors.length > 0 && !item.colors?.some((c) => selectedColors.includes(c.toLowerCase()))) return false;

                return true;
            })
            .sort((a, b) => {
                if (a.isBanner || b.isBanner) return 0;
                if (sortBy === 'trending') return Boolean(b.trending) - Boolean(a.trending) || (a.id || 0) - (b.id || 0);
                if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
                if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
                return 0;
            });
    }, [availability, selectedCategories, selectedBrands, priceMax, selectedColors, sortBy]);

    const totalProductCount = useMemo(() => filteredProducts.filter((p) => !p.isBanner).length, [filteredProducts]);

    const activeFiltersCount = useMemo(() => (
        selectedCategories.length +
        selectedBrands.length +
        selectedColors.length +
        availability.length +
        (priceMax < maxPriceLimit ? 1 : 0)
    ), [selectedCategories, selectedBrands, selectedColors, availability, priceMax, maxPriceLimit]);

    const checkboxSections = useMemo(() => [
        { title: filterData.availability?.title || 'Availability', options: availabilityOptions, value: availability, onChange: setAvailability },
        { title: filterData.category?.title || 'Category', options: categoryOptions, value: selectedCategories, onChange: setSelectedCategories },
        { title: filterData.brands?.title || 'Brand', options: brandOptions, value: selectedBrands, onChange: setSelectedBrands }
    ], [availabilityOptions, availability, categoryOptions, selectedCategories, brandOptions, selectedBrands]);

    const filterProps = {
        priceMax,
        maxPriceLimit,
        onPriceChange: (val) => setPriceMax(Number(val) || 0),
        checkboxSections,
        colorFilters,
        selectedColors,
        onToggleColor: handleToggleColor,
    };

    return (
        <div className="w-full py-40">
            <FilterTopBar
                isFilterVisible={isFilterVisible}
                totalCount={totalProductCount}
                activeCount={activeFiltersCount}
                compareEnabled={compareEnabled}
                sortBy={sortBy}
                onToggleFilter={handleToggleFilter}
                onCompareChange={setCompareEnabled}
                onSortChange={setSortBy}
            />

            <div className="mt-30 flex sm-grid-cols-1 items-start gap-12">
                {isFilterVisible && (
                    <div className="w-20 sm-hidden overflow-auto h-500 sticky" style={{ top: stickyTop }}>
                        <FilterSidebarContent {...filterProps} />
                    </div>
                )}

                <div className={isFilterVisible ? 'w-80 sm-w-full' : 'w-full'}>
                    <ProductGrid
                        productsList={filteredProducts}
                        isFilterVisible={isFilterVisible}
                        onProductClick={handleProductClick}
                    />
                </div>
            </div>

            <Modal
                type="sidebar"
                placement="left"
                size="sm"
                title="Filters"
                isOpen={isMobileFilterOpen}
                onClose={() => setIsMobileFilterOpen(false)}
                footer={
                    <div className="flex items-center gap-12 w-full">
                        <Button text="Reset" version="v2" variant="outline" color="dark" className="w-50" onClick={handleResetFilters} />
                        <Button text="Apply" version="v2" variant="primary" color="white" bg="primary" className="w-50" onClick={() => setIsMobileFilterOpen(false)} />
                    </div>
                }
            >
                <FilterSidebarContent {...filterProps} />
            </Modal>
        </div>
    );
};

export default memo(FilterSection);
