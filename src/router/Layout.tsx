import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <Outlet />
    </div>
  );
};
