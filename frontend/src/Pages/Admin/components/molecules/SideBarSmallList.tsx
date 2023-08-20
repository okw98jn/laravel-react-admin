import React from 'react'
import { useLocation, Link } from 'react-router-dom';
import { styled } from 'styled-components'

import Icon from '../atoms/Icon';

type SideBarInfoProps = {
    href: string;
    svg: React.ReactNode;
    title: string;
}
const SideBarSmallList: React.FC<SideBarInfoProps> = React.memo(({ href, svg, title }) => {
    const pathName: string = useLocation().pathname;
    const isActivePath     = pathName.split('/')[2] === href.split('/')[2];
    return (
        <li>
            <SideLink to={href} className={isActivePath ? 'side-bar-active' : '' }>
                <Icon svg={svg} size='20px' />
                <p className='mt-2 text-xs'>{title}</p>
            </SideLink>
        </li>
    )
})

const SideLink = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 3px;
    color: #c4c4c4d5;
    align-items: center;
    text-align: center;
    transition: 0.5s;
    margin-bottom: 15px;
    border-radius: 5px;
    &:hover{
        background-color: #e9e9e944;
        border-radius: 5px;
        color: #e9e9e9;
    }
`

export default SideBarSmallList