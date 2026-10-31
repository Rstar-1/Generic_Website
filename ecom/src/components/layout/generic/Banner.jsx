
import React from 'react';
import Container from "../../common/Container";
import Breadcrumb from "../../common/Breadcrumb";
import Skeleton from "../../common/Skeleton";
import {
  resolveImagePath,
  configData
} from '../../../utils';

const OVERLAY =
    "linear-gradient(rgba(20,8,1,.72),rgba(15,20,23,.82))";
const GRADIENT =
    "linear-gradient(rgba(20,8,1,.72),rgba(148,51,6,.82))";

const Banner = React.memo(({
    title = "Banner",
    desc,
    position = "center",
    style,
    breadcrumbs,
    productData,
    loading,
    image,
    bgImage,
    backgroundImage,
    version = "1",
}) => {
    if (loading) return <Skeleton variant="image" height="260px" style={style} />;

    const sticky = Boolean(
        configData?.HeaderSticky ??
        configData?.Header?.HeaderSticky ??
        configData?.Header?.[0]?.HeaderSticky
    );

    const left = position === "left";
    const align = left ? "text-left" : "text-center";
    const justify = left ? "justify-start" : "justify-center";

    const rawImage = image || bgImage || backgroundImage;
    const resolvedImage = rawImage && resolveImagePath(rawImage);

    const background = String(version) === "2" || !resolvedImage
        ? GRADIENT
        : resolvedImage.includes("gradient") || resolvedImage.startsWith("url(")
            ? resolvedImage
            : `${OVERLAY}, url(${resolvedImage}) center/cover no-repeat`;

    const items = productData
        ? [
            { label: "Home", path: "/home" },
            { label: productData.category || "Products", path: "/products" },
            { label: productData.title || "Product Detail" },
        ]
        : breadcrumbs || [
            { label: "Home", path: "/home" },
            { label: title },
        ];

    return (
        <Container
            className="relative"
            style={{
                background,
                padding: sticky ? "120px 0 80px" : "60px 0",
                minHeight: "260px",
                ...style,
            }}
        >
            <div className={`relative w-full py-60 ${align}`}>
                <h2 className={`text-white font-600 large-text uppercase ${align} ${sticky ? "mt-40" : ""}`}>
                    {title}
                </h2>

                {desc && (
                    <p className={`para-text text-white mt-8 ${left ? "" : "mx-auto"}`}>
                        {desc}
                    </p>
                )}

                <div className={`flex ${left ? "mt-14" : "mt-8"} ${justify}`}>
                    <Breadcrumb items={items} className={justify} />
                </div>
            </div>
        </Container>
    );
});

Banner.displayName = "Banner";

export default Banner;