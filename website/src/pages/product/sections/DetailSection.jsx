import React, { useState } from 'react';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Icon from '../../../components/common/Icon';
import Button from '../../../components/common/Button';
import Accordion from '../../../components/common/Accordion';
import Fields from '../../../components/forms/Fields';

const productImages = [
    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=800&q=80'
];

const accordionItems = [
    {
        id: 1,
        title: 'Specifications',
        content: 'Crafted with premium oak wood and ergonomic curvature. Built for durability, warmth, and modern interior aesthetics.'
    },
    {
        id: 2,
        title: 'Product Details',
        content: 'Crafted with premium oak wood and ergonomic curvature. Built for durability, warmth, and modern interior aesthetics.'
    },
    {
        id: 3,
        title: 'Materials & Care',
        content: 'Crafted with premium oak wood and ergonomic curvature. Built for durability, warmth, and modern interior aesthetics.'
    }
];

const crossSellProducts = [
    {
        id: 1,
        name: 'Arc Chair',
        price: '$699.00',
        oldPrice: '$730.00',
        image: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 2,
        name: 'Abella Jug',
        price: '$115.00',
        image: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 3,
        name: 'Beam Table',
        price: '$215.00',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80'
    }
];

const ProductDetailContent = () => {
    const [selectedImgIdx, setSelectedImgIdx] = useState(0);
    const [selectedColor, setSelectedColor] = useState('Black');
    const [selectedMaterial, setSelectedMaterial] = useState('Oak');
    const [quantity, setQuantity] = useState(1);
    const [customNote, setCustomNote] = useState('');

    return (
        <Container>
            <div className='py-50 w-full grid-cols-2 sm-grid-cols-1 gap-12'>
                <div className='pr-10 sm-pr-1'>
                    <div className='flex items-start gap-12'>
                        <div className='w-15 sm-w-25 grid-cols-1 gap-12'>
                            {productImages.map((img, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedImgIdx(idx)}
                                    className=''
                                >
                                    <Image
                                        src={img}
                                        alt={`Thumbnail ${idx}`}
                                        className='flex object-cover w-full h-100px rounded-10'
                                    />
                                </div>
                            ))}
                        </div>
                        <div className='w-85 sm-w-75'>
                            <Image
                                src={productImages[selectedImgIdx]}
                                alt="Main Product"
                                className='w-full h-500 sm-h-350 object-cover flex rounded-10'
                            />
                        </div>
                    </div>

                    <Accordion items={accordionItems} className='mt-20' />

                    <div
                        className='bg-tertiary p-20 rounded-10 mt-20'
                    >
                        <h3 className='mid-text text-dark font-600 uppercase'>
                            Payment & Security
                        </h3>
                        <p className='text-gray mini-text font-400 mt-4'>
                            Your payment information is processed securely. We do not store credit card details nor have access to your credit card information.
                        </p>
                    </div>
                </div>

                <div className='pl-10 sm-pl-1 w-90 sm-w-full'>
                    <h2 className='head-text text-dark font-600 capitalize'>
                        Arc Chair Limited
                    </h2>
                    <p className='text-gray mini-text font-400'>
                        Vendor: <span className='text-primary font-600'>FoxEcom</span> | Type: <span className='text-primary font-600'>Chairs</span>
                    </p>
                    <p className='text-dark headpara-text font-700 mt-12'>
                        $699.00
                    </p>

                    <div className='mt-16 flex items-center gap-12'>
                        <p className='mini-text text-primary border-primary w-max px-14 py-4 rounded-20 flex items-center gap-8 font-500 uppercase mb-8'>
                            <Icon name='Box' width="14" height="14" className="text-primary" />
                            Modern
                        </p>
                        <p className='mini-text text-gray border-ec w-max px-14 py-4 rounded-20 flex items-center gap-8 font-500 uppercase mb-8'>
                            <Icon name='Box' width="14" height="14" className="text-gray" />
                            Eco-certified
                        </p>
                        <p className='mini-text text-gray border-ec w-max px-14 py-4 rounded-20 flex items-center gap-8 font-500 uppercase mb-8'>
                            <Icon name='Box' width="14" height="14" className="text-gray" />
                            Warranty
                        </p>
                    </div>

                    <div className='mt-4'>
                        <p className='mini-text text-primary font-500'>
                            Hurry up, only 8 items left in stock.
                        </p>
                        <div style={{ width: '100%', height: '4px', backgroundColor: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }} className='mt-8'>
                            <div style={{ width: '35%', height: '100%', backgroundColor: '#10B981' }} />
                        </div>
                    </div>

                    <p className='small-text text-gray font-400 mt-10'>
                        This is a demonstration store by FoxEcom. All images, videos, and other content belong exclusively to FoxEcom and are not This is a demonstration store by FoxEcom. All images, videos, and other content authorized for reuse on This is a demonstration store by FoxEcom. All images, videos, and other content any other stores.
                    </p>

                    <div className='mt-12'>
                        <p className='mini-text text-dark font-500 uppercase'>
                            Color: <span className='text-gray font-400 ml-2'>{selectedColor}</span>
                        </p>
                        <div className='flex items-center gap-8 mt-6'>
                            <div
                                onClick={() => setSelectedColor('Black')}
                                style={{
                                    width: '28px',
                                    height: '28px',
                                    borderRadius: '6px',
                                    backgroundColor: '#141414',
                                    cursor: 'pointer',
                                    outline: selectedColor === 'Black' ? '2px solid #141414' : 'none',
                                    outlineOffset: '2px'
                                }}
                            />
                            <div
                                onClick={() => setSelectedColor('Wood')}
                                style={{
                                    width: '28px',
                                    height: '28px',
                                    borderRadius: '6px',
                                    backgroundColor: '#A0522D',
                                    cursor: 'pointer',
                                    outline: selectedColor === 'Wood' ? '2px solid #141414' : 'none',
                                    outlineOffset: '2px'
                                }}
                            />
                        </div>
                    </div>

                    <div className='mt-12 w-80 sm-w-90'>
                        <p className='mini-text text-dark font-500 uppercase mb-4'>Quantity</p>
                        <Fields
                            type="quantity"
                            value={quantity}
                            onChange={(val) => setQuantity(Math.max(1, Number(val) || 1))}
                            min={1}
                        />
                    </div>

                    <div className='grid-cols-2 gap-12 w-80 mt-12'>
                        <Button
                            text="Add To Cart"
                            version="v3"
                            bg="tertiary"
                            color="dark"
                        />
                        <Button
                            text="Buy It Now"
                            version="v3"
                            bg="primary"
                            color="white"
                        />
                    </div>

                    <div className='mt-20 grid-cols-1 gap-12'>
                        <div className='flex items-center gap-8'>
                            <Icon name="Truck" width="16" height="16" stroke="#444444" />
                            <p className='small-text text-dark font-400'>Free International Shipping over $500</p>
                        </div>
                        <div className='flex items-center gap-8'>
                            <Icon name="RotateCcw" width="16" height="16" stroke="#444444" />
                            <p className='small-text text-dark font-400'>Free Returns Within 30 days</p>
                        </div>
                    </div>

                    <div className='mt-16 border-ec p-16 rounded-10 flex items-center justify-between gap-12'>
                        <div className='flex items-center gap-8'>
                            <div className='bg-tertiary icon-lg rounded-20'>
                                <Icon name="ShoppingBag" width="22" height="22" stroke="#141414" />
                            </div>
                            <div>
                                <h5 className='headmini-text text-dark font-500'>
                                    Pickup available at California Store
                                </h5>
                                <p className='mini-text text-gray font-400'>Usually ready in 24 hours</p>
                            </div>
                        </div>
                        <div className='bg-tertiary icon-lg rounded-20'>
                            <Icon name="ChevronRight" width="20" height="20" stroke="#141414" />
                        </div>
                    </div>

                    <div className='bg-forth p-12 rounded-5 mt-12 flex items-center justify-between gap-12'>
                        <div className='flex items-center gap-8'>
                            <Icon name="Box" width="16" height="16" stroke="#047857" />
                            <p className='mini-text text-dark font-400'>
                                <strong>Limited time offer:</strong> Get $20 off when you spend $1,000 or more!{' '}
                            </p>
                        </div>
                    </div>

                    <div className='mt-20'>
                        <h3 className='title-text text-dark font-600 uppercase'>
                            Trending Products
                        </h3>

                        <div className='grid-cols-3 gap-12 mt-16'>
                            {crossSellProducts.map((p) => (
                                <div key={p.id}>
                                    <div
                                    >
                                        <Image
                                            src={p.image}
                                            alt={p.name}
                                            className='w-full h-200 sm-h-150 rounded-10 object-cover flex'
                                        />
                                    </div>
                                    <h4 className='mid-text text-dark font-600 mt-10'>
                                        {p.name}
                                    </h4>
                                    <div className='flex items-center gap-8'>
                                        <p className='mini-text text-dark font-500'>
                                            {p.price}
                                        </p>
                                        {p.oldPrice && (
                                            <p className='mini-text text-gray font-500 line-through'>
                                                {p.oldPrice}
                                            </p>
                                        )}
                                    </div>
                                    <Button
                                        text="View"
                                        version="v0"
                                        bg="primary"
                                        color="white"
                                        className='mt-5'
                                    />
                                </div>
                            ))}
                        </div>

                        <div className='flex items-center gap-12 mt-20'>
                            <p className='text-dark font-500 small-text'>Share:</p>
                            <div className='flex items-center gap-8'>
                                {['Facebook', 'Twitter', 'Share2'].map((iconName, idx) => (
                                    <div
                                        key={idx}
                                        className='icon-lg rounded-full border-ec'
                                    >
                                        <Icon name={iconName} width="22" height="22" stroke="#141414" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ProductDetailContent;
