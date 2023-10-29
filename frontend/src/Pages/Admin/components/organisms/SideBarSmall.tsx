import React from 'react'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom';

import { SideBarInfo } from '../../../../consts/AdminConst'
import MainLogo from '../atoms/MainLogo';
import SideBarSmallList from '../molecules/SideBarSmallList';

const SideBarSmall: React.FC = React.memo(() => {
    return (
        <SideBar className="flex flex-col items-center">
            <Link to="/admin">
                <div className='mb-10'>
                    <MainLogo />
                </div>
            </Link>
            <ul className='w-11/12'>
                {SideBarInfo.map((item) => (
                    <SideBarSmallList key={item.key} href={item.href} svg={item.svg} title={item.title} />
                ))}
            </ul>
        </SideBar>
    )
})

const SideBar = styled.aside`
    background-color: #2A3F54;
    width: 70px;
    min-height: 100vh;
    padding: 10px 5px;
    color: #ECF0F1;
`

export default SideBarSmall