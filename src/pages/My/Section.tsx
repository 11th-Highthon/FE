import { Link } from 'react-router-dom';
import { Icon } from '../../components';

export const Section = ({ title, to }: { title: string; to: string }) => {
  return (
    <Link to={to}>
      <div className="flex items-center justify-between w-full relative">
        <h3 className="font-semibold text-[14px] text-white">{title}</h3>
        <Icon
          icon="ArrowLeft"
          size={24}
          classname="rotate-180 absolute -right-1.5"
        />
      </div>
    </Link>
  );
};
