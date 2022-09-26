import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import useService from '../service/Service';

const initialState = {
    workersList: [],
    workersListLoading: false,
    workersListError: false,
    workersListPage: 1,
    workersListLastPage: false,
    formStatus: 'idle',
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
    dispatch(formSending());
    addUser(data)
        .then(() => {
            dispatch(formSended())
            dispatch(workersListReset());
            dispatch(fetchWorkersList(1));
        })
        .catch(() => {
            dispatch(formSendingError())
        })
        .finally(() => {
            setTimeout(() => {
                dispatch(formStatusReset())
            }, 5000)
        })
        
}

const appSlice = createSlice({
    name: 'workersList',
    initialState,
    reducers: {
        workersListReset : (state) => {
            state.workersList = [];
            state.workersListPage = 1;
        },
        formStatusReset : (state) => {
            state.formStatus = 'idle'
        },
        formSending : (state) => {
            state.formStatus = 'sending'
        },
        formSended: (state) => {
            state.formStatus = 'success'
        },
        formSendingError : (state) => {
            state.formStatus = 'error'
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

export default appSlice.reducer;

export const {workersListReset, formSending, formSendingError, formSended, formStatusReset} = appSlice.actions;