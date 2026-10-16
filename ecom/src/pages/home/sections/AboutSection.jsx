import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Image from '../../../components/common/Image';
import Button from '../../../components/common/Button';
import { resolveImagePath } from '../../../utils/imageResolver';

const keyFeatures = [
    {
        title: 'CE & ISO 9001:2015 Certified',
        description: 'Certified medical manufacturing meeting European standards and international quality systems.'
    },
    {
        title: 'Section 45 Factories Act Compliant',
        description: 'Approved Type A, B & C industrial first aid boxes required for factories and construction sites.'
    },
    {
        title: 'Medical Grade AISI-304 Stainless Steel',
        description: 'Seamless, autoclavable hospital holloware, dressing drums, and surgical trays built for lifetime use.'
    },
    {
        title: 'Pan-India Clinical & Institutional Supply',
        description: 'Direct factory pricing and rapid dispatch for government tenders, private hospitals, and distributors.'
    }
];

const AboutSection = memo(() => {
    const navigate = useNavigate();
    const handleExplore = useCallback(() => navigate('/product'), [navigate]);
    const handleEnquiry = useCallback(() => navigate('/connect'), [navigate]);

    return (
        <div className="w-full py-60">
            <div className="grid-cols-2 sm-grid-cols-1 items-center gap-12">
                <div>

                    <h2 className="large-text font-700 text-dark uppercase">
                        Precision Medical Supplies Engineered For Clinical Excellence
                    </h2>

                    <p className="para-text text-gray font-400 mt-14">
                        For over 15 years, Shreehari Surgicals & Goonj have stood as industry-leading manufacturers of CE-certified industrial first aid systems, AISI-304 surgical stainless steel holloware, and advanced O.T. shadowless examination lighting. Trusted by premier hospitals, manufacturing facilities, emergency response teams, and institutions across India.
                    </p>

                    <Button
                        text="Explore Catalog"
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
                        src={resolveImagePath('/products/spaces/operation_theater.jpg')}
                        alt="State of the Art Medical Equipment & Surgical Care"
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