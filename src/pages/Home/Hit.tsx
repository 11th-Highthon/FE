import { useNavigate } from 'react-router-dom';

export const Hit = ({
  contents,
}: {
  contents: Array<{
    image: string;
    title: string;
    category: string;
    id: number;
  }>;
}) => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-fit flex flex-col gap-[10px] shrink-0">
      <h1 className="text-white font-semibold text-[18px] px-4">인기 미션</h1>
      <div className="flex flex-col gap-4 flex-wrap h-[440px] overflow-scroll snap-x [scroll-snap-type:mandatory]">
        <div className="w-[1px] h-full mr-1" />
        {contents.map(({ image, title, category, id }, index) => (
          <button
            key={id}
            className="flex gap-2 shrink-0 snap-start scroll-ml-[16px]"
            onClick={() => navigate(`/detail/${id}`)}
          >
            <img
              src={image}
              alt={title}
              className="w-[165px] h-[110px] rounded-[4px] border border-[#FFFFFF30]"
            />
            <div className="flex flex-col">
              <div className="flex gap-2 items-center">
                <h2 className="text-[#A60000] text-[20px] font-bold">
                  {index + 1}
                </h2>
                <h3 className="text-[12px] font-medium text-white">{title}</h3>
              </div>

              <span className="ml-[18px] text-[10px] font-medium text-[#CFCFCF]">
                {category}
              </span>
            </div>
          </button>
        ))}
        <div className="w-[1px] h-full snap-start mr-1" />
      </div>
    </div>
  );
};
