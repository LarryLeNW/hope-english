'use client'
import axios from 'axios'
import Cookies from 'js-cookie';

export const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_BASE, withCredentials: true })
api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            try {
                const { data } = await api.post('auth/refresh');
                Cookies.set('access_token', data.access_token);
                error.config.headers['Authorization'] = `Bearer ${data.access_token}`;
                return api(error.config);
            } catch (refreshError) {
                Cookies.remove('access_token');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);