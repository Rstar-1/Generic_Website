import React from 'react';
import SEO from '../../seo';
import Container from '../../components/common/Container';

const Product = () => (
    <>
        <SEO page="collection" />
        <Container className="py-16">
            <div className="max-w-5xl mx-auto px-4">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">PVC Products & Collection</h1>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
                    Explore our comprehensive collection of PVC strip curtains, bulk vinyl rolls, polar freezer curtains, and mounting brackets.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow transition-shadow">
                        <h3 className="font-semibold text-lg text-gray-900 mb-2">Standard Transparent PVC</h3>
                        <p className="text-gray-600 text-sm">High clarity strips ideal for warehouse partitions and pedestrian doorways.</p>
                    </div>
                    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow transition-shadow">
                        <h3 className="font-semibold text-lg text-gray-900 mb-2">Polar Freezer Grade</h3>
                        <p className="text-gray-600 text-sm">Maintains flexibility down to -40°C in walk-in cold rooms and blast freezers.</p>
                    </div>
                    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow transition-shadow">
                        <h3 className="font-semibold text-lg text-gray-900 mb-2">Anti-Insect Amber Yellow</h3>
                        <p className="text-gray-600 text-sm">Emits a special yellow light spectrum that repels flying pests and insects.</p>
                    </div>
                </div>
            </div>
        </Container>
    </>
);

export default React.memo(Product);
