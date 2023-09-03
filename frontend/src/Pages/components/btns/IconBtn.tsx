import React from 'react'
import { Button } from '@mui/material';

import Icon from '../../Admin/components/atoms/Icon';

type Props = {
    text: string;
    svg?: React.ReactNode;
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    variant: "text" | "outlined" | "contained";
}

const IconBtn: React.FC<Props> = React.memo(({ text, svg = null, color, variant }) => {
    return (
        <Button
            variant={variant}
            startIcon={<Icon svg={svg} color='' size='' />}
            color={color}
        >
            {text}
        </Button>
    )
})

export default IconBtn