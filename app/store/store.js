'use client';

import { configureStore  } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
// import movieReducer from './movie/movieReducer';
// import movieSlice from "./movieSlice";
// import { createWrapper } from "next-redux-wrapper";

export const store = () => configureStore({ 
    reducer: rootReducer
 });

// export const wrapper = createWrapper(store);