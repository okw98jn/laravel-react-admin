import { FiUser, FiUsers } from 'react-icons/fi';

export enum AdminSideBarStatusEnum {
    Admin = 1,
    User,
}

export const SideBarInfo = [
    {
        key: AdminSideBarStatusEnum.Admin,
        title: '管理者',
        href: '/admin/admin',
        svg: <FiUsers />
    },
    {
        key: AdminSideBarStatusEnum.User,
        title: 'ユーザー',
        href: '/admin/users',
        svg: <FiUser />
    },
]

//アカウントステータス
export enum AdminStatusEnum {
    Valid   = 0,
    InValid = 1,
}