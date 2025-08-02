import axios from 'axios';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// 토큰 관리
let authToken: string | null = null;

export const setAuthToken = (token: string) => {
  authToken = token;
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearAuthToken = () => {
  authToken = null;
  delete instance.defaults.headers.common['Authorization'];
};

export const getAuthToken = () => authToken;

// 토큰 초기화 (앱 시작시 localStorage에서 복원)
export const initializeAuth = () => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    setAuthToken(token);
  }
};

// 응답 인터셉터 - 401 오류 시 토큰 클리어
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      clearAuthToken();
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);
