import {useHttp} from '../hooks/http.hook'

const useService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://frontend-test-assignment-api.abz.agency/api/v1';


    const getWorker = async (page = 1) => {
        const res = await request(`${_apiBase}/users?page=${page}&count=6`);
        return  res;
    }

    const getToken = async () => {
        const res = await request(`${_apiBase}/token`);
        return res.token;
    }

    const getPosition = async () =>{
        const res = await request(`${_apiBase}/positions`);
        return res.positions;
    }

    const addUser = async (method , body, headers) => {
        const res = await request(`${_apiBase}/users`, method, body, headers)
        return res;
    }


    return {loading, error, clearError, getWorker, getToken, addUser, getPosition};
}


export default useService;