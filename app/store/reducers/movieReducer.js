'use client';

import { createReducer, createSlice } from '@reduxjs/toolkit';

const initialState = {
    movies: [],
    allMovies: [],
    pageNo: 1,
};

export default function movieReducer(state = initialState, action) {
  switch (action.type) {
    case 'searchMovies':
        // case insensitive and whitespace ignoring
        const regex = new RegExp(action.payload.replace(/\s/g, '\\s*'), 'i');
        let updatedMovies = [...state.allMovies.filter((mv) => regex.test(mv.name))];
      return { ...state, movies: updatedMovies };
    case 'getMovies':{
        let updatedMovies = state.pageNo !== 1 ? [...state.allMovies, ...action.payload] : [...action.payload];
        return { ...state, movies: updatedMovies, allMovies: updatedMovies };
    }
    case 'pageCounter': {
        let updatedPageNo = state.pageNo + 1;
        return { ...state, pageNo: updatedPageNo };
    }
    default:
      return state;
  }
}

// export const movieSlice = createSlice({
//     name: "counter",
//     initialState,
//     reducers: {
//         searchMovies: (state, action) => {
//             const regex = new RegExp(action.payload);
//             state.movies = [...state.movies.filter((mv) => regex.test(mv.name))];
//             return {...state};
//         },
//         getMovies: (state, action) => {
//             state.movies = [...state.movies, ...action.payload];
//             return {...state};
//         },
//     }
// });

// export const { searchMovies, getMovies } = movieSlice.actions;
// export default movieSlice.reducer;

