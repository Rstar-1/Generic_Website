import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

import Container from '../../components/common/Container';

import Banner from '../../components/layout/generic/Banner';
import SEO from '../../seo';
import { SITE_NAME } from '../../seo/seoConfig';

import {
  resolveImagePath,
  productsData,
  categoriesData,
  getItemSlug,
  matchBySlugOrId,
  findCategory
} from '../../utils';

import ProductDetailSection from './sections/ProductDetailSection';
import PatchSection from '../home/sections/PatchSection';

const patchBannerBg = resolveImagePath('Patch1.jpg');
const productBannerBg = resolveImagePath('Banner.jpg');

const patchBackground = {
    backgroundImage: `linear-gradient(90deg, rgba(10, 15, 25, 0.94) 0%, rgba(10, 15, 25, 0.82) 50%, rgba(10, 15, 25, 0.45) 100%), url(${patchBannerBg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed'
};

const ProductDetail = () => {
    const { id } = useParams();
    const location = useLocation();

    const product = React.useMemo(() => {
        if (location.state?.product) return location.state.product;
        return (id ? productsData.find((p) => matchBySlugOrId(p, id)) : null) ||
            productsData.find((p) => !p.isBanner) || productsData[0];
    }, [id, location.state]);

    const category = React.useMemo(() => {
        if (!product) return null;
        return findCategory(categoriesData, product);
    }, [product]);

    const categoryName = category?.name || product?.category;
    const productName = product?.name || product?.title;
    const productId = product?.id || id;
    const productSlug = getItemSlug(product) || productId;

    const breadcrumbs = React.useMemo(() => [
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
                image={product?.image}
                path={`/product/${productSlug}`}
                type="product"
                product={{
                    name: productName,
                    description: product?.desc || product?.description,
                    images: product?.images,
                    price: product?.price,
                    currency: 'INR',
                    stock: product?.inStock ? (product?.stockCount || 10) : 0,
                    sku: `AV-${productId}`,
                    brand: product?.vendor || product?.brand || SITE_NAME || 'Ashmita Vinyls',
                }}
                breadcrumbs={breadcrumbs}
            />
            <Banner title="Product Overview" desc={productName} breadcrumbs={breadcrumbs} bgImage={productBannerBg} />
            <ProductDetailSection currentProduct={product} category={category} />
            <Container className="relative z-10" style={patchBackground}>
                <PatchSection />
            </Container>
        </>
    );
};

export default React.memo(ProductDetail);