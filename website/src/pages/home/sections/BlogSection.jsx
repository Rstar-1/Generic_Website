import React from 'react';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Button from '../../../components/common/Button';
import Icon from '../../../components/common/Icon';
import Heading from '../../../components/layout/generic/Heading';

const featuredPost = {
    id: 1,
    tag: 'Speakers',
    tagBg: '#548722',
    date: 'October 9, 2023',
    comments: '0 comments',
    title: 'Eco-Audio - Sustainable Sound',
    description: 'The realm of audio has witnessed incredible advancements over the past decade. As we venture further into this era of technological marvels, the way we experience and interact with sound continues to evolve.',
    image: 'https://concept-theme-tech.myshopify.com/cdn/shop/articles/page-header_1229a8ee-7b9c-4589-9d89-91d97b2a9cf3.webp?v=1709613414&width=1600'
};

const secondaryPosts = [
    {
        id: 2,
        tag: 'Headphones',
        tagBg: '#EE6A2B',
        date: 'October 9, 2023',
        comments: '0 comments',
        title: 'Inside In-Ear Excellence',
        description: "In the audio tech world, there's always room for innovation. But, there are few moments when a product not only meets expectations but also redefines them.",
        image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 3,
        tag: 'News & Events',
        tagBg: '#F54848',
        date: 'October 9, 2023',
        comments: '0 comments',
        title: 'The International Sound Artistry Conference Recap',
        description: "This year's AudioTech Expo in Los Angeles was nothing short of sensational. As enthusiasts and professionals from around the globe congregated, the air buzzed with anticipation and excitement.",
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=500&q=80'
    }
];

const BlogSection = () => {
    return (
        <Container>
            <div className='w-full py-50'>

                <Heading
                    version="v2"
                    tag="Make It Yours"
                    title="Latest Stories"
                    actionText='Show All'
                />

                <div className='flex items-start gap-12 w-full mt-30'>
                    <div className='relative rounded-10 overflow-hidden h-550 w-60'>
                        <Image
                            src={featuredPost.image}
                            alt={featuredPost.title}
                            className="top-0 left-0 w-full h-full object-cover filter-b5"
                        />

                        <div className='absolute top-0 left-0'>
                            <p className='mini-text text-white bg-primary w-max px-14 py-4 rounded-20 flex items-center gap-8 font-500 uppercase m-30'>
                                <Icon name='Box' width="14" height="14" className="text-white" />
                                {featuredPost.tag}
                            </p>
                        </div>

                        <div className='absolute bottom-0 left-0'>
                            <div className='m-30'>
                                <div className='flex items-center gap-12'>
                                    <div className='flex items-center gap-4'>
                                        <Icon name="Clock" width="12" height="12" className="text-white" />
                                        <p className='mini-text text-white'>{featuredPost.date}</p>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <Icon name="Reviews" width="12" height="12" className="text-white" />
                                        <p className='mini-text text-white'>{featuredPost.comments}</p>
                                    </div>
                                </div>

                                <h3 className='large-text text-white font-600 mt-16'>
                                    {featuredPost.title}
                                </h3>

                                <p className='small-text text-white font-400 mt-10 w-80'>
                                    {featuredPost.description}
                                </p>

                                <Button
                                    text="Shop the Look"
                                    version="v2"
                                    bg="white"
                                    color="dark"
                                    className='rounded-30 mt-22'
                                />
                            </div>
                        </div>
                    </div>

                    <div className='grid-cols-1 w-40'>
                        {secondaryPosts.map((post, idx) => (
                            <div
                                key={post.id}
                                className={`flex items-start gap-12 ${idx === 0 ? 'bordb pb-20' : 'pt-20'}`}
                            >
                                <div className='relative w-45 h-250 rounded-10 overflow-hidden'>
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        className='w-full h-full object-cover flex'
                                    />
                                    <div className='absolute top-0 left-0'>
                                        <p className='mini-text text-white bg-primary w-max px-14 py-4 rounded-20 flex items-center gap-8 font-500 uppercase m-12'>
                                            <Icon name='Box' width="14" height="14" className="text-white" />
                                            {post.tag}
                                        </p>
                                    </div>
                                </div>

                                <div className='w-55'>
                                    <div className='flex items-center gap-12 mt-4'>
                                        <div className='flex items-center gap-4'>
                                            <Icon name="Clock" width="12" height="12" className="text-dark" />
                                            <p className='mini-text text-dark'>{post.date}</p>
                                        </div>
                                        <div className='flex items-center gap-4'>
                                            <Icon name="Reviews" width="12" height="12" className="text-dark" />
                                            <p className='mini-text text-dark'>{post.comments}</p>
                                        </div>
                                    </div>

                                    <h4 className='title-text text-dark font-600 line-clamp2 mt-6'>
                                        {post.title}
                                    </h4>

                                    <p className='mini-text text-gray font-400 mt-8 line-clamp4'>
                                        {post.description}
                                    </p>

                                    <Button
                                        text="Read more"
                                        version="v0"
                                        bg="dark"
                                        color="white"
                                        className='rounded-30 mt-12'
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default BlogSection;
