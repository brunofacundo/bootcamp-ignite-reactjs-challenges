import axios from 'axios';

export const api = axios.create();

api.interceptors.response.use(
    ({ data }) => data,
    error => {
        const message = error?.response?.data?.message || 'Ocorreu um erro';
        return Promise.reject(new Error(message));
    }
);
