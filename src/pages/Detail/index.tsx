import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '../../components';
import { Section } from './Section';
import { useStoryDetail } from '../../apis';

const levelTable = {
  0: '하',
  1: '중',
  2: '상',
};

export const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: storyDetail, isLoading, error } = useStoryDetail(id || '');

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div className="flex flex-col gap-[30px] size-full pt-10 overflow-auto px-4">
        <div className="flex justify-between items-center w-full h-fit">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-1">
              <Icon icon="ArrowLeft" color="#FFFFFF" size={24} />
            </button>
            <div className="size-[54px] bg-gray-600 rounded-lg animate-pulse" />
            <div className="flex flex-col gap-1">
              <div className="w-32 h-5 bg-gray-600 rounded animate-pulse" />
              <div className="w-20 h-4 bg-gray-600 rounded animate-pulse" />
            </div>
          </div>
        </div>
        <div className="text-center py-8">
          <p className="text-[#ACACAC] text-[14px]">스토리를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!storyDetail) {
    return (
      <div className="flex flex-col gap-[30px] size-full pt-10 overflow-auto px-4">
        <div className="flex justify-between items-center w-full h-fit">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-1">
              <Icon icon="ArrowLeft" color="#FFFFFF" size={24} />
            </button>
          </div>
        </div>
        <div className="text-center py-8">
          <p className="text-[#ACACAC] text-[14px]">
            스토리를 찾을 수 없습니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[30px] size-full pt-10 overflow-auto px-4">
      <div className="flex justify-between items-center w-full h-fit">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1">
            <Icon icon="ArrowLeft" color="#FFFFFF" size={24} />
          </button>
          <img
            className="size-[54px] border border-[#FFFFFF30] rounded-lg"
            src={storyDetail.thumbnailUrl}
            alt={storyDetail.title}
          />
          <div className="flex flex-col gap-1">
            <h3 className="text-[18px] font-semibold text-[#FFFFFF]">
              {storyDetail.title}
            </h3>
            <span className="text-[12px] font-medium text-[#CFCFCF]">
              {storyDetail.genre}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Icon icon="HeartEmpty" size={20} />
          <Icon icon="Share" size={20} />
        </div>
      </div>
      <div className="shrink-0 flex gap-1 overflow-x-auto snap-x [scroll-snap-type:mandatory]">
        {/* 메인 썸네일 이미지 표시 */}
        <img
          src={storyDetail.thumbnailUrl}
          alt={storyDetail.title}
          className="shrink-0 snap-center w-[304px] object-cover rounded-[16px] h-[200px] border border-[#FFFFFF30]"
        />
      </div>
      <div className="flex shrink-0 items-center justify-between px-2">
        <Section title="평점" value={`${storyDetail.rating} / 5`} />
        <div className="w-[1px] h-[26px] bg-[#BEBEBE]" />
        <Section title="체험 수" value={`${storyDetail.experienceCount}명`} />
        <div className="w-[1px] h-[26px] bg-[#BEBEBE]" />
        <Section
          title="수위"
          value={
            levelTable[storyDetail.level as keyof typeof levelTable] || '하'
          }
        />
        <div className="w-[1px] h-[26px] bg-[#BEBEBE]" />
        <Section title="후기" value={`${storyDetail.comments.length}개`} />
      </div>
      <div className="w-full flex gap-2">
        <button
          onClick={() => {
            if (storyDetail.audioUrl) {
              const audio = new Audio(storyDetail.audioUrl);
              audio.play().catch(err => {
                console.error('오디오 재생 실패:', err);
                alert('오디오를 재생할 수 없습니다.');
              });
            } else {
              alert('오디오가 제공되지 않습니다.');
            }
          }}
          disabled={!storyDetail.audioUrl}
          className={`rounded-md items-center gap-2 text-white font-semibold text-[16px] w-full py-3 justify-center flex ${
            storyDetail.audioUrl
              ? 'bg-[#A60000] hover:bg-[#8B0000]'
              : 'bg-gray-600 cursor-not-allowed'
          }`}
        >
          오디오만 듣기
          <Icon icon="SoundOnly" size={20} />
        </button>
        <button className="rounded-md items-center gap-2 text-white font-semibold text-[16px] bg-[#A60000] w-full py-3 justify-center flex hover:bg-[#8B0000]">
          미션 플레이
          <Icon icon="Play" size={20} />
        </button>
      </div>
      <div className="flex flex-col gap-1 shrink-0">
        <h3 className="font-semibold text-[18px] text-white">설명</h3>
        <span className="font-medium text-[12px] text-white break-words whitespace-pre-line">
          {storyDetail.description}
        </span>
      </div>
      <div className="flex flex-col gap-1 shrink-0">
        <h3 className="font-semibold text-[18px] text-white">스토리 내용</h3>
        <span className="font-medium text-[12px] text-white break-words whitespace-pre-line">
          {storyDetail.content}
        </span>
      </div>
      <div className="flex flex-col gap-1 shrink-0">
        <h3 className="font-semibold text-[18px] text-white">당신의 임무</h3>
        <div className="flex flex-col gap-2">
          {storyDetail.mission.map((missionItem, index) => (
            <span
              key={index}
              className="font-medium text-[12px] text-white break-words whitespace-pre-line"
            >
              {index + 1}. {missionItem}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
