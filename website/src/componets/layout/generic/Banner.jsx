import Container from "../common/Container";
import Breadcrumb from "../common/Breadcrumb";
import Skeleton from "../common/Skeleton";

const Banner = ({ title, desc, style, breadcrumbs, productData, loading }) => {
    if (loading) {
        return <Skeleton variant="banner" style={style} />;
    }

    return (
        <Container className="relative"
            style={{
                background: "linear-gradient(135deg, #0d1525ff 0%, #030610ff 100%)",
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                ...style
            }}>
            <div className="w-full py-90">
                <div className="flex items-center gap-8 mb-12">
                    <span
                        className="bg-warning"
                        style={{
                            display: 'inline-block',
                            width: '10px',
                            height: '10px',
                            flexShrink: 0
                        }}
                    />
                    <p className="text-white uppercase font-500 small-text">{title}</p>
                </div>

                <h2 className="text-white font-600 uppercase head-text">{desc}</h2>

                {(productData || breadcrumbs) && (
                    <div className="mt-15">
                        {productData ? (
                            <Breadcrumb
                                items={[
                                    { label: 'Home', path: '/home' },
                                    { label: productData.category || 'Printer Cartridges', path: '/products' },
                                    { label: productData.brand },
                                    { label: productData.title }
                                ]}
                            />
                        ) : Array.isArray(breadcrumbs) ? (
                            <Breadcrumb items={breadcrumbs} />
                        ) : (
                            breadcrumbs
                        )}
                    </div>
                )}
            </div>
        </Container>
    );
};

export default Banner;
