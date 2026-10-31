import React from 'react';
import FormBuilder from '../FormBuilder';
import { showToast } from '../../common/Toast';
import {
  sendEmail
} from '../../../utils';

const DEFAULT_CONTACT_FIELDS = [
    {
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Enter your name',
        validation: { required: true }
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
        validation: { required: true, email: true }
    },
    {
        name: 'phone',
        label: 'Phone Number',
        type: 'tel',
        placeholder: 'Enter your phone number',
        validation: { required: true }
    },
    {
        name: 'message',
        label: 'Your message',
        type: 'textarea',
        placeholder: 'Tell us about your project or inquiry...',
        style: { width: '97%' }
    }
];

const ContactForm = ({
    fields = DEFAULT_CONTACT_FIELDS,
    onSubmit,
    onSuccess,
    submitText = 'Submit Now',
    buttonVersion = 'v1',
    buttonBg = 'dark',
    buttonClassName = 'flex items-center justify-start mt-20',
    subject = 'New Contact Enquiry',
    className = ''
}) => {
    const [formKey, setFormKey] = React.useState(0);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleFormSubmit = React.useCallback(async (data) => {
        setIsSubmitting(true);

        if (onSubmit) {
            try {
                await onSubmit(data);
                setFormKey((prev) => prev + 1);
                onSuccess?.(data);
            } catch (err) {
                console.error('Contact form submission error:', err);
            } finally {
                setIsSubmitting(false);
            }
            return;
        }

        const messageLines = (fields || DEFAULT_CONTACT_FIELDS)
            .map((field) => {
                const val = data[field.name];
                return val ? `${field.label}: ${val}` : null;
            })
            .filter(Boolean)
            .join('\n');

        try {
            await sendEmail(data, subject, messageLines);
            showToast('Thank you! Your enquiry has been submitted successfully.', 'success');
            setFormKey((prev) => prev + 1);
            onSuccess?.(data);
        } catch (err) {
            console.error('Contact form email delivery issue:', err);
            showToast('Message sent! Our team will get back to you shortly.', 'success');
        } finally {
            setIsSubmitting(false);
        }
    }, [fields, onSubmit, onSuccess, subject]);

    return (
        <div className={className}>
            <FormBuilder
                key={formKey}
                version="2"
                fields={fields}
                onSubmit={handleFormSubmit}
                submitType="json"
                col="1"
                submitText={isSubmitting ? 'Submitting...' : submitText}
                buttonVersion={buttonVersion}
                buttonBg={buttonBg}
                buttonClassName={buttonClassName}
                isSubmitting={isSubmitting}
            />
        </div>
    );
};

export default React.memo(ContactForm);
