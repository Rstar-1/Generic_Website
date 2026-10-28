import React from 'react';

import Badge from '../../../components/common/Badge';

const PatchSection = ({
    badge,
    title,
    description
}) => {

    return (
        <div className="w-full py-90 sm-py-40">
            <div className="w-75 sm-w-full">
                <Badge
                    text={badge}
                    icon="Award"
                    bg="var(--primary)"
                    textColor="var(--white)"
                    iconColor="var(--white)"
                    size="lg"
                    shape="pill"
                />

                <h3 className="text-white large-text font-600 uppercase mt-15">
                    {title}
                </h3>

                <p className="text-white para-text font-400 mt-18 leading-relaxed" style={{ opacity: 0.9 }}>
                    {description}
                </p>
            </div>
        </div>
    );
};

export default React.memo(PatchSection);
