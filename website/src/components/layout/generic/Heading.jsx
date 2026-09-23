import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../common/Icon';
import Badge from '../../common/Badge';

const Heading = ({
    version = "v1",
    tag = "WHAT WE PROVIDE",
    tagIcon = "Settings",
    title = "Navigating Tech Landscapes With Confidence.",
    subtitle,
    actionText,
    actionLink,
    onActionClick,
    actionIcon = "ArrowRight",
    align = "center",
    className = "",
    tagProps = {}
}) => {
    const navigate = useNavigate();

    const handleActionClick = useCallback(() => {
        if (onActionClick) onActionClick();
        else if (actionLink) navigate(actionLink);
    }, [onActionClick, actionLink, navigate]);

    const renderTag = useCallback((extraClass = "") => tag ? (
        <Badge
            text={tag}
            icon={tagIcon}
            iconSize={14}
            iconColor="var(--primary)"
            iconClassName="text-primary"
            variant="outline"
            color="white"
            shape="pill"
            size="md"
            capitalize={false}
            className={`font-600 uppercase mb-8 border-ec ${extraClass}`}
            {...tagProps}
        />
    ) : null, [tag, tagIcon, tagProps]);

    const renderedHeading = useMemo(() => {
        switch (version) {
            case "v2":
                return (
                    <div className={`w-full ${className}`}>
                        {renderTag()}
                        <div className="flex sm-grid-cols-1 items-center justify-between gap-12">
                            <div>
                                {title && <h2 className="text-dark font-600 head-text capitalize">{title}</h2>}
                                {subtitle && <p className="small-text text-gray mt-4">{subtitle}</p>}
                            </div>
                            {actionText && (
                                <p
                                    onClick={handleActionClick}
                                    className="text-dark font-600 small-text flex items-center gap-4 cursor-pointer hover-primary"
                                >
                                    {actionText}
                                    {actionIcon && <Icon name={actionIcon} width="18" height="18" />}
                                </p>
                            )}
                        </div>
                    </div>
                );

            case "v1":
            default:
                return (
                    <div className={`w-full ${align === 'center' ? 'text-center' : ''} ${className}`}>
                        {tag && (
                            <div className={align === 'center' ? 'justify-center flex' : 'flex'}>
                                {renderTag()}
                            </div>
                        )}
                        {title && (
                            <h2 className={`text-dark font-600 large-text uppercase ${align === 'center' ? 'w-80 sm-w-full mx-auto' : ''}`}>
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className={`small-text text-gray mt-8 ${align === 'center' ? 'mx-auto w-60' : ''}`}>
                                {subtitle}
                            </p>
                        )}
                    </div>
                );
        }
    }, [version, tag, title, subtitle, actionText, actionIcon, align, className, handleActionClick, renderTag]);

    return renderedHeading;
};

export default Heading;