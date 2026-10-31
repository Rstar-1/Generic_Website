import React from 'react';
import { useNavigate } from 'react-router-dom';

import Heading from '../../../components/layout/generic/Heading';
import SlideLayout from '../../../components/layout/sections/SlideLayout';
import CardLayout from '../../../components/layout/sections/CardLayout';

import {
  productsData,
  navigateToProduct,
  navigateToCategory
} from '../../../utils';

const ProductSection = ({
    tag = 'SPECIAL OFFERS FOR YOU',
    title = 'Featured Products & Popular Designs',
    actionText = 'Shop All Products',
    actionLink = '/products'
}) => {
    const navigate = useNavigate();

    const allProducts = React.useMemo(() => {
        return productsData.filter((p) => !p.isBanner);
    }, []);

    const firstRowProducts = React.useMemo(() => allProducts.slice(0, 6), [allProducts]);
    const secondRowProducts = React.useMemo(
        () => (allProducts.length > 6 ? allProducts.slice(6, 12) : allProducts.slice(0, 6)),
        [allProducts]
    );

    const handleProductClick = React.useCallback((item) => {
        navigateToProduct(navigate, item);
    }, [navigate]);

    const handleCategoryClick = React.useCallback((cat) => {
        navigateToCategory(navigate, cat);
    }, [navigate]);

    return (
        <div className="w-full py-50">
            <Heading
                version="v2"
                tag={tag}
                title={title}
                actionText={actionText || "Shop All Products"}
                actionLink={actionLink || "/products"}
            />

            <SlideLayout
                items={firstRowProducts}
                className='py-30'
                renderItem={(item) => (
                    <CardLayout
                        key={item.id}
                        version="product"
                        item={item}
                        onClick={() => handleProductClick(item)}
                        onCategoryClick={handleCategoryClick}
                    />
                )}
            />

            <SlideLayout
                items={secondRowProducts}
                className='py-10'
                renderItem={(item) => (
                    <CardLayout
                        key={item.id}
                        version="product"
                        item={item}
                        onClick={() => handleProductClick(item)}
                        onCategoryClick={handleCategoryClick}
                    />
                )}
            />
        </div>
    );
};

export default React.memo(ProductSection);