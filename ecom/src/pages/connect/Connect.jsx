import React from 'react';
import SEO from '../../seo';
import Container from '../../components/common/Container';

const Connect = () => (
    <>
        <SEO page="connect" />
        <Container className="py-16">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Connect With Us</h1>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
                    Have questions or require a custom quote? Reach out to our technical sales team for prompt assistance.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm space-y-4">
                        <h3 className="font-semibold text-lg text-gray-900">Get in Touch</h3>
                        <div>
                            <span className="block text-xs uppercase font-medium text-gray-500">Helpline</span>
                            <a href="tel:+919873198731" className="text-blue-600 font-medium">+91 9873198731</a>
                        </div>
                        <div>
                            <span className="block text-xs uppercase font-medium text-gray-500">Email</span>
                            <a href="mailto:info@ashmitavinyls.com" className="text-blue-600 font-medium">info@ashmitavinyls.com</a>
                        </div>
                        <div>
                            <span className="block text-xs uppercase font-medium text-gray-500">Office Location</span>
                            <p className="text-gray-700 text-sm">C 304, 3rd Floor, Eastern Business District, Bhandup West, Mumbai 400078</p>
                        </div>
                    </div>
                    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                        <h3 className="font-semibold text-lg text-gray-900 mb-4">Request a Callback</h3>
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <input type="text" placeholder="Your Name" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
                            <input type="email" placeholder="Your Email" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
                            <textarea placeholder="Describe your requirement..." rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
                            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Submit Request</button>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    </>
);

export default React.memo(Connect);
