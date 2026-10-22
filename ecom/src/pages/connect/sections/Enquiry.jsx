import React, { memo } from 'react';

import Icon from '../../../components/common/Icon';
import Heading from '../../../components/layout/generic/Heading';
import ContactForm from '../../../components/forms/sections/ContactForm';

const env = import.meta.env;
const location = (env.VITE_LOCATION || env.VITE_ADDRESS)?.trim();
const phone = env.VITE_PHONE?.trim();
const email = env.VITE_EMAIL?.trim();
const hours = env.VITE_WORKING_HOURS?.trim();
const weekend = env.VITE_WEEKEND_HOURS?.trim();

const CONTACT_ITEMS = [
    location && {
        icon: 'MapPin',
        title: 'ADDRESS',
        desc: location,
        link: `https://maps.google.com/?q=${encodeURIComponent(location)}`
    },
    phone && {
        icon: 'Phone',
        title: 'Call Us',
        desc: phone.startsWith('+') ? phone : `+91 ${phone}`,
        link: `tel:${phone.replace(/[^\d+]/g, '')}`
    },
    email && {
        icon: 'Mail',
        title: 'Email Us',
        desc: email,
        link: `mailto:${email}`
    },
    (hours || weekend) && {
        icon: 'Clock',
        title: 'Working Hours',
        desc: hours || 'MON-SAT, 9AM-7PM IST',
        sub: weekend
    }
].filter(Boolean);

const ContactItem = memo(({ icon, title, desc, link, sub }) => (
    <div className="flex gap-12 items-start mb-16">
        <div className="icon-lg border-dark rounded-full center-div flex-shrink-0">
            <Icon name={icon} width="16" height="16" stroke="currentColor" />
        </div>
        <div className="w-90">
            <h4 className="text-dark mid-text font-600">{title}</h4>
            {link ? (
                <a
                    href={link}
                    target={link.startsWith('http') ? '_blank' : undefined}
                    rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-gray mini-text font-400 mt-2 block hover:text-dark transition-colors"
                >
                    {desc}
                </a>
            ) : (
                <p className="text-gray mini-text font-400 mt-2">{desc}</p>
            )}
            {sub && <p className="text-gray mini-text font-400 mt-2">{sub}</p>}
        </div>
    </div>
));

ContactItem.displayName = 'ContactItem';

const Enquiry = memo(() => (
    <div className="flex sm-grid-cols-1 items-start gap-12 py-60">
        <div className="w-60 sm-w-full pr-20 sm-pr-1 bordr">
            <Heading
                version="v2"
                tag="GET IN TOUCH"
                tagIcon="Phone"
                title="Connect With Us"
                subtitle="Have a project in mind, need technical consultation, or have an inquiry? Reach out to our team."
                className="mb-20"
            />
            <div className="w-80 sm-w-full">
                <ContactForm />
            </div>
        </div>

        <div className="w-40 sm-w-full pl-20 sm-pl-1 sm-mt-16">
            <Heading
                version="v2"
                tag=""
                title="Need Help"
                subtitle="Reach out to us directly through any of our official communication channels or visit our distribution hub."
                className="mb-20"
            />
            <div className="grid-cols-1 gap-12 mt-20">
                {CONTACT_ITEMS.map((item, idx) => (
                    <ContactItem key={idx} {...item} />
                ))}
            </div>
        </div>
    </div>
));

Enquiry.displayName = 'Enquiry';

export default Enquiry;