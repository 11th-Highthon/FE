import { useNavigate } from 'react-router-dom';
import { EmptyCard } from '../../components';
import { usePopularStories } from '../../apis';

export const Hit = () => {
  const navigate = useNavigate();
  const { data: stories = [], isLoading, error } = usePopularStories();

  // 최소 9개의 항목을 보장하기 위해 실제 데이터와 빈 카드를 조합
  const getDisplayItems = () => {
    const minItems = 9;
    const actualStories = isLoading || error ? [] : stories.slice(0, 8);
    const emptyCardsNeeded = Math.max(0, minItems - actualStories.length);

    return {
      stories: actualStories,
      emptyCardsCount: emptyCardsNeeded,
    };
  };

  const { stories: displayStories, emptyCardsCount } = getDisplayItems();

  const renderEmptyCard = (index: number) => (
    <div
      key={`empty-${index}`}
      className="flex gap-2 shrink-0 snap-start scroll-ml-[16px]"
    >
      <EmptyCard />
      <div className="flex flex-col">
        <div className="flex gap-2 items-center">
          <h2 className="text-[#A60000] text-[20px] font-bold">
            {displayStories.length + index + 1}
          </h2>
          <h3 className="text-[12px] font-medium text-[#CFCFCF]">
            데이터 없음
          </h3>
        </div>
        <span className="ml-[18px] text-[10px] font-medium text-[#CFCFCF]">
          -
        </span>
      </div>
    </div>
  );

  return (
    <div className="w-full h-fit flex flex-col gap-[10px] shrink-0">
      <h1 className="text-white font-semibold text-[18px] px-4">인기 미션</h1>
      <div className="flex flex-col gap-4 flex-wrap h-[440px] overflow-scroll snap-x [scroll-snap-type:mandatory]">
        <div className="w-[1px] h-full mr-1" />
        {displayStories.map((story, index) => (
          <button
            key={story._id}
            className="flex gap-2 shrink-0 snap-start scroll-ml-[16px]"
            onClick={() => navigate(`/detail/${story._id}`)}
          >
            <img
              src={story.thumbnailUrl}
              alt={story.title}
              className="w-[165px] h-[110px] rounded-[4px] border border-[#FFFFFF30]"
            />
            <div className="flex flex-col">
              <div className="flex gap-2 items-center">
                <h2 className="text-[#A60000] text-[20px] font-bold">
                  {index + 1}
                </h2>
                <h3 className="text-[12px] font-medium text-white">
                  {story.title}
                </h3>
              </div>
              <span className="ml-[18px] text-[10px] font-medium text-[#CFCFCF]">
                {story.category}
              </span>
            </div>
          </button>
        ))}
        {Array.from({ length: emptyCardsCount }).map((_, index) =>
          renderEmptyCard(index)
        )}
        <div className="w-[1px] h-full snap-start mr-1" />
      </div>
    </div>
  );
};
