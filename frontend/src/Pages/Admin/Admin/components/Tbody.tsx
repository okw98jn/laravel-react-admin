import React from "react";
import { useRecoilValue } from "recoil";

import TableTd from "../../components/molecules/TableTd";
import TableTdBtn from "../../components/molecules/TableTdBtn";
import { AdminRole } from "../../../../consts/AdminConst";
import Admin from "../../../../types/Admin";
import { pageState } from "../../../../Recoil/Admin/Admin/paginateState";
import { MAX_PAGE_COUNT } from "../../../../consts/CommonConst";

type Props = {
    allAdmin: Admin[];
    admins: Admin[];
    setAdmins: React.Dispatch<React.SetStateAction<Admin[]>>;
};

const Tbody: React.FC<Props> = React.memo(({ allAdmin, admins, setAdmins }) => {
    const page = useRecoilValue(pageState);
    const pageBaseNo = (page * MAX_PAGE_COUNT) - MAX_PAGE_COUNT;
    return (
        <tbody className="divide-y divide-gray-200">
            {admins.map((admin, index) => {
                const createdAtDate = new Date(admin.created_at);
                const formattedCreatedAt = `${createdAtDate.getFullYear()}年${(createdAtDate.getMonth() + 1).toString().padStart(2, '0')}月${createdAtDate.getDate().toString().padStart(2, '0')}日`;

                return (
                    <tr key={admin.id} className="hover:bg-gray-200 transition duration-300 ease-in-out even:bg-gray-50">
                        <TableTd text={pageBaseNo + index + 1} />
                        <TableTd text={admin.name} />
                        <TableTd text={admin.login_id} />
                        <TableTd text={AdminRole[admin.role]} />
                        <TableTd status={admin.status} />
                        <TableTd text={formattedCreatedAt} />
                        <TableTdBtn
                            id={admin.id}
                            data={allAdmin}
                            setData={setAdmins}
                            showPath={`/admin/admin/${admin.id}`}
                            editPath={`/admin/admin/edit/${admin.id}`}
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