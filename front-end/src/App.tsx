import { Outlet } from 'react-router-dom';
import MyNavbar from './features/base/MyNavbar';
import MyFooter from './features/base/MyFooter';
import { Container } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './index.css';



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

      <MyNavbar />

    <Container>
      <Outlet />
    </Container>

      <MyFooter />
      
    </div>
  );
}

export default App;
