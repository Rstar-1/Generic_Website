import React from 'react';
import { Link } from 'react-router-dom';

import Container from '../common/Container';
import Icon from '../common/Icon';
import NewsletterForm from '../forms/sections/NewsletterForm';

import { showToast } from '../common/Toast';
import {
  sendEmail,
  footer,
  footerData,
  configData,
  productsData,
  isVisible,
  getSocialLinks,
  getItemSlug
} from '../../utils';

const footerConfig = configData?.Footer?.[0] || configData?.Footer || {};
const socialLinks = getSocialLinks();

const phoneVal = import.meta.env.VITE_PHONE?.trim();
const emailVal = import.meta.env.VITE_EMAIL?.trim();
const addressVal = import.meta.env.VITE_ADDRESS?.trim();
const hoursVal = import.meta.env.VITE_WORKING_HOURS?.trim();

const topBarFeatures = [
  hoursVal && {
    icon: 'Support',
    title: 'Customer Support',
    text: hoursVal
  },
  phoneVal && {
    icon: 'Phone',
    title: 'Call Us',
    text: phoneVal.startsWith('+') ? phoneVal : `+91 ${phoneVal}`,
    link: `tel:${phoneVal.replace(/[^\d+]/g, '')}`
  },
  emailVal && {
    icon: 'Send',
    title: 'Email Us',
    text: emailVal,
    link: `mailto:${emailVal}`
  },
  addressVal && {
    icon: 'MapPin',
    title: 'Distribution Hubs',
    text: addressVal,
    link: `https://maps.google.com/?q=${encodeURIComponent(addressVal)}`
  }
].filter(Boolean);

const FooterTopBar = React.memo(() => {
  if (!isVisible(footerConfig.FooterTopBar) || !topBarFeatures?.length) return null;

  return (
    <div className={`grid-cols-${topBarFeatures.length} sm-grid-cols-1 gap-12 mb-20`}>
      {topBarFeatures.map((item, index) => {
        const isLast = index === topBarFeatures.length - 1;
        const cardStyle = {
          borderRight: isLast ? 'none' : '1px solid var(--forth)',
          textDecoration: 'none'
        };

        const content = (
          <>
            <div className="icon-lg bg-tertiary rounded-full">
              <Icon name={item.icon} width="16" height="16" stroke="var(--dark)" />
            </div>
            <div className="w-80">
              <h6 className="headmini-text text-dark font-500">{item.title}</h6>
              <p className="mini-text text-gray font-500">{item.text}</p>
            </div>
          </>
        );

        if (item.link) {
          return (
            <a
              key={item.title}
              href={item.link}
              target={item.link.startsWith('http') ? '_blank' : undefined}
              rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-12 p-12 border-ec rounded-5 cursor-pointer"
              style={cardStyle}
            >
              {content}
            </a>
          );
        }

        return (
          <div key={item.title} className="flex items-center gap-12 p-12 border-ec rounded-5" style={cardStyle}>
            {content}
          </div>
        );
      })}
    </div>
  );
});
const FooterFeatures = FooterTopBar;

const FooterNewsletter = React.memo(
  ({ newsletter, email, isSubscribed, onEmailChange, onSubscribe }) => {
    if (!newsletter) return null;
    const { title, description, placeholder, buttonText, disclaimer: d } = newsletter;

    return (
      <div className="w-50 sm-w-full">
        <h3 className="head-text text-dark font-600">{title}</h3>
        <p className="small-text text-gray font-400 mt-4">{description}</p>

        <NewsletterForm
          onSubmit={onSubscribe}
          email={email}
          onEmailChange={onEmailChange}
          placeholder={placeholder}
          isSubscribed={isSubscribed}
          buttonText={buttonText}
        />

        {d && (
          <p className="mini-text text-gray font-400 mt-6">
            {d.prefix}
            {d.termsUrl?.startsWith('/') ? (
              <Link to={d.termsUrl} className="mini-text text-dark">{d.termsLabel}</Link>
            ) : (
              <a href={d.termsUrl || '#'} className="mini-text text-dark">{d.termsLabel}</a>
            )}
            {d.middle}
            {d.privacyUrl?.startsWith('/') ? (
              <Link to={d.privacyUrl} className="mini-text text-dark">{d.privacyLabel}</Link>
            ) : (
              <a href={d.privacyUrl || '#'} className="mini-text text-dark">{d.privacyLabel}</a>
            )}
            {d.suffix}
          </p>
        )}
      </div>
    );
  }
);

const FooterNavigation = React.memo(({ columns }) => {
  const navColumns = columns || footerData?.columns || footer?.columns;
  if (!navColumns?.length) return null;

  return (
    <div className="w-50 sm-w-full grid-cols-3 sm-pl-1 gap-12 sm-mt-12">
      {navColumns.map((col, cIdx) => (
        <div key={col.title || cIdx}>
          <h4 className="mid-text text-dark font-600">{col?.title}</h4>
          <ul className="list-none px-4 grid-cols-1 gap-8 mt-12">
            {col.links?.map((link, lIdx) => (
              <li key={link.label || lIdx}>
                {link.url?.startsWith('/') ? (
                  <Link
                    to={link.url}
                    title={link.fullTitle || link.label}
                    className="text-gray font-400 small-text line-clamp1 hover:underline"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.url || '#'}
                    title={link.fullTitle || link.label}
                    className="text-gray font-400 small-text line-clamp1 hover:underline"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
});

const FooterSocials = React.memo(() => {
  if (!isVisible(footerConfig.FooterSocial) || !socialLinks?.length) return null;

  return (
    <div className="flex items-center gap-12 pt-16">
      {socialLinks.map((item) => (
        <a
          key={item?.id}
          href={item?.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item?.id}
          className="rounded-full flex items-center justify-center transition-all"
          style={{ width: '36px', height: '36px', backgroundColor: '#F1F5F9' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E2E8F0')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F1F5F9')}
        >
          <Icon name={item?.icon} width="16" height="16" stroke="#0F172A" fill="#0F172A" />
        </a>
      ))}
    </div>
  );
});
const FooterSocial = FooterSocials;

const FooterBottomBar = React.memo(({ bottom }) => {
  if (!isVisible(footerConfig.FooterBottomBar) || !bottom) return null;

  const siteName = import.meta.env.VITE_SITE_NAME;
  const copyright = siteName
    ? `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`
    : bottom.copyright;

  return (
    <div className="bordh">
      <FooterSocials />
      <div className="flex sm-grid-cols-1 items-center justify-between pt-12">
        <p className="mini-text text-gray">{copyright}</p>
        {bottom.legalLinks && (
          <div className="flex items-center gap-12">
            {bottom.legalLinks.map((item) => (
              item.url?.startsWith('/') ? (
                <Link key={item.label} to={item.url} className="mini-text text-gray">
                  {item.label}
                </Link>
              ) : (
                <a key={item.label} href={item.url || '#'} className="mini-text text-gray">
                  {item.label}
                </a>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

const Footer = () => {
  const { newsletter, columns, bottom } = footerData || footer || {};
  const [email, setEmail] = React.useState('');
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const resolvedColumns = React.useMemo(() => {
    const rawColumns = columns || footerData?.columns || footer?.columns || [];
    if (rawColumns.length >= 3 && rawColumns[1]?.links?.length && rawColumns[2]?.links?.length) {
      return rawColumns;
    }

    const realProducts = (productsData || []).filter((p) => !p.isBanner);
    const getTopProducts = (catIds, limit = 5) => {
      const ids = Array.isArray(catIds) ? catIds : [catIds];
      const seen = new Set();
      const list = [];
      for (const p of realProducts) {
        if (ids.includes(p.categoryId) && !seen.has(p.name)) {
          seen.add(p.name);
          list.push({
            label: p.name,
            url: `/product/${getItemSlug(p) || p.id}`,
            fullTitle: p.name
          });
          if (list.length >= limit) break;
        }
      }
      return list;
    };

    const companyCol = rawColumns[0] || {
      title: 'Company',
      links: [
        { label: 'About Us', url: '/about' },
        { label: 'All Products', url: '/product' },
        { label: 'Find A Store', url: '/supplier' },
        { label: 'Healthcare Insights', url: '/blog' },
        { label: 'Institutional Enquiry', url: '/connect' }
      ]
    };

    const cat1Col = {
      title: rawColumns[1]?.title || 'PVC Strip Curtains',
      links: rawColumns[1]?.links?.length ? rawColumns[1].links : getTopProducts(1, 5)
    };

    const cat2Col = {
      title: rawColumns[2]?.title || 'Brackets & Magnetic Curtains',
      links: rawColumns[2]?.links?.length ? rawColumns[2].links : getTopProducts([2, 3], 5)
    };

    return [companyCol, cat1Col, cat2Col];
  }, [columns]);

  const handleEmailChange = React.useCallback((val) => {
    const nextVal = typeof val === 'object' && val?.target ? val.target.value : val;
    setEmail(nextVal ?? '');
  }, []);

  const handleSubscribe = React.useCallback(
    async (e) => {
      e.preventDefault();
      const subscriberEmail = email.trim();
      if (!subscriberEmail) return;

      setEmail('');
      setIsSubscribed(true);
      showToast('Thank you for subscribing to our newsletter!', 'success');

      try {
        await sendEmail(
          { email: subscriberEmail, name: 'Newsletter Subscriber', message: `New Newsletter Subscription: ${subscriberEmail}` },
          'New Newsletter Subscription',
          `New Newsletter Subscription from: ${subscriberEmail}`
        );
      } catch (err) {
        console.error('Newsletter subscription error:', err);
      }
    },
    [email]
  );

  return (
    <Container style={{ background: 'var(--forth)' }}>
      <div className="py-30 w-full">
        <FooterTopBar />

        <div className="flex sm-grid-cols-1 justify-between gap-12 w-full py-20">
          <FooterNewsletter
            newsletter={newsletter}
            email={email}
            isSubscribed={isSubscribed}
            onEmailChange={handleEmailChange}
            onSubscribe={handleSubscribe}
          />
          <FooterNavigation columns={resolvedColumns} />
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