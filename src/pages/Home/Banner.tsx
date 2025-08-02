import { Link } from 'react-router-dom';
import { Icon, EmptyBannerCard } from '../../components';
import { useAllStories } from '../../apis';

export const Banner = () => {
  const { data: stories = [], isLoading, error } = useAllStories();

  // 최소 3개의 항목을 보장하기 위해 실제 데이터와 빈 카드를 조합
  const getDisplayItems = () => {
    const minItems = 3;
    const actualStories = isLoading || error ? [] : stories.slice(0, 5);
    const emptyCardsNeeded = Math.max(0, minItems - actualStories.length);

    return {
      stories: actualStories,
      emptyCardsCount: emptyCardsNeeded,
    };
  };

  const { stories: displayStories, emptyCardsCount } = getDisplayItems();

  return (
    <div className="flex gap-3 w-full overflow-x-auto snap-x [scroll-snap-type:mandatory] px-4 shrink-0">
      {displayStories.map(story => (
        <div
          key={story.id}
          className="flex flex-col gap-1 relative shrink-0 snap-center items-center"
        >
          <img
            src={story.image}
            alt={story.title}
            className="w-[326px] h-[231px] rounded-[4px] border border-[#FFFFFF30]"
          />
          <div className="absolute px-5 bottom-8 flex w-full h-fit justify-between items-center">
            <div className="flex flex-col gap-[4px]">
              <h3 className="text-[24px] font-semibold text-white">
                {story.title}
              </h3>
              <span className="text-[12px] font-medium text-[#CFCFCF]">
                {story.description || story.category}
              </span>
            </div>
            <Link to={`/detail/${story.id}`}>
              <Icon icon="Play" color="#FFFFFF" size={44} classname="mt-1" />
            </Link>
          </div>
        </div>
      ))}
      {Array.from({ length: emptyCardsCount }).map((_, index) => (
        <EmptyBannerCard key={`empty-${index}`} />
      ))}
    </div>
  );
};
