import { configureStore } from '@reduxjs/toolkit';

import appReducer from '../slices/appSlice';

const store = configureStore({
    reducer : {
        app : appReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;    