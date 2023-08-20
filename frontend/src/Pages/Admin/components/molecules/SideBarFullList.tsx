import React from 'react'
import { useLocation, Link } from 'react-router-dom';
import { styled } from 'styled-components'

import Icon from '../atoms/Icon';

type SideBarInfoProps = {
    href: string;
    svg: React.ReactNode;
    title: string;
}

const SideBarFullList: React.FC<SideBarInfoProps> = React.memo(({ href, svg, title }) => {
    const pathName: string = useLocation().pathname;
    const isActivePath     = pathName.split('/')[2] === href.split('/')[2];
    return (
        <li>
            <SideLink to={href} className={isActivePath ? 'side-bar-active' : ''}>
                <Icon svg={svg} />
                <span className='ml-3'>{title}</span>
            </SideLink>
        </li>
    )
})

const SideLink = styled(Link)`
    color: #c4c4c4d5;
    display: flex;
    align-items: center;
    width: 90%;
    margin: 8px auto;
    padding: 6px 12px;
    text-align: left;
    transition: 0.5s;
    border-radius: 5px;
    &:hover{
        background-color: #e9e9e944;
        border-radius: 5px;
        color: #e9e9e9;
    }
`

export default SideBarFullList