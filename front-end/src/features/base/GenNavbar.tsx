import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logoutUserAsync, selectUsername } from '../authentication/authenticationSlice';



const GenNavbar = () => {
  const dispatch = useAppDispatch();
  const userNameFromSelector = useAppSelector(selectUsername);
  const nameOfUserFromSession = JSON.parse(sessionStorage.getItem("userName") as string);
  const displayName = userNameFromSelector || nameOfUserFromSession || userNameFromSelector;

  const refreshToken = JSON.parse(sessionStorage.getItem("refresh") as string);
  const accessToken = JSON.parse(sessionStorage.getItem("access") as string);
  const LoggedIn = refreshToken || accessToken;

  const isAdmin = JSON.parse(sessionStorage.getItem("isAdmin") as string);

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark" className="my-navbar">
        <Container>
          <Nav>
            <Nav.Link as={Link} to="" className="logo">
              <img alt="logo" height="50px" src={require(`../../images/logo.png`)} />
            </Nav.Link>
          </Nav>

          <Nav className="ms-auto">
            {LoggedIn ? (
              <div className="user-info">
                <div>
                  <span>Welcome back </span>
                  <span className="username">{displayName}</span>
                  {isAdmin === true && <span className="admin-badge">&nbsp;<span className = "white-text">the</span> band manager</span>}!
                </div>
                <div className="logout" onClick={() => dispatch(logoutUserAsync())}>
                  LOGOUT
                </div>
              </div>
            ) : (
              <div className="login-register">
                <span>Hey!</span>
                <Nav.Link as={Link} to="/authentication/login" className="sign-in">
                  Sign in
                </Nav.Link>
                <span>or</span>
                <Nav.Link as={Link} to="/authentication/register" className="register">
                  register
                </Nav.Link>
              </div>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default GenNavbar;