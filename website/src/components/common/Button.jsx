import Icon from "./Icon";

const VERSION_CLASSES = {
    v0: "px-16 py-4 sm-px-12 sm-py-4 mini-text",
    v1: "px-20 py-9 para-text",
    v2: "px-19 py-8 sm-px-10 sm-py-7 small-text",
    v3: "w-full py-9 sm-py-12 small-text",
    icon: "p-8",
    none: "",
};

const Button = ({
    text = "",
    children,
    version = "v1",
    bg = "primary",
    color = "white",
    className = "",
    style = {},
    onClick = () => { },
    type = "button",
    disabled = false,
    variant = "filled",
    icon = "",
    iconWidth = "16",
    iconHeight = "16",
    iconStrokeWidth = "2.5",
    iconPosition = "left",
    iconFill,
    iconStroke,
    ...props
}) => {
    const borderClass = variant === "outline" ? (bg.startsWith('#') || bg.startsWith('rgb') ? "" : `border-${bg}`) : "border-0";
    const bgClass = variant === "outline" ? "bg-transparent" : (bg.startsWith('#') || bg.startsWith('rgb') ? "" : `bg-${bg}`);
    const textClass = variant === "outline" ? (bg.startsWith('#') || bg.startsWith('rgb') ? "" : `text-${bg}`) : (color.startsWith('#') || color.startsWith('rgb') ? "" : `text-${color}`);

    const versionClass = VERSION_CLASSES[version] || "w-full py-7 small-text";
    const buttonClass = `${versionClass} rounded-5 ${borderClass}`;

    const defaultStroke = iconStroke || style.color || (variant === "outline" ? "currentColor" : color);

    const iconElement = icon && (
        <Icon
            name={icon}
            width={iconWidth}
            height={iconHeight}
            strokeWidth={iconStrokeWidth}
            stroke={defaultStroke}
            fill={iconFill}
        />
    );

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${buttonClass} ${bgClass} ${textClass} ${disabled ? "opacity-50" : "cursor-pointer"} ${className}`}
            style={{ ...style, ...(disabled ? { cursor: 'not-allowed' } : {}) }}
            {...props}
        >
            {icon ? (
                (children || text) ? (
                    <span className="flex items-center justify-center gap-8 w-full">
                        {iconPosition !== "right" && iconElement}
                        <span>{children || text}</span>
                        {iconPosition === "right" && iconElement}
                    </span>
                ) : (
                    iconElement
                )
            ) : (
                children || text
            )}
        </button>
    );
};

export default Button;