const VITE_IMAGE = import.meta.env.VITE_IMAGE || "";

export const resolveImagePath = (path) => {
  if (!path) return "";
  if (typeof path !== "string") return path;

  const trimmed = path.trim();
  if (!trimmed) return "";

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("blob:") ||
    trimmed.startsWith("//")
  ) {
    return trimmed;
  }

  const base = VITE_IMAGE.replace(/\/+$/, "");
  const cleanPath = trimmed
    .replace(/^(\.\.\/|\.\/)+assets\//, "")
    .replace(/^\/?(src\/)?assets\//, "")
    .replace(/^\/+/, "");

  return base ? `${base}/${cleanPath}` : `/${cleanPath}`;
};

export default resolveImagePath;
