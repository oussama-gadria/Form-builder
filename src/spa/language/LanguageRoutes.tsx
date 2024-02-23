import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/ErrorPage';

import { PageLanguageCreate } from './PageLanguageCreate';
import { PageLanguageList } from './PageLanguageList';
import { PageLanguageUpdate } from './PageLanguageUpdate';

const LanguageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PageLanguageList />} />
      <Route path="/create" element={<PageLanguageCreate />} />
      <Route path="/update/:id" element={<PageLanguageUpdate />} />
      <Route path="*" element={<ErrorPage errorCode={404} />} />
    </Routes>
  );
};

export default LanguageRoutes;
