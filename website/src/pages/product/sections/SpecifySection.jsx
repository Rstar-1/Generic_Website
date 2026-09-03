import React, { useState } from 'react';
import Container from '../../../components/common/Container';

const SpecifySection = ({
    title = "About Garage",
    contentParagraphs = [
        "From classic wood and metal to contemporary acrylic and glass, each material brings unique advantages to furniture design. Wood offers timeless strength and natural warmth, while metal adds resilience and industrial charm. Acrylic and glass, on the other hand, bring a modern touch, providing sleek, versatile options for contemporary spaces. The choice of material is not just about appearance; it defines durability and functionality, ensuring each piece serves its purpose beautifully.",
        "When selecting furniture, it's important to think beyond aesthetics. The right pieces create a cohesive atmosphere that balances beauty, practicality, and longevity. Minimalist designs, with their clean lines and simplicity, appeal to those who value modern elegance. However, traditional styles like Victorian, Art Deco, or Mid-Century Modern continue to inspire with their intricate details and timeless craftsmanship, offering a sense of history and character that enriches any living space."
    ]
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Container version="v2">
            <div className="w-full pb-60">
                <div
                    style={{
                        backgroundColor: '#F7F7F7',
                        borderRadius: '20px',
                        padding: '40px 48px',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <h3
                        style={{
                            fontSize: '24px',
                            fontWeight: '700',
                            color: '#141414',
                            marginBottom: '20px'
                        }}
                    >
                        {title}
                    </h3>

                    <p
                        style={{
                            fontSize: '14px',
                            lineHeight: '1.7',
                            color: '#555555',
                            marginBottom: '16px'
                        }}
                    >
                        {contentParagraphs[0]}
                    </p>

                    {isExpanded ? (
                        <p
                            style={{
                                fontSize: '14px',
                                lineHeight: '1.7',
                                color: '#555555',
                                marginBottom: '16px',
                                transition: 'opacity 0.3s ease'
                            }}
                        >
                            {contentParagraphs[1]}
                        </p>
                    ) : (
                        <p
                            style={{
                                fontSize: '14px',
                                lineHeight: '1.7',
                                color: '#999999',
                                marginBottom: '16px',
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                opacity: 0.6
                            }}
                        >
                            {contentParagraphs[1]}
                        </p>
                    )}

                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            fontSize: '14px',
                            fontWeight: '700',
                            color: '#141414',
                            borderBottom: '2px solid #141414',
                            cursor: 'pointer',
                            marginTop: '8px'
                        }}
                    >
                        {isExpanded ? 'View Less' : 'View More'}
                    </button>
                </div>
            </div>
        </Container>
    );
};

export default SpecifySection;