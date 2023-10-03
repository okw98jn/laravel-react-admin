import React from "react";

import TableTd from "../../components/molecules/TableTd";
import TableTdBtn from "../../components/molecules/TableTdBtn";
import { AdminRole } from "../../../../consts/AdminConst";
import Admin from "../../../../types/Admin";

type Props = {
    allAdmin: Admin[];
    admins: Admin[];
    setAdmins: React.Dispatch<React.SetStateAction<Admin[]>>;
};

const Tbody: React.FC<Props> = React.memo(({ allAdmin, admins, setAdmins }) => {

    return (
        <tbody className="divide-y divide-gray-200">
            {admins.map((admin) => {
                const createdAtDate = new Date(admin.created_at);
                const formattedCreatedAt = `${createdAtDate.getFullYear()}年${(createdAtDate.getMonth() + 1).toString().padStart(2, '0')}月${createdAtDate.getDate().toString().padStart(2, '0')}日`;

                return (
                    <tr key={admin.id} className="hover:bg-gray-200 transition duration-300 ease-in-out cursor-pointer even:bg-gray-50">
                        <TableTd text={admin.id} path={`/admin/admin/${admin.id}`} />
                        <TableTd text={admin.name} path={`/admin/admin/${admin.id}`} />
                        <TableTd text={admin.login_id} path={`/admin/admin/${admin.id}`} />
                        <TableTd text={AdminRole[admin.role]} path={`/admin/admin/${admin.id}`} />
                        <TableTd status={admin.status} path={`/admin/admin/${admin.id}`} />
                        <TableTd text={formattedCreatedAt} path={`/admin/admin/${admin.id}`} />
                        <TableTdBtn
                            id={admin.id}
                            data={allAdmin}
                            setData={setAdmins}
                            modalApi={'/api/admin/admin/delete'}
                            modalTitle="管理者を削除しますか？"
                            snackbarText="削除が完了しました"
                            snackbarSeverity="success"
                        />
                    </tr>
                );
            })}
        </tbody>
    )
})

export default Tbody