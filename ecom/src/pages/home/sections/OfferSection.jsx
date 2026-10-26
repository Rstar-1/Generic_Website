import React, { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Image from '../../../components/common/Image';
import Button from '../../../components/common/Button';
import { getCmsData, resolveImagePath } from '../../../utils/utils';

const DEFAULT_TRENDING = [
    {
        id: 1,
        title: 'Select Table Lamps',
        subtitle: 'Get up to $100 Off',
        image: 'Product3.jpg',
    },
    {
        id: 2,
        title: 'Select Lounge Chairs',
        subtitle: 'From $200',
        image: 'Product4.jpg',
    },
    {
        id: 3,
        title: 'Select Side tables',
        subtitle: 'Get up to $1.000',
        image: 'Product5.jpg',
    },
    {
        id: 4,
        title: 'Select Home Decors',
        subtitle: 'Buy One Get One',
        image: 'Product7.jpg',
    }
];

const OfferSection = ({ cms: passedCms }) => {
    const navigate = useNavigate();
    const cms = useMemo(() => getCmsData('OfferSection', passedCms), [passedCms]);

    const title = cms.getText('Offer001', 'Difference in the Details');
    const description = cms.getText(
        'Offer002',
        'Highlighting the unique touches that set every piece apart, crafted to elevate your style effortlessly.'
    );
    const bannerImage = cms.getImage('Offer003');
    const { text: btnText, link: btnLink } = cms.getButton('Offer004');

    const bannerSrc = resolveImagePath(bannerImage?.url || 'Banner.jpg');

    const trending = useMemo(() => {
        const raw = cms.getArray('Offer005');
        return (raw.length ? raw : DEFAULT_TRENDING).map((item, idx) => ({
            id: item.id || idx + 1,
            title: item.title,
            subtitle: item.subtitle,
            image: resolveImagePath(item.image)
        }));
    }, [cms]);

    const handleAction = useCallback(() => {
        navigate(btnLink || '/products');
    }, [navigate, btnLink]);

    return (
        <div className='w-full py-50'>
            <div className='grid-cols-2 sm-grid-cols-1 gap-12'>
                <div className='overflow-hidden bg-forth rounded-10 relative sm-h-400' style={{ height: '612px' }}>
                    <Image
                        src={bannerSrc}
                        alt={bannerImage?.alt || title}
                        className='h-full w-full object-cover flex filter-b5'
                    />
                    <div className='absolute bottom-0 left-0 p-20'>
                        <h4 className='large-text text-white uppercase font-600'>
                            {title}
                        </h4>
                        <p className='para-text text-white tex-muted font-400 w-90 mt-2'>
                            {description}
                        </p>

                        <Button
                            text={btnText || "Shop Now"}
                            version="v2"
                            bg="white"
                            color="dark"
                            className='mt-14 rounded-20'
                            onClick={handleAction}
                        />
                    </div>
                </div>

                <div className='grid-cols-2 gap-12'>
                    {trending.map((item) => (
                        <div
                            className='h-300 sm-h-250 overflow-hidden bg-forth rounded-5 relative cursor-pointer'
                            key={item.id}
                            onClick={() => navigate('/products')}
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                className='h-full w-full object-contain flex'
                                style={{ objectPosition: '50% -50%' }}
                            />
                            <div className='absolute bottom-0 left-0 w-full text-center'>
                                <div className='p-14 sm-p-5'>
                                    <h4 className='mid-text text-dark font-600'>
                                        {item.title}
                                    </h4>
                                    <p className='mini-text text-gray font-400 mt-2'>
                                        {item.subtitle}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default React.memo(OfferSection);
