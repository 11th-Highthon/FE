import { Logo } from '../components';

export const Login = () => {
  return (
    <div className="flex flex-col items-center gap-[30px] size-full overflow-hidden">
      <Logo className="top-[250px] absolute z-30" width={200} height={200} />
      <div className="flex absolute flex-col items-center gap-2 w-[85%] z-40 bottom-20">
        <input
          className="w-full h-fit bg-[#3A3A3A] font-medium text-[14px] px-4 py-3 rounded-[8px] text-white"
          placeholder="아이디 입력"
        />
        <input
          className="w-full h-fit bg-[#3A3A3A] font-medium text-[14px] px-4 py-3 rounded-[8px] text-white"
          placeholder="이메일 입력"
        />
        <input
          className="w-full h-fit bg-[#3A3A3A] font-medium text-[14px] px-4 py-3 rounded-[8px] text-white"
          placeholder="비밀번호 입력"
        />
        <button className="w-full h-fit border-white border font-medium text-[14px] px-4 py-3 rounded-[8px] text-white">
          로그인
        </button>
        <button className="font-medium text-[12px] text-[#CFCFCF] underline">
          회원가입하기
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
