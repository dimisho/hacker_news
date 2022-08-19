import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from 'pages/HomePage/HomePage';
import ItemPage from 'pages/ItemPage/ItemPage';

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<ItemPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
