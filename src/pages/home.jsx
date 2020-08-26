import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileExport,
    faPlusSquare,
    faSearch
} from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';

import Button from '../components/Button/Button';
import FormField from '../components/Form-field/FormField';
import ListGroup from '../components/List-group/ListGroup';
import Pagination from '../components/Pagination/Pagination';
import ModalInform from '../components/modals/ModalInform';
import ModalCreateMovie from '../components/modals/ModalCreateMovie';
import ModalCreateExport from '../components/modals/ModalCreateExport';

import { getMovies, deleteMovie, setSort, setSearch } from '../redux/actions';

const movieSelector = state => ({
    moviesList: state.moviesList,
    moviesSearchList: state.moviesSearchList,
    isLoad: state.isLoad
});

const OPTIONS = [
    { value: 'key', label: 'Выкл' },
    { value: 'title', label: 'Имя' },
    { value: 'stars', label: 'Актеры' }
];

const OPTIONS_SEARCH = [
    { value: 'title', label: 'Имя' },
    { value: 'stars', label: 'Актеры' }
];

const PER_PAGE = 10;

const Home = () => {
    const dispatch = useDispatch();

    const { moviesList, isLoad, moviesSearchList } = useSelector(movieSelector);

    const [movie, setMovie] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [searchTag, setSearchTag] = useState('title');
    const [currentPage, setCurrentPage] = useState(1);
    const [showCreateMovieModal, setShowCreateMovieModal] = useState(false);
    const [showFileExportModal, setShowFileExportModal] = useState(false);

    useEffect(() => {
        dispatch(getMovies());
    }, []);

    const indexOfLastPost = currentPage * PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - PER_PAGE;
    const currentPosts = (moviesSearchList || moviesList).slice(
        indexOfFirstPost,
        indexOfLastPost
    );

    const handleModalOpen = key =>
        setMovie(moviesList.find(m => m.key === key));

    const handleDeleteMovie = movieKey =>
        dispatch(deleteMovie(movieKey, () => setMovie(null)));

    const handlePaginate = pageNumber => setCurrentPage(pageNumber);

    const handleSelectSortChange = selectedOption => {
        dispatch(setSort(selectedOption.value));
    };

    const handleSearchSubmit = () => {
        setCurrentPage(1);
        dispatch(setSearch(searchValue, searchTag));
    };

    return (
        <div className="wrapper">
            <div className="search-form">
                <FormField
                    type="search"
                    placeholder="Search"
                    classNameWrapper="search-form-field-wrapper"
                    onChange={e => setSearchValue(e.target.value)}
                />

                <Select
                    defaultValue={OPTIONS_SEARCH[0]}
                    placeholder="Поиск"
                    classNamePrefix="search-form-select"
                    isSearchable={false}
                    onChange={e => setSearchTag(e.value)}
                    options={OPTIONS_SEARCH}
                />

                <Button
                    className="btn btn-primary"
                    type="submit"
                    onClick={handleSearchSubmit}
                >
                    <FontAwesomeIcon icon={faSearch} />
                </Button>
            </div>

            <div className="page-controls">
                <div className="page-controls-wrapper">
                    <Select
                        defaultValue={OPTIONS[0]}
                        placeholder="Cортировка"
                        classNamePrefix="page-controls-select"
                        isSearchable={false}
                        onChange={handleSelectSortChange}
                        options={OPTIONS}
                    />

                    <Button
                        className="btn btn-primary"
                        onClick={() => setShowFileExportModal(true)}
                    >
                        <FontAwesomeIcon icon={faFileExport} />
                    </Button>

                    <Button
                        className="btn btn-primary"
                        onClick={() => setShowCreateMovieModal(true)}
                    >
                        <FontAwesomeIcon icon={faPlusSquare} />
                    </Button>
                </div>
            </div>

            <ListGroup
                isLoad={isLoad}
                items={currentPosts}
                onClick={handleModalOpen}
            />

            <Pagination
                currentPage={currentPage}
                perPage={PER_PAGE}
                total={moviesSearchList || moviesList}
                onClick={handlePaginate}
            />

            {movie && (
                <ModalInform
                    handleCancel={() => setMovie(null)}
                    handleDelete={handleDeleteMovie}
                    movie={movie}
                />
            )}
            {showCreateMovieModal && (
                <ModalCreateMovie
                    handleCancel={() => setShowCreateMovieModal(false)}
                />
            )}
            {showFileExportModal && (
                <ModalCreateExport
                    handleCancel={() => setShowFileExportModal(false)}
                />
            )}
        </div>
    );
};

export default Home;
