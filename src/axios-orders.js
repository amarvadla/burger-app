import axios from 'axios';

const instance = axios.create({
    baseURL : "https://react-burger-17b0e.firebaseio.com/"
});

export default instance;