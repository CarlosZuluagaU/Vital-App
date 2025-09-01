import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './Home';
import { RoutineDetailPage } from './RoutineDetail';
import { WeeklySummary } from './WeeklySummary';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/rutina/:id', element: <RoutineDetailPage /> },
  { path: '/resumen', element: <WeeklySummary /> },
]);

export const AppRoutes: React.FC = () => <RouterProvider router={router} />;
