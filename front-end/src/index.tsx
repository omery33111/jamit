import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './features/authentication/Register';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Login from './features/authentication/Login';
import AdminRegister from './features/authentication/AdminRegister';
import MainPage from './features/base/MainPage';
import ResultsPage from './features/base/ResultsPage';
import LivePage from './features/base/LivePage';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>


        <Routes>

          <Route path="/" element={<App />}>

            <Route index element={<MainPage />} />

            <Route path = "/results" element={<ResultsPage />} />

            <Route path = "/results/livepage">
              <Route index element = {<LivePage />} />
              <Route path = ":id" element = {<LivePage />} />
            </Route>

            <Route path = "/authentication/admin_register" element={<AdminRegister />} />
            <Route path = "/authentication/register" element={<Register />} />

            <Route path = "/authentication/login" element={<Login />} />

          </Route>

        </Routes>


      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
