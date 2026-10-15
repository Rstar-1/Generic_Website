const VITE_IMAGE = import.meta.env.VITE_IMAGE || '';

export const resolveImagePath = (path) => {
  if (!path) return '';
  if (typeof path !== 'string') return path;

  const trimmed = path.trim();
  if (!trimmed) return '';

  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:') ||
    trimmed.startsWith('//')
  ) {
    return trimmed;
  }

  // Local assets in public folder
  if (
    trimmed.startsWith('/') ||
    trimmed.startsWith('products/') ||
    trimmed.startsWith('shreehari') ||
    trimmed.startsWith('goonj') ||
    trimmed.startsWith('united_brothers') ||
    trimmed.startsWith('sobo_')
  ) {
    return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  }

  const base = VITE_IMAGE.replace(/\/+$/, '');
  const cleanPath = trimmed
    .replace(/^(\.\.\/|\.\/)+assets\//, '')
    .replace(/^\/?(src\/)?assets\//, '')
    .replace(/^\/+/, '');

  return base ? `${base}/${cleanPath}` : `/${cleanPath}`;
};

export const shreehariLogoColor = resolveImagePath('/shreehari_logo_color.png');
export const shreehariLogoWhite = resolveImagePath('/shreehari_logo_white.png');
export const unitedBrothersColor = shreehariLogoColor;
export const unitedBrothersWhite = shreehariLogoWhite;
export const soboLogo = shreehariLogoColor;
export const soboWhite = shreehariLogoWhite;
export const carpetPatchBanner = resolveImagePath('/products/carpet_patch_banner.jpg');
export const carpetBanner = resolveImagePath('/products/carpet_banner.jpg');

export default resolveImagePath;
