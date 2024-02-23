import React from 'react';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorPage } from '@/components/ErrorPage';

import { FormBuilder } from '@/components/FormBuilder';

export const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter basename="/app">
            <Routes>
              <Route
                path="/"
                element={
                 <FormBuilder  />
                }
              />
              <Route
                path="*"
                element={
                  <ErrorPage errorCode={404} />
                }
              />
            </Routes>
      </BrowserRouter>
      <ReactQueryDevtools />
    </ErrorBoundary>
  );
};
