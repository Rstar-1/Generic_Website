import React from 'react'
import HeroBanner from './sections/HeroBanner'
import CategorySection from './sections/CategorySection'
import AboutSection from './sections/AboutSection'
import FeatureSection from './sections/FeatureSection'
import OfferSection from './sections/OfferSection'
import PatchSection from './sections/PatchSection'

const Home = () => {
    return (
        <>
            <HeroBanner />
            <CategorySection />
            <FeatureSection />
            <AboutSection />
            <PatchSection />
            <OfferSection />
        </>
    )
}

export default Home