import React, { lazy, Suspense, memo, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import LazySection from '../../components/common/LazySection';
import Container from '../../components/common/Container';
import Banner from '../../components/layout/generic/Banner';
import SEO from '../../seo';
import { SITE_NAME } from '../../seo/seoConfig';
import { resolveImagePath } from '../../utils/imageResolver';
import { productsData, categoriesData } from '../../utils/apiData';
import { getItemSlug, matchBySlugOrId, Fallback, findCategory } from '../../utils/utils';

const ProductDetailSection = lazy(() => import('./sections/ProductDetailSection'));
const PatchSection = lazy(() => import('../home/sections/PatchSection'));

const patchBannerBg = resolveImagePath('Patch1.jpg');
const productBannerBg = resolveImagePath('Banner.jpg');

const productDetailSections = [
    { id: 'detail', Component: ProductDetailSection, minHeight: '600px', isContainer: false, isEager: true },
    {
        id: 'patch',
        Component: PatchSection,
        minHeight: '300px',
        isContainer: true,
        containerClass: 'relative z-10',
        containerStyle: {
            backgroundImage: `linear-gradient(90deg, rgba(10, 15, 25, 0.94) 0%, rgba(10, 15, 25, 0.82) 50%, rgba(10, 15, 25, 0.45) 100%), url(${patchBannerBg})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
        }
    },
];

const ProductDetail = () => {
    const { id } = useParams();
    const location = useLocation();

    const product = useMemo(() => {
        if (location.state?.product) return location.state.product;
        return (id ? productsData.find((p) => matchBySlugOrId(p, id)) : null) ||
            productsData.find((p) => !p.isBanner) || productsData[0];
    }, [id, location.state]);

    const category = useMemo(() => {
        if (!product) return null;
        return findCategory(categoriesData, product);
    }, [product]);

    const categoryName = category?.name || product?.category;
    const productName = product?.name || product?.title;
    const productId = product?.id || id;
    const productSlug = getItemSlug(product) || productId;

    const breadcrumbs = useMemo(() => [
        { label: 'Home', path: '/' },
        { label: categoryName, path: `/product?category=${encodeURIComponent(categoryName)}` },
        { label: productName, path: `/product/${productSlug}` }
    ], [categoryName, productName, productSlug]);

    return (
        <>
            <SEO
                page="productDetail"
                title={`${productName} | ${SITE_NAME || 'Ashmita Vinyls'}`}
                description={product?.desc || product?.description || `Explore ${productName} by ${SITE_NAME || 'Ashmita Vinyls'}. Premium industrial PVC vinyl solutions.`}
                image={product?.image || product?.images?.[0]}
                path={`/product/${productSlug}`}
                type="product"
                product={{
                    name: productName,
                    description: product?.desc || product?.description,
                    images: product?.images || (product?.image ? [product.image] : []),
                    price: product?.price,
                    currency: 'INR',
                    stock: product?.inStock ? (product?.stockCount || 10) : 0,
                    sku: `AV-${productId}`,
                    brand: product?.vendor || product?.brand || SITE_NAME || 'Ashmita Vinyls',
                }}
                breadcrumbs={breadcrumbs}
            />
            <Banner title="Product Overview" desc={productName} breadcrumbs={breadcrumbs} bgImage={productBannerBg} />
            {productDetailSections.map(({ id: sectionId, Component, isEager, minHeight, isContainer = true, containerClass, containerStyle, version }) => {
                const el = isContainer ? (
                    <Container className={containerClass} style={containerStyle} version={version}>
                        <Component currentProduct={product} category={category} />
                    </Container>
                ) : (
                    <Component currentProduct={product} category={category} />
                );

                const content = <Suspense fallback={<Fallback minHeight={minHeight} />}>{el}</Suspense>;
                return isEager ? (
                    <React.Fragment key={sectionId}>{content}</React.Fragment>
                ) : (
                    <LazySection key={sectionId} placeholderHeight={minHeight} placeholder={<Fallback minHeight={minHeight} />}>{content}</LazySection>
                );
            })}
        </>
    );
};

export default memo(ProductDetail);