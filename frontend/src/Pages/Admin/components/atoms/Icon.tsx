import React from 'react'
import { IconContext } from 'react-icons'

type IconProps = {
    svg: React.ReactNode;
    size?: string;
    color?: string;
}

const Icon: React.FC<IconProps> = React.memo(({ svg, size = '15px', color = '#cfcfcf' }) => {
    return (
        <IconContext.Provider value={{ color: color, size: size }}>
            {svg}
        </IconContext.Provider>
    )
})

export default Icon