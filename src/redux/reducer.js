import {
    GET_MOVIES,
    DELETE_MOVIE,
    SET_MOVIE,
    SET_SORT,
    SET_SEARCH
} from './types';

const initialState = {
    isLoad: true,
    error: false,
    moviesSearchList: null,
    moviesList: []
};

export const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_MOVIES:
            return {
                ...state,
                isLoad: false,
                moviesList: payload.movies
            };

        case SET_MOVIE:
            return {
                ...state,
                moviesList: [...state.moviesList, payload.movie]
            };

        case SET_SEARCH:
            return {
                ...state,
                moviesSearchList: state.moviesList.filter(movie =>
                    movie[payload.tag].includes(payload.value)
                )
            };

        case SET_SORT:
            return {
                ...state,
                moviesList: state.moviesList.sort((a, b) =>
                    a[payload] > b[payload] ? 1 : -1
                )
            };

        case DELETE_MOVIE:
            return {
                ...state,
                moviesList: state.moviesList.filter(
                    m => m.key !== payload.movieKey
                )
            };

        default:
            return state;
    }
};
