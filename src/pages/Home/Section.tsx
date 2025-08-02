import { useNavigate } from 'react-router-dom';
import { EmptyCard } from '../../components';
import { useRecommendedStories, useNewStories } from '../../apis';

interface IProp {
  title: string;
  type: 'recommended' | 'new';
}

export const Section = ({ title, type }: IProp) => {
  const navigate = useNavigate();

  const recommendedQuery = useRecommendedStories();
  const newQuery = useNewStories();

  const query = type === 'recommended' ? recommendedQuery : newQuery;
  const { data: stories = [], isLoading, error } = query;

  const renderEmptyState = () => (
    <>
      <div className="w-[1px] h-full snap-start mr-1" />
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex items-start flex-col gap-1 shrink-0 snap-start scroll-ml-[16px]"
        >
          <EmptyCard />
          <h3 className="mt-1 text-[12px] font-medium text-[#CFCFCF]">
            데이터 없음
          </h3>
          <span className="text-[10px] font-medium text-[#CFCFCF]">-</span>
        </div>
      ))}
    </>
  );

  return (
    <div className="size-full w-full h-fit flex flex-col gap-[10px] shrink-0">
      <h1 className="text-white font-semibold text-[18px] px-4">{title}</h1>
      <div className="flex gap-3 w-full overflow-x-auto snap-x [scroll-snap-type:mandatory] scroll-m-4 px-4">
        {isLoading || error || stories.length === 0 ? (
          renderEmptyState()
        ) : (
          <>
            <div className="w-[1px] h-full snap-start mr-1" />
            {stories.slice(0, 5).map(story => (
              <button
                key={story._id}
                className="flex items-start flex-col gap-1 shrink-0 snap-start scroll-ml-[16px]"
                onClick={() => navigate(`/detail/${story._id}`)}
              >
                <img
                  src={story.thumbnailUrl}
                  alt={story.title}
                  className="w-[165px] h-[110px] rounded-[4px] border border-[#FFFFFF30]"
                />
                <h3 className="mt-1 text-[12px] font-medium text-white">
                  {story.title}
                </h3>
                <span className="text-[10px] font-medium text-[#CFCFCF]">
                  {story.category}
                </span>
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
