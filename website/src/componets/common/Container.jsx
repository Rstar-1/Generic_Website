const VERSION_CLASSES = {
    v0: "w-full",
    v1: "container mx-auto",
    v2: "container2",
    v3: "container3 mx-auto",
};

const Container = ({
    children,
    version = "v2",
    className = "",
    style = {},
    as: Component = "section",
    ...props
}) => {
    const containerClass = VERSION_CLASSES[version] || "w-full";

    return (
        <Component style={style} {...props}>
            <div className={`${containerClass} ${className}`}>
                {children}
            </div>
        </Component>
    );
};

export default Container;
