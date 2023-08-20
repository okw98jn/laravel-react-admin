import React from "react";

import useFetchData from "../../../hooks/useFetchData";
import { baseUrl } from "../../../consts/CommonConst";
import { AdminRole } from "../../../consts/AdminConst";
import Admin from "../../../types/Admin";
import TableTh from "../components/molecules/TableTh";
import TableTd from "../components/molecules/TableTd";
import TableTdBtn from "../components/molecules/TableTdBtn";
import TableHeader from "../components/molecules/TableHeader";
import Loading from "../../components/Loading";


const AdminList: React.FC = React.memo(() => {
    const { data: admins, isLoading, error } = useFetchData<Admin>(`${baseUrl}/api/admin/admin/admins`);

    if (isLoading) return <Loading />;
    if (error) return <p>エラー</p>;

    return (
        <>
            <TableHeader title="管理者一覧" newPath="/admin/admin/new" searchPath="" />
            <table className="min-w-full divide-y divide-gray-200 border-b">
                <thead className="bg-gray-50">
                    <tr>
                        <TableTh title="No" />
                        <TableTh title="氏名" />
                        <TableTh title="ログインID" />
                        <TableTh title="権限" />
                        <TableTh title="ステータス" />
                        <TableTh title="登録日" />
                        <TableTh />
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {admins.map((admin, key) => {
                        const createdAtDate      = new Date(admin.created_at);
                        const formattedCreatedAt = `${createdAtDate.getFullYear()}年${(createdAtDate.getMonth() + 1).toString().padStart(2, '0')}月${createdAtDate.getDate().toString().padStart(2, '0')}日`;

                        return (
                            <tr key={admin.id} className="hover:bg-gray-200 transition duration-300 ease-in-out cursor-pointer even:bg-gray-50">
                                <TableTd text={key + 1} path="/aaa" />
                                <TableTd text={admin.name} path="/aaa" />
                                <TableTd text={admin.login_id} path="/aaa" />
                                <TableTd text={AdminRole[admin.role]} path="/aaa" />
                                <TableTd status={admin.status} path="/aaa" />
                                <TableTd text={formattedCreatedAt} path="/aaa" />
                                <TableTdBtn />
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
})

export default AdminList