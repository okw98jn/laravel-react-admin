import React from 'react'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form';

type Item = {
    value: number | string;
    text: string;
}

type Props = {
    label: string;
    name: string;
    isRequired?: boolean;
    size?: "small" | "medium";
    items: Item[];
}

const SelectBox: React.FC<Props> = React.memo(({ label, name, isRequired = false, size = 'small', items }) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) =>
                <FormControl fullWidth size={size}>
                    <InputLabel required={isRequired} error={error && true}>{label}</InputLabel>
                    <Select
                        value={value}
                        label={label}
                        onChange={onChange}
                        required={isRequired}
                        error={!!error}
                    >
                        <MenuItem value=''><br /></MenuItem>
                        {items.map((item) => (
                            <MenuItem key={item.value} value={item.value}>{item.text}</MenuItem>
                        ))}
                    </Select>
                    <FormHelperText error>
                        {error ? error.message : null}
                    </FormHelperText>
                </FormControl >}
        />
    )
})

export default SelectBox