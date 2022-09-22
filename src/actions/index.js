export const fetchWorker = (request, offset) => (dispatch) => {
    request(offset)
        .then(data => {
            dispatch(newWorkersLoaded(data));
        })
}



export const newWorkersLoaded = (workers) => {
    return {
        type : 'NEW_WORKERS_LOADED',
        payload: workers
    }
}

export const resetPageParams = () => {
    return {
        type : 'RESET_PAGE_PARAMS',
    }
}

export const workerListEnded = () => {
    return {
        type : 'WORKER_LIST_ENDED',
    }
}

