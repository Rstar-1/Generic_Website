import { useEffect, useRef } from 'react';

const Dropdown = ({
  isOpen,
  onClose,
  children,
  className = "",
  style = {},
  align = "left",
  minWidth = "210px",
  padding = "0",
  ...props
}) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !onClose) return;

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const baseStyle = {
    position: "absolute",
    top: "100%",
    [align]: 0,
    padding: padding,
    minWidth: minWidth,
    zIndex: 1000,
    ...style,
  };

  return (
    <div
      ref={dropdownRef}
      className={`bg-white ${className}`}
      style={baseStyle}
      {...props}
    >
      {children}
    </div>
  );
};

export default Dropdown;
