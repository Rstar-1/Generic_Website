import React, { memo } from "react";
import { configData, cmsData } from "./apiData";
import { slugify } from "./slugify";
import { resolveImagePath } from "./imageResolver";
import { formatDate } from "./formatDate";

export { slugify, resolveImagePath, formatDate, cmsData };

export const getStickyTop = (config = configData) => {
  const headerConfig = Array.isArray(config?.Header)
    ? config.Header[0]
    : config?.Header;
  return headerConfig?.HeaderTopBar && headerConfig?.HeaderBottomBar
    ? "24%"
    : "20%";
};

export const getItemSlug = (item) => {
  if (!item) return "";
  return (
    item.slug || slugify(item.title || item.name || "") || String(item.id || "")
  );
};

export const matchBySlugOrId = (item, target) => {
  if (!item || target === undefined || target === null) return false;
  const strTarget = String(target).trim();
  if (String(item.id) === strTarget) return true;
  if (item.slug && item.slug === strTarget) return true;
  const normalizedTarget = slugify(strTarget);
  return Boolean(
    (item.title && slugify(item.title) === normalizedTarget) ||
    (item.name && slugify(item.name) === normalizedTarget),
  );
};

export const findCategory = (categoriesList = [], target) => {
  if (!target || !Array.isArray(categoriesList)) return null;
  const q = String(
    typeof target === "object"
      ? target.categoryId || target.category || target.id || target.slug || target.name || target.title
      : target
  ).trim().toLowerCase();

  return (
    categoriesList.find(
      (c) =>
        String(c.id).toLowerCase() === q ||
        c.slug?.toLowerCase() === q ||
        c.name?.toLowerCase() === q ||
        c.title?.toLowerCase() === q
    ) || null
  );
};

export const isVisible = (val) => val !== false && val !== null && val !== undefined;

export const openExternalLink = (url) => {
  if (!url) return;
  if (url.startsWith("http")) {
    window.open(url, "_blank", "noopener,noreferrer");
  } else {
    window.location.href = url;
  }
};

export const shareContent = ({ platform, url, title = "", text = "" }) => {
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const shareTitle = title || (typeof document !== "undefined" ? document.title : "");
  const combinedText = text || `${shareTitle} - ${shareUrl}`;

  switch (platform?.toLowerCase()) {
    case "facebook":
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank", "noopener,noreferrer");
      break;
    case "whatsapp":
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(combinedText)}`, "_blank", "noopener,noreferrer");
      break;
    case "twitter":
    case "x":
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, "_blank", "noopener,noreferrer");
      break;
    case "linkedin":
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank", "noopener,noreferrer");
      break;
    case "instagram":
      if (typeof navigator !== "undefined" && navigator.share) {
        navigator.share({ title: shareTitle, url: shareUrl }).catch(() => {});
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl).then(() => {
          window.open("https://www.instagram.com", "_blank", "noopener,noreferrer");
        }).catch(() => {
          window.open("https://www.instagram.com", "_blank", "noopener,noreferrer");
        });
      } else {
        window.open("https://www.instagram.com", "_blank", "noopener,noreferrer");
      }
      break;
    default:
      if (typeof navigator !== "undefined" && navigator.share) {
        navigator.share({ title: shareTitle, url: shareUrl }).catch(() => {});
      }
      break;
  }
};

export const formatPrice = (price, currency = "₹") => {
  if (price === null || price === undefined || price === "") return "";
  if (typeof price === "number") {
    return `${currency}${price.toFixed(2)}`;
  }
  const str = String(price).trim();
  if (str.startsWith("₹") || str.startsWith("$") || str.startsWith("€") || str.startsWith("£")) {
    return str;
  }
  return `${currency}${str}`;
};

export const navigateToCategory = (navigate, cat) => {
  if (!navigate || !cat) return;
  const query = typeof cat === "object" ? (cat.categoryParam || cat.name || cat.title || cat.slug || cat.id) : cat;
  const catId = typeof cat === "object" ? cat.id : undefined;
  navigate(`/product?category=${encodeURIComponent(query)}`, {
    state: { categoryId: catId ? String(catId) : undefined, categoryName: query },
  });
};

export const navigateToProduct = (navigate, item) => {
  if (!navigate || !item) return;
  const id = typeof item === "object" ? (item.id || item.slug) : item;
  navigate(`/product/${id}`, typeof item === "object" ? { state: { product: item } } : undefined);
};

export const scrollToTop = (behavior = "smooth") => {
  if (typeof window !== "undefined") {
    const beh = typeof behavior === "string" ? behavior : "smooth";
    window.scrollTo({ top: 0, behavior: beh });
  }
};

export const getSocialLinks = () => {
  const env = import.meta.env;
  return [
    { id: "instagram", icon: "Instagram", bg: "insta", url: env.VITE_SOCIAL_INSTAGRAM },
    { id: "youtube", icon: "YouTube", bg: "danger", url: env.VITE_SOCIAL_YOUTUBE },
    { id: "facebook", icon: "Facebook", bg: "info", url: env.VITE_SOCIAL_FACEBOOK },
    { id: "whatsapp", icon: "WhatsApp", bg: "success", url: env.VITE_SOCIAL_WHATSAPP },
    { id: "linkedin", icon: "LinkedIn", bg: "info", url: env.VITE_SOCIAL_LINKEDIN },
    { id: "twitter", icon: "Twitter", bg: "dark", url: env.VITE_SOCIAL_TWITTER },
  ].filter((item) => item.url?.trim());
};

export const SectionFallback = memo(({ minHeight = "100px" }) =>
  React.createElement("div", { className: "w-full", style: { minHeight } })
);
SectionFallback.displayName = "SectionFallback";
export const Fallback = SectionFallback;

const cmsCache = new Map();

export const getCmsData = (sectionName, data = cmsData) => {
  if (data && typeof data.getText === "function") return data;

  const cacheKey = !data || data === cmsData ? sectionName : null;
  if (cacheKey && cmsCache.has(cacheKey)) {
    return cmsCache.get(cacheKey);
  }

  let section = null;
  if (data && Array.isArray(data.cms)) {
    section = data;
  } else {
    const list = Array.isArray(data) ? data : Object.values(data || {});
    section = list.find((item) =>
      item?.section?.toLowerCase() === sectionName?.toLowerCase() ||
      item?._id?.toLowerCase() === sectionName?.toLowerCase()
    ) || null;
  }
  const items = section?.cms || [];

  const getText = (idOrLabel, fallback = "") =>
    items.find((i) => i.cmsId === idOrLabel || i.label?.toLowerCase() === String(idOrLabel).toLowerCase())?.text ?? fallback;

  const getImage = (idOrLabel, fallback = null) => {
    const item = items.find((i) => i.cmsId === idOrLabel || i.label?.toLowerCase() === String(idOrLabel).toLowerCase());
    return item?.image || (typeof item?.url === "string" ? item : fallback);
  };

  const getArray = (idOrLabel, fallback = []) =>
    items.find((i) => i.cmsId === idOrLabel || i.label?.toLowerCase() === String(idOrLabel).toLowerCase())?.data ?? fallback;

  const getButton = (idOrLabel = "Buttons", fallbackText = "", fallbackLink = "") => {
    const btn = items.find((i) => i.cmsId === idOrLabel || i.label?.toLowerCase().includes("button"));
    const arr = btn?.data || [];
    const text = arr.find((b) => b.label?.toLowerCase().includes("text") || b.cmsId?.toLowerCase().includes("001"))?.text || btn?.text || fallbackText;
    const link = arr.find((b) => b.label?.toLowerCase().includes("link") || b.cmsId?.toLowerCase().includes("002"))?.text || btn?.link || fallbackLink || "/product";
    return { text, link };
  };

  const dataMap = {};
  items.forEach((i) => {
    if (!i.cmsId) return;
    if (i.type === "text") {
      dataMap[i.cmsId] = i.text ?? "";
    } else if (i.type === "image") {
      dataMap[i.cmsId] = i.image || (typeof i.url === "string" ? i : null);
    } else if (i.type === "array") {
      const isBtn = i.label?.toLowerCase().includes("button") || i.cmsId?.toLowerCase().includes("btn") || i.cmsId?.toLowerCase().includes("005");
      dataMap[i.cmsId] = isBtn ? getButton(i.cmsId) : i.data;
    }
  });

  const result = { section, items, getText, getImage, getArray, getButton, ...dataMap };
  if (cacheKey) {
    cmsCache.set(cacheKey, result);
  }
  return result;
};
