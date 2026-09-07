import React from 'react';
import Container from '../../../components/common/Container';
import Icon from '../../../components/common/Icon';
import Button from '../../../components/common/Button';
import FormBuilder from '../../../components/forms/FormBuilder';

const enquiryFields = [
    {
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Name',
        validation: { required: true }
    },
    {
        name: 'email',
        label: 'Email *',
        type: 'email',
        placeholder: 'Email',
        validation: { required: true }
    },
    {
        name: 'phone',
        label: 'Phone Number *',
        type: 'tel',
        placeholder: 'Phone Number',
        validation: { required: true }
    },
    {
        name: 'tradeRole',
        label: 'Your Trade Chain Role',
        type: 'select',
        defaultValue: 'Manufacturer',
        options: [
            'Manufacturer',
            'Company / Brand Owner',
            'Distributor / Wholesaler',
            'Stockist / Regional Hub',
            'Trader / Merchant',
            'Retailer / Vendor'
        ],
        validation: { required: true }
    },
    {
        name: 'primaryObjective',
        label: 'Primary Objective',
        type: 'select',
        defaultValue: 'Full 8-Node Trade Chain Automation',
        options: [
            'Full 8-Node Trade Chain Automation',
            'Agency Website Development',
            'E-Commerce Storefront Engine',
            'Meta Paid Advertising & Scaling',
            'SEO / AEO / GEO AI Search Optimization',
            'Real-time Regional Visibility Tracking Radar'
        ],
        validation: { required: true }
    },
    {
        name: 'message',
        label: 'Your message',
        type: 'textarea',
        placeholder: 'Your message'
    }
];

const Enquiry = () => {
    const handleFormSubmit = (data) => {
        alert('Thank you! Your enquiry has been submitted.');
    };

    return (
        <Container>
            <div className="flex sm-grid-cols-1 items-start gap-12 py-60">
                <div className="w-65 sm-w-full pr-20 sm-pr-1 bordr">
                    <h3 className="text-dark head-text font-600">
                        Contact Us
                    </h3>
                    <p className="text-gray small-text font-400 mt-8 mb-20">
                        Made entirely of oak, the Bow Chair is comfortable, visually pleasing and brimming with character. The moulded plywood seat is unusually wide in proportion to its depth.
                    </p>

                    <div className='w-90'>
                        <FormBuilder
                            fields={enquiryFields}
                            onSubmit={handleFormSubmit}
                            submitType="json"
                            col="1"
                            submitText="Submit Now"
                            buttonVersion="v2"
                            buttonBg="dark"
                            buttonClassName="flex items-center justify-start mt-20"
                        />
                    </div>
                </div>

                <div className="w-35 sm-w-full pl-20 sm-pl-1">
                    <h3 className="text-dark head-text font-600">
                        Need Help?
                    </h3>
                    <p className="text-gray small-text font-400 mt-8">
                        To us, design has a broader purpose and as you can read about on this website, we are on a mission.
                    </p>

                    <div className="grid-cols-1 gap-12 mt-20">
                        <div className="flex gap-12 items-start mb-20">
                            <div className="icon-lg border-dark rounded-full">
                                <Icon name="MapPin" width="16" height="16" stroke="#141414" />
                            </div>
                            <div>
                                <h4 className="text-dark mid-text font-600">
                                    General Office
                                </h4>
                                <p className="text-gray mini-text font-400 mt-2">
                                    382 NE 191st St # 87394 Miami
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-12 items-start mb-20">
                            <div className="icon-lg border-dark rounded-full">
                                <Icon name="Phone" width="16" height="16" stroke="#141414" />
                            </div>
                            <div>
                                <h4 className="text-dark mid-text font-600">
                                    Call Us
                                </h4>
                                <p className="text-gray mini-text font-400 mt-2">
                                    +1 888-234-1234 (tool-free)
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-12 items-start mb-20">
                            <div className="icon-lg border-dark rounded-full">
                                <Icon name="Clock" width="16" height="16" stroke="#141414" />
                            </div>
                            <div>
                                <h4 className="text-dark mid-text font-600">
                                    Working Hour
                                </h4>
                                <p className="text-gray mini-text font-400 mt-2">
                                    Mon – Fri, 7:30 AM – 4:00 PM PT<br />
                                    Sat, 8:00 AM – 1:00 PM PT<br />
                                    Sun, Closed
                                </p>
                            </div>
                        </div>
                    </div>

                    <Button
                        text="Find A Store"
                        version="v2"
                        bg="dark"
                        color="white"
                        className="rounded-30 mt-10"
                    />
                </div>
            </div>
        </Container>
    );
};

export default Enquiry;