import React from 'react'
import { TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
    label: string;
    name: string;
    isRequired?: boolean;
    size?: "small" | "medium";
}

const InputControl: React.FC<Props> = React.memo(({ label, name, isRequired = false, size = 'small' }) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) =>
                <TextField
                    name={name}
                    label={label}
                    size={size}
                    required={isRequired}
                    value={value}
                    fullWidth
                    variant="outlined"
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                />}
        />

    )
})

export default InputControl