import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from '../../pages/HomePage/HomePage';
import ItemPage from '../../pages/ItemPage/ItemPage';

export default function RoutesComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<ItemPage />} />
      </Routes>
    </BrowserRouter>
  );
}
