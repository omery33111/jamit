import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logoutUserAsync, selectUsername } from '../authentication/authenticationSlice';



const MyNavbar = () => {
  const dispatch = useAppDispatch()
  
  const userNameFromSelector = useAppSelector(selectUsername);
  const nameOfUserFromSession = JSON.parse(sessionStorage.getItem("userName") as string);
  const displayName = userNameFromSelector || nameOfUserFromSession || userNameFromSelector;

  const refreshToken = JSON.parse(sessionStorage.getItem("refresh") as string);
  const accessToken = JSON.parse(sessionStorage.getItem("access") as string);
  const LoggedIn = refreshToken || accessToken;

  const isAdmin = JSON.parse(sessionStorage.getItem("isAdmin") as string);

  return (
    <div>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
              <Nav>
                  
                    <Nav.Link as={Link} to = "">

                    <div>
                      <img alt="logo" height = "50px" src={require(`../../images/logo.png`)}/>
                    </div>

                    </Nav.Link>

              </Nav>

              <Nav>
              
                
                {LoggedIn ? (
                  <div style = {{display: "flex", gap: "20px", alignItems: "center"}}>
                    
                      <div style = {{color: "white"}}>
                        <div>Welcome back <span style = {{color: "#FF9100"}}>{displayName}</span>{isAdmin == true && (<> the<span style={{ color: '#FF9100' }}> band manager</span></>)}!</div>
                      </div>

                      <div style = {{color: "red", cursor: "pointer"}}>
                        <div onClick = {() => dispatch(logoutUserAsync())}>LOGOUT</div>
                      </div>

                  </div>
                ) : (
                    <div style = {{display: "flex", color: "white", alignItems: "center"}}>
                       <span>Hey!</span> <Nav.Link as={Link} to = "/authentication/login" >Sign in</Nav.Link> <span>or</span> <Nav.Link as={Link} to = "/authentication/register" >register</Nav.Link>
                     </div>
                )}

                


            
              </Nav>
            </Container>
        </Navbar>


    </div>
  )
}

export default MyNavbar