import React from 'react';
import classNames from 'classnames';

import './FormField.sass';

const FormField = ({
    id,
    type,
    label,
    name,
    classNameControl,
    classNameLabel,
    classNameWrapper,
    handleFieldChange,
    ...attrs
}) => {
    return (
        <div className={classNames('form-field-wrapper', classNameWrapper)}>
            {label && (
                <label
                    className={classNames('form-field-label', classNameLabel)}
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            {type === 'textarea' ? (
                <textarea
                    className={classNames(
                        'form-field-control',
                        classNameControl
                    )}
                    id={id}
                    name={name}
                    {...attrs}
                    onChange={e => handleFieldChange(e)}
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    name={name}
                    onChange={e => handleFieldChange(e)}
                    className={classNames(
                        'form-field-control',
                        classNameControl
                    )}
                    {...attrs}
                />
            )}
        </div>
    );
};

export default FormField;
