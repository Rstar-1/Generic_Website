import React from 'react';
import Image from './Image';

export function Avatar({
  src,
  alt = "Avatar",
  size = 48,
  borderColor = "#111111",
  borderWidth = 2,
  className = "",
  style = {},
  ...props
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-full object-cover ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        border: `${borderWidth}px solid ${borderColor}`,
        objectFit: 'cover',
        flexShrink: 0,
        ...style
      }}
      {...props}
    />
  );
}

export function AvatarGroup({
  avatars = [],
  badgeText = "1M",
  size = 42,
  overlap = -12,
  className = "",
  style = {}
}) {
  return (
    <div className={`flex items-center ${className}`} style={{ ...style }}>
      {avatars.map((avatar, idx) => (
        <Avatar
          key={idx}
          src={typeof avatar === 'string' ? avatar : avatar.src}
          alt={typeof avatar === 'string' ? `Client ${idx + 1}` : (avatar.alt || `Client ${idx + 1}`)}
          size={size}
          style={{
            marginLeft: idx > 0 ? `${overlap}px` : 0,
            zIndex: idx + 1
          }}
        />
      ))}

      {badgeText && (
        <div
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            fontWeight: 900,
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: `${overlap}px`,
            border: '2px solid #111111',
            flexShrink: 0,
            zIndex: avatars.length + 1
          }}
        >
          {badgeText}
        </div>
      )}
    </div>
  );
}

export default Avatar;
