import React from 'react';

import Button from '../../common/Button';
import Fields from '../Fields';

const NewsletterForm = ({
  onSubmit,
  onSubscribe,
  email,
  onEmailChange,
  onChange,
  placeholder = 'Enter your Email ID',
  isSubscribed = false,
  buttonText = 'SUBSCRIBE',
  className = 'flex items-center gap-8 w-70 sm-w-full mt-16'
}) => {
  const handleSubmit = onSubmit || onSubscribe;
  const handleChange = onEmailChange || onChange;

  return (
    <form onSubmit={handleSubmit} className={className}>
      <Fields
        type="email"
        version="v1"
        value={email}
        onChange={handleChange}
        placeholder={placeholder}
        required
        className="w-90 border-ec"
      />
      <Button
        type="submit"
        text={isSubscribed ? 'Subscribed!' : buttonText}
        bg="dark"
        color="white"
        version="v1"
        className="font-400"
      />
    </form>
  );
};

export default React.memo(NewsletterForm);