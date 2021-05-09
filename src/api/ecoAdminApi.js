import axios from 'axios';

export default axios.create({
    baseURL: process.env.REACT_APP_ECO_ADMIN_API_URL,
});