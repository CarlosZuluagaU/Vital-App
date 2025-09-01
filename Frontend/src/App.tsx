import React from 'react';
import { Header } from './components/Header';
import { AppRoutes } from './app/routes';

const App: React.FC = () => (
  <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
    <Header />
    <AppRoutes />
  </div>
);

export default App;
