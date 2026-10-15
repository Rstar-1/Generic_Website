import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

import Container from "../common/Container";
import Image from "../common/Image";
import Icon from "../common/Icon";
import Button from "../common/Button";
import Modal from "../common/Modal";
import Dropdown from "../common/Dropdown";
import Badge from "../common/Badge";
import Fields from "../forms/Fields";
import EnquiryModal from "./generic/Enquiy";

import { header, configData, productsData, categoriesData } from "../../utils/apiData";
import { resolveImagePath, shreehariLogoColor, shreehariLogoWhite } from "../../utils/imageResolver";
import { useCart } from "../../feature/slice/cartSlice";
import { ALL_LANGUAGES, changeWebsiteLanguage, getSavedLanguage } from "../../utils/i18n";

const formatMegaProduct = (p) => ({
  id: p.id,
  title: p.name,
  name: p.name,
  image: resolveImagePath(p.image),
  href: `/product/${p.id}`,
  badge: p.badge?.text,
  price: p.priceFormatted || (p.price ? `₹${p.price}` : null),
});

const buildDynamicMegaMenu = () => {
  const menu = {};
  const realProducts = (productsData || []).filter((p) => !p.isBanner);

  (categoriesData || []).forEach((cat) => {
    const key = cat.megaMenuKey || cat.slug;
    const catProducts = realProducts.filter(
      (p) => p.categoryId === cat.id || p.category?.toLowerCase() === cat.name?.toLowerCase() || p.megaMenuKey === key
    );

    const subCatMap = new Map();
    const definedSubCategories = (cat.subCategories && cat.subCategories.length > 0)
      ? cat.subCategories.slice(0, 4)
      : [];

    definedSubCategories.forEach((sub) => {
      const subId = typeof sub === "string" ? sub.toLowerCase().replace(/[^a-z0-9]/g, "-") : String(sub.id);
      const subName = typeof sub === "string" ? sub : sub.name;
      subCatMap.set(subId, { id: subId, name: subName, badge: null, items: [] });
    });

    catProducts.forEach((p) => {
      const pSubId = p.subCategoryId ? String(p.subCategoryId).toLowerCase() : "";
      const pSubName = (p.subCategory || "").toLowerCase();
      const pName = (p.name || "").toLowerCase();

      let targetSubId = null;
      for (const [subId, subData] of subCatMap.entries()) {
        const sName = subData.name.toLowerCase();
        if (
          pSubId === subId.toLowerCase() ||
          pSubName === sName ||
          pSubName.includes(sName) ||
          sName.includes(pSubName) ||
          pName.includes(sName)
        ) {
          targetSubId = subId;
          break;
        }
      }

      if (!targetSubId && subCatMap.size < 4) {
        targetSubId = p.subCategoryId || (p.subCategory ? p.subCategory.toLowerCase().replace(/[^a-z0-9]/g, "-") : `sub-${subCatMap.size + 1}`);
        subCatMap.set(targetSubId, {
          id: targetSubId,
          name: p.subCategory || p.name,
          badge: p.badge?.text === "Coming Soon" ? "Coming Soon" : p.badge?.text || null,
          items: [],
        });
      }

      if (targetSubId && subCatMap.has(targetSubId)) {
        const subObj = subCatMap.get(targetSubId);
        if (subObj.items.length < 4) {
          subObj.items.push(formatMegaProduct(p));
        }
      }
    });

    const subCategoriesList = Array.from(subCatMap.values()).slice(0, 4);
    subCategoriesList.forEach((sub) => {
      if (!sub.items.length) {
        sub.items = catProducts.slice(0, 4).map(formatMegaProduct);
      } else if (sub.items.length > 4) {
        sub.items = sub.items.slice(0, 4);
      }
    });

    menu[key] = { id: cat.id, name: cat.name, categories: subCategoriesList };
  });

  return menu;
};

const dynamicMegaMenu = buildDynamicMegaMenu();

const categoryMenuItems = [
  ...(categoriesData || []).map((cat) => ({
    label: cat.name || cat.title,
    href: `/product?category=${encodeURIComponent(cat.name || cat.title)}`,
    hasMegaMenu: true,
    megaMenuKey: cat.megaMenuKey || cat.slug,
    badge: cat.badge || null,
  })),
  ...(header.bottomBar?.menu || []),
];

const headerType = configData?.Header?.HeaderType ?? configData?.Header?.[0]?.HeaderType ?? 1;
const isStickyConfig = Boolean(configData?.Header?.HeaderSticky ?? configData?.Header?.[0]?.HeaderSticky);

const LogoClass = {
  1: "w-25 sm-w-85",
  2: "w-25 sm-w-85",
  3: "w-20 sm-w-85",
  4: "w-20 sm-w-85",
}[headerType] || "w-25 sm-w-85";

const NavigationClass = {
  1: "w-50 justify-center",
  2: "w-55 justify-start",
  3: "w-60 justify-end",
  4: "w-60 justify-end",
}[headerType] || "w-55 justify-start";

const ActionClass = {
  1: "w-25 sm-w-15",
  2: "w-20 sm-w-15",
  3: "w-20 sm-w-15",
  4: "w-20 sm-w-15",
}[headerType] || "w-20 sm-w-15";

const CategoryClass = {
  1: "justify-between",
  2: "justify-start",
}[configData?.Header?.HeaderCategory] || "justify-between";

const getNavColor = (isHeaderWhite, isActive = false) => {
  if (isActive) return "var(--primary)";
  return !isStickyConfig || isHeaderWhite ? "var(--dark)" : "var(--white)";
};

const getIconColor = (isHeaderWhite) => (!isStickyConfig || isHeaderWhite ? "#161616" : "#FFFFFF");

const HeaderTopBar = React.memo(() => {
  if (configData?.Header?.[0]?.HeaderTopBar === false) return null;
  const { location: loc, email, timing } = header.topBar || {};

  return (
    <Container style={{ background: "var(--primary)" }} className="sm-hidden md-hidden">
      <div className="py-4 w-full flex items-center justify-between mini-text text-white">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-6">
            <Icon name="MapPin" width="14" height="14" stroke="var(--white)" />
            <p>{loc || "Riverside Park EU-1001"}</p>
          </div>
          <span>|</span>
          <div className="flex items-center gap-6">
            <Icon name="Mail" width="14" height="14" stroke="var(--white)" />
            <a href={`mailto:${email || "hello@Infitech.com"}`} className="text-white">
              {email || "hello@Infitech.com"}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Icon name="Clock" width="14" height="14" stroke="var(--white)" />
          <p>{timing || "Mon–Fri 09:00 AM – 06:00 PM"}</p>
        </div>
      </div>
    </Container>
  );
});
HeaderTopBar.displayName = "HeaderTopBar";

const HeaderLogo = React.memo(({ isHeaderWhite, onCloseMobile }) => (
  <NavLink to="/home" className={`${LogoClass} flex items-center`} onClick={onCloseMobile} title="SUPPORT - Learn First Aid, Save Lives">
    <Image
      src={!isStickyConfig || isHeaderWhite ? shreehariLogoColor : shreehariLogoWhite}
      alt="SUPPORT - Learn First Aid, Save Lives"
      className="object-contain"
      style={{ height: "46px", maxHeight: "48px", width: "auto" }}
    />
  </NavLink>
));
HeaderLogo.displayName = "HeaderLogo";

const LanguageDropdown = React.memo(({ isHeaderWhite, align = "right", className = "", showFlagOnMobile = true }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const triggerRef = React.useRef(null);
  const currentCode = getSavedLanguage();
  const currentLang = ALL_LANGUAGES.find((l) => l.code === currentCode) || ALL_LANGUAGES[0];
  const color = isOpen ? "var(--primary)" : getNavColor(isHeaderWhite, false);

  return (
    <div className={`relative flex items-center ${className}`}>
      <div
        ref={triggerRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="font-500 para-text px-10 sm-px-4 cursor-pointer flex items-center gap-6 select-none"
        style={{ color }}
        title="Language"
      >
        <Icon name="Globe" width="16" height="16" stroke={color} />
        {showFlagOnMobile ? (
          <>
            <span className="sm-hidden">{currentLang.nativeName}</span>
            <span className="hidden sm-inline mini-text font-600 uppercase px-4 py-2 rounded-3 bg-forth text-gray">
              {currentLang.flag}
            </span>
          </>
        ) : (
          <span>{currentLang.nativeName}</span>
        )}
        <Icon
          name="ChevronDown"
          width="13"
          height="13"
          stroke={color}
          style={{
            transition: "transform 0.2s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </div>

      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        triggerRef={triggerRef}
        align={align}
        minWidth="180px"
        style={{ maxHeight: "300px", overflowY: "auto" }}
        className="rounded-5 b-shadow border-ec py-4"
      >
        <div className="grid-cols-1">
          {ALL_LANGUAGES.map((lang) => {
            const isSelected = currentLang.code === lang.code;
            return (
              <div
                key={lang.code}
                onClick={() => {
                  changeWebsiteLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`px-14 py-8 cursor-pointer flex items-center justify-between transition-colors ${isSelected ? "bg-forth text-primary font-600" : "text-dark hover:bg-forth"
                  }`}
              >
                <div className="flex items-center gap-8">
                  <span className="mini-text font-600 px-4 py-2 rounded-3 bg-forth text-gray">{lang.flag}</span>
                  <span className="small-text">{lang.nativeName}</span>
                </div>
                {isSelected && <Icon name="Check" width="14" height="14" stroke="var(--primary)" />}
              </div>
            );
          })}
        </div>
      </Dropdown>
    </div>
  );
});
LanguageDropdown.displayName = "LanguageDropdown";

const NavItem = React.memo(
  ({
    item,
    pathname,
    hoveredNav,
    activeMegaMenu,
    isHeaderWhite,
    onMouseEnter,
    onMouseLeave,
    textClass = "para-text px-16",
    iconSize = "18",
    isBottom = false,
  }) => {
    const isActive = pathname === item.href;
    const isHovered = hoveredNav === (item.label || item.href);
    const isItemMegaActive = Boolean(activeMegaMenu) && item.megaMenuKey && item.megaMenuKey === activeMegaMenu;
    const linkColor = getNavColor(isHeaderWhite, isActive || isHovered || isItemMegaActive);

    return (
      <div
        onMouseEnter={() => onMouseEnter(item)}
        onMouseLeave={onMouseLeave}
        className="relative flex items-center h-full"
        style={isBottom ? { minWidth: "max-content" } : undefined}
      >
        <NavLink
          to={item.href || "/product"}
          className={`font-500 cursor-pointer flex items-center gap-6 ${textClass}`}
          style={{ color: linkColor }}
        >
          <span>{item.label}</span>
          {item.badge && <Badge text={item.badge} color={item.badgeColor || item.badgeTheme} size="xs" shape="pill" />}
          {item.hasMegaMenu && (
            <Icon
              name="ChevronDown"
              width={iconSize}
              height={iconSize}
              stroke={linkColor}
              style={{
                transition: "transform 0.2s ease",
                transform: isItemMegaActive ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          )}
        </NavLink>
      </div>
    );
  }
);
NavItem.displayName = "NavItem";

const HeaderNavigation = React.memo(
  ({ pathname, hoveredNav, activeMegaMenu, isHeaderWhite, onNavMouseEnter, onNavMouseLeave }) => (
    <div className={`${NavigationClass} sm-hidden md-hidden flex items-center h-full gap-4`}>
      {header.navLinks?.map((item) => (
        <NavItem
          key={item.href}
          item={item}
          pathname={pathname}
          hoveredNav={hoveredNav}
          activeMegaMenu={activeMegaMenu}
          isHeaderWhite={isHeaderWhite}
          onMouseEnter={onNavMouseEnter}
          onMouseLeave={onNavMouseLeave}
        />
      ))}
      <LanguageDropdown isHeaderWhite={isHeaderWhite} align="right" />
    </div>
  )
);
HeaderNavigation.displayName = "HeaderNavigation";

const HeaderBottomBar = React.memo(
  ({ pathname, hoveredNav, activeMegaMenu, isHeaderWhite, onNavMouseEnter, onNavMouseLeave }) => {
    if (configData?.Header?.[0]?.HeaderBottomBar === false || !categoryMenuItems.length) return null;

    return (
      <div className="sm-hidden md-hidden w-full" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
        <Container>
          <div className={`${CategoryClass} flex items-center w-full py-16 overflow-auto`} style={{ gap: "26px" }}>
            {categoryMenuItems.map((item, idx) => (
              <NavItem
                key={item.label || idx}
                item={item}
                pathname={pathname}
                hoveredNav={hoveredNav}
                activeMegaMenu={activeMegaMenu}
                isHeaderWhite={isHeaderWhite}
                onMouseEnter={onNavMouseEnter}
                onMouseLeave={onNavMouseLeave}
                textClass="small-text capitalize"
                iconSize="20"
                isBottom
              />
            ))}
          </div>
        </Container>
      </div>
    );
  }
);
HeaderBottomBar.displayName = "HeaderBottomBar";

const CartButton = React.memo(({ isMobile, cartQty, onOpenCart, isHeaderWhite }) => (
  <div className={`relative ${isMobile ? "flex items-center justify-center" : ""}`}>
    <Button
      aria-label="Cart"
      onClick={onOpenCart}
      icon="Bag"
      iconWidth={isMobile ? "22" : "16"}
      iconHeight={isMobile ? "22" : "16"}
      iconStrokeWidth={isMobile ? "1.5" : "2"}
      variant={isMobile ? undefined : "outline"}
      border={isMobile ? undefined : (!isStickyConfig || isHeaderWhite ? "primary" : "white")}
      iconStroke={isMobile ? getIconColor(isHeaderWhite) : getNavColor(isHeaderWhite, isHeaderWhite)}
      version="icon"
      bg="transparent"
      className={isMobile ? "" : "rounded-30 p-10"}
    />
    {cartQty > 0 && (
      <p
        className={`absolute bg-primary text-white rounded-full flex items-center justify-center ${isMobile ? "pointer-events-none" : ""
          }`}
        style={
          isMobile
            ? { top: "-2px", right: "-2px", width: "18px", height: "18px", fontSize: "10px" }
            : { top: "-7px", right: "-7px", width: "20px", height: "20px", fontSize: "10px" }
        }
      >
        {cartQty}
      </p>
    )}
  </div>
));
CartButton.displayName = "CartButton";

const CartSidebar = React.memo(
  ({
    cartItems,
    cartQty,
    subtotal,
    isCartOpen,
    onCloseCart,
    onOpenEnquiryModal,
    onRemove,
    onSetQuantity,
    onNavigate,
  }) => (
    <Modal
      type="sidebar"
      placement="right"
      size="sm"
      title={
        <div className="flex items-center gap-8">
          <span>Your cart</span>
          <Badge text={cartQty} color={cartQty > 0 ? "primary" : "secondary"} size="sm" shape="pill" />
        </div>
      }
      footer={null}
      isOpen={isCartOpen}
      onClose={onCloseCart}
    >
      <div className="grid-cols-1 items-start gap-12 pb-20 mb-100 h-500 overflow-auto">
        {cartItems.length > 0 ? (
          <div className="grid-cols-1 gap-12 mt-10">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-12 items-center relative pb-20 bordb">
                <div className="w-35 h-100px rounded-5 overflow-hidden">
                  <Image src={resolveImagePath(item.image)} alt={item.name} className="flex w-full h-full object-cover" />
                </div>

                <div className="w-65">
                  <p className="mini-text text-gray font-400">{item.category}</p>
                  <h4 className="headmini-text text-dark font-600 line-clamp1">{item.name}</h4>

                  <div className="flex items-end justify-between mt-5">
                    <Fields type="quantity" value={item.quantity} onChange={(val) => onSetQuantity(item.id, val)} />
                    <p className="small-text font-600 text-danger">₹{((Number(item.price) || 0) * item.quantity).toFixed(2)}</p>
                  </div>
                </div>

                <div onClick={() => onRemove(item.id)} className="absolute top-0 right-0 cursor-pointer">
                  <Icon name="Close" width="16" height="16" stroke="var(--danger)" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 bg-forth">
            <Icon name="Bag" width="48" height="48" stroke="var(--primary)" className="mx-auto mb-10" />
            <p className="small-text font-500 capitalize text-gray">Your cart is empty</p>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-forth">
        <div className="p-15">
          <div className="flex items-end w-full">
            <div className="w-80">
              <h4 className="mid-text text-dark font-600">Estimated total</h4>
              <p className="mini-text text-gray">Taxes and shipping at checkout</p>
            </div>
            <p className="small-text text-dark font-600 w-20 text-right">${subtotal.toFixed(2)}</p>
          </div>
          <div className="grid-cols-2 gap-12 mt-12">
            <Button
              text="Explore More"
              onClick={() => {
                onCloseCart();
                onNavigate("/products");
              }}
              version="v3"
              bg="tertiary"
              color="dark"
              className="rounded-30 font-500"
            />
            <Button
              text="Send Enquiry"
              onClick={() => {
                onCloseCart();
                if (onOpenEnquiryModal) onOpenEnquiryModal();
                else onNavigate("/connect");
              }}
              version="v3"
              bg="dark"
              color="white"
              className="rounded-30 font-500"
            />
          </div>
        </div>
      </div>
    </Modal>
  )
);
CartSidebar.displayName = "CartSidebar";

const HeaderActions = React.memo(({ isHeaderWhite, isMobileOpen, setIsMobileOpen, onNavigate, cartQty, onOpenCart }) => {
  const phone = import.meta.env.VITE_PHONE || "07942562287";
  const handleCall = () => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className={`${ActionClass} flex justify-end`}>
      <div className="sm-hidden md-hidden flex items-center" style={{ gap: "14px" }}>
        <Button
          aria-label="Call Us"
          onClick={handleCall}
          icon="Phone"
          iconWidth="16"
          iconHeight="16"
          iconStrokeWidth="2"
          variant="outline"
          border={!isStickyConfig || isHeaderWhite ? "primary" : "white"}
          iconStroke={getNavColor(isHeaderWhite, isHeaderWhite)}
          version="icon"
          bg="transparent"
          className="rounded-30 p-10"
        />

        <CartButton isMobile={false} cartQty={cartQty} onOpenCart={onOpenCart} isHeaderWhite={isHeaderWhite} />

        <Button
          text="Get A Quote"
          onClick={() => onNavigate("/connect")}
          bg="primary"
          color="white"
          border="primary"
          icon={configData?.Header?.HeaderType === 4 ? "" : "ArrowRight"}
          iconPosition="right"
          iconWidth="16"
          iconHeight="16"
          version="v1"
          className="rounded-30"
        />
      </div>

      <div className="hidden md-flex sm-flex items-center gap-4">
        <Button
          aria-label="Call Us"
          onClick={handleCall}
          icon="Phone"
          iconWidth="22"
          iconHeight="22"
          iconStrokeWidth="1.5"
          iconStroke={getIconColor(isHeaderWhite)}
          version="icon"
          bg="transparent"
        />

        <CartButton isMobile={true} cartQty={cartQty} onOpenCart={onOpenCart} isHeaderWhite={isHeaderWhite} />

        <Button
          onClick={() => setIsMobileOpen((prev) => !prev)}
          aria-label="Toggle Navigation Menu"
          icon={isMobileOpen ? "Close" : "Menu"}
          iconWidth="30"
          iconHeight="30"
          iconStrokeWidth="1.5"
          iconStroke={getIconColor(isHeaderWhite)}
          version="icon"
          bg="transparent"
        />
      </div>
    </div>
  );
});
HeaderActions.displayName = "HeaderActions";

const MegaMenu = React.memo(
  ({ activeMegaMenu, activeCategoryTab, setActiveCategoryTab, onClose, onMouseEnter, onMouseLeave }) => {
    const currentMenu = React.useMemo(() => {
      if (!activeMegaMenu) return null;
      return dynamicMegaMenu?.[activeMegaMenu] || null;
    }, [activeMegaMenu]);

    const categories = React.useMemo(() => (currentMenu?.categories || []).slice(0, 4), [currentMenu]);

    const currentCategory = React.useMemo(
      () => categories.find((c) => c.id === activeCategoryTab) || categories[0],
      [categories, activeCategoryTab]
    );

    if (!currentMenu || !categories.length) return null;

    return (
      <Dropdown
        isOpen={Boolean(activeMegaMenu)}
        onClose={onClose}
        align="full"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="w-full bg-white bordh"
        style={{ marginTop: "-5px" }}
      >
        <Container>
          <div className="flex items-start gap-12 py-20 w-full">
            <div className="grid-cols-1 w-20">
              {categories.map((cat) => {
                const isActive = currentCategory?.id === cat.id;

                return (
                  <div
                    key={cat.id}
                    onMouseEnter={() => setActiveCategoryTab(cat.id)}
                    onClick={() => setActiveCategoryTab(cat.id)}
                    className="flex items-center justify-between p-12 rounded-5 cursor-pointer"
                    style={{
                      backgroundColor: isActive ? "var(--forth)" : "transparent",
                      color: isActive ? "var(--dark)" : "#334155",
                    }}
                  >
                    <p className="small-text font-500">{cat.name}</p>
                    {cat.badge && (
                      <Badge
                        text={cat.badge}
                        color={cat.badgeColor || cat.badgeTheme}
                        size="xs"
                        shape="pill"
                        className="px-12 py-3"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="w-80">
              <div key={currentCategory?.id || "category-grid"} className="grid-cols-4 sm-grid-cols-2 gap-12">
                {currentCategory?.items?.slice(0, 4)?.map((item, idx) => (
                  <NavLink
                    key={`${currentCategory?.id || "cat"}-${item.title || item.href || idx}`}
                    to={item.href || "/products"}
                    onClick={onClose}
                  >
                    <div className="w-full rounded-5 overflow-hidden relative">
                      <Image
                        src={resolveImagePath(item.image)}
                        alt={item.title}
                        className="w-full h-150 object-cover flex hover:scale-105 transition-transform"
                      />
                      {item.badge && (
                        <div className="absolute top-8 left-8 z-2">
                          <Badge text={item.badge} color={item.badgeColor || item.badgeTheme} size="xs" shape="pill" />
                        </div>
                      )}
                    </div>
                    <p className="small-text line-clamp1 font-500 text-dark mt-6">{item.title}</p>
                    {item.price && <p className="mini-text text-danger font-600 mt-1">{item.price}</p>}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Dropdown>
    );
  }
);
MegaMenu.displayName = "MegaMenu";

const MobileMenu = React.memo(({ isMobileOpen, pathname, onClose, onNavigate }) => {
  const [menuView, setMenuView] = React.useState({ level: 0 });

  React.useEffect(() => {
    if (!isMobileOpen) setMenuView({ level: 0 });
  }, [isMobileOpen]);

  if (!isMobileOpen) return null;

  const renderMobileNavItem = (item, isNavCategory = false) => {
    const isActive = pathname === item.href;
    const hasSubMenu =
      item.hasMegaMenu &&
      item.megaMenuKey &&
      dynamicMegaMenu?.[item.megaMenuKey]?.categories?.length > 0;

    const content = (
      <>
        <p
          className={`small-text font-500 uppercase ${isNavCategory ? "text-dark flex items-center gap-8" : ""}`}
          style={!isNavCategory ? { color: isActive ? "var(--primary)" : "var(--dark)" } : undefined}
        >
          {item.label}
        </p>
        <Icon
          name="ChevronRight"
          width="18"
          height="18"
          stroke={isNavCategory ? "var(--gray)" : isActive ? "var(--primary)" : "var(--dark)"}
        />
      </>
    );

    return (
      <div key={item.label || item.href} className={isNavCategory ? "py-16 px-14 bg-white mb-5 rounded-5" : "py-13 bordb"}>
        {hasSubMenu ? (
          <div
            onClick={() =>
              setMenuView({
                level: 1,
                title: item.label,
                megaKey: item.megaMenuKey,
                categories: dynamicMegaMenu[item.megaMenuKey]?.categories || [],
              })
            }
            className="flex items-center justify-between cursor-pointer"
          >
            {content}
          </div>
        ) : (
          <NavLink to={item.href || "/product"} onClick={onClose} className="flex items-center justify-between">
            {content}
          </NavLink>
        )}
      </div>
    );
  };

  return (
    <div className="relative top-0 left-0 w-full bg-white h-400 bordb bordh pb-20 overflow-y-auto z-50 hidden sm-grid-cols-1">
      {menuView.level === 0 && (
        <div>
          <div className="px-14 py-10 bordb flex items-center justify-between bg-forth">
            <span className="small-text font-500 text-dark">Language:</span>
            <LanguageDropdown isHeaderWhite={true} align="right" showFlagOnMobile={false} />
          </div>
          <div className="grid-cols-1 px-14">
            {header.navLinks?.map((item) => renderMobileNavItem(item, false))}
          </div>

          {categoryMenuItems.length > 0 && (
            <div className="py-15 bg-forth px-14">
              {categoryMenuItems.map((item) => renderMobileNavItem(item, true))}
            </div>
          )}

          <div className="px-14 mt-15">
            <Button
              onClick={() => {
                onClose();
                onNavigate("/connect");
              }}
              icon="ArrowRight"
              iconPosition="right"
              iconWidth="18"
              iconHeight="18"
              iconStroke="var(--white)"
              version="v3"
              className="w-full justify-center"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      )}

      {menuView.level === 1 && (
        <div className="w-full">
          <div
            onClick={() => setMenuView({ level: 0 })}
            className="w-full flex items-center gap-4 p-16 bordb bg-forth cursor-pointer"
          >
            <Icon name="ChevronLeft" width="18" height="18" stroke="var(--dark)" />
            <p className="small-text font-500 text-dark">BACK</p>
          </div>

          <div className="px-18">
            {menuView.categories?.map((cat) => (
              <div
                key={cat.id || cat.name}
                onClick={() => {
                  if (cat.items && cat.items.length > 0) {
                    setMenuView({
                      level: 2,
                      title: cat.name,
                      items: cat.items,
                      parentCategories: menuView.categories,
                      megaKey: menuView.megaKey,
                    });
                  } else {
                    onClose();
                    onNavigate(cat.href || `/products?type=${cat.id}`);
                  }
                }}
                className="py-18 bordb flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-8">
                  <p className="small-text font-500 text-dark">{cat.name}</p>
                  {cat.badge && <Badge color="success" shape="pill" text={cat.badge} size="xs" />}
                </div>
                <Icon name="ChevronRight" width="18" height="18" stroke="var(--gray)" />
              </div>
            ))}
          </div>
        </div>
      )}

      {menuView.level === 2 && (
        <div className="w-full">
          <div
            onClick={() =>
              setMenuView({
                level: 1,
                title: menuView.title,
                megaKey: menuView.megaKey,
                categories: menuView.parentCategories,
              })
            }
            className="w-full flex items-center gap-4 p-16 bordb bg-forth cursor-pointer"
          >
            <Icon name="ChevronLeft" width="18" height="18" stroke="var(--dark)" />
            <p className="small-text font-500 text-dark">BACK</p>
          </div>

          <div className="px-18">
            {menuView.items?.map((item, idx) => (
              <div
                key={item.title || item.href || idx}
                onClick={() => {
                  onClose();
                  onNavigate(item.href || `/products?type=${item.title?.toLowerCase().replace(/\s+/g, "-")}`);
                }}
                className="py-18 bordb flex items-center gap-12 cursor-pointer"
              >
                {item.image && (
                  <Image
                    src={resolveImagePath(item.image)}
                    alt={item.title}
                    height="45px"
                    className="w-15 object-cover flex rounded-5"
                  />
                )}
                <div className="w-85">
                  <p className="small-text font-500 text-dark line-clamp2 capitalize">{item.title}</p>
                  {item.price && <p className="mini-text text-danger font-600 mt-1">{item.price}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
MobileMenu.displayName = "MobileMenu";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [hoveredNav, setHoveredNav] = React.useState(null);
  const [activeMegaMenu, setActiveMegaMenu] = React.useState(null);
  const [activeCategoryTab, setActiveCategoryTab] = React.useState(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = React.useState(false);

  const megaMenuTimerRef = React.useRef(null);

  const {
    cartItems,
    cartQty,
    subtotal,
    removeFromCart,
    updateQuantity,
    setExactQuantity = updateQuantity,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    setActiveMegaMenu(null);
    setHoveredNav(null);
    setIsMobileOpen(false);
  }, [location.pathname]);

  React.useEffect(() => {
    return () => {
      if (megaMenuTimerRef.current) clearTimeout(megaMenuTimerRef.current);
    };
  }, []);

  const handleNavMouseEnter = React.useCallback((item) => {
    if (megaMenuTimerRef.current) clearTimeout(megaMenuTimerRef.current);
    setHoveredNav(item.label || item.href);

    const targetMegaKey =
      item.hasMegaMenu && item.megaMenuKey && dynamicMegaMenu?.[item.megaMenuKey]
        ? item.megaMenuKey
        : null;

    setActiveMegaMenu(targetMegaKey);
    if (targetMegaKey && dynamicMegaMenu?.[targetMegaKey]?.categories?.[0]?.id) {
      setActiveCategoryTab(dynamicMegaMenu[targetMegaKey].categories[0].id);
    }
  }, []);

  const handleNavMouseLeave = React.useCallback(() => {
    megaMenuTimerRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
      setHoveredNav(null);
    }, 180);
  }, []);

  const handleMegaMenuMouseEnter = React.useCallback(() => {
    if (megaMenuTimerRef.current) clearTimeout(megaMenuTimerRef.current);
  }, []);

  const handleMegaMenuMouseLeave = React.useCallback(() => {
    megaMenuTimerRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
      setHoveredNav(null);
    }, 180);
  }, []);

  const isMegaOpen = Boolean(activeMegaMenu);
  const isHeaderWhite = isScrolled || isMobileOpen || isMegaOpen;
  const headerBg = isHeaderWhite ? "var(--white)" : "transparent";
  const headerBorder = isHeaderWhite ? "1px solid var(--white)" : "1px solid rgba(255, 255, 255, 0.1)";

  const handleCloseMobile = React.useCallback(() => setIsMobileOpen(false), []);
  const handleOpenCart = React.useCallback(() => setIsCartOpen(true), [setIsCartOpen]);
  const handleCloseCart = React.useCallback(() => setIsCartOpen(false), [setIsCartOpen]);
  const handleOpenEnquiryModal = React.useCallback(() => setIsEnquiryModalOpen(true), []);
  const handleCloseEnquiryModal = React.useCallback(() => setIsEnquiryModalOpen(false), []);

  const handleSetQuantity = React.useCallback(
    (id, value) => {
      const setQty = setExactQuantity || updateQuantity;
      if (typeof setQty === "function") setQty(id, value);
    },
    [setExactQuantity, updateQuantity]
  );

  return (
    <Container
      as="header"
      version="v0"
      style={{
        position: isStickyConfig ? "fixed" : "relative",
        top: 0,
        left: 0,
        zIndex: 1000,
        width: "100%",
        backgroundColor: isStickyConfig ? headerBg : "transparent",
        borderBottom: isStickyConfig ? headerBorder : "transparent",
        transition: "background-color 0.35s ease",
      }}
    >
      <div className="w-full relative">
        <HeaderTopBar />

        <Container>
          <div className="flex items-center w-full" style={{ height: "64px" }}>
            <HeaderLogo isHeaderWhite={isHeaderWhite} onCloseMobile={handleCloseMobile} />

            <HeaderNavigation
              pathname={location.pathname}
              hoveredNav={hoveredNav}
              activeMegaMenu={activeMegaMenu}
              isHeaderWhite={isHeaderWhite}
              onNavMouseEnter={handleNavMouseEnter}
              onNavMouseLeave={handleNavMouseLeave}
            />

            <HeaderActions
              isHeaderWhite={isHeaderWhite}
              isMobileOpen={isMobileOpen}
              setIsMobileOpen={setIsMobileOpen}
              onNavigate={navigate}
              cartQty={cartQty}
              onOpenCart={handleOpenCart}
            />
          </div>
        </Container>

        <HeaderBottomBar
          pathname={location.pathname}
          hoveredNav={hoveredNav}
          activeMegaMenu={activeMegaMenu}
          isHeaderWhite={isHeaderWhite}
          onNavMouseEnter={handleNavMouseEnter}
          onNavMouseLeave={handleNavMouseLeave}
        />

        <MegaMenu
          activeMegaMenu={activeMegaMenu}
          activeCategoryTab={activeCategoryTab}
          setActiveCategoryTab={setActiveCategoryTab}
          onClose={() => setActiveMegaMenu(null)}
          onMouseEnter={handleMegaMenuMouseEnter}
          onMouseLeave={handleMegaMenuMouseLeave}
        />

        <MobileMenu
          isMobileOpen={isMobileOpen}
          pathname={location.pathname}
          onClose={handleCloseMobile}
          onNavigate={navigate}
        />

        <CartSidebar
          cartItems={cartItems}
          cartQty={cartQty}
          subtotal={subtotal}
          isCartOpen={isCartOpen}
          onCloseCart={handleCloseCart}
          onOpenEnquiryModal={handleOpenEnquiryModal}
          onRemove={removeFromCart}
          onSetQuantity={handleSetQuantity}
          onNavigate={navigate}
        />

        <EnquiryModal
          isOpen={isEnquiryModalOpen}
          onClose={handleCloseEnquiryModal}
          cartItems={cartItems}
          onSetQuantity={handleSetQuantity}
          onRemove={removeFromCart}
        />
      </div>
    </Container>
  );
};

export default React.memo(Header);