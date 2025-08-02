import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '../../components';
import { mock_list } from '../../mocks';
import { Section } from './Section';

const levelTable = {
  low: '하',
  mid: '중',
  high: '상',
};

export const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const mock_detail =
    mock_list.find(item => item.id === Number(id)) || mock_list[0];

  return (
    <div className="flex flex-col gap-[30px] size-full pt-10 overflow-auto px-4">
      <div className="flex justify-between items-center w-full h-fit">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1">
            <Icon icon="ArrowLeft" color="#FFFFFF" size={24} />
          </button>
          <img
            className="size-[54px] border border-[#FFFFFF30] rounded-lg"
            src={mock_detail.image}
          />
          <div className="flex flex-col gap-1">
            <h3 className="text-[18px] font-semibold text-[#FFFFFF]">
              {mock_detail.title}
            </h3>
            <span className="text-[12px] font-medium text-[#CFCFCF]">
              {mock_detail.category}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Icon icon="HeartEmpty" size={20} />
          <Icon icon="Share" size={20} />
        </div>
      </div>
      <div className="shrink-0 flex gap-1 overflow-x-auto snap-x [scroll-snap-type:mandatory]">
        {mock_detail.screenshots?.map((screenshot, index) => (
          <img
            key={index}
            src={screenshot}
            alt={`${mock_detail.title} 스크린샷 ${index + 1}`}
            className="shrink-0 snap-center w-[304px] object-cover rounded-[16px] h-[200px] border border-[#FFFFFF30]"
          />
        ))}
      </div>
      <div className="flex shrink-0 items-center justify-between px-2">
        <Section title="평점" value={`${mock_detail.rating} / 5`} />
        <div className="w-[1px] h-[26px] bg-[#BEBEBE]" />
        <Section title="체험 수" value={`${mock_detail.visited}명`} />
        <div className="w-[1px] h-[26px] bg-[#BEBEBE]" />
        <Section
          title="수위"
          value={levelTable[mock_detail.level as keyof typeof levelTable]}
        />
        <div className="w-[1px] h-[26px] bg-[#BEBEBE]" />
        <Section title="후기" value={`${mock_detail.comments}개`} />
      </div>
      <div className="w-full flex gap-2">
        <button className="rounded-md items-center gap-2 text-white font-semibold text-[16px] bg-[#A60000] w-full py-3 justify-center flex">
          오디오만 듣기
          <Icon icon="SoundOnly" size={20} />
        </button>
        <button className="rounded-md items-center gap-2 text-white font-semibold text-[16px] bg-[#A60000] w-full py-3 justify-center flex">
          미션 플레이
          <Icon icon="Play" size={20} />
        </button>
      </div>
      <div className="flex flex-col gap-1 shrink-0">
        <h3 className="font-semibold text-[18px] text-white">설명</h3>
        <span className="font-medium text-[12px] text-white break-words whitespace-pre-line">
          {mock_detail.introduce}
        </span>
      </div>
      <div className="flex flex-col gap-1 shrink-0">
        <h3 className="font-semibold text-[18px] text-white">당신의 임무</h3>
        <span className="font-medium text-[12px] text-white break-words whitespace-pre-line">
          {mock_detail.mission}
        </span>
      </div>
    </div>
  );
};
