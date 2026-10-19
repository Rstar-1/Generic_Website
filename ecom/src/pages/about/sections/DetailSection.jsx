import React from 'react';
import { useNavigate } from 'react-router-dom';

import Image from '../../../components/common/Image';
import Badge from '../../../components/common/Badge';

import { resolveImagePath } from '../../../utils/imageResolver';

const thumbnails = [
    {
        id: 1,
        title: 'Standard Clear PVC Roll',
        image: resolveImagePath('sides/insta1.png')
    },
    {
        id: 2,
        title: 'Polar Anti-Insect Amber Roll',
        image: resolveImagePath('sides/insta2.png')
    },
    {
        id: 3,
        title: 'Heavy Duty Ribbed Strip',
        image: resolveImagePath('sides/insta3.png')
    }
];

const DetailSection = React.memo(() => {
    const navigate = useNavigate();

    return (
        <div className="py-60 sm-py-40 w-full">
            <div className="grid-cols-2 sm-grid-cols-1 items-center gap-12 w-full">
                <div className="w-full pr-20 sm-pr-0">
                    <Badge
                        text="Feature Collections"
                        icon="Settings"
                        variant="outline"
                        color="white"
                        size="md"
                        shape="pill"
                        iconColor="var(--primary)"
                    />

                    <h2 className="large-text font-700 text-dark uppercase mt-8">
                        Delivering Innovative Businesses.
                    </h2>

                    <p className="para-text text-gray font-400 mt-6">
                        We are a results-driven team helping businesses unlock efficiency, scale operations, and improve customer experience.
                    </p>

                    <div className="grid-cols-3 gap-12 mt-30 w-95">
                        {thumbnails.map((item) => (
                            <div
                                key={item.id}
                                className='w-full h-250 rounded-5 bg-forth overflow-hidden'
                                onClick={() => navigate('/products')}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover flex"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full h-550 sm-h-350 rounded-10 overflow-hidden">
                    <Image
                        src={resolveImagePath('blog/Blog4.jpg')}
                        alt="Collection Showcase"
                        className="w-full h-full object-cover flex"
                    />
                </div>
            </div>
        </div>
    );
});

DetailSection.displayName = 'DetailSection';

export default DetailSection;
