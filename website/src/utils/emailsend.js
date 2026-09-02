import emailjs from '@emailjs/browser';

export const sendEmail = async (data, subject, message) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    const errorMsg = "EmailJS credentials are not configured. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your .env file.";
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  const templateParams = {
    subject: subject,
    message: message,
    from_name: data?.name || 'Website Subscriber',
    reply_to: data?.email || '',
    to_email: import.meta.env.VITE_EMAIL,
    ...data
  };

  return emailjs.send(serviceId, templateId, templateParams, publicKey);
};
