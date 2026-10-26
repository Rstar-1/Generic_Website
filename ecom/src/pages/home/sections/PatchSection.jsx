import React, { memo, useMemo } from 'react';

import Badge from '../../../components/common/Badge';
import { getCmsData } from '../../../utils/utils';

const PatchSection = ({ cms: passedCms }) => {
    const cms = useMemo(() => getCmsData('PatchSection', passedCms), [passedCms]);

    const badge = cms.getText('Patch001', passedCms?.badge || 'PREMIER MANUFACTURER');
    const title = cms.getText(
        'Patch002',
        passedCms?.title || 'Delivering High-Performance Industrial PVC Strip Curtains & Hardware Across India.'
    );
    const description = cms.getText(
        'Patch003',
        passedCms?.description ||
            'Ashmita Vinyls combines direct importing, certified quality, and factory pricing to equip warehouses, cold storages, clean rooms, and industrial plants nationwide.'
    );

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

export default memo(PatchSection);
