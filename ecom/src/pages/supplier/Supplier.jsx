import React from 'react';
import SEO from '../../seo';
import Container from '../../components/common/Container';

const Supplier = () => (
    <>
        <SEO page="supplier" />
        <Container className="py-16">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Authorized Suppliers & Store Locations</h1>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
                    Find verified Ashmita Vinyls dealers, authorized stockists, and distribution centers across India.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">Mumbai Central Hub</h3>
                        <p className="text-gray-600 text-sm mb-2">C 304, Eastern Business District, Bhandup West, Mumbai</p>
                        <p className="text-gray-500 text-xs">Phone: +91 9873198731 | Stock: Full Catalog</p>
                    </div>
                    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">Delhi NCR Distribution</h3>
                        <p className="text-gray-600 text-sm mb-2">Industrial Area, Okhla Phase II, New Delhi</p>
                        <p className="text-gray-500 text-xs">Phone: +91 9873198731 | Stock: Bulk Rolls & Brackets</p>
                    </div>
                </div>
            </div>
        </Container>
    </>
);

export default React.memo(Supplier);
