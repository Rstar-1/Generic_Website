import React, { useMemo, useCallback } from 'react';

import Icon from '../../../components/common/Icon';
import Heading from '../../../components/layout/generic/Heading';
import SlideLayout from '../../../components/layout/sections/SlideLayout';
import CardLayout from '../../../components/layout/sections/CardLayout';
import { getCmsData } from '../../../utils/utils';

const DEFAULT_BADGES = ['All Eco-Certified', 'Make It Yours', 'Unique Tailored'];

const DEFAULT_SERVICES = [
    {
        id: 1,
        title: 'Comfortable',
        description: 'Bow Chair is available in Natural or Black-stained Oak with full EU Ecolabel certification.',
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 2,
        title: 'Price transparency',
        description: "Fair pricing ensures you know exactly what you're paying for, with no hidden costs or markups.",
        image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 3,
        title: 'All eco-certified',
        description: 'All products consider a more holistic environmental impact and are designed for a longer lifetime in a way.',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 4,
        title: 'Sustainability',
        description: 'Committed to sustainable practices, ethical sourcing, and reducing environmental impact.',
        image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80'
    }
];

const ServiceSection = ({ cms: passedCms }) => {
    const cms = useMemo(() => getCmsData('ServiceSection', passedCms), [passedCms]);

    const tag = cms.getText('Serv001', 'Our Specification');
    const title = cms.getText('Serv002', 'This approach resulted in the beautiful structure');

    const badges = useMemo(() => {
        const raw = cms.getArray('Serv003');
        return raw.length ? raw.map((b) => (typeof b === 'object' ? b.text : b)) : DEFAULT_BADGES;
    }, [cms]);

    const services = useMemo(() => {
        const raw = cms.getArray('Serv004');
        return raw.length
            ? raw.map((s, idx) => ({ id: s.id || idx + 1, ...s }))
            : DEFAULT_SERVICES;
    }, [cms]);

    const renderItem = useCallback((item) => (
        <CardLayout key={item.id} version="feature2" item={item} />
    ), []);

    return (
        <div className="w-full py-60">
            <Heading
                version="v1"
                tag={tag}
                title={title}
            />

            <div className="flex items-center justify-center gap-10 flex-wrap mt-20 mb-40">
                {badges.map((badge, idx) => (
                    <p
                        key={idx}
                        className="small-text text-white bg-primary w-max px-14 py-4 rounded-20 flex items-center gap-8 font-500 uppercase mb-8"
                    >
                        <Icon name="Box" width="14" height="14" className="text-white" />
                        {badge}
                    </p>
                ))}
            </div>

            <SlideLayout
                version="grid"
                col={4}
                gap="16"
                className="w-85 sm-w-full mx-auto"
                items={services}
                renderItem={renderItem}
            />
        </div>
    );
};

ServiceSection.displayName = 'ServiceSection';

export default React.memo(ServiceSection);