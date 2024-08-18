import { FormEvent, useState } from 'react';
import './register.css';
import { loginUserAsync, registerUserAsync } from './authenticationSlice';
import { useAppDispatch } from '../../app/hooks';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';





const Login = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userData = {
            username: userName,
            password: password
        };

        
        // Handling in case of successful or wrong credentials
        const response = await dispatch(loginUserAsync(userData));
            if (response.payload)
            {
              toast.success(`Welcome back ${userName}!`);
              navigate('/');
            }
            else
            {
              toast.error('Wrong credentials. Please try again.');
            }
      };



  return (
    <div style = {{textAlign: "center", marginTop: "10vh"}}>
        
        <div style={{marginBottom: "20px"}}>
            <img alt="logo" height = "50px" src={require(`../../images/logo.png`)}/>
        </div>
        
        <div>
            <span>A member of JaMoveo? Welcome back, get ready rehearse with us!</span>
        </div>

                


        <form onSubmit={handleLogin}>
            <div className="form-group">
                <TextField type="text"
                            onChange={(e) => setUserName(e.target.value)}
                            value={userName}
                            required
                            label="Username"
                            fullWidth
                            margin="normal"/>
            </div>

            <div className="form-group">
                <TextField type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            label="Password"
                            fullWidth
                            margin="normal"/>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
                <Button type="submit"
                        variant="contained"
                        className="form-group"
                        style={{backgroundColor: "#A28B55"}}>
                    Continue
                </Button>

                <span style={{marginLeft: "auto", whiteSpace: "nowrap"}}>
                    New to the band? <a onClick = {() => navigate('/authentication/register')} style = {{color: "blue", textDecoration: "underline", cursor: "pointer"}}>Sign up</a>!
                </span>
            </div>
    </form>

    </div>
  )
}

export default Login