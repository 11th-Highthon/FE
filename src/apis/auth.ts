import { useMutation } from '@tanstack/react-query';
import { instance, setAuthToken, clearAuthToken } from './instance';
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from '../types/auth';

// 로그인 API
export const login = async (data: LoginRequest): Promise<any> => {
  const response = await instance.post('/users/login', data);
  return response.data;
};

// 회원가입 API
export const register = async (data: RegisterRequest): Promise<any> => {
  const response = await instance.post('/users/register', data);
  return response.data;
};

// 로그인 mutation hook
export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: data => {
      // 다양한 응답 구조에 대응
      let token = null;
      let user = null;

      if (data.token) {
        token = data.token;
        user = data.user || data;
      } else if (data.data && data.data.token) {
        token = data.data.token;
        user = data.data.user || data.data;
      } else if (data.accessToken) {
        token = data.accessToken;
        user = data;
      }

      if (token) {
        setAuthToken(token);
        localStorage.setItem('auth_token', token);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }
      }
    },
    onError: error => {
      console.error('로그인 실패:', error);
    },
  });
};

// 회원가입 mutation hook
export const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: data => {
      // 다양한 응답 구조에 대응
      let token = null;
      let user = null;

      if (data.token) {
        token = data.token;
        user = data.user || data;
      } else if (data.data && data.data.token) {
        token = data.data.token;
        user = data.data.user || data.data;
      } else if (data.accessToken) {
        token = data.accessToken;
        user = data;
      }

      if (token) {
        setAuthToken(token);
        localStorage.setItem('auth_token', token);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }
      }
    },
    onError: error => {
      console.error('회원가입 실패:', error);
    },
  });
};

// 로그아웃 함수
export const logout = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
  clearAuthToken();
};
