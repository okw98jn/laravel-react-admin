import React from 'react'
import { TextField } from '@mui/material'

type Props = {
    label: string;
    name: string;
    isRequired?: boolean;
    size?: "small" | "medium";
}

const Input: React.FC<Props> = React.memo(({ label, name, isRequired = false, size = 'small' }) => {
    return (
        <TextField
            fullWidth
            label={label}
            variant="outlined"
            size={size}
            required={isRequired}
            name={name}
        />
    )
})

export default Input