import React from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';

import Button from '../../../components/common/Button';
import Fields from '../../../components/forms/Fields';
import Modal from '../../../components/common/Modal';
import Pagination from '../../../components/common/Pagination';

import ProductCard from '../../../components/layout/sections/CardLayout';

import { products, categories, filterData } from '../../../utils/apiData';
import { getStickyTop, findCategory, navigateToProduct } from '../../../utils/utils';

const isPrice = String(import.meta.env.VITE_PRICE).toLowerCase() === 'true';
const isPriceFilterEnabled = isPrice && Boolean(filterData?.price);

const SORT_OPTIONS = (filterData?.sortOptions || []).filter(
    (opt) => isPriceFilterEnabled || !opt.value?.includes('price')
);

const realProducts = (products || []).filter((p) => !p.isBanner);
const categoryMap = new Map((categories || []).map((c) => [String(c.id), c]));

const maxPriceLimit = (() => {
    if (!isPriceFilterEnabled) return 300;
    const defaultMax = filterData.price?.max || 300;
    const prices = realProducts.map((p) => p.price).filter((p) => typeof p === 'number');
    const maxVal = prices.length ? Math.max(...prices, defaultMax) : defaultMax;
    return Math.ceil(maxVal / 50) * 50;
})();

const categoryOptions = (categories || []).map((cat) => {
    const count = realProducts.filter(
        (p) => String(p.categoryId) === String(cat.id) || p.category === cat.name || p.category === cat.title
    ).length;
    return {
        label: `${cat.name || cat.title}${count ? ` (${count})` : ''}`,
        value: String(cat.id)
    };
});

const brandOptions = (() => {
    const counts = {};
    realProducts.forEach((p) => {
        const b = p.brand || p.vendor || 'Others';
        counts[b] = (counts[b] || 0) + 1;
    });
    return (filterData.brands?.options || []).map((b) => ({
        label: `${b.label || b.value} (${counts[b.value] || 0})`,
        value: b.value
    }));
})();

const availabilityOptions = (() => {
    const inStock = realProducts.filter((p) => p.inStock).length;
    return (filterData.availability?.options || []).map((opt) => ({
        label: `${opt.label} (${opt.value === 'in-stock' ? inStock : realProducts.length - inStock})`,
        value: opt.value
    }));
})();

const colorFilters = (() => {
    const counts = {};
    realProducts.forEach((p) => {
        if (Array.isArray(p.colors)) {
            p.colors.forEach((hex) => {
                if (hex) {
                    const key = hex.toLowerCase().trim();
                    counts[key] = (counts[key] || 0) + 1;
                }
            });
        }
    });
    return (filterData.colors?.options || []).map((c) => ({
        ...c,
        count: counts[c.color.toLowerCase()] || 0
    }));
})();

const FilterTopBar = React.memo(({
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

const FilterSidebarContent = React.memo(({
    priceMax,
    onPriceChange,
    checkboxSections,
    selectedColors,
    onToggleColor
}) => (
    <div className="pr-10 pl-5 pb-50 sm-pb-5">
        {isPriceFilterEnabled && filterData.price && (
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
        )}

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

const ProductGrid = React.memo(({ productsList, isFilterVisible, onProductClick }) => (
    <div className={`${isFilterVisible ? 'grid-cols-4' : 'grid-cols-5'} sm-grid-cols-2 gap-12`}>
        {productsList.map((item, index) => (
            <ProductCard
                version='product1'
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

    const [compareEnabled, setCompareEnabled] = React.useState(false);
    const [sortBy, setSortBy] = React.useState('trending');
    const [priceMax, setPriceMax] = React.useState(maxPriceLimit);
    const [selectedCategories, setSelectedCategories] = React.useState([]);
    const [selectedBrands, setSelectedBrands] = React.useState([]);
    const [selectedColors, setSelectedColors] = React.useState([]);
    const [availability, setAvailability] = React.useState([]);
    const [isFilterVisible, setIsFilterVisible] = React.useState(false);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const ITEMS_PER_PAGE = 12;

    React.useEffect(() => {
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

    const handleToggleFilter = React.useCallback(() => {
        if (window.innerWidth <= 768) setIsMobileFilterOpen(true);
        else setIsFilterVisible((prev) => !prev);
    }, []);

    const handleToggleColor = React.useCallback((color) => {
        setSelectedColors((prev) =>
            prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
        );
    }, []);

    const handlePriceChange = React.useCallback((val) => setPriceMax(Number(val) || 0), []);

    const handleResetFilters = React.useCallback(() => {
        setPriceMax(maxPriceLimit);
        setSelectedCategories([]);
        setSelectedBrands([]);
        setSelectedColors([]);
        setAvailability([]);
    }, []);

    const handleProductClick = React.useCallback((item) => {
        navigateToProduct(navigate, item);
    }, [navigate]);

    const filteredProducts = React.useMemo(() => {
        return products
            .filter((item) => {
                if (item.isBanner) return true;
                if (availability.length === 1 && item.inStock !== (availability[0] === 'in-stock')) return false;

                if (selectedCategories.length > 0) {
                    const match = selectedCategories.some((catId) => {
                        const cat = categoryMap.get(catId);
                        return (
                            String(item.categoryId) === catId ||
                            item.category === catId ||
                            (cat && (item.category === cat.name || item.category === cat.title || String(item.categoryId) === String(cat.id)))
                        );
                    });
                    if (!match) return false;
                }

                if (selectedBrands.length > 0 && !selectedBrands.includes(item.brand || item.vendor || 'Others')) return false;
                if (isPriceFilterEnabled && typeof item.price === 'number' && item.price > priceMax) return false;
                if (selectedColors.length > 0 && !item.colors?.some((c) => selectedColors.includes(c.toLowerCase()))) return false;

                return true;
            })
            .sort((a, b) => {
                if (a.isBanner || b.isBanner) return 0;
                if (sortBy === 'trending') return Boolean(b.trending) - Boolean(a.trending) || (a.id || 0) - (b.id || 0);
                if (isPriceFilterEnabled && sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
                if (isPriceFilterEnabled && sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
                return 0;
            });
    }, [availability, selectedCategories, selectedBrands, priceMax, selectedColors, sortBy]);

    const totalProductCount = React.useMemo(() => filteredProducts.filter((p) => !p.isBanner).length, [filteredProducts]);

    React.useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategories, selectedBrands, selectedColors, availability, priceMax, sortBy]);

    const paginatedProducts = React.useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredProducts, currentPage]);

    const activeFiltersCount =
        selectedCategories.length +
        selectedBrands.length +
        selectedColors.length +
        availability.length +
        (isPriceFilterEnabled && priceMax < maxPriceLimit ? 1 : 0);

    const checkboxSections = React.useMemo(() => [
        { title: filterData.availability?.title || 'Availability', options: availabilityOptions, value: availability, onChange: setAvailability },
        { title: filterData.category?.title || 'Category', options: categoryOptions, value: selectedCategories, onChange: setSelectedCategories },
        { title: filterData.brands?.title || 'Brand', options: brandOptions, value: selectedBrands, onChange: setSelectedBrands }
    ], [availability, selectedCategories, selectedBrands]);

    const filterProps = {
        priceMax,
        onPriceChange: handlePriceChange,
        checkboxSections,
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
                        productsList={paginatedProducts}
                        isFilterVisible={isFilterVisible}
                        onProductClick={handleProductClick}
                    />

                    {filteredProducts.length > ITEMS_PER_PAGE && (
                        <div className="mt-30 w-full flex justify-center">
                            <Pagination
                                page={currentPage}
                                totalItems={filteredProducts.length}
                                itemsPerPage={ITEMS_PER_PAGE}
                                onPageChange={(p) => {
                                    setCurrentPage(p);
                                    if (typeof window !== 'undefined') {
                                        window.scrollTo({ top: 350, behavior: 'smooth' });
                                    }
                                }}
                                itemName="products"
                            />
                        </div>
                    )}
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

export default React.memo(FilterSection);
