import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form';

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
    // defaultChecked: number;
}

const RadioBtn: React.FC<Props> = React.memo(({ label, name, isRequired = false, items }) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) =>
                <FormControl>
                    <FormLabel required={isRequired}>{label}</FormLabel>
                    <RadioGroup
                        value={value}
                        onChange={(e) => {
                            const radioValue = parseInt(e.target.value)
                            if (!isNaN(radioValue)) {
                                onChange(radioValue)
                            }
                        }}
                    >
                        <div>
                            {items.map((item) => (
                                <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.text} />
                            ))}
                        </div>
                    </RadioGroup>
                </FormControl>}
        />
    )
})

export default RadioBtn