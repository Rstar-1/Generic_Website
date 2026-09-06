import { useState, useEffect, useMemo } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Container from "../common/Container";
import Image from "../common/Image";
import Icon from "../common/Icon";
import Button from "../common/Button";
import Modal from "../common/Modal";
import { header } from "../../utils/apiData";
import { resolveImagePath } from "../../utils/imageResolver";
import { useCart } from "../../context/CartContext";
import Fields from "../forms/Fields";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const { cartItems, cartQty, subtotal, removeFromCart, updateQuantity, setExactQuantity, isCartOpen, setIsCartOpen, addToCart } = useCart();

  const isEcom = import.meta.env.VITE_ECOM === 'true';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerBg = (isScrolled || isMobileOpen) ? "var(--white)" : "transparent";
  const headerBorder = (isScrolled || isMobileOpen) ? "1px solid var(--white)" : "1px solid rgba(255, 255, 255, 0.1)";

  const mobileMenu = useMemo(() => {
    if (!isMobileOpen) return null;
    return (
      <div className="relative left-0 w-full bg-white h-600 overflow-auto z-99 top-0 bordh hidden md-hidden sm-grid-cols-1">
        <div className="px-18">
          <div className="grid-cols-1 w-full">
            {header.navLinks?.map((item, i) => {
              const isActive = location.pathname === item.href;
              return (
                <div
                  key={i}
                  className="py-12 bordb"
                >
                  <NavLink
                    to={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="decoration-none flex items-center justify-between"
                  >
                    <span
                      className="para-text font-500 uppercase"
                      style={{
                        color: isActive ? "var(--primary)" : "var(--dark)",
                        letterSpacing: "0.03em"
                      }}
                    >
                      {item.label}
                    </span>
                    <Icon
                      name="ChevronRight"
                      width="22"
                      height="22"
                      stroke={isActive ? "var(--primary)" : "var(--dark)"}
                    />
                  </NavLink>
                </div>
              );
            })}
          </div>
          <div className="w-full mt-20">
            <Button
              onClick={() => {
                setIsMobileOpen(false);
                navigate("/connect");
              }}
              icon="ArrowRight"
              iconPosition="right"
              iconWidth="18"
              iconHeight="18"
              iconStroke="var(--white)"
              version="v3"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>
    );
  }, [isMobileOpen, location.pathname, navigate]);

  return (
    <Container
      as="header"
      version="v0"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        width: "100%",
        backgroundColor: headerBg,
        borderBottom: headerBorder,
        transition: "background-color 0.35s ease"
      }}
    >
      <div className="w-full">
        <Container className="sm-hidden md-hidden bg-primary">
          <div className="py-10 w-full">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-12">
                <div className="flex items-center gap-6 font-400">
                  <Icon name="MapPin" width="14" height="14" stroke="var(--white)" />
                  <p className="mini-text text-white font-400">{header.topBar?.location || "Riverside Park EU-1001"}</p>
                </div>
                <p className="mini-text text-white font-400">|</p>
                <div className="flex items-center gap-6 font-400">
                  <Icon name="Mail" width="14" height="14" stroke="var(--white)" />
                  <a
                    href={`mailto:${header.topBar?.email || "hello@Infitech.com"}`}
                    className="text-white mini-text"
                  >
                    {header.topBar?.email || "hello@Infitech.com"}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-12">
                <div className="flex items-center gap-6 font-400">
                  <Icon name="Clock" width="14" height="14" stroke="var(--white)" />
                  <p className="mini-text text-white font-400">{header.topBar?.timing || "Mon–Fri 09:00 AM – 06:00 PM"}</p>
                </div>

                <div className="flex items-center gap-12">
                  {header.topBar?.socials?.map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                    >
                      <Icon
                        name={social.name}
                        width="16"
                        height="16"
                        stroke="var(--white)"
                        fill="var(--white)"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>

        <Container>
          <div
            className="flex items-center justify-between mx-auto w-full"
            style={{ height: "70px" }}
          >
            <NavLink to="/" className='w-25' onClick={() => setIsMobileOpen(false)}>
              <Image
                src={resolveImagePath((isScrolled || isMobileOpen) ? "/src/assets/sobo_logo.webp" : "/src/assets/sobo_white.png")}
                alt="Infitech Logo"
                className="object-contain"
                style={{ width: "auto", height: "50px" }}
              />
            </NavLink>

            <div className="sm-hidden md-hidden flex items-center justify-center h-full gap-4 w-50">
              {header.navLinks?.map((item, i) => {
                const isActive = location.pathname === item.href;
                const isHovered = hoveredNav === i;
                const linkColor = (isActive || isHovered)
                  ? "var(--primary)"
                  : (isScrolled ? "var(--dark)" : "var(--white)");

                return (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredNav(i)}
                    onMouseLeave={() => setHoveredNav(null)}
                    className="relative flex items-center h-full"
                  >
                    <NavLink
                      to={item.href}
                      className="font-500 small-text px-16 py-6 cursor-pointer"
                      style={{
                        color: linkColor,
                        transition: "color 0.2s ease"
                      }}
                    >
                      {item.label}
                    </NavLink>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-12 justify-end w-25">
              <div className="sm-hidden md-hidden flex items-center gap-12">
                <Button
                  aria-label="Call Us"
                  onClick={() => { window.location.href = "tel:+5284567592"; }}
                  icon="Phone"
                  iconWidth="18"
                  iconHeight="18"
                  iconStrokeWidth="2"
                  variant="outline"
                  iconStroke={isScrolled ? "var(--primary)" : "var(--white)"}
                  version="icon"
                  bg={isScrolled ? "var(--primary)" : "none"}
                  className="border-primary rounded-30 p-12"
                />

                {isEcom && (
                  <Modal
                    type="sidebar"
                    placement="right"
                    size="sm"
                    title={`Your cart (${cartQty})`}
                    footer={null}
                    isOpen={isCartOpen}
                    onClose={() => setIsCartOpen(false)}
                    trigger={
                      <div className="relative">
                        <Button
                          aria-label="Cart"
                          onClick={() => setIsCartOpen(true)}
                          icon="ShoppingCart"
                          iconWidth="18"
                          iconHeight="18"
                          iconStrokeWidth="2"
                          variant="outline"
                          iconStroke={isScrolled ? "var(--primary)" : "var(--white)"}
                          version="icon"
                          bg={isScrolled ? "var(--primary)" : "none"}
                          className="border-primary rounded-30 p-12 relative"
                        />
                        {cartQty > 0 && (
                          <p
                            className="bg-primary flex items-center justify-center rounded-full text-white absolute"
                            style={{
                              top: '-8px',
                              right: '-8px',
                              width: '24px',
                              height: '24px',
                              fontSize: '10px'
                            }}
                          >
                            {cartQty}
                          </p>
                        )}
                      </div>
                    }
                  >
                    <div className="grid-cols-1 items-start gap-12 pb-20 h-400 overflow-auto">
                      {cartItems.length > 0 ? (
                        <div className="grid-cols-1 gap-12 mt-10">
                          {cartItems.map((item) => (
                            <div key={item.id} className="flex gap-12 items-center relative pb-20 bordb">
                              <div className="w-35 h-100px rounded-5 overflow-hidden">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  className="flex w-full h-full object-cover"
                                />
                              </div>
                              <div className="w-65">
                                <p className="mini-text text-gray font-400">{item.category}</p>
                                <h4 className="headmini-text text-dark font-600">{item.name}</h4>

                                <div className="flex items-center justify-between mt-5">
                                  <Fields
                                    type="quantity"
                                    value={item.quantity}
                                    onChange={(val) => setExactQuantity(item.id, val)}
                                  />

                                  <p className="mini-text text-dark font-600">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                              <Icon
                                name="Close"
                                width="16"
                                height="16"
                                stroke="var(--danger)"
                                onClick={() => removeFromCart(item.id)}
                                className="absolute top-0 right-0 z-20 cursor-pointer"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-80 text-center bg-forth">
                          <p className="small-text text-dark font-500 capitalize">Your cart is currently empty.</p>
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
                              setIsCartOpen(false);
                              navigate('/product-detail');
                            }}
                            version="v3"
                            bg="tertiary"
                            color="dark"
                            className="rounded-30 font-500"
                          />

                          <Button
                            text="Send Enquiry"
                            onClick={() => alert('Proceeding to checkout...')}
                            version="v3"
                            bg="dark"
                            color="white"
                            className="rounded-30 font-500"
                          />
                        </div>
                      </div>
                    </div>
                  </Modal>
                )}

                <Button
                  text="Get In Touch"
                  onClick={() => navigate("/connect")}
                  icon="ArrowUpRight"
                  iconPosition="right"
                  iconWidth="16"
                  iconHeight="16"
                  version="v2"
                  className="rounded-20"
                />
              </div>

              <Button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-label="Toggle Navigation Menu"
                className="hidden md-flex sm-flex"
                icon={isMobileOpen ? "Close" : "Menu"}
                iconWidth="28"
                iconHeight="28"
                iconStroke={(isScrolled || isMobileOpen) ? "#161616" : "#FFFFFF"}
                version="icon"
                bg="transparent"
              />
            </div>
          </div>
        </Container>

        {mobileMenu}
      </div>
    </Container>
  );
};

export default Header;