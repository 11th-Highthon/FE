import { Link } from 'react-router-dom';
import { Icon, MyStory as MyStoryLogo } from '../components';
import { mock_list } from '../mocks';

export const MyStory = () => {
  return (
    <div className="flex flex-col gap-[30px] size-full pt-10 overflow-auto px-4">
      <MyStoryLogo className="shrink-0" />
      {mock_list.map(
        ({ image, title, category, rating, visited, id }, index) => (
          <Link
            to={`/detail/${id}`}
            className={`flex gap-3 ${
              index !== 0 && 'pt-[30px] border-t border-[#2A2A2AFF]'
            }`}
          >
            <img
              src={image}
              className="w-[165px] h-[110px] rounded-[4px] border border-[#FFFFFF30]"
            />
            <div className="mt-2 flex flex-col gap-3">
              <h3 className="text-white font-medium text-[16px]">{title}</h3>
              <span className="text-[#CFCFCF] leading-none font-medium text-[12px]">
                {category}
              </span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 text-[10px] text-[#FFFFFF] bg-[#3A3A3A] rounded-[2px]">
                  평점 {rating}/5
                </span>
                <span className="px-2 py-1 text-[10px] text-[#FFFFFF] bg-[#3A3A3A] rounded-[2px]">
                  체험 수 {visited}명
                </span>
              </div>
            </div>
          </Link>
        )
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
