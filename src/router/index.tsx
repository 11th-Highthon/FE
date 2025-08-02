import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as _ from '../pages';
import { Layout } from './Layout';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<_.Home />} />
          <Route path="/search" element={<_.Search />} />
          <Route path="/detail/:id" element={<_.Detail />} />
          <Route path="/my" element={<_.Home />} />
          <Route path='/create' element={<_.CreateStory/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
