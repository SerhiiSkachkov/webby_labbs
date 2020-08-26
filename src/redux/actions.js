import {
    GET_MOVIES,
    SET_MOVIE,
    DELETE_MOVIE,
    SET_SORT,
    SET_SEARCH
} from './types';

const { REACT_APP_FIREBASE_URL } = process.env;

export const getMovies = () => {
    return async dispatch => {
        try {
            const response = await fetch(
                `${REACT_APP_FIREBASE_URL}/movies_information.json`
            );
            const movies = await response.json();

            dispatch({
                type: GET_MOVIES,
                payload: {
                    movies: Object.entries(movies).map(([key, movie]) => ({
                        ...movie,
                        key
                    }))
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
};

export const setSort = sort => {
    return { type: SET_SORT, payload: sort };
};

export const setSearch = (value, tag) => {
    return {
        type: SET_SEARCH,
        payload: {
            value,
            tag
        }
    };
};

export const setMovie = (movie, resetForm) => {
    return async dispatch => {
        const response = await fetch(
            `${REACT_APP_FIREBASE_URL}/movies_information.json`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            }
        );
        const { name } = await response.json();

        dispatch({
            type: SET_MOVIE,
            payload: { movie: { ...movie, key: name } }
        });
        resetForm();
    };
};

export const setFileMovie = movies => {
    return async dispatch => {
        for (let movie of movies) {
            const response = await fetch(
                `${REACT_APP_FIREBASE_URL}/movies_information.json`,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(movie)
                }
            );
            const { name } = await response.json();

            dispatch({
                type: SET_MOVIE,
                payload: { movie: { ...movie, key: name } }
            });
        }
    };
};

export const deleteMovie = (movieKey, closeModal) => {
    return async dispatch => {
        const response = await fetch(
            `${REACT_APP_FIREBASE_URL}/movies_information/${movieKey}.json`,
            {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );

        await response.json();
        dispatch({
            type: DELETE_MOVIE,
            payload: { movieKey }
        });
        closeModal();
    };
};
