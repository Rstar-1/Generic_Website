import React from 'react';
import SEO from '../../seo';
import Container from '../../components/common/Container';

const Privacy = () => (
    <>
        <SEO page="privacy" />
        <Container className="py-16">
            <div className="max-w-4xl mx-auto px-4 prose prose-blue">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>
                <p className="text-gray-600 text-sm mb-6">Last updated: October 2026</p>
                <div className="space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base">
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Information We Collect</h2>
                        <p>We collect corporate and contact information such as name, business email, phone number, and delivery address solely for quoting, order fulfillment, and logistics tracking.</p>
                    </section>
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">How We Use Information</h2>
                        <p>Your details are used strictly to communicate regarding orders, process dispatches, and provide technical customer support. We never sell your data to third parties.</p>
                    </section>
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Data Security</h2>
                        <p>We employ commercial-standard encrypted storage and firewalled networks to protect quote data and customer communications.</p>
                    </section>
                </div>
            </div>
        </Container>
    </>
);

export default React.memo(Privacy);
