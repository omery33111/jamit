import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from '../../app/hooks';
import { Register } from '../../models/Authentication';
import './authentication.css';
import { registerAdminAsync } from './authenticationSlice';
import { lazy, Suspense } from 'react';
import Loading from '../base/Loading';

const RegisterForm = lazy(() => import('../authentication/RegisterForm'));


const AdminRegister = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {control, handleSubmit, watch, formState: { errors }} = useForm<Register>
    ({
        defaultValues:
        {
            username: '',
            password: '',
            confirmPassword: '',
            instrument: '',
        },
    });

    const onSubmit = async (data: Register) => {
        const userData = {
            username: data.username,
            password: data.password,
            instrument: data.instrument,
        };

        dispatch(registerAdminAsync(userData));
        navigate('/authentication/login');
        toast.success(`Welcome to the band ${data.username}!`);
    };

    return (
        <div className="register-page">
            <div className="register-logo-container">
                <img alt="logo" height="50px" src={require(`../../images/logo.png`)} />
            </div>

            <div className="register-message">
                <span>Interested in being the <b className="band-manager-highlight">band manager</b>? Register now!</span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Suspense fallback={<Loading />}>
                    <RegisterForm control={control} watch={watch} errors={errors}/>
                </Suspense>

                <div className="button-container">
                    <Button type="submit" variant="contained" style={{ backgroundColor: "#A28B55" }}>
                        Create Account
                    </Button>
                    
                    <span className="login-link-container">
                        Already part of JaMoveo? <a onClick={() => navigate('/authentication/login')} className="login-link">Sign in</a>!
                    </span>
                </div>
            </form>
        </div>
    );
}

export default AdminRegister;