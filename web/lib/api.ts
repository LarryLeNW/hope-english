'use client';
import axios from 'axios';
import Cookies from 'js-cookie';

let isRefreshing = false;
let failedRequestsQueue = [];

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE,
    withCredentials: true,
});

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
            const originalRequest = error.config;
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedRequestsQueue.push({ resolve, reject });
                })
                    .then((access_token) => {
                        originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
                        return api(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            isRefreshing = true;

            try {
                const { data } = await api.post('auth/refresh');
                Cookies.set('access_token', data.access_token);
                failedRequestsQueue.forEach(({ resolve }) => resolve(data.access_token));
                failedRequestsQueue = [];
                originalRequest.headers['Authorization'] = `Bearer ${data.access_token}`;
                return api(originalRequest);
            } catch (refreshError) {
                Cookies.remove('access_token');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
);
