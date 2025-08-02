import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components';
import { useLogin, useRegister } from '../apis';
import type { LoginRequest, RegisterRequest } from '../types';

export const Login = () => {
  const navigate = useNavigate();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState<
    LoginRequest & { username?: string }
  >({
    email: '',
    password: '',
    username: '',
  });

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (isRegisterMode) {
        // 회원가입
        if (!formData.username || !formData.email || !formData.password) {
          alert('모든 필드를 입력해주세요.');
          return;
        }

        const registerData: RegisterRequest = {
          username: formData.username!,
          email: formData.email,
          password: formData.password,
        };

        await registerMutation.mutateAsync(registerData);
        alert('회원가입이 완료되었습니다!');
        navigate('/');
      } else {
        // 로그인
        if (!formData.email || !formData.password) {
          alert('이메일과 비밀번호를 입력해주세요.');
          return;
        }

        const loginData: LoginRequest = {
          email: formData.email,
          password: formData.password,
        };

        await loginMutation.mutateAsync(loginData);
        alert('로그인 성공!');
        navigate('/');
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        (isRegisterMode
          ? '회원가입에 실패했습니다.'
          : '로그인에 실패했습니다.');
      alert(errorMessage);
    }
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setFormData({ email: '', password: '', username: '' });
  };

  const isLoading = loginMutation.isPending || registerMutation.isPending;

  return (
    <div className="flex flex-col items-center gap-[30px] size-full overflow-hidden">
      <Logo className="top-[250px] absolute z-30" width={200} height={200} />
      <div className="flex absolute flex-col items-center gap-2 w-[85%] z-40 bottom-20">
        <input
          className="w-full h-fit bg-[#3A3A3A] font-medium text-[14px] px-4 py-3 rounded-[8px] text-white"
          placeholder="이메일 입력"
          type="email"
          value={formData.email}
          onChange={e => handleInputChange('email', e.target.value)}
          disabled={isLoading}
        />
        {isRegisterMode && (
          <input
            className="w-full h-fit bg-[#3A3A3A] font-medium text-[14px] px-4 py-3 rounded-[8px] text-white"
            placeholder="아이디 입력"
            value={formData.username}
            onChange={e => handleInputChange('username', e.target.value)}
            disabled={isLoading}
          />
        )}
        <input
          className="w-full h-fit bg-[#3A3A3A] font-medium text-[14px] px-4 py-3 rounded-[8px] text-white"
          placeholder="비밀번호 입력"
          type="password"
          value={formData.password}
          onChange={e => handleInputChange('password', e.target.value)}
          disabled={isLoading}
        />
        <button
          className="w-full h-fit border-white border font-medium text-[14px] px-4 py-3 rounded-[8px] text-white disabled:opacity-50"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? '처리중...' : isRegisterMode ? '회원가입' : '로그인'}
        </button>
        <button
          className="font-medium text-[12px] text-[#CFCFCF] underline disabled:opacity-50"
          onClick={toggleMode}
          disabled={isLoading}
        >
          {isRegisterMode ? '로그인하기' : '회원가입하기'}
        </button>
      </div>

      <div className="top-0 z-10 size-full absolute overflow-hidden bg-black">
        <img
          src="/Hand.png"
          className="absolute top-[200px] -left-5 rotate-[140px] w-[200px] opacity-50"
        />
        <img
          src="/Hand.png"
          className="absolute top-[400px] -right-5 rotate-[140px] w-[250px] transform-[scale(-1,_1)] opacity-50"
        />
      </div>
    </div>
  );
};
