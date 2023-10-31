import React from 'react'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom';

import { SideBarInfo } from '../../../../consts/AdminConst'
import MainLogo from '../atoms/MainLogo';
import SideBarFullList from '../molecules/SideBarList';

const SideBarFull: React.FC = React.memo(() => {
    return (
        <SideBar>
            <Link to="/admin" className='hover:text-white'>
                <div className='flex justify-center items-center mb-6'>
                    <MainLogo />
                    <h2 className='text-xl ml-1'>Laravel + React</h2>
                </div>
            </Link>
            <ul>
                {SideBarInfo.map((item) => (
                    <SideBarFullList key={item.key} href={item.href} svg={item.svg} title={item.title} subInfo={item.subInfo} />
                ))}
            </ul>
        </SideBar>
    )
})

const SideBar = styled.aside`
    background-color: #2A3F54;
    width: 260px;
    min-height: 100vh;
    padding: 10px;
    color: #ECF0F1;
    text-align: center;
    font-size: 14px;
`

export default SideBarFull