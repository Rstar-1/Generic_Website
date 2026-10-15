import React from 'react';
import { Link } from 'react-router-dom';

import Container from '../common/Container';
import Icon from '../common/Icon';
import Button from '../common/Button';
import Fields from '../forms/Fields';

import { showToast } from '../common/Toast';
import { sendEmail } from '../../utils/emailsend';
import { footer, footerData, configData, productsData } from '../../utils/apiData';

const footerConfig = configData?.Footer?.[0] || configData?.Footer || {};
const isVisible = (val) => val !== false;

const FooterTopBar = React.memo(({ features }) => {
  if (!isVisible(footerConfig.FooterTopBar) || !features?.length) return null;

  return (
    <div className="grid-cols-4 sm-grid-cols-1 gap-12">
      {features.map((item, index) => {
        const isLast = index === features.length - 1;
        const cardStyle = {
          borderRight: isLast ? 'none' : '1px solid var(--forth)',
          textDecoration: 'none',
        };

        const content = (
          <>
            <div className="icon-lg bg-tertiary rounded-full flex-shrink-0">
              <Icon name={item.icon} width="16" height="16" stroke="var(--dark)" />
            </div>
            <div>
              <h6 className="headmini-text text-dark font-500">{item.title}</h6>
              <p className="mini-text text-gray font-500">{item.text}</p>
            </div>
          </>
        );

        if (item.link) {
          return (
            <a
              key={item.id || index}
              href={item.link}
              target={item.link.startsWith('http') ? '_blank' : undefined}
              rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-12 p-14 border-ec rounded-10 cursor-pointer transition-all"
              style={cardStyle}
            >
              {content}
            </a>
          );
        }

        return (
          <div
            key={item.id || index}
            className="flex items-center gap-12 p-14 border-ec rounded-10"
            style={cardStyle}
          >
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
      <div className="w-40 sm-w-full">
        <h3 className="head-text text-dark font-600">{title}</h3>
        <p className="small-text text-gray font-400 mt-4">{description}</p>

        <form onSubmit={onSubscribe} className="flex items-center gap-12 w-90 mt-20">
          <Fields
            type="email"
            version="v2"
            value={email}
            onChange={onEmailChange}
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
            className="rounded-30 font-500"
          />
        </form>

        {d && (
          <p className="mini-text text-gray font-400 mt-8">
            {d.prefix}
            {d.termsUrl?.startsWith('/') ? (
              <Link to={d.termsUrl} className="text-gray mini-text hover:underline">{d.termsLabel}</Link>
            ) : (
              <a href={d.termsUrl || '#'} className="text-gray mini-text hover:underline">{d.termsLabel}</a>
            )}
            {d.middle}
            {d.privacyUrl?.startsWith('/') ? (
              <Link to={d.privacyUrl} className="text-gray mini-text hover:underline">{d.privacyLabel}</Link>
            ) : (
              <a href={d.privacyUrl || '#'} className="text-gray mini-text hover:underline">{d.privacyLabel}</a>
            )}
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
    <div className="w-55 sm-w-full grid-cols-3 sm-pl-1 gap-14 sm-mt-12">
      {columns.map((col, cIdx) => (
        <div key={col.title || cIdx}>
          <h4 className="mid-text text-dark font-600">{col.title}</h4>
          <ul className="list-none px-4 grid-cols-1 gap-8 mt-12">
            {col.links.map((link, lIdx) => (
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

const FooterSocials = React.memo(({ socials }) => {
  if (!isVisible(footerConfig.FooterSocial) || !socials?.length) return null;

  const socialMap = {
    facebook: import.meta.env.VITE_SOCIAL_FACEBOOK,
    instagram: import.meta.env.VITE_SOCIAL_INSTAGRAM,
    youtube: import.meta.env.VITE_SOCIAL_YOUTUBE,
    whatsapp: import.meta.env.VITE_SOCIAL_WHATSAPP,
    x: import.meta.env.VITE_SOCIAL_TWITTER,
    twitter: import.meta.env.VITE_SOCIAL_TWITTER,
    linkedin: import.meta.env.VITE_SOCIAL_LINKEDIN,
  };

  return (
    <div className="flex items-center gap-12 pt-16">
      {socials.map((s) => {
        const platformKey = (s.platform || s.iconName || '').toLowerCase();
        const url = socialMap[platformKey] || s.url || '#';

        return (
          <a
            key={s.platform || s.iconName}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.platform || s.iconName}
            className="rounded-full flex items-center justify-center transition-all"
            style={{ width: '36px', height: '36px', backgroundColor: '#F1F5F9' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E2E8F0')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F1F5F9')}
          >
            <Icon name={s.iconName} width="16" height="16" stroke="#0F172A" fill="#0F172A" />
          </a>
        );
      })}
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
      <FooterSocials socials={bottom.socials} />
      <div className="flex sm-grid-cols-1 items-center justify-between pt-12">
        <p className="mini-text text-gray">{copyright}</p>
        {bottom.legalLinks && (
          <div className="flex items-center gap-12">
            {bottom.legalLinks.map((item) => (
              item.url?.startsWith('/') ? (
                <Link key={item.label} to={item.url} className="mini-text text-gray hover:underline">
                  {item.label}
                </Link>
              ) : (
                <a key={item.label} href={item.url || '#'} className="mini-text text-gray hover:underline">
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
  const { features, newsletter, columns, bottom } = footerData || footer || {};
  const [email, setEmail] = React.useState('');
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const envPhone = import.meta.env.VITE_PHONE;
  const displayPhone = envPhone
    ? (envPhone.startsWith('+') || envPhone.includes(' ') || envPhone.includes('-')
      ? envPhone
      : (envPhone.length === 10 ? `+91 ${envPhone}` : envPhone))
    : null;
  const phoneHref = import.meta.env.VITE_SOCIAL_PHONE || (envPhone ? `tel:${envPhone}` : null);
  const envEmail = import.meta.env.VITE_EMAIL;
  const emailHref = envEmail ? `mailto:${envEmail}` : null;
  const envAddress = import.meta.env.VITE_ADDRESS?.trim();

  const resolvedFeatures = React.useMemo(() => {
    if (!features?.length) return [];
    return features.map((item) => {
      const id = item.id?.toLowerCase();
      const title = item.title?.toLowerCase();

      if (id === 'call' || title?.includes('call') || title?.includes('phone')) {
        return {
          ...item,
          text: displayPhone || item.text,
          link: phoneHref || item.link,
        };
      }
      if (id === 'touch' || title?.includes('touch') || title?.includes('mail') || title?.includes('email')) {
        return {
          ...item,
          text: envEmail || item.text,
          link: emailHref || item.link,
        };
      }
      if (id === 'address' || title?.includes('address') || title?.includes('location')) {
        return {
          ...item,
          text: envAddress || item.text,
          link: envAddress ? `https://maps.google.com/?q=${encodeURIComponent(envAddress)}` : item.link,
        };
      }
      return item;
    });
  }, [features, displayPhone, phoneHref, envEmail, emailHref, envAddress]);

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

  const resolvedColumns = React.useMemo(() => {
    const realProducts = (productsData || []).filter((p) => !p.isBanner);

    const getTopProducts = (filterFn, limit = 5, labelFormatter = null) => {
      const list = [];
      const seen = new Set();
      for (const p of realProducts) {
        if (filterFn(p) && !seen.has(p.name)) {
          seen.add(p.name);
          list.push({
            label: labelFormatter ? labelFormatter(p.name) : p.name,
            fullTitle: p.name,
            url: `/product/${p.id}`
          });
          if (list.length === limit) break;
        }
      }
      return list;
    };

    const companyCol = columns?.find((c) => c.title?.toLowerCase() === 'company') || {
      title: 'Company',
      links: [
        { label: 'About Us', url: '/about' },
        { label: 'All Products', url: '/product' },
        { label: 'Find A Store', url: '/supplier' },
        { label: 'Flooring Insights', url: '/blog' },
        { label: 'Contact & Enquiry', url: '/connect' }
      ]
    };

    const dilourProducts = getTopProducts(
      (p) => p.categoryId === 1 || p.category?.toLowerCase().includes('dilour'),
      3
    );
    const ribsProducts = getTopProducts(
      (p) => p.categoryId === 2 || p.category?.toLowerCase().includes('rib'),
      2
    );
    const combinedCarpets = [...dilourProducts, ...ribsProducts];
    const carpetProducts = combinedCarpets.length > 0
      ? combinedCarpets
      : getTopProducts((p) => p.categoryId === 1 || p.categoryId === 2, 5);

    const formatRugName = (name) => {
      if (!name) return '';
      if (name.startsWith('New Age Poly Shrink Rug - ')) {
        return `Poly Shrink: ${name.replace('New Age Poly Shrink Rug - ', '').trim()}`;
      }
      return name;
    };

    const polyShrinkProducts = getTopProducts(
      (p) => p.categoryId === 3 && (p.name?.toLowerCase().includes('poly shrink') || p.subCategory?.toLowerCase().includes('poly')),
      3,
      formatRugName
    );
    const shalimarProducts = getTopProducts(
      (p) => p.categoryId === 3 && (p.name?.toLowerCase().includes('shalimar') || p.subCategory?.toLowerCase().includes('shalimar')),
      2
    );
    const combinedRugs = [...polyShrinkProducts, ...shalimarProducts];
    const rugProducts = combinedRugs.length > 0
      ? combinedRugs
      : getTopProducts((p) => p.categoryId === 3, 5, formatRugName);

    return [
      companyCol,
      {
        title: 'Dilour & Ribs Carpets',
        links: carpetProducts.length > 0 ? carpetProducts : (columns?.[1]?.links || [])
      },
      {
        title: 'Poly Shrink & Shalimar Rugs',
        links: rugProducts.length > 0 ? rugProducts : (columns?.[2]?.links || [])
      }
    ];
  }, [columns]);

  return (
    <Container style={{ background: 'var(--forth)' }}>
      <div className="py-30 w-full">
        <FooterTopBar features={resolvedFeatures} />

        <div className="flex sm-grid-cols-1 justify-between gap-12 w-full py-25">
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