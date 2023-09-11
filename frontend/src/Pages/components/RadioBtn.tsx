import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React, { useState } from 'react'

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
    defaultChecked: number;
}

const RadioBtn: React.FC<Props> = React.memo(({ label, name, isRequired = false, items, defaultChecked }) => {
    const [value, setValue] = useState(defaultChecked);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    return (
        <FormControl>
            <FormLabel required={isRequired}>{label}</FormLabel>
            <RadioGroup
                name={name}
                value={value}
                onChange={handleChange}
            >
                <div>
                    {items.map((item) => (
                        <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.text} />
                    ))}
                </div>
            </RadioGroup>
        </FormControl>
    )
})

export default RadioBtn