import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import useService from '../../service/Service';
import { useHttp } from "../../hooks/http.hook";

const initialState = {
    workersList: [],
    workersListLoading: false,
    workersListError: false,
    workersListPage: 1,
    workersListLastPage: false,
}

export const fetchWorkersList = createAsyncThunk(
    'workersList/fetchWorkerList',
    (page) => {
        const {getWorker} = useService();
        console.log(1)
        return getWorker(page);
    }
);

const workerListSlice = createSlice({
    name: 'workersList',
    initialState,
    reducers: {
        workersListReset : (state) => {
            state = initialState
        }
    },
    extraReducers: builder => {
        builder
        .addCase(fetchWorkersList.pending, (state) => {
            state.workersListLoading = true;
        }) 
        .addCase(fetchWorkersList.fulfilled, (state, {payload}) => {
            state.workersList = [...state.workersList, ...payload.users];
            state.workersListPage = state.workersListPage + 1;
            state.ListLastPage = !payload.links.next_url;
            state.workersListLoading = false;
        })
        .addCase(fetchWorkersList.rejected, (state) => {
            state.workersListLoading = false;
            state.workersListError = true
        })
        .addDefaultCase(() => {}) 
    }
})

export default workerListSlice.reducer;

export const {workersListReset} = workerListSlice.actions;