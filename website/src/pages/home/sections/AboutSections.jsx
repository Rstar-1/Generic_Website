import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Icon from '../../../components/common/Icon';
import Image from '../../../components/common/Image';
import Heading from '../../../components/layout/generic/Heading';
import Button from '../../../components/common/Button';

const codeSnippets = {
    Android: [
        { num: 1, line: (<><span style={{ color: '#94a3b8' }}>val </span><span style={{ color: '#f1f5f9' }}>engine = </span><span style={{ color: '#f43f5e' }}>ZegoExpressEngine</span><span style={{ color: '#f1f5f9' }}>.createEngine(...)</span></>) },
        { num: 2, line: (<><span style={{ color: '#f1f5f9' }}>engine.loginRoom(</span><span style={{ color: '#c084fc' }}>roomID, user</span><span style={{ color: '#f1f5f9' }}>)</span></>) },
        { num: 3, line: (<><span style={{ color: '#f1f5f9' }}>engine.startPublishingStream(</span><span style={{ color: '#c084fc' }}>streamID</span><span style={{ color: '#f1f5f9' }}>)</span></>) },
        { num: 4, line: (<><span style={{ color: '#f1f5f9' }}>engine.startPlayingStream(</span><span style={{ color: '#c084fc' }}>streamID, </span><span style={{ color: '#f43f5e' }}>ZegoCanvas</span><span style={{ color: '#f1f5f9' }}>...)</span></>) },
        { num: 5, line: (<><span style={{ color: '#f1f5f9' }}>engine.logoutRoom(</span><span style={{ color: '#c084fc' }}>roomID</span><span style={{ color: '#f1f5f9' }}>)</span></>) },
    ],
    iOS: [
        { num: 1, line: (<><span style={{ color: '#94a3b8' }}>let </span><span style={{ color: '#f1f5f9' }}>engine = </span><span style={{ color: '#f43f5e' }}>ZegoExpressEngine</span><span style={{ color: '#f1f5f9' }}>.createEngine(...)</span></>) },
        { num: 2, line: (<><span style={{ color: '#f1f5f9' }}>engine.loginRoom(</span><span style={{ color: '#c084fc' }}>roomID, user: user</span><span style={{ color: '#f1f5f9' }}>)</span></>) },
        { num: 3, line: (<><span style={{ color: '#f1f5f9' }}>engine.startPublishingStream(</span><span style={{ color: '#c084fc' }}>streamID</span><span style={{ color: '#f1f5f9' }}>)</span></>) },
        { num: 4, line: (<><span style={{ color: '#f1f5f9' }}>engine.startPlayingStream(</span><span style={{ color: '#c084fc' }}>streamID, canvas: canvas</span><span style={{ color: '#f1f5f9' }}>)</span></>) },
        { num: 5, line: (<><span style={{ color: '#f1f5f9' }}>engine.logoutRoom(</span><span style={{ color: '#c084fc' }}>roomID</span><span style={{ color: '#f1f5f9' }}>)</span></>) },
    ],
    Web: [
        { num: 1, line: (<><span style={{ color: '#94a3b8' }}>const </span><span style={{ color: '#f1f5f9' }}>zg = new </span><span style={{ color: '#f43f5e' }}>ZegoExpressEngine</span><span style={{ color: '#f1f5f9' }}>(appID)</span></>) },
        { num: 2, line: (<><span style={{ color: '#94a3b8' }}>await </span><span style={{ color: '#f1f5f9' }}>zg.loginRoom(</span><span style={{ color: '#c084fc' }}>roomID, token</span><span style={{ color: '#f1f5f9' }}>)</span></>) },
        { num: 3, line: (<><span style={{ color: '#94a3b8' }}>const </span><span style={{ color: '#f1f5f9' }}>stream = await zg.createStream()</span></>) },
        { num: 4, line: (<><span style={{ color: '#f1f5f9' }}>zg.startPublishingStream(</span><span style={{ color: '#c084fc' }}>streamID, stream</span><span style={{ color: '#f1f5f9' }}>)</span></>) },
        { num: 5, line: (<><span style={{ color: '#f1f5f9' }}>zg.logoutRoom(</span><span style={{ color: '#c084fc' }}>roomID</span><span style={{ color: '#f1f5f9' }}>)</span></>) },
    ],
    Flutter: [
        { num: 1, line: (<><span style={{ color: '#f43f5e' }}>ZegoExpressEngine</span><span style={{ color: '#f1f5f9' }}>.createEngineWithProfile(...)</span></>) },
        { num: 2, line: (<><span style={{ color: '#f1f5f9' }}>ZegoExpressEngine.instance.loginRoom(</span><span style={{ color: '#c084fc' }}>roomID</span><span style={{ color: '#f1f5f9' }}>)</span></>) },
        { num: 3, line: (<><span style={{ color: '#f1f5f9' }}>ZegoExpressEngine.instance.startPublishingStream(...)</span></>) },
        { num: 4, line: (<><span style={{ color: '#f1f5f9' }}>ZegoExpressEngine.instance.startPlayingStream(...)</span></>) },
        { num: 5, line: (<><span style={{ color: '#f1f5f9' }}>ZegoExpressEngine.instance.logoutRoom(</span><span style={{ color: '#c084fc' }}>roomID</span><span style={{ color: '#f1f5f9' }}>)</span></>) },
    ],
    React: [
        { num: 1, line: (<><span style={{ color: '#f43f5e' }}>ZegoExpressEngine</span><span style={{ color: '#f1f5f9' }}>.createEngineWithProfile(...)</span></>) },
        { num: 2, line: (<><span style={{ color: '#f1f5f9' }}>ZegoExpressEngine.instance().loginRoom(</span><span style={{ color: '#c084fc' }}>roomID</span><span style={{ color: '#f1f5f9' }}>)</span></>) },
        { num: 3, line: (<><span style={{ color: '#f1f5f9' }}>ZegoExpressEngine.instance().startPublishing(...)</span></>) },
        { num: 4, line: (<><span style={{ color: '#f1f5f9' }}>ZegoExpressEngine.instance().startPlaying(...)</span></>) },
        { num: 5, line: (<><span style={{ color: '#f1f5f9' }}>ZegoExpressEngine.instance().logoutRoom(</span><span style={{ color: '#c084fc' }}>roomID</span><span style={{ color: '#f1f5f9' }}>)</span></>) },
    ]
};

const platforms = ['React', 'SCSS', 'Node'];

const crafterFeatures = [
    {
        title: 'Supreme integration flexibility',
        description: 'Enable complete customization of functionalities by seamlessly integrating any SDK or API without constraints using our SDK.'
    },
    {
        title: 'Boundless UI/UX customization potential',
        description: "Craft singularly impressive UI experiences tailored to your product's distinctive look and brand identity, unrestrained by API limitations."
    },
    {
        title: 'Low-level control and adaptability',
        description: 'Gain unrestricted low-level API access to tailor fully customized experiences for your unique product, with seamless extensibility as needs evolve.'
    }
];

const AboutSections = () => {
    const navigate = useNavigate();
    const [activePlatform, setActivePlatform] = useState('Android');

    return (
        <Container>
            <div className="py-40 w-full">
                <Heading
                    version="v1"
                    tag="Design for Every Team"
                    title='One-Size Fits NoneCatering to All Devs with SDKs and UIKits'
                    className="mb-48 sm-mb-30"
                />

                <div
                    className="w-full flex sm-grid-cols-1 items-start gap-12"
                >
                    <div
                        className="sticky overflow-hidden top-0 left-0 w-65"
                    >
                        <div
                            className="flex items-end p-30 rounded-10 overflow-hidden bg-dark" style={{ gap: '20px' }}
                        >
                            <div className='w-55'>
                                <div
                                    className='icon-lg bg-white rounded-full'
                                >
                                    <Icon name="ArrowUpRight" width="16" height="16" stroke="var(--dark)" strokeWidth="2.5" />
                                </div>

                                <h3
                                    className="text-white font-600 head-text uppercase mt-20"
                                >
                                    For Crafters
                                </h3>

                                <p
                                    className="text-white small-text text-muted font-400 mt-2"
                                >
                                    Fully customized with SDKs
                                </p>

                                <div className="mt-30 grid grid-cols-1" style={{ gap: '16px' }}>
                                    {crafterFeatures.map((feat, i) => (
                                        <div key={i} className="flex items-start gap-12 mb-10">
                                            <div className='w-10 mt-5 flex justify-center'>
                                                <div
                                                    className='icon flex items-center justify-center bg-white rounded-full'
                                                >
                                                    <Icon name="Check" width="16" height="16" stroke="var(--dark)" strokeWidth="3" />
                                                </div>
                                            </div>

                                            <div className='w-90'>
                                                <h4 className="text-white capitalize font-600 title-text">
                                                    {feat.title}
                                                </h4>
                                                <p
                                                    className="mt-8 text-muted mini-text text-white font-300"
                                                >
                                                    {feat.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    text="< Start building />"
                                    version="v2"
                                    bg="white"
                                    color="dark"
                                    className="rounded-6 font-600 mt-36"
                                    onClick={() => navigate('/services')}
                                />
                            </div>

                            <div
                                className='w-45'
                            >
                                <div
                                    className="relative w-full mx-auto overflow-hidden"
                                >
                                    <Image
                                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80"
                                        alt="Video Caller"
                                        className="w-full h-250 rounded-5 object-cover flex"
                                    />

                                    <div
                                        className="rounded-5 overflow-hidden absolute top-0 right-0 m-8"
                                    >
                                        <Image
                                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                                            alt="PIP Caller"
                                            width='50px'
                                            height='50px'
                                            className="flex object-cover"
                                        />
                                    </div>

                                    <div
                                        className="absolute bottom-0 mb-10 w-full flex items-center justify-center gap-12"
                                    >
                                        <div
                                            className="rounded-full icon-lg bg-dark"
                                        >
                                            <Icon name="Video" width="18" height="18" stroke="var(--white)" fill="var(--white)" />
                                        </div>

                                        <div
                                            className="rounded-full icon-lg bg-danger"
                                        >
                                            <Icon name="Hangup" width="20" height="20" fill="var(--white)" />
                                        </div>

                                        <div
                                            className="rounded-full icon-lg bg-dark"
                                        >
                                            <Icon name="Volume" width="18" height="18" stroke="var(--white)" fill="var(--white)" />
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="w-full relative overflow-hidden bg-dark border-gray rounded-5 mt-12"
                                >
                                    <div
                                        className="flex items-center gap-6 px-14 py-8 bordb"
                                    >
                                        {platforms.map((plat) => {
                                            const isActive = activePlatform === plat;
                                            return (
                                                <p
                                                    key={plat}
                                                    onClick={() => setActivePlatform(plat)}
                                                    className="cursor-pointer mini-text font-400 px-6"
                                                    style={{
                                                        color: isActive ? 'var(--white)' : 'var(--gray)',
                                                    }}
                                                >
                                                    {plat}
                                                </p>
                                            );
                                        })}
                                    </div>

                                    {/* Code Snippet Box */}
                                    <div
                                        className="p-14"
                                        style={{
                                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                            fontSize: '10.8px',
                                            lineHeight: '1.7',
                                            overflowX: 'hidden'
                                        }}
                                    >
                                        {(codeSnippets[activePlatform] || codeSnippets.Android).map((item) => (
                                            <div key={item.num} className="flex items-center gap-10 whitespace-nowrap overflow-hidden text-ellipsis">
                                                <span style={{ color: '#475569', width: '12px', textAlign: 'right', flexShrink: 0, userSelect: 'none' }}>
                                                    {item.num}
                                                </span>
                                                <span className="overflow-hidden text-ellipsis">{item.line}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                position: 'absolute',
                                top: '-20px',
                                right: '-10px',
                                width: '180px',
                                height: '180px',
                                background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.7) 0%, rgba(236, 72, 153, 0.7) 50%, rgba(249, 115, 22, 0.7) 100%)',
                                filter: 'blur(32px)',
                                opacity: 0.65,
                                pointerEvents: 'none',
                                zIndex: 1
                            }}
                        />
                    </div>

                    <div
                        className="w-35 grid-cols-1 gap-12"
                    >
                        <div className='p-25 bg-tertiary rounded-10 relative overflow-hidden'>
                            <div
                                className='icon-lg bg-dark rounded-full'
                            >
                                <Icon name="ArrowUpRight" width="16" height="16" stroke="var(--white)" strokeWidth="2.5" />
                            </div>

                            <h3
                                className="text-dark font-600 head-text uppercase mt-12"
                            >
                                For Racers
                            </h3>
                            <p
                                className="text-gray small-text text-muted font-400 mt-4"
                            >
                                Easier and faster with UIKits
                            </p>
                            <p className="text-dark small-text text-muted font-400 mt-20">
                                Accelerate app delivery with pre-built UIKits and UI Components - pre-designed UI assets enabling rapid app development without starting from scratch.
                            </p>

                        </div>

                        <div className='p-25 bg-tertiary rounded-10 relative overflow-hidden'>
                            <div
                                className='icon-lg bg-dark rounded-full'
                            >
                                <Icon name="ArrowUpRight" width="16" height="16" stroke="var(--white)" strokeWidth="2.5" />
                            </div>

                            <h3
                                className="text-dark font-600 head-text uppercase mt-12"
                            >
                                For Racers
                            </h3>
                            <p
                                className="text-gray small-text text-muted font-400 mt-4"
                            >
                                Easier and faster with UIKits
                            </p>
                            <p className="text-dark small-text text-muted font-400 mt-20">
                                Accelerate app delivery with pre-built UIKits and UI Components - pre-designed UI assets enabling rapid app development without starting from scratch.
                            </p>

                        </div>

                        <div className='p-25 bg-tertiary rounded-10 relative overflow-hidden'>
                            <div
                                className='icon-lg bg-dark rounded-full'
                            >
                                <Icon name="ArrowUpRight" width="16" height="16" stroke="var(--white)" strokeWidth="2.5" />
                            </div>

                            <h3
                                className="text-dark font-600 head-text uppercase mt-12"
                            >
                                For Racers
                            </h3>
                            <p
                                className="text-gray small-text text-muted font-400 mt-4"
                            >
                                Easier and faster with UIKits
                            </p>
                            <p className="text-dark small-text text-muted font-400 mt-20">
                                Accelerate app delivery with pre-built UIKits and UI Components - pre-designed UI assets enabling rapid app development without starting from scratch.
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default AboutSections;
