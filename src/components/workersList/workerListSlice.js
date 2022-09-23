import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import useService from '../../service/Service';

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
        const {getWorkers} = useService();
        return getWorkers(page);    
    },
);

export const addNewUser = (data) => (dispatch) => {
    const {addUser} = useService();
    addUser(data)
        .then(() => {
            dispatch(workersListReset())
        })
        .then(() => {
            dispatch(fetchWorkersList(1))
        })	
}

const workerListSlice = createSlice({
    name: 'workersList',
    initialState,
    reducers: {
        workersListReset : (state) => {
            state.workersList = [];
            state.workersListPage = 1;
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
            state.workersListLastPage = !payload.links.next_url;
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