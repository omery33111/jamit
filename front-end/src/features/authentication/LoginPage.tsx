import './authentication.css';
import { loginUserAsync } from './authenticationSlice';
import { useAppDispatch } from '../../app/hooks';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Login } from '../../models/Authentication';



const LoginPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors } } = useForm<Login>
    ({
        defaultValues:
        {
            username: '',
            password: '',
        },
    });

    const handleLogin = async (data: Login) => {
        const userData = {
            username: data.username,
            password: data.password,
        };

        const response = await dispatch(loginUserAsync(userData));
        if (response.payload) {
            toast.success(`Welcome back ${data.username}!`);
            navigate('/');
        } else {
            toast.error('Wrong credentials. Please try again.');
        }
    };

    return (
        <div className="login-page">
            <div className="login-logo-container">
                <img alt="logo" height="50px" src={require(`../../images/logo.png`)} />
            </div>

            <div>
                <span>A member of JaMoveo? Welcome back, get ready to rehearse with us!</span>
            </div>

            <form onSubmit={handleSubmit(handleLogin)}>
                <div>
                    <Controller name="username"
                                 control={control}
                                 rules={{ required: true }}
                                 render={({ field }) => (<TextField
                                     type="text"
                                     label="Username"
                                     fullWidth
                                     margin="normal"
                                     {...field}
                                     error={!!errors.username}
                                     helperText={errors.username ? "Username is required" : ""} />)}
                    />
                </div>

                <div>
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (<TextField
                            type="password"
                            label="Password"
                            fullWidth
                            margin="normal"
                            {...field}
                            error={!!errors.password}
                            helperText={errors.password ? "Password is required" : ""} />)}
                    />
                </div>

                <div className="login-button-container">
                    <Button type="submit" variant="contained" style = {{backgroundColor: "#A28B55"}}>
                        Continue
                    </Button>

                    <span className="login-signup-link">
                        New to the band? <a onClick={() => navigate('/authentication/register')} className="signup-link">Sign up</a>!
                    </span>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;