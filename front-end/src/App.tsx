import { lazy, Suspense } from 'react';

import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './index.css';
import Loading from './features/base/Loading';

const GenFooter = lazy(() => import('./features/base/GenFooter'));
const GenNavbar = lazy(() => import('./features/base/GenNavbar'));



function App() {
  return (
    <div className="App">

        <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"/>

      <Suspense fallback={<Loading />}>
      <GenNavbar />
      </Suspense>

    <Container>
      <Outlet />
    </Container>

      <Suspense fallback={<Loading />}>
      <GenFooter />
      </Suspense>
      
    </div>
  );
}

export default App;
