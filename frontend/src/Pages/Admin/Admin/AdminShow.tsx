import React from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../../../hooks/useFetchData";
import Admin from "../../../types/Admin";
import { API_URL } from "../../../consts/CommonConst";

const AdminShow: React.FC = React.memo(() => {
    const id = useParams().id;

    const { data: admin, isLoading,  error } = useFetchData<Admin>(`${API_URL}/api/admin/admin/${id}`);
    console.log(admin)
    return (
        <div>詳細</div>
    )
})

export default AdminShow