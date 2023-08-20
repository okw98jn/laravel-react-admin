import React from 'react'
import { useRecoilState } from 'recoil';
import { IconContext } from 'react-icons'
import { AiOutlineMenu } from 'react-icons/ai'
import { styled } from 'styled-components'

import { sidebarState } from '../../../Recoil/Admin/sidebarState';

const Header: React.FC = React.memo(() => {
    const [isOpen, setIsOpen] = useRecoilState(sidebarState);
    return (
        <HeaderArea>
            <div className='hover:cursor-pointer'>
                <IconContext.Provider value={{ color: '#73879C', size: '30px' }}>
                    <AiOutlineMenu onClick={() => setIsOpen(!isOpen)} />
                </IconContext.Provider>
            </div>
            <div>
                <p>name</p>
            </div>
        </HeaderArea>
    )
})

const HeaderArea = styled.header`
    background-color: #EDEDED;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #D9DEE4;
    display: flex; 
    align-items: center;
    justify-content: space-between;
    padding: 0 1%;
`

export default Header