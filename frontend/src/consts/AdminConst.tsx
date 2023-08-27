import { FiUser, FiUsers } from 'react-icons/fi';

export enum AdminSideBarStatusEnum {
    Admin = 1,
    User,
}

export const MAX_PAGE_COUNT = 10;

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

//管理者テーブル情報
export const AdminTheadInfo = [
    'No',
    '氏名',
    'ログインID',
    '権限',
    'ステータス',
    '登録日',
    '',
];