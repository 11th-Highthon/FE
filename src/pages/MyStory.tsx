import { Link } from 'react-router-dom';
import { Icon, MyStory as MyStoryLogo, EmptyCard } from '../components';
import { useMyStories } from '../apis';

export const MyStory = () => {
  const { data: myStories = [], isLoading, error } = useMyStories();

  return (
    <div className="flex flex-col gap-[30px] size-full pt-10 overflow-auto px-4">
      <MyStoryLogo className="shrink-0" />

      {isLoading ? (
        // 로딩 상태
        Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex gap-3">
            <EmptyCard width="w-[165px]" height="h-[110px]" />
            <div className="mt-2 flex flex-col gap-3">
              <div className="w-40 h-5 bg-gray-600 rounded animate-pulse" />
              <div className="w-20 h-4 bg-gray-600 rounded animate-pulse" />
              <div className="flex items-center gap-2">
                <div className="w-16 h-6 bg-gray-600 rounded animate-pulse" />
                <div className="w-16 h-6 bg-gray-600 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))
      ) : error ? (
        // 에러 상태
        <div className="text-center py-8">
          <p className="text-[#ACACAC] text-[14px]">
            스토리를 불러오는데 실패했습니다.
          </p>
        </div>
      ) : myStories.length > 0 ? (
        // 정상 데이터
        myStories.map((story, index) => (
          <Link
            key={story.id}
            to={`/detail/${story.id}`}
            className={`flex gap-3 ${
              index !== 0 && 'pt-[30px] border-t border-[#2A2A2AFF]'
            }`}
          >
            <img
              src={story.image || '/sample_nightmare.jpg'}
              className="w-[165px] h-[110px] rounded-[4px] border border-[#FFFFFF30]"
              alt={story.title}
            />
            <div className="mt-2 flex flex-col gap-3">
              <h3 className="text-white font-medium text-[16px]">
                {story.title}
              </h3>
              <span className="text-[#CFCFCF] leading-none font-medium text-[12px]">
                {story.category}
              </span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 text-[10px] text-[#FFFFFF] bg-[#3A3A3A] rounded-[2px]">
                  평점 {story.rating || 0}/5
                </span>
                <span className="px-2 py-1 text-[10px] text-[#FFFFFF] bg-[#3A3A3A] rounded-[2px]">
                  체험 수 {story.playCount || 0}명
                </span>
              </div>
            </div>
          </Link>
        ))
      ) : (
        // 데이터가 없는 상태
        <div className="text-center py-8">
          <p className="text-[#ACACAC] text-[14px] mb-4">
            아직 작성한 괴담이 없습니다.
          </p>
          <p className="text-[#666] text-[12px]">
            첫 번째 괴담을 만들어보세요!
          </p>
        </div>
      )}
      <Link
        to="/create"
        className="fixed bottom-20 p-5 right-10 rounded-full bg-[#A60000]"
      >
        <Icon icon="Plus" size={20} />
      </Link>
    </div>
  );
};
