import React from "react";
import SEO from "../../seo";
import { aeoFAQs } from "../../seo";
import Container from "../../components/common/Container";

const Faq = () => {
  return (
    <>
      <SEO page="faq" />
      <Container className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Have questions about PVC strip curtains, installation, or bulk
              orders? Here are answers to commonly asked questions.
            </p>
          </div>

          <div className="space-y-6">
            {aeoFAQs?.map((faq, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default React.memo(Faq);
