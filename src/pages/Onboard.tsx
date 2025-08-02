import { Link } from 'react-router-dom';
import { Logo } from '../components';

export const Onboard = () => {
  return (
    <div className="flex flex-col items-center gap-[30px] size-full overflow-hidden">
      <Logo className="top-[250px] absolute z-30" width={200} height={200} />
      <Link
        to="/login"
        className="absolute w-[85%] flex justify-center h-fit py-3 mx-auto bg-[#3A3A3A] bottom-20 z-30 rounded-lg"
      >
        <span className="text-[18px] font-medium text-[#CFCFCF]">
          이메일로 시작하기
        </span>
      </Link>
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
