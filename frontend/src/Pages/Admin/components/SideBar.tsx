import React from 'react'
import { useRecoilValue } from 'recoil';


import { sidebarState } from '../../../Recoil/Admin/sidebarState';
import SideBarFull from './organisms/SideBarFull';
import SideBarSmall from './organisms/SideBarSmall';
import '../../../css/sidebar.scss';

const SideBar: React.FC = React.memo(() => {
    const isOpen = useRecoilValue(sidebarState);
    return isOpen ? <SideBarFull /> : <SideBarSmall />;
})

export default SideBar