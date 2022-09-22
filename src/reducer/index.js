const initialState = {
    workersList: [],
    workersListPage: 1,
    ListLastPage: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEW_WORKERS_LOADED': 
            return {
                ...state,
                workersList: [...state.workersList, ...action.payload.users],
                workersListPage: state.workersListPage + 1,
                ListLastPage: !action.payload.links.next_url
            } 
        case 'RESET_PAGE_PARAMS': 
            return {
                ...state,
                workersListPage: 1,
                workersList: []
            }                
        default: return state
        
    }
}

export default reducer;