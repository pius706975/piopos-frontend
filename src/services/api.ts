import axios from 'axios';
import { useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_AUTH_SERVICE_BASE_URL;

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.response.use(
    response => response,

    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const { data } = await axios.post(`${API_URL}/refresh-token`, {
                    refreshToken: localStorage.getItem('refreshToken'),
                });

                localStorage.setItem('accessToken', data.token.accessToken);

                originalRequest.headers.Authorization = `Bearer ${data.token.accessToken}`;

                return apiClient(originalRequest);
            } catch (error) {
                // console.log('Unable to refresh token', error);
                // window.location.href = '/sign-in';
            }
        }

        return Promise.reject(error);
    },
);

export const signIn = async (email: string, password: string) => {
    const response = await apiClient.post('/signin', { email, password });

    localStorage.setItem('accessToken', response.data.token.accessToken);
    localStorage.setItem('refreshToken', response.data.token.refreshToken);

    return response.data;
};

export const useAuth = () => {
    const refreshToken = async () => {
        try {
            const { data } = await axios.post(`${API_URL}/refresh-token`, {
                refreshToken: localStorage.getItem('refreshToken'),
            })

            localStorage.setItem('accessToken', data.token.accessToken);
        } catch (error) {
            console.log('Unable to refresh token', error);

            window.location.href = '/sign-in';
        }
    }

    useEffect(() => {
        refreshToken();

        const interval = setInterval(refreshToken, 13 * 60 * 1000);
        return () => clearInterval(interval);
    })
};

// Just for example of protected route that requires access token
export const fetchProtectedData = async () => {
    const response = await apiClient.get('/ednpointname', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });

    return response.data;
};
