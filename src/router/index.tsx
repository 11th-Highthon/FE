import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as _ from '../pages';
import { Layout } from './Layout';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<_.Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
