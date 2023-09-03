import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton';

import Icon from '../../Admin/components/atoms/Icon';

type Props = {
    text: string;
    svg: React.ReactNode;
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    variant: "text" | "outlined" | "contained";
    size?: "small" | "medium" | "large";
}

const IconBtn: React.FC<Props> = React.memo(({ text, svg, color, variant, size = "medium" }) => {
    return (
        <LoadingButton
            variant={variant}
            startIcon={<Icon svg={svg} color='' size='' />}
            color={color}
            size={size}
            fullWidth
        >
            {text}
        </LoadingButton>
    )
})

export default IconBtn