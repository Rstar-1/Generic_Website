import React from 'react';
import Container from '../common/Container';
import Icon from '../common/Icon';
import footerData from '../../data/footer.json';

const Footer = () => {
  const { features, newsletter, columns, bottom } = footerData;

  return (
    <Container style={{ background: 'var(--forth)' }}>
      <div className='py-50 w-full'>
        <div
          className='grid-cols-4 sm-grid-cols-1 gap-12'
        >
          {features.map((item, index) => (
            <div
              key={item.id || index}
              style={{
                borderRight: index === features.length - 1 ? 'none' : '1px solid #EAEAEA'
              }}
              className='flex items-center gap-12 p-14 border-ec rounded-5'
            >
              <div
                className='icon-lg bg-forth rounded-full'
              >
                <Icon name={item.icon} width="16" height="16" stroke="#1E293B" />
              </div>
              <div>
                <h6 className='headmini-text text-dark font-500'>
                  {item.title}
                </h6>
                <p
                  className='mini-text text-gray font-500'>
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          className='flex sm-grid-cols-1 w-full py-40 sm-py-25 bordb'
        >
          <div className='w-45 sm-w-full'>
            <h3 className='head-text text-dark font-600'>
              {newsletter.title}
            </h3>
            <p className='small-text text-gray font-400 mt-4'>
              {newsletter.description}
            </p>
            <div className='flex items-center gap-12 w-90 sm-w-full sm-mt-20 mt-30'>
              <input
                type="email"
                placeholder={newsletter.placeholder}
                style={{
                  backgroundColor: '#F1F5F9',
                  border: 'none',
                  borderRadius: '30px',
                  padding: '14px 22px',
                  fontSize: '14px',
                  outline: 'none',
                  flex: '1',
                  minWidth: '220px',
                  color: '#0F172A'
                }}
              />
              <button
                style={{
                  backgroundColor: '#0F172A',
                  color: '#FFFFFF',
                  borderRadius: '30px',
                  padding: '14px 28px',
                  fontSize: '14px',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                {newsletter.buttonText}
              </button>
            </div>
            {newsletter.disclaimer && (
              <p className='mini-text text-gray font-400 mt-8'>
                {newsletter.disclaimer.prefix}
                <a href={newsletter.disclaimer.termsUrl} className='text-gray font-400 mini-text'>
                  {newsletter.disclaimer.termsLabel}
                </a>
                {newsletter.disclaimer.middle}
                <a href={newsletter.disclaimer.privacyUrl} className='text-gray font-400 mini-text'>
                  {newsletter.disclaimer.privacyLabel}
                </a>
                {newsletter.disclaimer.suffix}
              </p>
            )}
          </div>

          <div className='w-55 sm-w-full grid-cols-3 gap-12 pl-8 sm-pl-1 sm-mt-12'>
            {columns.map((col, cIdx) => (
              <div key={col.title || cIdx}>
                <h4 className='mid-text text-dark font-600'>
                  {col.title}
                </h4>
                <ul className='list-none px-4 grid-cols-1 gap-8 mt-12'>
                  {col.links.map((link, lIdx) => (
                    <li key={link.label || lIdx}>
                      <a href={link.url || '#'} className='text-gray font-400 small-text'>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {bottom.socials && (
          <div className='flex items-center gap-12 mt-18'>
            {bottom.socials.map((social) => (
              <a
                key={social.platform || social.iconName}
                href={social.url || '#'}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#F1F5F9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E2E8F0')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F1F5F9')}
              >
                <Icon name={social.iconName} width="16" height="16" stroke="#0F172A" fill="#0F172A" />
              </a>
            ))}
          </div>
        )}

        <div className='flex sm-grid-cols-1 items-center justify-between mt-12'>
          <p className='mini-text text-gray'>{bottom.copyright}</p>
          {bottom.legalLinks && (
            <div className='flex items-center gap-12'>
              {bottom.legalLinks.map((item) => (
                <a key={item.label} href={item.url || '#'} className='mini-text text-gray'>
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Footer;