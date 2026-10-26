import React, { memo, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import Image from '../../../components/common/Image';
import Button from '../../../components/common/Button';
import { getCmsData, resolveImagePath } from '../../../utils/utils';

const AboutSection = memo(({ cms: passedCms }) => {
    const navigate = useNavigate();
    const cms = useMemo(() => getCmsData('AboutSection', passedCms), [passedCms]);

    const title = cms.getText('About001', "Precision PVC Strip Curtains Engineered For Industrial Excellence");
    const description = cms.getText(
        'About002',
        "For over 15 years, Ashmita Vinyls has stood as an industry-leading importer and manufacturer of high-grade PVC strip curtain rolls, magnetic barrier curtains, and heavy-duty stainless steel mounting hardware. Trusted by premier warehouses, cold storages, clean rooms, and commercial facilities across India."
    );
    const aboutImage = cms.getImage('About003');
    const { text: btnText, link: btnLink } = cms.getButton('About005');

    const handleExplore = useCallback(() => {
        navigate(btnLink || '/product');
    }, [navigate, btnLink]);

    const imgSrc = aboutImage?.url && !aboutImage.url.includes('example.com')
        ? resolveImagePath(aboutImage.url)
        : resolveImagePath('Banner.jpg');

    return (
        <div className="w-full py-60">
            <div className="grid-cols-2 sm-grid-cols-1 items-center gap-12">
                <div>
                    <h2 className="large-text font-700 text-dark uppercase">
                        {title}
                    </h2>

                    <p className="para-text text-gray font-400 mt-14 leading-relaxed">
                        {description}
                    </p>

                    <Button
                        text={btnText || "Explore Catalog"}
                        version="v1"
                        bg="primary"
                        color="white"
                        className="rounded-30 font-500 mt-16"
                        onClick={handleExplore}
                    />
                </div>

                {/* Right Image Column */}
                <div className="relative rounded-10 overflow-hidden h-500 sm-h-360 w-full sm-mt-12">
                    <Image
                        src={imgSrc}
                        alt={aboutImage?.alt || title}
                        className="w-full h-full object-cover flex"
                        loading="eager"
                    />
                </div>
            </div>
        </div>
    );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;