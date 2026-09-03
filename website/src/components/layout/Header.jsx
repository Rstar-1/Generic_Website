import { useState, useEffect, useMemo } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Container from "../common/Container";
import Image from "../common/Image";
import Icon from "../common/Icon";
import Button from "../common/Button";
import Modal from "../common/Modal";
import { header } from "../../utils/apiData";
import { resolveImagePath } from "../../utils/imageResolver";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [cartQty, setCartQty] = useState(1);

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
        <div className="px-8">
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
        <Container version="v0" className="sm-hidden md-hidden bg-primary">
          <div className="px-12 py-10">
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

        {/* Main Header Nav */}
        <div className="container2 mx-auto">
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
                <Modal
                  type="sidebar"
                  placement="right"
                  size="sm"
                  title={`Your cart (${cartQty})`}
                  footer={null}
                  trigger={
                    <Button
                      aria-label="Cart"
                      icon="ShoppingCart"
                      iconWidth="18"
                      iconHeight="18"
                      iconStrokeWidth="2"
                      variant="outline"
                      iconStroke={isScrolled ? "var(--primary)" : "var(--white)"}
                      version="icon"
                      bg={isScrolled ? "var(--primary)" : "none"}
                      className="border-primary rounded-30 p-12"
                    />
                  }
                >
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%', paddingBottom: '10px' }}>
                    {/* Top Free Shipping Notice */}
                    <div
                      style={{
                        backgroundColor: '#1E40AF',
                        color: '#FFFFFF',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: '600',
                        textAlign: 'center',
                        marginBottom: '20px'
                      }}
                    >
                      ✌️ Free Express Shipping on orders $500!
                    </div>

                    {/* Progress Bar */}
                    <div style={{ marginBottom: '24px' }}>
                      <p style={{ fontSize: '14px', fontWeight: '500', color: '#0F172A', marginBottom: '8px' }}>
                        Spend <span style={{ color: '#059669', fontWeight: '700' }}>$435.00</span> more to reach free shipping!
                      </p>
                      <div style={{ width: '100%', height: '6px', backgroundColor: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: '20%', height: '100%', backgroundColor: '#059669', borderRadius: '4px' }} />
                      </div>
                    </div>

                    {/* Cart Item Row */}
                    {cartQty > 0 ? (
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '12px', backgroundColor: '#F3F4F6', overflow: 'hidden', flexShrink: 0 }}>
                          <Image
                            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=200&q=80"
                            alt="Grind Vessel"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>

                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A', margin: 0 }}>Grind Vessel</h4>
                            <button
                              onClick={() => setCartQty(0)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', fontSize: '16px', padding: 0 }}
                            >
                              ×
                            </button>
                          </div>
                          <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 12px 0' }}>Navy Blue</p>

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #E2E8F0', borderRadius: '20px', padding: '2px 10px', gap: '12px' }}>
                              <button
                                onClick={() => setCartQty(Math.max(1, cartQty - 1))}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#0F172A' }}
                              >
                                −
                              </button>
                              <span style={{ fontSize: '13px', fontWeight: '600' }}>{cartQty}</span>
                              <button
                                onClick={() => setCartQty(cartQty + 1)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#0F172A' }}
                              >
                                +
                              </button>
                            </div>

                            <span style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>
                              ${(65 * cartQty).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div style={{ padding: '40px 0', textAlign: 'center', color: '#64748B' }}>
                        <p style={{ fontSize: '14px' }}>Your cart is currently empty.</p>
                      </div>
                    )}

                    {/* Pair Well With */}
                    <div style={{ marginTop: '24px', marginBottom: '20px' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '12px' }}>Pair Well With</h4>
                      <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
                        {[
                          { name: 'Ceramic Mug', price: '$24.00', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=150&q=80' },
                          { name: 'Wooden Spoon', price: '$12.00', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=150&q=80' }
                        ].map((item, idx) => (
                          <div key={idx} style={{ minWidth: '140px', backgroundColor: '#F8FAFC', borderRadius: '12px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div style={{ height: '80px', borderRadius: '8px', overflow: 'hidden' }}>
                              <Image src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <span style={{ fontSize: '12px', fontWeight: '600', color: '#0F172A' }}>{item.name}</span>
                            <span style={{ fontSize: '12px', color: '#059669', fontWeight: '700' }}>{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer Drawer Action Bar */}
                    <div style={{ marginTop: 'auto', borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                        {['Order Note >', 'Estimate Shipping >', 'Coupon >'].map((label, idx) => (
                          <span
                            key={idx}
                            style={{
                              backgroundColor: '#F1F5F9',
                              borderRadius: '20px',
                              padding: '6px 14px',
                              fontSize: '12px',
                              fontWeight: '600',
                              color: '#0F172A',
                              cursor: 'pointer'
                            }}
                          >
                            {label}
                          </span>
                        ))}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <div>
                          <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A', margin: 0 }}>Estimated total</h4>
                          <p style={{ fontSize: '11px', color: '#64748B', margin: '2px 0 0 0' }}>Taxes and shipping calculated at checkout</p>
                        </div>
                        <span style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>
                          ${(65 * cartQty).toFixed(2)} USD
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                          onClick={() => navigate('/product-detail')}
                          style={{
                            flex: 1,
                            backgroundColor: '#F1F5F9',
                            color: '#0F172A',
                            borderRadius: '30px',
                            padding: '12px 20px',
                            fontSize: '14px',
                            fontWeight: '700',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          View Cart
                        </button>

                        <button
                          onClick={() => alert('Proceeding to checkout...')}
                          style={{
                            flex: 1,
                            backgroundColor: '#000000',
                            color: '#FFFFFF',
                            borderRadius: '30px',
                            padding: '12px 20px',
                            fontSize: '14px',
                            fontWeight: '700',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          Check Out
                        </button>
                      </div>
                    </div>
                  </div>
                </Modal>

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
        </div>

        {mobileMenu}
      </div>
    </Container >
  );
};

export default Header;