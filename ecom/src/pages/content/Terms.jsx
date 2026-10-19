import React from 'react';
import SEO from '../../seo';
import Container from '../../components/common/Container';

const Terms = () => (
    <>
        <SEO page="terms" />
        <Container className="py-16">
            <div className="max-w-4xl mx-auto px-4 prose prose-blue">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Terms & Conditions</h1>
                <p className="text-gray-600 text-sm mb-6">Last updated: October 2026</p>
                <div className="space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base">
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Scope of Agreement</h2>
                        <p>These terms govern all sales, commercial orders, and quotes issued by Ashmita Vinyls for PVC strip curtains, vinyl rolls, and related hardware.</p>
                    </section>
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">2. Orders and Quotations</h2>
                        <p>All quotes remain valid for 30 calendar days from issue date. Custom dimensions confirmed by the client cannot be returned once extrusion or cutting has commenced.</p>
                    </section>
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">3. Warranty & Defect Liability</h2>
                        <p>Products are warranted against material manufacturing defects. Normal operational wear, exposure to unapproved solvents, or improper hanging voids warranty coverage.</p>
                    </section>
                </div>
            </div>
        </Container>
    </>
);

export default React.memo(Terms);
