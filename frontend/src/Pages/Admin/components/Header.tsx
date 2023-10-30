import React from 'react'
import { useRecoilState } from 'recoil';
import { IconContext } from 'react-icons'
import { AiOutlineMenu } from 'react-icons/ai'
import { styled } from 'styled-components'

import { sidebarState } from '../../../Recoil/Admin/sidebarState';
import { axiosClient } from '../../../Axios/AxiosClientProvider';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminState } from '../../../Recoil/Admin/auth';

const Header: React.FC = React.memo(() => {
    const { admin, setAdmin } = useAdminState();
    const [isOpen, setIsOpen] = useRecoilState(sidebarState);
    const navigate = useNavigate();
    const logoutSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        axiosClient.post('/api/admin/logout/')
            .then(() => {
                setAdmin(null);
                navigate(`/admin/login`);
            }).catch(error => {
                throw error;
            });
    }
    return (
        <HeaderArea>
            <div className='hover:cursor-pointer'>
                <IconContext.Provider value={{ color: '#73879C', size: '30px' }}>
                    <AiOutlineMenu onClick={() => setIsOpen(!isOpen)} />
                </IconContext.Provider>
            </div>
            <div className="relative hs-dropdown [--strategy:static] sm:[--strategy:absolute] [--adaptive:none] sm:[--trigger:hover]">
                <button id="hs-mega-menu-basic-dr" type="button" className="flex items-center w-full text-gray-600 hover:text-gray-400 font-medium">
                    {admin?.name}
                    <svg className="ml-2 w-2.5 h-2.5 text-gray-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                    </svg>
                </button>
                <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.9ms] sm:duration-[250ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-40 hidden z-10 sm:mt-3 bg-white sm:shadow-md rounded-lg p-2 before:absolute top-full sm:border before:-top-5 before:left-0 before:w-full before:h-5">
                    <Link to={`/admin/admin/${admin?.id}`}>
                        <button className="flex items-center gap-x-3.5 py-2 mb-1 px-3 w-full rounded-md text-sm text-gray-800 hover:bg-gray-100">マイページ</button>
                    </Link>
                    <form onSubmit={e => logoutSubmit(e)}>
                        <button className="flex items-center gap-x-3.5 py-2 mb-1 px-3 w-full rounded-md text-sm text-gray-800 hover:bg-gray-100">ログアウト</button>
                    </form>
                </div>
            </div>
        </HeaderArea >
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
    padding: 0 7% 0 1%;
`

export default Header