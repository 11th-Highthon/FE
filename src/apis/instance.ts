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

// 요청 인터셉터 - 모든 요청에 토큰 포함 보장
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auth_token');
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 401 오류 시 토큰 클리어
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      clearAuthToken();
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      // 로그인 페이지로 리디렉션할 수도 있음
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
