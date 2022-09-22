import { configureStore } from '@reduxjs/toolkit';

import workersListReducer from '../components/workersList/workerListSlice';

const store = configureStore({
    reducer: {
        workersList: workersListReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;    