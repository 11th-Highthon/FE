import { useNavigate } from 'react-router-dom';

interface IProp {
  title: string;
  contents: Array<{
    image: string;
    title: string;
    category: string;
    id: number;
  }>;
}

export const Section = ({ title, contents }: IProp) => {
  const navigate = useNavigate();
  return (
    <div className="size-full w-full h-fit flex flex-col gap-[10px] shrink-0">
      <h1 className="text-white font-semibold text-[18px] px-4">{title}</h1>
      <div className="flex gap-3 w-full overflow-x-auto snap-x [scroll-snap-type:mandatory] scroll-m-4 px-4">
        <div className="w-[1px] h-full snap-start mr-1" />
        {contents.map(({ image, title, category, id }) => (
          <button
            className="flex items-start flex-col gap-1 shrink-0 snap-start scroll-ml-[16px]"
            onClick={() => navigate(`/detail/${id}`)}
          >
            <img
              src={image}
              alt={title}
              className="w-[165px] h-[110px] rounded-[4px] border border-[#FFFFFF30]"
            />
            <h3 className="mt-1 text-[12px] font-medium text-white">{title}</h3>
            <span className="text-[10px] font-medium text-[#CFCFCF]">
              {category}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
