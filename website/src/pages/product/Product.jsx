import React from 'react'
import Banner from '../../components/layout/generic/Banner'
import FilterSection from './sections/FilterSection'
import SpecifySection from './sections/SpecifySection'

const Product = () => {
    return (
        <>
            <Banner
                title="Products Collection"
                desc="Products"
                breadcrumbs={[
                    { label: 'Home', path: '/home' },
                    { label: 'Products', path: '/products' }
                ]}
            />
            <FilterSection />
            <SpecifySection />
        </>
    )
}

export default Product