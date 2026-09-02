import hero from "../assets/hero.png";

const assetMap = {
  "/src/assets/hero.png": hero,
};

export const resolveImagePath = (path) => (path ? assetMap[path] || path : "");
