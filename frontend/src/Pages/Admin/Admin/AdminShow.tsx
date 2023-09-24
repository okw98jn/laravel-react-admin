import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useFetchShowData from "../../../hooks/useFetchShowData";
import Admin from "../../../types/Admin";
import { API_URL } from "../../../consts/CommonConst";
import Loading from "../../components/Loading";

const AdminShow: React.FC = React.memo(() => {
    const id = useParams().id;
    const { data: admin, isLoading, error } = useFetchShowData<Admin>(`${API_URL}/api/admin/admin/${id}`);
    const navigate = useNavigate();

    useEffect(() => {
        if (admin && !admin.id) {
            navigate('/admin/notfound/');
        }
    }, [admin, navigate])
    if (isLoading) return <Loading />;
    if (error) return <p>エラー</p>;
    
    if (admin && admin.id) {
        return (
            <div>
                <p>{admin.id}</p>
            </div>
        )
    }
})

export default AdminShow