import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../common/Button';
import Icon from '../common/Icon';
import Image from '../common/Image';
import Fields from '../forms/Fields';

import { productsData, chatbotData } from '../../utils/apiData';
import { resolveImagePath } from '../../utils/imageResolver';

const {
    teaser = {},
    header = {},
    welcome = {},
    quickActions = [],
    knowledgeBase = [],
    search = {},
    input = {},
    messages: msgTexts = {},
    fallback = {}
} = chatbotData || {};

const generateBotReply = (userText) => {
    const q = (userText || '').toLowerCase().trim();
    const allProducts = (productsData || []).filter((p) => !p.isBanner);

    const matchRule = knowledgeBase.find((r) => r.keywords?.some((k) => q.includes(k.toLowerCase())));
    if (matchRule) {
        const catTarget = matchRule.category?.toLowerCase();
        const matching = allProducts.filter((p) => {
            const cat = (p.category || '').toLowerCase();
            const sub = (p.subCategory || '').toLowerCase();
            const name = (p.name || '').toLowerCase();
            return catTarget
                ? cat.includes(catTarget) || sub.includes(catTarget) || name.includes(catTarget)
                : matchRule.keywords.some((k) => name.includes(k.toLowerCase()) || cat.includes(k.toLowerCase()));
        }).slice(0, 3);

        return { text: matchRule.reply, products: matching, cta: matchRule.cta };
    }

    const matchedProducts = allProducts.filter((p) =>
        ['name', 'category', 'subCategory', 'brand', 'vendor'].some((k) => p[k]?.toLowerCase().includes(q))
    ).slice(0, 3);

    if (matchedProducts.length > 0) {
        return {
            text: (fallback.matchingText || 'Here are matching items for "{query}":').replace('{query}', userText),
            products: matchedProducts,
            cta: {
                text: fallback.viewProductsText || 'View Products',
                path: `/product?category=${encodeURIComponent(matchedProducts[0].category || '')}`
            }
        };
    }

    return {
        text: fallback.defaultText || 'How can I help you today?',
        products: allProducts.slice(0, 2),
        cta: { text: fallback.ctaText || 'Explore All Products', path: fallback.ctaPath || '/product' }
    };
};

const ProductItem = React.memo(({ product, onSelect }) => (
    <div
        onClick={() => onSelect(product)}
        className="flex items-center gap-12 p-8 bordb cursor-pointer hover:bg-forth transition-all"
    >
        <div className="rounded-6 overflow-hidden flex-shrink-0 bg-forth border-ec" style={{ width: '56px', height: '56px' }}>
            <Image
                src={resolveImagePath(product.image || product.images?.[0] || 'product/Product4.jpg')}
                alt={product.name}
                className="w-full h-full object-contain p-2"
            />
        </div>
        <div className="flex-1 min-w-0">
            <h5 className="headmini-text font-600 text-dark line-clamp1 m-0">{product.name}</h5>
            <p className="mini-text text-gray font-500 m-0 mt-2">
                Brand: <span className="font-600 text-dark">{product.brand || product.vendor?.split(' ')[0]}</span> • <span className="font-600 text-danger">{product.priceFormatted || (product.price != null ? `₹${product.price}` : 'Factory Pricing')}</span>
            </p>
        </div>
    </div>
));

ProductItem.displayName = 'ProductItem';

const ProductSearch = ({ query, onQueryChange, onSelect, onBack }) => {
    const products = React.useMemo(() => {
        const q = query.trim().toLowerCase();
        const list = (productsData || []).filter((p) => !p.isBanner);
        if (!q) return list;
        return list.filter((p) =>
            ['name', 'category', 'subCategory', 'vendor', 'brand'].some((k) => p[k]?.toLowerCase().includes(q))
        );
    }, [query]);

    return (
        <div className="flex flex-column h-full bg-white" data-no-cursor="true">
            <div className="p-12 bordb bg-white">
                <div className="relative flex items-center">
                    <Fields
                        type="input"
                        version="v0"
                        placeholder={search.placeholder || 'Search products...'}
                        value={query}
                        onChange={onQueryChange}
                        icon="Search"
                        iconPosition="right"
                        className="w-full"
                    />
                    {query && (
                        <div className="absolute right-0 top-0 h-full flex items-center z-1 mx-3">
                            <Button
                                version="icon"
                                icon="Close"
                                iconWidth="13"
                                iconHeight="13"
                                iconStroke="var(--gray)"
                                bg="forth"
                                onClick={() => onQueryChange('')}
                                aria-label="Clear search"
                            />
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between mt-8">
                    <Button
                        text={search.backButton || 'Back to Chat'}
                        icon="ChevronLeft"
                        version="none"
                        bg="transparent"
                        color="primary"
                        onClick={onBack}
                        className="font-500 w-max mini-text rounded-5 p-1"
                    />
                    <p className="mini-text text-gray font-500">
                        {products.length} {products.length === 1 ? 'Product' : 'Products'} Available
                    </p>
                </div>
            </div>

            <div className="overflow-auto p-8 flex-1 bg-white">
                {products.length > 0 ? (
                    products.map((p) => <ProductItem key={p.id} product={p} onSelect={onSelect} />)
                ) : (
                    <div className="p-24 text-center text-gray">
                        <Icon name="Search" width="28" height="28" stroke="var(--gray)" className="mx-auto mb-8 opacity-50" />
                        <p className="small-text font-500 text-dark m-0">{search.noResultsTitle || 'No products found'}</p>
                        <p className="mini-text text-gray m-0 mt-4">{search.noResultsSubtitle || 'Try searching for another term'}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const ChatTeaser = ({ onOpen, onDismiss }) => (
    <div
        onClick={onOpen}
        className="b-shadow p-10 rounded-5 cursor-pointer bg-white border-ec"
        style={{ width: '250px', maxWidth: 'calc(100vw - 48px)', animation: 'fadeInUp 0.3s ease-out' }}
        data-no-cursor="true"
    >
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6 text-primary">
                <Icon name={teaser.icon || 'Shield'} width="16" height="16" stroke="currentColor" />
                <p className="small-text font-600 text-dark uppercase tracking-wider">{teaser.badge || 'CUSTOMER DESK'}</p>
            </div>
            <Button
                version="icon"
                icon="Close"
                iconWidth="14"
                iconHeight="14"
                iconStroke="var(--dark)"
                bg="forth"
                aria-label="Dismiss teaser"
                onClick={(e) => {
                    e.stopPropagation();
                    onDismiss();
                }}
            />
        </div>
        <p className="mini-text text-dark font-500 m-0 leading-tight">
            {teaser.message || "Hi! 👋 Need help? Let's chat!"}
        </p>
    </div>
);

const ChatHeader = ({ onClose, isSearch, onToggle }) => (
    <div className="flex items-center justify-between p-12 bg-white bordb" data-no-cursor="true">
        <div className="flex items-center gap-8">
            <div className="icon-lg bg-primary relative rounded-30">
                <Icon name="Bot" width="20" height="20" stroke="var(--white)" strokeWidth="2" />
                <span className="absolute bg-success dot rounded-full bottom-0 right-0" />
            </div>
            <div>
                <h4 className="headmini-text font-600 text-dark">
                    {isSearch ? (header.searchTitle) : (header.chatTitle)}
                </h4>
                <p className="mini-text font-400 text-success">
                    {header.status}
                </p>
            </div>
        </div>

        <div className="flex items-center gap-6">
            <Button
                version="icon"
                icon={isSearch ? 'Bot' : 'Search'}
                iconWidth="15"
                iconHeight="15"
                iconStroke={isSearch ? 'var(--white)' : 'var(--dark)'}
                bg={isSearch ? 'primary' : 'forth'}
                aria-label={isSearch ? 'Switch to Chat' : 'Search Catalog'}
                title={isSearch ? 'Switch to Chat' : 'Search Catalog'}
                onClick={onToggle}
                className="rounded-full"
            />
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
    </div>
);

const ChatWelcome = ({ onActionClick }) => (
    <div className="h-350" data-no-cursor="true">
        <h2 className="title-text text-dark font-700 uppercase">
            {welcome.title}<br />
            <span className="text-primary">{welcome.titleHighlight}</span>
        </h2>

        <p className="mini-text text-gray mt-4">
            {welcome.subtitle}
        </p>

        <div className="grid-cols-2 gap-8 mt-12">
            {(quickActions || []).map((card) => (
                <div
                    key={card.id}
                    onClick={() => onActionClick(card)}
                    className="bg-white rounded-10 p-14 cursor-pointer"
                >
                    <div
                        className="icon rounded-30 flex items-center justify-center"
                        style={{ backgroundColor: card.iconBg }}
                    >
                        <Icon name={card.icon} width="13" height="13" stroke="var(--white)" strokeWidth="2.2" />
                    </div>
                    <div className="mt-6">
                        <h5 className="headmini-text font-600 text-dark m-0">{card.title}</h5>
                        <p className="mini-text text-gray m-0 mt-2 line-clamp2">{card.subtitle}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ChatMessages = ({ messages, isTyping, onReset, onCtaClick, onSelectProduct, endRef }) => (
    <div className="h-350" data-no-cursor="true">
        <Button
            text={msgTexts.backToTopics || 'Back to topics'}
            icon="ChevronLeft"
            version="none"
            bg="transparent"
            color="primary"
            onClick={onReset}
            className="p-1 font-500 w-max mb-8"
        />

        {messages.map((msg, idx) => {
            const isUser = msg.sender === 'user';
            return (
                <div
                    key={idx}
                    className="flex flex-column"
                    style={{ alignItems: isUser ? 'flex-end' : 'flex-start', width: '100%' }}
                >
                    <div
                        className={`mini-text p-10 mb-8 ${isUser ? 'bg-primary text-white' : 'bg-white text-dark'}`}
                        style={{
                            maxWidth: '90%',
                            borderRadius: isUser ? '10px 10px 4px 10px' : '10px 10px 10px 4px',
                            border: isUser ? 'none' : '0.5px solid var(--tertiary)',
                            whiteSpace: 'pre-line'
                        }}
                    >
                        <p className="mini-text font-400 m-0">{msg.text}</p>
                        {msg.products?.length > 0 && (
                            <div className="mt-8 grid-cols-1 gap-6 w-full pt-6 bordt">
                                {msg.products.map((p) => (
                                    <ProductItem key={p.id} product={p} onSelect={onSelectProduct} />
                                ))}
                            </div>
                        )}
                    </div>

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
                            className="mt-4 mb-8"
                            onClick={() => onCtaClick(msg.cta.path)}
                        />
                    )}
                </div>
            );
        })}

        {isTyping && (
            <div
                className="bg-white rounded-16 p-10 flex items-center gap-4 b-shadow mb-8"
                style={{ width: 'fit-content', border: '1px solid #e2e8f0' }}
            >
                <span className="rounded-full bg-primary" style={{ width: '6px', height: '6px', animation: 'bounce 1s infinite' }} />
                <span className="rounded-full bg-primary" style={{ width: '6px', height: '6px', animation: 'bounce 1s infinite 0.2s' }} />
                <span className="rounded-full bg-primary" style={{ width: '6px', height: '6px', animation: 'bounce 1s infinite 0.4s' }} />
            </div>
        )}
        <div ref={endRef} />
    </div>
);

const ChatInput = ({ value, onChange, onSend }) => {
    const hasText = Boolean(value?.trim());

    return (
        <div className="p-12 bg-white relative" data-no-cursor="true">
            <form onSubmit={onSend} className="relative flex items-center w-full">
                <Fields
                    type="input"
                    version="v2"
                    placeholder={input.placeholder || 'Ask a question...'}
                    value={value}
                    onChange={onChange}
                    className="w-full"
                />
                <div className="absolute right-0 top-0 my-4 mx-2">
                    <Button
                        type="submit"
                        version="icon"
                        icon="Send"
                        iconWidth="15"
                        iconHeight="15"
                        iconStroke="var(--white)"
                        iconStrokeWidth="2"
                        bg={hasText ? 'primary' : 'dark'}
                        disabled={!hasText}
                        onClick={onSend}
                        aria-label={input.sendLabel}
                        title={input.sendLabel}
                        className="rounded-30 p-10"
                    />
                </div>
            </form>
        </div>
    );
};

const Chatbot = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = React.useState(false);
    const [showTeaser, setShowTeaser] = React.useState(true);
    const [isSearchMode, setIsSearchMode] = React.useState(false);
    const [messages, setMessages] = React.useState([]);
    const [inputValue, setInputValue] = React.useState('');
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isTyping, setIsTyping] = React.useState(false);
    const endRef = React.useRef(null);

    React.useEffect(() => {
        if (messages.length > 0) {
            endRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping]);

    React.useEffect(() => {
        if (!isOpen) return;
        const onKeyDown = (e) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isOpen]);

    const handleNavigate = React.useCallback((path) => {
        navigate(path);
        setIsOpen(false);
    }, [navigate]);

    const handleActionClick = React.useCallback((action) => {
        setMessages((prev) => [...prev, { sender: 'user', text: action.title }]);
        setIsTyping(true);

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { sender: 'bot', text: action.reply, cta: action.cta }
            ]);
            setIsTyping(false);
        }, 350);
    }, []);

    const handleSend = React.useCallback((e) => {
        e?.preventDefault();
        const trimmed = inputValue.trim();
        if (!trimmed) return;

        setMessages((prev) => [...prev, { sender: 'user', text: trimmed }]);
        setInputValue('');
        setIsTyping(true);

        setTimeout(() => {
            const replyObj = generateBotReply(trimmed);
            setMessages((prev) => [
                ...prev,
                { sender: 'bot', text: replyObj.text, products: replyObj.products, cta: replyObj.cta }
            ]);
            setIsTyping(false);
        }, 400);
    }, [inputValue]);

    return (
        <>
            {!isOpen && (
                <div
                    style={{ position: 'fixed', bottom: '30px', right: '6px', zIndex: '88' }}
                    className="flex items-end justify-end gap-6"
                >
                    {showTeaser && (
                        <ChatTeaser
                            onOpen={() => { setIsOpen(true); setShowTeaser(false); }}
                            onDismiss={() => setShowTeaser(false)}
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
                        onClick={() => { setIsOpen(true); setShowTeaser(false); }}
                        className="rounded-30"
                    />
                </div>
            )}

            {isOpen && (
                <div
                    data-no-cursor="true"
                    style={{
                        position: 'fixed',
                        bottom: '10px',
                        right: '5px',
                        width: '360px',
                        height: '490px',
                        animation: 'fadeInUp 0.25s ease-out',
                    }}
                    className="bg-white rounded-10 overflow-hidden z-999 b-shadow grid-cols-1"
                >
                    <ChatHeader
                        onClose={() => setIsOpen(false)}
                        isSearch={isSearchMode}
                        onToggle={() => setIsSearchMode((prev) => !prev)}
                    />

                    {isSearchMode ? (
                        <ProductSearch
                            query={searchQuery}
                            onQueryChange={setSearchQuery}
                            onSelect={(p) => handleNavigate(`/product/${p.id}`)}
                            onBack={() => { setIsSearchMode(false); setSearchQuery(''); }}
                        />
                    ) : (
                        <>
                            <div className="overflow-auto p-16 bg-forth flex-1">
                                {messages.length === 0 ? (
                                    <ChatWelcome onActionClick={handleActionClick} />
                                ) : (
                                    <ChatMessages
                                        messages={messages}
                                        isTyping={isTyping}
                                        onReset={() => setMessages([])}
                                        onCtaClick={handleNavigate}
                                        onSelectProduct={(p) => handleNavigate(`/product/${p.id}`)}
                                        endRef={endRef}
                                    />
                                )}
                            </div>

                            <ChatInput
                                value={inputValue}
                                onChange={setInputValue}
                                onSend={handleSend}
                            />
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default React.memo(Chatbot);
