import React from 'react';

import './Alert.sass';

const Alert = ({ onClose, children, className }) => {
    return (
        <div className={className}>
            {children}
            {onClose && (
                <button type="button" className="alert-close" onClick={onClose}>
                    <span>&times;</span>
                </button>
            )}
        </div>
    );
};

export default Alert;
