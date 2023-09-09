import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import React, { useState } from 'react'
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordInput: React.FC = React.memo(() => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword         = () => setShowPassword((show) => !show);
    const handleMouseDownPassword         = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="outlined-adornment-password" required>パスワード</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                name='password'
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label="Password"
            />
        </FormControl>
    )
})

export default PasswordInput