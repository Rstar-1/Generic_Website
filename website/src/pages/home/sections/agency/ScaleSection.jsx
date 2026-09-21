import React, { memo } from 'react';
import Container from '../../../../components/common/Container';
import Icon from '../../../../components/common/Icon';

const scaleItems = [
    {
        id: 1,
        title: 'Customer Service',
        subtitle: 'Mon-Sat, 9am-6pm EST.',
        icon: 'Users',
        hasDot: true
    },
    {
        id: 2,
        title: 'Call Us',
        subtitle: '+91 7015163045',
        icon: 'Phone',
        link: 'tel:+917015163045'
    },
    {
        id: 3,
        title: 'Get in Touch',
        subtitle: 'kohad0681@gmail.com',
        icon: 'Send',
        link: 'mailto:kohad0681@gmail.com'
    },
    {
        id: 4,
        title: 'Address',
        subtitle: 'Apollo Bandar, Colaba, Mumbai',
        icon: 'MapPin'
    }
];

const ScaleSection = () => {
    return (
        <Container
            style={{ backgroundColor: 'var(--primary)' }}
        >
            <div
                className="w-full py-30 grid-cols-4 md-grid-cols-2 sm-grid-cols-1"
            >
                {scaleItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-12"
                    >
                        <div className='w-15'>
                            <div className='bg-white icon-lg rounded-full'>
                                <Icon
                                    name={item.icon}
                                    width="18"
                                    height="18"
                                    stroke="var(--primary)"
                                    strokeWidth="2"
                                />
                            </div>
                        </div>
                        <div className="w-85">
                            <h4 className="headmini-text font-500 text-white">
                                {item.title}
                            </h4>
                            {item.link ? (
                                <a
                                    href={item.link}
                                >
                                    <p className="small-text text-white text-muted font-200">{item.subtitle}</p>
                                </a>
                            ) : (
                                <p
                                    className="small-text text-white text-muted font-200"
                                >
                                    {item.subtitle}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default memo(ScaleSection);
