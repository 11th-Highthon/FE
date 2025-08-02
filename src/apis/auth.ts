import { useMutation } from '@tanstack/react-query';
import { instance, setAuthToken } from './instance';
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from '../types/auth';

// 로그인 API
export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await instance.post<AuthResponse>('/users/login', data);
  return response.data;
};

// 회원가입 API
export const register = async (
  data: RegisterRequest
): Promise<AuthResponse> => {
  const response = await instance.post<AuthResponse>('/users/register', data);
  return response.data;
};

// 로그인 mutation hook
export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: data => {
      if (data.success && data.token) {
        setAuthToken(data.token);
        // 토큰을 localStorage에 저장
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
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
      if (data.success && data.token) {
        setAuthToken(data.token);
        // 토큰을 localStorage에 저장
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
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
  setAuthToken('');
};
