import React from 'react';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Button from '../../../components/common/Button';
import Icon from '../../../components/common/Icon';

const collection = {
    title: 'Heritage Living',
    description: 'We are a results-driven IT consulting team helping businesses unlock efficiency, scale operations, and improve customer experience.',
    mainImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    thumbnails: [
        'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=200&q=80',
        'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=200&q=80',
        'https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=200&q=80'
    ]
};

const DetailSection = () => {
    return (
        <Container>
            <div className="grid-cols-2 sm-grid-cols-1 items-center gap-12 w-full py-50">
                <div className="pr-10 sm-pr-1">
                    <p className="mini-text text-dark border-ec w-max px-18 py-6 rounded-20 flex items-center gap-8 font-700 uppercase">
                        <Icon name="Settings" width="14" height="14" className="text-primary" />
                        Feature Collections
                    </p>
                    <h3 className="text-dark large-text font-700 mt-14 sm-mt-6">
                        Delivering Innovative Businesses.
                    </h3>
                    <p className="text-gray small-text font-400 mt-12 sm-mt-6">
                        {collection.description}
                    </p>

                    <div className="grid-cols-4 gap-12 mt-30 sm-mt-14">
                        {collection.thumbnails.map((thumb, idx) => (
                            <div key={idx}>
                                <Image
                                    src={thumb}
                                    alt={`Thumbnail ${idx + 1}`}
                                    className="flex w-full h-150 sm-h-100 object-cover rounded-10"
                                />
                            </div>
                        ))}
                    </div>

                    <Button
                        text="Shop Collection"
                        version="v2"
                        bg="dark"
                        color="white"
                        className="rounded-30 mt-30 sm-mt-20"
                    />
                </div>

                <div className="pl-10 sm-pl-1 sm-mt-20">
                    <Image
                        src={collection.mainImage}
                        alt={collection.title}
                        className="flex w-full h-550 sm-h-250 object-cover rounded-10"
                    />
                </div>
            </div>
        </Container>
    );
};

export default DetailSection;