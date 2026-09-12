import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import Icon from '../common/Icon';
import Fields from '../forms/Fields';

const QUICK_ACTIONS = [
    {
        id: 'products',
        title: 'Our products',
        subtitle: 'SPC, LVT, synthetic leather',
        icon: 'Product',
        iconBg: '#2563eb',
        reply: 'We offer an extensive catalog of commercial and residential solutions:\n\n• **SPC Rigid Core Flooring**: 100% waterproof, heavy-duty wear layer with acoustic IXPE underlayment.\n• **LVT Luxury Vinyl Tile**: Authentic embossed wood & stone textures for high-traffic environments.\n• **Synthetic Leather**: High-durability upholstery grade for hospitality and corporate furniture.\n\nWould you like to browse our catalog or get sample swatches?',
        cta: { text: 'Browse Products', path: '/product' }
    },
    {
        id: 'applications',
        title: 'Applications',
        subtitle: 'Where our products fit',
        icon: 'Layers',
        iconBg: '#06b6d4',
        reply: 'Our architectural materials are certified for diverse commercial and residential applications:\n\n• **Hospitality**: Hotels, resorts, guest suites, and dining areas.\n• **Corporate**: Executive boardrooms, open workspaces, and breakout lounges.\n• **Retail & Showrooms**: High-abrasion durability with aesthetic grain patterns.\n• **Healthcare & Education**: Anti-microbial, stain-resistant, and low-VOC verified.',
        cta: { text: 'Explore Services', path: '/services' }
    },
    {
        id: 'wheretobuy',
        title: 'Where to buy',
        subtitle: 'Find dealers near you',
        icon: 'MapPin',
        iconBg: '#7c3aed',
        reply: 'We have an authorized distributor network across North America, Europe, and Asia-Pacific. You can connect directly with our regional trade desks or locate authorized local stockists for immediate fulfillment.',
        cta: { text: 'Find A Dealer', path: '/wheretobuy' }
    },
    {
        id: 'warranty',
        title: 'Warranty',
        subtitle: 'Coverage & maintenance',
        icon: 'ShieldCheck',
        iconBg: '#059669',
        reply: 'All our products are backed by industry-leading warranties:\n\n• **Commercial Warranty**: 15 to 25-year structural & wear protection.\n• **Residential Warranty**: Lifetime residential wear guarantee.\n• **Maintenance**: Stain-resistant UV ceramic coating with minimal upkeep required.',
        cta: { text: 'Contact Support', path: '/connect' }
    }
];

const QUERY_RULES = [
    {
        keywords: ['price', 'cost', 'rate', 'quote', 'tier'],
        reply: 'Our pricing structure varies by volume, specifications, and project scope. You can view our public tiers on the Pricing page or request an executive quote via our Connect desk.',
        cta: { text: 'View Pricing', path: '/pricing' }
    },
    {
        keywords: ['sample', 'swatch', 'kit', 'catalog'],
        reply: 'We provide complimentary material sample swatches for architects, contractors, and verified trade partners. Connect with our specialists to request a physical swatch kit.',
        cta: { text: 'Request Samples', path: '/connect' }
    },
    {
        keywords: ['contact', 'phone', 'call', 'email', 'touch', 'support'],
        reply: 'You can reach our solutions desk at +1 888-234-1234 (Toll-Free) or email connect@generictrade.com. Our average response time is under 15 minutes!',
        cta: { text: 'Connect Now', path: '/connect' }
    },
    {
        keywords: ['demo', 'book', 'meeting', 'schedule', 'session'],
        reply: 'We would be delighted to schedule a live one-on-one architecture & material review! Head to our Book Demo section to reserve a session.',
        cta: { text: 'Book A Demo', path: '/bookademo' }
    },
    {
        keywords: ['product', 'spc', 'lvt', 'floor', 'flooring', 'leather'],
        reply: QUICK_ACTIONS[0].reply,
        cta: QUICK_ACTIONS[0].cta
    },
    {
        keywords: ['application', 'hospitality', 'hotel', 'commercial', 'residential'],
        reply: QUICK_ACTIONS[1].reply,
        cta: QUICK_ACTIONS[1].cta
    },
    {
        keywords: ['dealer', 'buy', 'store', 'where', 'location', 'distributor'],
        reply: QUICK_ACTIONS[2].reply,
        cta: QUICK_ACTIONS[2].cta
    },
    {
        keywords: ['warranty', 'guarantee', 'maintain', 'durability'],
        reply: QUICK_ACTIONS[3].reply,
        cta: QUICK_ACTIONS[3].cta
    }
];

const DEFAULT_REPLY = {
    text: 'Thank you for reaching out! Our solutions specialists are available to answer your technical and commercial queries. Would you like to view our products, find a local dealer, or speak with an advisor?',
    cta: { text: 'Contact Us', path: '/connect' }
};

const ChatTeaser = React.memo(({ onOpen, onDismiss }) => (
    <div
        onClick={onOpen}
        className="b-shadow p-10 rounded-5 cursor-pointer bg-white"
        style={{
            width: '230px',
            maxWidth: 'calc(100vw - 48px)',
            animation: 'fadeInUp 0.3s ease-out'
        }}
    >
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6 text-primary">
                <Icon name="Sparkles" width="18" height="18" stroke="currentColor" />
                <p className="small-text font-500 text-dark">
                    ASSISTANT
                </p>
            </div>
            <Button
                version="icon"
                icon="Close"
                iconWidth="15"
                iconHeight="15"
                iconStrokeWidth="2"
                iconStroke="var(--dark)"
                bg="forth"
                aria-label="Dismiss teaser"
                onClick={(e) => {
                    e.stopPropagation();
                    onDismiss();
                }}
            />
        </div>
        <p className="mini-text text-dark font-500">
            Hi! 👋 Looking for flooring or have a question? I'm here to help.
        </p>
    </div>
));

const ChatHeader = React.memo(({ onClose }) => (
    <div className="flex items-center justify-between p-16 bg-white">
        <div className="flex items-center gap-12">
            <div
                className='icon-lg bg-primary relative rounded-30'
            >
                <Icon name="Bot" width="22" height="22" stroke="var(--white)" strokeWidth="2" />
                <span
                    className="absolute bg-success dot rounded-full bottom-0 right-0"
                />
            </div>
            <div>
                <h4 className="mid-text font-600 text-dark">Responsive Assistant</h4>
                <p className="mini-text font-400 text-gray">Online</p>
            </div>
        </div>

        <Button
            version="icon"
            icon="Close"
            iconWidth="15"
            iconHeight="15"
            iconStroke="var(--gray)"
            iconStrokeWidth="2"
            bg="forth"
            aria-label="Close Assistant"
            title="Close"
            onClick={onClose}
        />
    </div>
));

const ChatWelcome = React.memo(({ onActionClick }) => (
    <div>
        <h2 className="title-text text-dark font-700 capitalize">
            Hey there 👋<br />
            How can I <span className="text-primary">help</span>?
        </h2>

        <p className="mini-text text-gray mt-6">
            Ask about flooring, leather, applications, dealers, or support.
        </p>

        <div className="grid-cols-2 gap-6 mt-10">
            {QUICK_ACTIONS.map((card) => (
                <div
                    key={card.id}
                    onClick={() => onActionClick(card)}
                    className="bg-white rounded-5 p-12 cursor-pointer"
                >
                    <div
                        className="icon rounded-30 flex items-center justify-center"
                        style={{ backgroundColor: card.iconBg }}
                    >
                        <Icon name={card.icon} width="13" height="13" stroke="var(--white)" strokeWidth="2.2" />
                    </div>
                    <div className='mt-6'>
                        <h5 className="headmini-text font-600 text-dark">{card.title}</h5>
                        <p className="mini-text text-gray">{card.subtitle}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
));

const ChatMessages = React.memo(({ messages, isTyping, onReset, onCtaClick, messagesEndRef }) => (
    <div className="grid-cols-1 gap-12">
        <p
            className='mini-text flex items-center gap-4 text-primary cursor-pointer'
            onClick={onReset}
        >
            <Icon name="ChevronLeft" width="16" height="16" stroke="currentColor" />
            Back to topics
        </p>

        {messages.map((msg, idx) => {
            const isUser = msg.sender === 'user';
            return (
                <div
                    key={idx}
                    className="flex flex-column"
                    style={{ alignItems: isUser ? 'flex-end' : 'flex-start' }}
                >
                    <p
                        className={`mini-text p-10 ${isUser ? 'bg-primary text-white' : 'bg-white text-dark b-shadow'}`}
                        style={{
                            maxWidth: '85%',
                            borderRadius: isUser ? '15px 15px 4px 15px' : '15px 15px 15px 4px',
                            border: isUser ? 'none' : '1px solid #e2e8f0',
                            whiteSpace: 'pre-line'
                        }}
                    >
                        {msg.text}
                    </p>

                    {msg.cta && (
                        <Button
                            text={msg.cta.text}
                            icon="ArrowRight"
                            iconPosition="right"
                            iconWidth="12"
                            iconHeight="12"
                            version="v0"
                            bg="dark"
                            color="white"
                            className="mt-6"
                            onClick={() => onCtaClick(msg.cta.path)}
                        />
                    )}
                </div>
            );
        })}

        {isTyping && (
            <div
                className="bg-white rounded-16 p-10 flex items-center gap-4 b-shadow"
                style={{ width: 'fit-content', border: '1px solid #e2e8f0' }}
            >
                <span className="rounded-full bg-primary" style={{ width: '6px', height: '6px', animation: 'bounce 1s infinite' }} />
                <span className="rounded-full bg-primary" style={{ width: '6px', height: '6px', animation: 'bounce 1s infinite 0.2s' }} />
                <span className="rounded-full bg-primary" style={{ width: '6px', height: '6px', animation: 'bounce 1s infinite 0.4s' }} />
            </div>
        )}
        <div ref={messagesEndRef} />
    </div>
));

const ChatInput = React.memo(({ inputValue, setInputValue, onSend }) => {
    const hasText = Boolean(inputValue.trim());

    return (
        <div className="p-12 bg-white">
            <form onSubmit={onSend} className="relative flex items-center w-full">
                <Fields
                    type="input"
                    version={2}
                    placeholder="Ask anything..."
                    value={inputValue}
                    onChange={(val) => setInputValue(val)}
                />
                <div
                    className="absolute right-0 top-0 my-4 mx-2"
                >
                    <Button
                        type="submit"
                        version="icon"
                        icon="Send"
                        iconWidth="18"
                        iconHeight="18"
                        iconStroke="var(--white)"
                        iconStrokeWidth="2"
                        bg={hasText ? 'primary' : 'gray'}
                        disabled={!hasText}
                        aria-label="Send message"
                        title="Send"
                        className="rounded-30 p-6"
                    />
                </div>
            </form>
        </div>
    );
});

const Chatbot = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [showTeaser, setShowTeaser] = useState(true);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            scrollToBottom();
        }
    }, [messages, isTyping, scrollToBottom]);

    const handleOpen = useCallback(() => {
        setIsOpen(true);
        setShowTeaser(false);
    }, []);

    const handleClose = useCallback(() => setIsOpen(false), []);
    const handleDismissTeaser = useCallback(() => setShowTeaser(false), []);
    const handleReset = useCallback(() => setMessages([]), []);

    const handleCtaClick = useCallback((path) => {
        navigate(path);
        setIsOpen(false);
    }, [navigate]);

    const handleActionClick = useCallback((action) => {
        setMessages((prev) => [...prev, { sender: 'user', text: action.title }]);
        setIsTyping(true);

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { sender: 'bot', text: action.reply, cta: action.cta }
            ]);
            setIsTyping(false);
        }, 500);
    }, []);

    const handleSend = useCallback((e) => {
        e?.preventDefault();
        const trimmed = inputValue.trim();
        if (!trimmed) return;

        setMessages((prev) => [...prev, { sender: 'user', text: trimmed }]);
        setInputValue('');
        setIsTyping(true);

        const lower = trimmed.toLowerCase();
        const matched = QUERY_RULES.find((rule) =>
            rule.keywords.some((kw) => lower.includes(kw))
        );

        const reply = matched
            ? { text: matched.reply, cta: matched.cta }
            : DEFAULT_REPLY;

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { sender: 'bot', text: reply.text, cta: reply.cta }
            ]);
            setIsTyping(false);
        }, 600);
    }, [inputValue]);

    return (
        <>
            {!isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '30px',
                        right: '6px',
                    }}
                    className='flex items-end justify-end gap-10'
                >
                    {showTeaser && (
                        <ChatTeaser
                            onOpen={handleOpen}
                            onDismiss={handleDismissTeaser}
                        />
                    )}

                    <Button
                        version="icon"
                        icon="Bot"
                        iconWidth="32"
                        iconHeight="32"
                        iconStroke="var(--white)"
                        iconStrokeWidth="2"
                        bg="primary"
                        aria-label="Open AI Assistant"
                        title="Open AI Assistant"
                        onClick={handleOpen}
                        className='rounded-30'
                    />
                </div>
            )}

            {isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '10px',
                        right: '5px',
                        width: '350px',
                        height: '450px',
                        animation: 'fadeInUp 0.25s ease-out'
                    }}
                    className='bg-white rounded-10 overflow-hidden z-999 grid-cols-1 b-shadow'
                >
                    <ChatHeader onClose={handleClose} />

                    <div
                        className='overflow-auto p-16 bg-forth'
                    >
                        {messages.length === 0 ? (
                            <ChatWelcome onActionClick={handleActionClick} />
                        ) : (
                            <ChatMessages
                                messages={messages}
                                isTyping={isTyping}
                                onReset={handleReset}
                                onCtaClick={handleCtaClick}
                                messagesEndRef={messagesEndRef}
                            />
                        )}
                    </div>

                    <ChatInput
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        onSend={handleSend}
                    />
                </div>
            )}
        </>
    );
};

export default Chatbot;
