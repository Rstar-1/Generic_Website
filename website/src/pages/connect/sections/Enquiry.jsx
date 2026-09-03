import React, { useState } from 'react';
import Container from '../../../components/common/Container';
import Icon from '../../../components/common/Icon';

const Enquiry = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        orderNumber: '',
        country: 'Austria',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you! Your enquiry has been submitted.');
    };

    return (
        <section style={{ backgroundColor: '#FFFFFF', padding: '60px 0 100px 0' }}>
            <Container version="v2">
                <div style={{ display: 'flex', gap: '60px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    {/* Left Column - Contact Form */}
                    <div style={{ flex: '1 1 60%', minWidth: '320px' }}>
                        <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#141414', marginBottom: '12px' }}>
                            Contact Us
                        </h2>
                        <p style={{ fontSize: '14px', color: '#666666', lineHeight: '1.6', marginBottom: '36px', maxWidth: '580px' }}>
                            Made entirely of oak, the Bow Chair is comfortable, visually pleasing and brimming with character. The moulded plywood seat is unusually wide in proportion to its depth.
                        </p>

                        <form onSubmit={handleSubmit} className='grid-cols-1 gap-12'>
                            {/* Row 1: Name & Email */}
                            <div className='grid-cols-2 gap-12'>
                                <div className='w-full'>
                                    <label className='text-xxs text-black font-black mb-8 block'>
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        style={{
                                            width: '100%',
                                            backgroundColor: '#EDEDED',
                                            border: 'none',
                                            borderRadius: '24px',
                                            padding: '14px 20px',
                                            fontSize: '14px',
                                            color: '#141414',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                                <div className='w-full'>
                                    <label className='text-xxs text-black font-black mb-8 block'>
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        style={{
                                            width: '100%',
                                            backgroundColor: '#EDEDED',
                                            border: 'none',
                                            borderRadius: '24px',
                                            padding: '14px 20px',
                                            fontSize: '14px',
                                            color: '#141414',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Row 2: Phone & Order Number */}
                            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                                <div style={{ flex: 1, minWidth: '220px' }}>
                                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#141414', marginBottom: '8px', display: 'block' }}>
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        style={{
                                            width: '100%',
                                            backgroundColor: '#EDEDED',
                                            border: 'none',
                                            borderRadius: '24px',
                                            padding: '14px 20px',
                                            fontSize: '14px',
                                            color: '#141414',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                                <div style={{ flex: 1, minWidth: '220px' }}>
                                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#141414', marginBottom: '8px', display: 'block' }}>
                                        Order Number
                                    </label>
                                    <input
                                        type="text"
                                        name="orderNumber"
                                        placeholder="Order Number"
                                        value={formData.orderNumber}
                                        onChange={handleChange}
                                        style={{
                                            width: '100%',
                                            backgroundColor: '#EDEDED',
                                            border: 'none',
                                            borderRadius: '24px',
                                            padding: '14px 20px',
                                            fontSize: '14px',
                                            color: '#141414',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Row 3: Country */}
                            <div>
                                <label style={{ fontSize: '13px', fontWeight: '700', color: '#141414', marginBottom: '8px', display: 'block' }}>
                                    Country
                                </label>
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#EDEDED',
                                        border: 'none',
                                        borderRadius: '24px',
                                        padding: '14px 20px',
                                        fontSize: '14px',
                                        color: '#141414',
                                        outline: 'none',
                                        appearance: 'none',
                                        backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23141414%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'right 20px center',
                                        backgroundSize: '12px auto',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <option value="Austria">Austria</option>
                                    <option value="United States">United States</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Germany">Germany</option>
                                </select>
                            </div>

                            {/* Row 4: Your message */}
                            <div>
                                <label style={{ fontSize: '13px', fontWeight: '700', color: '#141414', marginBottom: '8px', display: 'block' }}>
                                    Your message
                                </label>
                                <textarea
                                    name="message"
                                    rows={6}
                                    placeholder="Your message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#EDEDED',
                                        border: 'none',
                                        borderRadius: '16px',
                                        padding: '16px 20px',
                                        fontSize: '14px',
                                        color: '#141414',
                                        outline: 'none',
                                        resize: 'vertical'
                                    }}
                                />
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    style={{
                                        backgroundColor: '#141414',
                                        color: '#FFFFFF',
                                        borderRadius: '30px',
                                        padding: '14px 44px',
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s ease, backgroundColor 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.backgroundColor = '#333333';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.backgroundColor = '#141414';
                                    }}
                                >
                                    Submit Now
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right Column - Need Help Sidebar */}
                    <div
                        style={{
                            flex: '1 1 32%',
                            minWidth: '280px',
                            borderLeft: '1px solid #E5E7EB',
                            paddingLeft: '40px'
                        }}
                    >
                        <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#141414', marginBottom: '12px' }}>
                            Need Help?
                        </h3>
                        <p style={{ fontSize: '13px', color: '#666666', lineHeight: '1.6', marginBottom: '32px' }}>
                            To us, design has a broader purpose and as you can read about on this website, we are on a mission.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                            {/* General Office */}
                            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                                <div
                                    style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '50%',
                                        border: '1px solid #141414',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}
                                >
                                    <Icon name="MapPin" width="16" height="16" stroke="#141414" />
                                </div>
                                <div>
                                    <h5 style={{ fontSize: '15px', fontWeight: '700', color: '#141414', marginBottom: '4px' }}>
                                        General Office
                                    </h5>
                                    <p style={{ fontSize: '13px', color: '#666666', margin: 0 }}>
                                        382 NE 191st St # 87394 Miami
                                    </p>
                                </div>
                            </div>

                            {/* Call Us */}
                            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                                <div
                                    style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '50%',
                                        border: '1px solid #141414',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}
                                >
                                    <Icon name="Phone" width="16" height="16" stroke="#141414" />
                                </div>
                                <div>
                                    <h5 style={{ fontSize: '15px', fontWeight: '700', color: '#141414', marginBottom: '4px' }}>
                                        Call Us
                                    </h5>
                                    <p style={{ fontSize: '13px', color: '#666666', margin: 0 }}>
                                        +1 888-234-1234 (tool-free)
                                    </p>
                                </div>
                            </div>

                            {/* Working Hour */}
                            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                                <div
                                    style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '50%',
                                        border: '1px solid #141414',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}
                                >
                                    <Icon name="Clock" width="16" height="16" stroke="#141414" />
                                </div>
                                <div>
                                    <h5 style={{ fontSize: '15px', fontWeight: '700', color: '#141414', marginBottom: '4px' }}>
                                        Working Hour
                                    </h5>
                                    <p style={{ fontSize: '13px', color: '#666666', margin: '0 0 2px 0' }}>
                                        Mon – Fri, 7:30 AM – 4:00 PM PT
                                    </p>
                                    <p style={{ fontSize: '13px', color: '#666666', margin: '0 0 2px 0' }}>
                                        Sat, 8:00 AM – 1:00 PM PT
                                    </p>
                                    <p style={{ fontSize: '13px', color: '#666666', margin: 0 }}>
                                        Sun, Closed
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Find A Store Button */}
                        <div style={{ marginTop: '36px' }}>
                            <button
                                style={{
                                    backgroundColor: '#141414',
                                    color: '#FFFFFF',
                                    borderRadius: '30px',
                                    padding: '12px 32px',
                                    fontSize: '14px',
                                    fontWeight: '700',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s ease, backgroundColor 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.backgroundColor = '#333333';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.backgroundColor = '#141414';
                                }}
                            >
                                Find A Store
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Enquiry;