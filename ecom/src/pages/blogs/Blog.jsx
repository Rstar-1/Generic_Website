import React from 'react';
import SEO from '../../seo';
import Container from '../../components/common/Container';

const Blog = () => (
    <>
        <SEO page="blog" />
        <Container className="py-16">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">PVC Industry Blog & Insights</h1>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
                    Discover technical guides, installation best practices, and temperature control insights for industrial PVC curtains.
                </p>
                <div className="space-y-6">
                    <article className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow transition-shadow">
                        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Guide</span>
                        <h2 className="text-xl font-bold text-gray-900 mt-2 mb-2">How to Choose the Right PVC Curtain for Cold Storage</h2>
                        <p className="text-gray-600 text-sm">Learn why polar grade PVC is critical for deep freeze environments down to -40°C.</p>
                    </article>
                    <article className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow transition-shadow">
                        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Installation</span>
                        <h2 className="text-xl font-bold text-gray-900 mt-2 mb-2">Proper Strip Curtain Overlap for High-Traffic Warehouses</h2>
                        <p className="text-gray-600 text-sm">A quick formula to determine whether 33%, 50%, or 100% overlap suits your forklift traffic.</p>
                    </article>
                </div>
            </div>
        </Container>
    </>
);

export default React.memo(Blog);
