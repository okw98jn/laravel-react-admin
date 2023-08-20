import React from "react";

import TableTh from "../components/molecules/TableTh";
import TableTd from "../components/molecules/TableTd";
import TableTdBtn from "../components/molecules/TableTdBtn";
import TableHeader from "../components/molecules/TableHeader";

const AdminList: React.FC = React.memo(() => {
    return (
        <>
            <TableHeader title="管理者一覧" newPath="/admin/admin/new" searchPath=""/>
            <table className="min-w-full divide-y divide-gray-200 border-b">
                <thead className="bg-gray-50">
                    <tr>
                        <TableTh title="ID" />
                        <TableTh title="氏名" />
                        <TableTh title="ログインID" />
                        <TableTh title="権限" />
                        <TableTh title="ステータス" />
                        <TableTh title="登録日" />
                        <TableTh />
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-200 transition duration-300 ease-in-out cursor-pointer even:bg-gray-50">
                        <TableTd text="11" path="/aaa" />
                        <TableTd text="111111" path="/aaa" />
                        <TableTd text="111111111" path="/aaa" />
                        <TableTd text="1111" path="/aaa" />
                        <TableTd status={1} path="/aaa" />
                        <TableTd text="1111111111" path="/aaa" />
                        <TableTdBtn />
                    </tr>
                </tbody>
            </table>
        </>
    )
})

export default AdminList