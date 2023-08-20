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

//管理者ステータス
export enum AdminStatusEnum {
    InValid = 0,
    Valid   = 1,
}

//管理者権限
export enum AdminRole {
    管理者= 0,
    一般,
}