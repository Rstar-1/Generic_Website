import React from 'react';
import Container from '../common/Container';
import Icon from '../common/Icon';
import { footer, footerData, configData } from '../../utils/apiData';

const footerConfig = configData?.Footer?.[0] || configData?.Footer || {};
const isVisible = (val) => val !== false;

const FooterTopBar = React.memo(({ features }) => {
  if (!isVisible(footerConfig.FooterTopBar) || !features?.length) return null;

  return (
    <div className="grid-cols-4 sm-grid-cols-1 gap-12">
      {features.map((item, index) => (
        <div
          key={item.id || index}
          className="flex items-center gap-12 p-14 border-ec rounded-10"
          style={{ borderRight: index === features.length - 1 ? 'none' : '1px solid var(--forth)' }}
        >
          <div className="icon-lg bg-tertiary rounded-full flex-shrink-0">
            <Icon name={item.icon} width="16" height="16" stroke="var(--dark)" />
          </div>
          <div>
            <h6 className="headmini-text text-dark font-500">{item.title}</h6>
            <p className="mini-text text-gray font-500">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
});

const FooterFeatures = FooterTopBar;

const FooterNewsletter = React.memo(
  ({ newsletter, email, isSubscribed, onEmailChange, onSubscribe }) => {
    if (!newsletter) return null;
    const { title, description, placeholder, buttonText, disclaimer: d } = newsletter;

    return (
      <div className="w-45 sm-w-full">
        <h3 className="head-text text-dark font-600">{title}</h3>
        <p className="small-text text-gray font-400 mt-4">{description}</p>

        <form onSubmit={onSubscribe} className="flex items-center gap-12 w-90 sm-w-full sm-mt-20 mt-30">
          <input
            type="email"
            value={email}
            onChange={onEmailChange}
            placeholder={placeholder}
            required
            className="outline-none"
            style={{
              backgroundColor: '#F1F5F9',
              border: 'none',
              borderRadius: '30px',
              padding: '14px 22px',
              fontSize: '14px',
              flex: 1,
              minWidth: '220px',
              color: '#0F172A',
            }}
          />
          <button
            type="submit"
            className="cursor-pointer font-600 transition-all"
            style={{
              backgroundColor: '#0F172A',
              color: '#FFFFFF',
              borderRadius: '30px',
              padding: '14px 28px',
              fontSize: '14px',
              border: 'none',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            {isSubscribed ? 'Subscribed!' : buttonText}
          </button>
        </form>

        {d && (
          <p className="mini-text text-gray font-400 mt-8">
            {d.prefix}
            <a href={d.termsUrl} className="text-gray mini-text">{d.termsLabel}</a>
            {d.middle}
            <a href={d.privacyUrl} className="text-gray mini-text">{d.privacyLabel}</a>
            {d.suffix}
          </p>
        )}
      </div>
    );
  }
);

const FooterNavigation = React.memo(({ columns }) => {
  if (!columns?.length) return null;

  return (
    <div className="w-45 sm-w-full grid-cols-3 sm-pl-1 gap-12 sm-mt-12">
      {columns.map((col, cIdx) => (
        <div key={col.title || cIdx}>
          <h4 className="mid-text text-dark font-600">{col.title}</h4>
          <ul className="list-none px-4 grid-cols-1 gap-8 mt-12">
            {col.links.map((link, lIdx) => (
              <li key={link.label || lIdx}>
                <a href={link.url || '#'} className="text-gray font-400 small-text">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
});

const FooterSocials = React.memo(({ socials }) => {
  if (!isVisible(footerConfig.FooterSocial) || !socials?.length) return null;

  return (
    <div className="flex items-center gap-12 pt-16">
      {socials.map((s) => (
        <a
          key={s.platform || s.iconName}
          href={s.url || '#'}
          aria-label={s.platform || s.iconName}
          className="rounded-full flex items-center justify-center transition-all"
          style={{ width: '36px', height: '36px', backgroundColor: '#F1F5F9' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E2E8F0')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F1F5F9')}
        >
          <Icon name={s.iconName} width="16" height="16" stroke="#0F172A" fill="#0F172A" />
        </a>
      ))}
    </div>
  );
});

const FooterSocial = FooterSocials;

const FooterBottomBar = React.memo(({ bottom }) => {
  if (!isVisible(footerConfig.FooterBottomBar) || !bottom) return null;

  return (
    <div className="bordh">
      <FooterSocials socials={bottom.socials} />
      <div className="flex sm-grid-cols-1 items-center justify-between pt-12">
        <p className="mini-text text-gray">{bottom.copyright}</p>
        {bottom.legalLinks && (
          <div className="flex items-center gap-12">
            {bottom.legalLinks.map((item) => (
              <a key={item.label} href={item.url || '#'} className="mini-text text-gray">
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

const Footer = () => {
  const { features, newsletter, columns, bottom } = footerData || footer || {};
  const [email, setEmail] = React.useState('');
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const handleEmailChange = React.useCallback((e) => setEmail(e.target.value), []);

  const handleSubscribe = React.useCallback(
    (e) => {
      e.preventDefault();
      if (email.trim()) {
        setIsSubscribed(true);
        setEmail('');
      }
    },
    [email]
  );

  return (
    <Container style={{ background: 'var(--forth)' }}>
      <div className="py-30 w-full">
        <FooterTopBar features={features} />

        <div className="flex sm-grid-cols-1 justify-between gap-12 w-full py-25">
          <FooterNewsletter
            newsletter={newsletter}
            email={email}
            isSubscribed={isSubscribed}
            onEmailChange={handleEmailChange}
            onSubscribe={handleSubscribe}
          />
          <FooterNavigation columns={columns} />
        </div>

        <FooterBottomBar bottom={bottom} />
      </div>
    </Container>
  );
};

export {
  FooterFeatures,
  FooterTopBar,
  FooterNewsletter,
  FooterNavigation,
  FooterSocial,
  FooterSocials,
  FooterBottomBar,
};

export default Footer;