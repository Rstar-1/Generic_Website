import React, { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Heading from '../../../components/layout/generic/Heading';
import SlideLayout from '../../../components/layout/sections/SlideLayout';
import CardLayout from '../../../components/layout/sections/CardLayout';

import { productsData } from '../../../utils/apiData';
import { navigateToProduct, navigateToCategory, getCmsData } from '../../../utils/utils';

const ProductSection = ({ cms: passedCms }) => {
    const navigate = useNavigate();
    const cms = useMemo(() => getCmsData('ProductSection', passedCms), [passedCms]);

    const tag = cms.getText('Prod001', 'SPECIAL OFFERS FOR YOU');
    const title = cms.getText('Prod002', 'Featured Products & Popular Designs');
    const { text: actionText, link: actionLink } = cms.getButton('Prod003');

    const allProducts = useMemo(() => {
        return productsData.filter((p) => !p.isBanner);
    }, []);

    const firstRowProducts = useMemo(() => allProducts.slice(0, 6), [allProducts]);
    const secondRowProducts = useMemo(
        () => (allProducts.length > 6 ? allProducts.slice(6, 12) : allProducts.slice(0, 6)),
        [allProducts]
    );

    const handleProductClick = useCallback((item) => {
        navigateToProduct(navigate, item);
    }, [navigate]);

    const handleCategoryClick = useCallback((cat) => {
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