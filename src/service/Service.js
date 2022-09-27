import {useHttp} from '../hooks/http.hook'

const useService = () => {
    const {request} = useHttp();

    const _apiBase = 'https://frontend-test-assignment-api.abz.agency/api/v1';


    const getWorkers = async (page = 1) => {
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

    const addUser = async ({position_id, name, email, phone, photo}) => {

        const token = await getToken();

		const formData = new FormData();
		formData.append('position_id', +position_id);
		formData.append('name', name);
		formData.append('email', email);
		formData.append('phone', `+${phone}`);
		formData.append('photo', photo);

        const res = await request(`${_apiBase}/users`, 'POST', formData, {'Token': token})
        return res;
    }


    return {getWorkers, getToken, addUser, getPosition};
}


export default useService;