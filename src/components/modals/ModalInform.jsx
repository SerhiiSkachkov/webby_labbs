import React from 'react';
import Modal from './Modal';

import './Modal.sass';

const ModalInform = ({
    handleCancel,
    handleDelete,
    movie: { title, release, format, stars, key }
}) => {
    return (
        <Modal
            title={title}
            onCancel={handleCancel}
            onSubmit={() => handleDelete(key)}
            submitBtnText="Удалить"
        >
            <div>
                <div>Год: {release || 'не заполнено'}</div>
                <div>Формат: {format || 'не заполнено'}</div>
                <div>Актеры: {stars || 'не заполнено'}</div>
            </div>
        </Modal>
    );
};

export default ModalInform;
