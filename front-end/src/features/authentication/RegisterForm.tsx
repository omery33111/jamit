import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';



interface FormProps {
    control: any;
    watch: any;
    errors: any;
}



const RegisterForm = ({ control, watch, errors }: FormProps) => {
    const password = watch('password');

    return (
        <div>
            <div className="form-group">
                <Controller name="username"
                            control={control}
                            rules={{required: true}}
                            render={({field}) => (<TextField type="text"
                                                                label="Username"
                                                                fullWidth
                                                                margin="normal"
                                                                {...field}
                                                                error={!!errors.username}
                                                                helperText={errors.username ? "Username is required" : ""}
                                                    />
                            )}
                />
            </div>

            <div className="form-group">
                <FormControl fullWidth margin="normal" required>
                    <InputLabel>Instrument</InputLabel>
                    <Controller
                        name="instrument"
                        control={control}
                        render={({field}) => (
                            <Select {...field} label="Instrument">
                                <MenuItem value="" disabled>Select Instrument</MenuItem>
                                <MenuItem value="drums">Drums</MenuItem>
                                <MenuItem value="guitars">Guitars</MenuItem>
                                <MenuItem value="bass">Bass</MenuItem>
                                <MenuItem value="saxophone">Saxophone</MenuItem>
                                <MenuItem value="keyboards">Keyboards</MenuItem>
                                <MenuItem value="vocals">Vocals</MenuItem>
                            </Select>
                        )}
                    />
                </FormControl>
            </div>

            <div className="form-group">
                <Controller name="password"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (<TextField type="password"
                                                                label="Password"
                                                                fullWidth
                                                                margin="normal"
                                                                {...field}
                                                                error={!!errors.password}
                                                                helperText={errors.password ? "Password is required" : ""}
                                                    />
                            )}
                />
            </div>

            <div className="form-group">
                <Controller name="confirmPassword"
                            control={control}
                            rules={{ required: true, validate: (value) => value === password || "Passwords do not match" }}
                            render={({ field }) => (<TextField type="password"
                                                                label="Confirm Password"
                                                                fullWidth
                                                                margin="normal"
                                                                {...field}
                                                                error={!!errors.confirmPassword}
                                                                helperText={errors.confirmPassword ? errors.confirmPassword.message : ""}
                                                    />
                            )}
                />
            </div>
        </div>
    );
};

export default RegisterForm;
