import React from 'react';
import Container from '../../../components/common/Container';
import Icon from '../../../components/common/Icon';

const topMarqueeData = [
    { text: "PREMIUM AUDIO SOLUTIONS", icon: "Sound" },
    { text: "2-YEAR EXTENDED", icon: "Shield" },
    { text: "GLOBAL EXPRESS", icon: "Box" },
    { text: "NEXT-GEN SOUND", icon: "Sparkles" },
    { text: "CRAFTED PRECISION", icon: "Star" }
];

const bottomMarqueeData = [
    "BANG & OLUFSEN",
    "BOSE HI-FI",
    "MASTER & DYNAMIC",
    "SENNHEISER STUDIO",
    "BOWERS & WILKINS",
    "SONY AUDIOPHILE"
];

const MarqueeSection = () => {
    const topList = [...topMarqueeData, ...topMarqueeData, ...topMarqueeData, ...topMarqueeData];
    const bottomList = [...bottomMarqueeData, ...bottomMarqueeData, ...bottomMarqueeData, ...bottomMarqueeData];

    return (
        <Container version='v0'>
            <div className='relative w-full py-30 overflow-hidden'>
                <style>{`
                    @keyframes marqueeLeft {
                        0% { transform: translateX(0%); }
                        100% { transform: translateX(-50%); }
                    }
                    @keyframes marqueeRight {
                        0% { transform: translateX(-50%); }
                        100% { transform: translateX(0%); }
                    }
                    .animate-marquee-left {
                        animation: marqueeLeft 30s linear infinite;
                        min-width: 200%;
                    }
                    .animate-marquee-right {
                        animation: marqueeRight 35s linear infinite;
                        min-width: 200%;
                    }
                `}</style>

                <div
                    className="w-full py-26 flex items-center overflow-hidden relative bg-primary"
                    style={{ transform: 'rotate(-1.8deg)' }}
                >
                    <div className="flex items-center gap-12 animate-marquee-left">
                        {topList.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-12" style={{ minWidth: '260px' }}>
                                <Icon name={item.icon} width="22" height="22" className="text-white" />
                                <p className="para-text text-white font-600 uppercase">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    className="w-full py-26 flex items-center overflow-hidden relative bg-forth"
                    style={{ transform: 'rotate(1.5deg)' }}
                >
                    <div className="flex items-center gap-12 animate-marquee-right">
                        {bottomList.map((brand, idx) => (
                            <div key={idx} className="flex items-center gap-12" style={{ minWidth: '210px' }}>
                                <p className="para-text text-dark font-700 uppercase">
                                    {brand}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default MarqueeSection;
