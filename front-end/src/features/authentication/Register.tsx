import { FormEvent, useState } from 'react';
import './register.css';
import { registerUserAsync } from './authenticationSlice';
import { useAppDispatch } from '../../app/hooks';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';





const Register = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [instrument, setInstrument] = useState("");

    const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return; // Stop the form from submitting
        }

        const userData = {
            username: userName,
            password: password,
            instrument: instrument,
        };

        
        dispatch(registerUserAsync(userData))
        navigate('/authentication/login')
        toast.success(`Welcome to the band ${userName}!`);
      };

  return (
    <div style = {{textAlign: "center", marginTop: "10vh"}}>
        
        <div style={{marginBottom: "20px"}}>
            <img alt="logo" height = "50px" src={require(`../../images/logo.png`)}/>
        </div>
        
        <div>
            <span>A member of Moveo? Sign up to join JaMoveo and rehearse with us!</span>
        </div>

                


        <form onSubmit={handleRegister}>
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
                <FormControl fullWidth margin="normal" required>

                            <InputLabel>Instrument</InputLabel>

                            <Select value={instrument}
                                    onChange={(e) => setInstrument(e.target.value as string)}
                                    label="Instrument">

                                <MenuItem value="" disabled>Select Instrument</MenuItem>
                                <MenuItem value="drums">Drums</MenuItem>
                                <MenuItem value="guitars">Guitars</MenuItem>
                                <MenuItem value="bass">Bass</MenuItem>
                                <MenuItem value="saxophone">Saxophone</MenuItem>
                                <MenuItem value="keyboards">Keyboards</MenuItem>
                                <MenuItem value="vocals">Vocals</MenuItem>

                            </Select>
                </FormControl>
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

            <div className="form-group">
                <TextField type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            required
                            label="Confirm Password"
                            fullWidth
                            margin="normal"/>
            </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                    <Button type="submit" variant="contained" className="form-group" style={{ backgroundColor: "#A28B55", fontSize: "13px" }}>
                        Create Account
                    </Button>

                    <span style={{ marginLeft: "auto", whiteSpace: "nowrap" }}>
                        Already part of JaMoveo? <a href="/authentication/login">Sign in</a>!
                    </span>

                    <span style={{ marginLeft: "auto", whiteSpace: "nowrap" }}>
                        <a href="/authentication/admin_register">Sign up</a> as Admin
                    </span>
                </div>
        </form>
    </div>
  )
}

export default Register