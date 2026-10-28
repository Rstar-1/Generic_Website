import React from 'react';

import Icon from '../../../components/common/Icon';

import Heading from '../../../components/layout/generic/Heading';

import SlideLayout from '../../../components/layout/sections/SlideLayout';
import CardLayout from '../../../components/layout/sections/CardLayout';

const ServiceSection = ({
    tag,
    title,
    rawBadges,
    rawServices
}) => {
    const badges = React.useMemo(() => {
        const raw = Array.isArray(rawBadges) ? rawBadges : [];
        return raw.map((b) => (typeof b === 'object' ? b.text : b));
    }, [rawBadges]);

    const services = React.useMemo(() => {
        const raw = Array.isArray(rawServices) ? rawServices : [];
        return raw.map((s, idx) => ({ id: s.id || idx + 1, ...s }));
    }, [rawServices]);

    const renderItem = React.useCallback((item) => (
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