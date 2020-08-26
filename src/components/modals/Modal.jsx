import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button/Button';

const modalRoot = document.getElementById('modal-root');

const Modal = ({
    title,
    onCancel,
    children,
    onSubmit,
    isDisabled,
    submitBtnText
}) => {
    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="modal-window">
                <div className="modal-header">
                    <h3 className="modal-title">{title}</h3>
                    <span className="modal-close" onClick={onCancel}>
                        &times;
                    </span>
                </div>
                <div className="modal-body">{children}</div>
                <div className="modal-footer">
                    <Button
                        className="btn btn-primary"
                        onClick={onSubmit}
                        disabled={isDisabled}
                    >
                        {submitBtnText}
                    </Button>
                </div>
            </div>
        </div>,
        modalRoot
    );
};

export default Modal;
