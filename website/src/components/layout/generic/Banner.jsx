import React from "react";
import Container from "../../common/Container";
import Breadcrumb from "../../common/Breadcrumb";
import Skeleton from "../../common/Skeleton";

const Banner = ({ title, desc, style, breadcrumbs, productData, loading }) => {
    if (loading) {
        return <Skeleton variant="banner" style={style} />;
    }

    const mainHeading = desc || title || "Banner";

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
                background: 'radial-gradient(ellipse at 50% 50%, #0d322c 0%, #081d1a 55%, #040e0c 100%)',
                padding: '80px 0px',
                borderRadius: '0 0 25px 25px',
                ...style
            }}>
            <div
                style={{
                    position: 'absolute',
                    bottom: '-30%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '90%',
                    height: '450px',
                    background: 'radial-gradient(circle, rgba(73, 186, 166, 0.22) 0%, rgba(0, 0, 0, 0) 70%)',
                    pointerEvents: 'none',
                    borderRadius: '50%'
                }}
            />
            <div className="relative w-full py-60 text-center">
                <h2 className="text-white font-600 large-text text-center mt-40">
                    {mainHeading}
                </h2>

                <div className="mt-8 flex justify-center">
                    <Breadcrumb items={itemsList} className="justify-center" />
                </div>
            </div>
        </Container>
    );
};

export default Banner;
