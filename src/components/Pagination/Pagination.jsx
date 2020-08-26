import React from 'react';
import classNames from 'classnames';

import './Pagination.sass';

const Pagination = ({ perPage, total, onClick, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(total.length / perPage); i++) {
        pageNumbers.push(i);
    }

    if (pageNumbers.length === 1) return null;

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="pagination-item">
                        <button
                            onClick={() => onClick(number)}
                            className={classNames(
                                'pagination-link',
                                number === currentPage && 'active'
                            )}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
