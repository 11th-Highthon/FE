import { Icon, Logo } from '../../components';
import { mock_list } from '../../mocks';
import { Banner } from './Banner';
import { Hit } from './Hit';
import { Section } from './Section';

export const Home = () => {
  return (
    <div className="flex flex-col gap-[30px] size-full pt-10 overflow-auto relative">
      <div className="flex flex-col gap-[30px] z-20">
        <div className="px-4 flex w-full justify-between items-center">
          <Logo />
          <Icon icon="Bell" color="#FFFFFF" size={24} classname="mt-1" />
        </div>
        <Banner contents={mock_list} />
        <Hit contents={mock_list} />
        <Section title="회원님을 위한 추천 미션" contents={mock_list} />
        <Section title="새로 뜬 미션" contents={mock_list} />
      </div>
      <div className="fixed z-10 size-full top-0 overflow-hidden bg-black">
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
