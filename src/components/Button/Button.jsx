import React from 'react';

import './Button.sass';

const Button = ({
    children,
    onClick,
    className,
    disabled,
    active,
    invert,
    ...attrs
}) => {
    const Tag = attrs.href ? 'a' : 'button';

    return (
        <Tag
            className={className}
            disabled={disabled}
            onClick={onClick}
            {...attrs}
        >
            {children}
        </Tag>
    );
};

export default Button;
