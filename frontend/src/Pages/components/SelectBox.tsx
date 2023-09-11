import React, { useState } from 'react'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'

type Item = {
    value: number;
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
    const [value, setValue] = useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value);
    };
    return (
        <FormControl fullWidth size={size}>
            <InputLabel required={isRequired}>{label}</InputLabel>
            <Select
                value={value}
                label={label}
                name={name}
                onChange={handleChange}
                required={isRequired}
            >
                <MenuItem><br /></MenuItem>
                {items.map((item) => (
                    <MenuItem key={item.value} value={item.value}>{item.text}</MenuItem>
                ))}
            </Select>
        </FormControl >
    )
})

export default SelectBox