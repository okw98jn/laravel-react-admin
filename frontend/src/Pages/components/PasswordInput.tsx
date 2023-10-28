import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import React, { useState } from 'react'
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
    label: string;
    name: string;
    isRequired?: boolean;
    size?: "small" | "medium";
}
const PasswordInput: React.FC<Props> = React.memo(({ label, name, isRequired = true, size = 'small' }) => {
    const { control } = useFormContext();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <FormControl fullWidth variant="outlined" size={size}>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) =>
                    <>
                        <InputLabel required={isRequired} error={error && true}>{label}</InputLabel>
                        <OutlinedInput
                            type={showPassword ? 'text' : 'password'}
                            onChange={onChange}
                            value={value}
                            error={!!error}
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
                            label={label}
                        />
                        <FormHelperText error>
                            {error ? error.message : null}
                        </FormHelperText>
                    </>
                }
            />
        </FormControl>
    )
})

export default PasswordInput