import React from "react";
import { useParams } from "react-router-dom";

import useFetchShowData from "../../../hooks/useFetchShowData";
import Admin from "../../../types/Admin";

const AdminShow: React.FC = React.memo(() => {
    const id = useParams().id;
    const { data: admin } = useFetchShowData<Admin>(`/api/admin/admin/${id}`);

    if (admin) {
        return (
            <div>
                <p>{admin.id}</p>
            </div>
        )
    }
})

export default AdminShow