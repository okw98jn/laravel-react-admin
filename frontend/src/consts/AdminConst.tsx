import { GrAidOption, GrCart, GrHome, GrPersonalComputer, GrRss, GrUserAdmin } from "react-icons/gr";

export enum AdminSideBarEnum {
    Dashboard = 1,
    User,
    Admin,
}

export enum AdminSideBarItemEnum {
    Module = 1,
    Plan,
    Option,
}

export const SideBarInfo = [
    {
        key: AdminSideBarEnum.Dashboard,
        title: 'ダッシュボード',
        href: '/admin',
        svg: <GrHome />,
        subInfo: []
    },
    {
        key: AdminSideBarEnum.User,
        title: '商品',
        href: '',
        svg: <GrCart />,
        subInfo: [
            {
                key: AdminSideBarItemEnum.Module,
                title: '端末',
                href: '/admin/admin',
                svg: <GrPersonalComputer />
            },
            {
                key: AdminSideBarItemEnum.Plan,
                title: 'プラン',
                href: '/admin/admin',
                svg: <GrRss />
            },
            {
                key: AdminSideBarItemEnum.Option,
                title: 'オプション',
                href: '/admin/admin',
                svg: <GrAidOption />
            },
        ]
    },
    {
        key: AdminSideBarEnum.Admin,
        title: '管理者',
        href: '/admin/admin',
        svg: <GrUserAdmin />,
        subInfo: []
    },

]

//管理者ステータス
export enum AdminStatusEnum {
    InValid = 0,
    Valid = 1,
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