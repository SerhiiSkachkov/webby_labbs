import React, { useState } from 'react';
import FormField from '../Form-field/FormField';
import Modal from './Modal';

import { setFileMovie } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';

import './Modal.sass';

const ModalCreateExport = ({ handleCancel }) => {
    const dispatch = useDispatch();

    const [fileData, setFileData] = useState(null);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(setFileMovie(fileData));
        handleCancel();
    };

    const handleLoadFile = e => {
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = e => {
            const PROPS = {
                Title: 'title',
                Format: 'format',
                Stars: 'stars',
                'Release Year': 'release'
            };

            const formatData = e.target.result.split('\n\r').map(n => {
                const data = n.split(/\n/).filter(Boolean);
                const obj = {};

                for (const str of data) {
                    const [key, value] = str.split(': ');

                    obj[PROPS[key]] = value;
                }
                return obj;
            });
            setFileData(formatData);
        };
        reader.readAsText(e.target.files[0]);
    };

    return (
        <Modal
            title="Создайте заметку из вашего файла."
            onCancel={handleCancel}
            onSubmit={handleSubmit}
            isDisabled={!fileData}
            submitBtnText="Отправить"
        >
            <ul>
                <li>1.Фаил должен содержать расширене .txt.</li>
                <li>
                    2. Иметь 4 обязательных поля Title, Release Year, Format,
                    Stars.
                </li>
                <li>
                    3. Каждая отдельная информация о фильме разделяется
                    дополнительным переводом строки "Enter".
                </li>
                <li>4.В случае отстутствия информации оставте пробел.</li>
            </ul>

            <form onSubmit={handleSubmit}>
                <FormField
                    classNameLabel="form-field-label--file"
                    classNameControl="form-field-control--file"
                    id="fileExport"
                    label={
                        <>
                            <FontAwesomeIcon icon={faFileExport} size="lg" />
                            Загрузить
                        </>
                    }
                    type="file"
                    onChange={handleLoadFile}
                />
            </form>
        </Modal>
    );
};

export default ModalCreateExport;
