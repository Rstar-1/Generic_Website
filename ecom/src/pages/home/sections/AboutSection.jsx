import React from 'react';
import { useNavigate } from 'react-router-dom';

import Image from '../../../components/common/Image';
import Button from '../../../components/common/Button';
import {
  resolveImagePath
} from '../../../utils';

const AboutSection = React.memo(({
    title,
    description,
    aboutImage,
    btnText,
    btnLink
}) => {
    const navigate = useNavigate();

    const handleExplore = React.useCallback(() => {
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
                        text={btnText}
                        version="v1"
                        bg="primary"
                        color="white"
                        className="rounded-30 font-500 mt-16"
                        onClick={handleExplore}
                    />
                </div>

                <div className="relative rounded-10 overflow-hidden h-500 sm-h-360 w-full sm-mt-12">
                    <Image
                        src={imgSrc}
                        alt={aboutImage?.alt || title}
                        className="w-full h-full object-cover flex"
                        loading="lazy"
                        decoding="async"
                    />
                </div>
            </div>
        </div>
    );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;