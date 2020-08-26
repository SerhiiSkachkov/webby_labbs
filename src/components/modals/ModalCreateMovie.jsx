import React, { useState } from 'react';
import Modal from './Modal';
import FormField from '../Form-field/FormField';
import { setMovie } from '../../redux/actions';
import { useDispatch } from 'react-redux';

import './Modal.sass';

const INITIAL_STATE = {
    title: '',
    release: '',
    stars: '',
    format: ''
};

const ModalCreateMovie = ({ handleCancel }) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleFieldChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleReset = () => setFormData(INITIAL_STATE);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(setMovie(formData, handleReset));
        handleCancel();
    };

    const { title, format, stars, release } = formData;

    const isDisabled =
        !title.trim() || !release.trim() || !stars.trim() || !format.trim();

    return (
        <Modal
            title="Создайте заметку"
            onCancel={handleCancel}
            onSubmit={handleSubmit}
            isDisabled={isDisabled}
            submitBtnText="Создать"
        >
            <form onSubmit={handleSubmit}>
                <FormField
                    label="Фильм"
                    name="title"
                    value={title}
                    type="text"
                    handleFieldChange={handleFieldChange}
                />
                <FormField
                    label="Год"
                    name="release"
                    type="number"
                    value={release}
                    handleFieldChange={handleFieldChange}
                />
                <FormField
                    label="Формат"
                    name="format"
                    type="text"
                    value={format}
                    handleFieldChange={handleFieldChange}
                />
                <FormField
                    label="Актеры"
                    name="stars"
                    type="textarea"
                    value={stars}
                    rows="5"
                    handleFieldChange={handleFieldChange}
                />
            </form>
        </Modal>
    );
};

export default ModalCreateMovie;
