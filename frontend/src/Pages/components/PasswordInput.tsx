import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import React, { useState } from 'react'
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
    isConfirm?: boolean;
}
const PasswordInput: React.FC<Props> = React.memo(({ isConfirm = false }) => {
    const { control } = useFormContext();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <FormControl fullWidth variant="outlined" size="small">
            <Controller
                name={isConfirm ? 'passwordConfirm' : 'password'}
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) =>
                    <>
                        <InputLabel required error={error && true}>{isConfirm ? 'パスワード(確認)' : 'パスワード'}</InputLabel>
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
                            label={isConfirm ? 'パスワード(確認)' : 'パスワード'}
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