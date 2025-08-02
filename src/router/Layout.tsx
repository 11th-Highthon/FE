import { Outlet } from 'react-router-dom';
import { NavSection } from './NavSection';

export const Layout = () => {
  return (
    <main className="flex flex-col gap-[30px] w-full h-screen bg-black overflow-hidden">
      <div className="w-full h-full overflow-scroll shrink-1 z-30">
        <Outlet />
      </div>
      <nav className="bg-black shrink-0 w-full flex items-center gap-[91px] justify-center py-[10px] z-40">
        <NavSection icon="Home" path={['index', '/detail']} name="홈" />
        <NavSection icon="Search" path={['/search']} name="검색" />
        <NavSection icon="My" path={['/my']} name="MY" />
      </nav>
    </main>
  );
};
