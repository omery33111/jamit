import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Loading from './features/base/Loading';

const MainPage = lazy(() => import('./features/base/MainPage'));
const ResultsPage = lazy(() => import('./features/base/ResultsPage'));
const LivePage = lazy(() => import('./features/base/LivePage'));
const AdminRegister = lazy(() => import('./features/authentication/AdminRegister'));
const UserRegister = lazy(() => import('./features/authentication/UserRegister'));
const LoginPage = lazy(() => import('./features/authentication/LoginPage'));



const container = document.getElementById('root')!;
const root = createRoot(container);



root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      
        <Suspense fallback={<Loading />}>
          <Routes>

            <Route path="/" element={<App />}>

              <Route index element={<MainPage />} />

              <Route path = "/results" element={<ResultsPage />} />

              <Route path = "/results/livepage">
                <Route index element = {<LivePage />} />
                <Route path = ":id" element = {<LivePage />} />
              </Route>

              <Route path = "/authentication/admin_register" element={<AdminRegister />} />

              <Route path = "/authentication/register" element={<UserRegister />} />
              
              <Route path = "/authentication/login" element={<LoginPage />} />

            </Route>

          </Routes>
        </Suspense>

      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
