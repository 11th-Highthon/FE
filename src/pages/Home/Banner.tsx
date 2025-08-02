import { Link } from 'react-router-dom';
import { Icon } from '../../components';

export const Banner = ({
  contents,
}: {
  contents: Array<{
    image: string;
    title: string;
    subtitle: string;
    id: number;
  }>;
}) => {
  return (
    <div className="flex gap-3 w-full overflow-x-auto snap-x [scroll-snap-type:mandatory] px-4 shrink-0">
      {contents.map(({ image, title, subtitle, id }) => (
        <div className="flex flex-col gap-1 relative shrink-0 snap-center items-center">
          <img
            src={image}
            alt={title}
            className="w-[326px] h-[231px] rounded-[4px] border border-[#FFFFFF30]"
          />
          <div className="absolute px-5 bottom-8 flex w-full h-fit justify-between items-center">
            <div className="flex flex-col gap-[4px]">
              <h3 className="text-[24px] font-semibold text-white">{title}</h3>
              <span className="text-[12px] font-medium text-[#CFCFCF]">
                {subtitle}
              </span>
            </div>
            <Link to={`/detail/${id}`}>
              <Icon icon="Play" color="#FFFFFF" size={44} classname="mt-1" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
