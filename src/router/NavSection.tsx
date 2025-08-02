import { Link, useLocation } from 'react-router-dom';
import { Icon, type IconNames } from '../components';

export const NavSection = ({
  icon,
  path,
  name,
}: {
  icon: IconNames;
  path: string[];
  name: string;
}) => {
  const location = useLocation();
  const isCurrent = path.filter(i =>
    i === 'index' ? location.pathname === '/' : location.pathname.includes(i)
  ).length;

  console.log(isCurrent);

  return (
    <Link
      to={path[0] === 'index' ? '/' : path[0]}
      className="flex flex-col items-center gap-[5px]"
    >
      <Icon icon={icon} color={isCurrent ? 'white' : '#B0B0B0'} size={20} />
      <span
        className={`text-[10px] font-medium ${
          isCurrent ? 'text-white' : 'text-[#B0B0B0]'
        }`}
      >
        {name}
      </span>
    </Link>
  );
};
