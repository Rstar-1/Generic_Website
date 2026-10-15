import React from "react";

import Container from "../../common/Container";
import Breadcrumb from "../../common/Breadcrumb";
import Skeleton from "../../common/Skeleton";
import { resolveImagePath, carpetBanner } from "../../../utils/imageResolver";

const defaultBannerImg = carpetBanner;

const Banner = ({ title, desc, style, breadcrumbs, productData, loading, bgImage, image, backgroundImage }) => {
    if (loading) {
        return <Skeleton variant="banner" style={style} />;
    }

    const mainHeading = title || "Banner";
    const rawImg = bgImage || backgroundImage || image || defaultBannerImg;
    const bannerImg = resolveImagePath(rawImg);
    const bannerBackground = bannerImg
        ? (bannerImg.includes('gradient') || bannerImg.startsWith('url(')
            ? bannerImg
            : `linear-gradient(rgba(10, 15, 25, 0.72), rgba(10, 15, 25, 0.82)), url(${bannerImg}) center/cover no-repeat`)
        : `linear-gradient(rgba(10, 15, 25, 0.72), rgba(10, 15, 25, 0.82)), url(${carpetBanner}) center/cover no-repeat`;

    const itemsList = productData
        ? [
            { label: 'Home', path: '/home' },
            { label: productData.category || 'Products', path: '/products' },
            { label: productData.title || 'Product Detail' }
        ]
        : Array.isArray(breadcrumbs)
            ? breadcrumbs
            : [
                { label: 'Home', path: '/home' },
                { label: title || 'Page' }
            ];

    return (
        <Container className="relative"
            style={{
                background: bannerBackground,
                padding: '120px 0px 80px 0px',
                ...style
            }}>
            <div className="relative w-full py-60 text-center">
                <h2 className="text-white font-600 large-text text-center uppercase mt-40">
                    {mainHeading}
                </h2>

                {desc && (
                    <p className="para-text text-white opacity-85 mt-8 max-w-600 mx-auto">
                        {desc}
                    </p>
                )}

                <div className="mt-8 flex justify-center">
                    <Breadcrumb items={itemsList} className="justify-center" />
                </div>
            </div>
        </Container>
    );
};

export default React.memo(Banner);
