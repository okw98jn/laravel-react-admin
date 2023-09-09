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

//管理者ステータスリスト
export const AdminStatusList = [
    {
        value: 0,
        text: '無効',
    },
    {
        value: 1,
        text: '有効',
    },
]

//管理者権限
export enum AdminRole {
    管理者 = 0,
    一般,
}

//管理者権限リスト
export const AdminRoleList = [
    {
        value: 0,
        text: '管理者',
    },
    {
        value: 1,
        text: '一般',
    },
]

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