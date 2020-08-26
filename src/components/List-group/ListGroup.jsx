import React from 'react';
import Loader from '../Loader/Loader';
import Alert from '../Alert/Alert';

import './ListGroup.sass';

const ListGroup = ({ onClick, items, isLoad }) => {
    if (isLoad) return <Loader />;

    return (
        <ul className="list-group">
            {items.length > 0 ? (
                items.map(item => (
                    <li
                        key={item.key}
                        className="list-group-item"
                        onClick={() => onClick(item.key)}
                    >
                        {item.title}
                    </li>
                ))
            ) : (
                <Alert className="alert alert-text-center alert-warning">
                    <p>Список пуст</p>
                </Alert>
            )}
        </ul>
    );
};

export default ListGroup;
