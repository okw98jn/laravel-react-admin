import React from 'react'
import { IconContext } from 'react-icons'
import { GiAtom } from "react-icons/gi";

const MainLogo: React.FC = React.memo(() => {
    return (
        <IconContext.Provider value={{ color: '#cfcfcf', size: '32px' }}>
            <GiAtom />
        </IconContext.Provider>
    )
})

export default MainLogo