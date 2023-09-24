import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "react-router-dom";

import useFetchShowData from "../../../hooks/useFetchShowData";
import Admin from "../../../types/Admin";
import Icon from "../components/atoms/Icon";
import { AdminRole } from "../../../consts/AdminConst";
import StatusIcon from "../components/atoms/StatusIcon";
import IconBtn from "../../components/btns/IconBtn";
import Loading from "../../components/Loading";

type PageProps = {
    currentPage: number;
}

const AdminShow: React.FC = React.memo(() => {
    const id = useParams().id;
    const { data: admin, isLoading } = useFetchShowData<Admin>(`/api/admin/admin/${id}`);
    const location = useLocation();
    const { currentPage } = location.state as PageProps;

    if (isLoading) return <Loading />;
    if (admin) {
        return (
            <div className='p-14 h-full w-2/4'>
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden pb-7">
                    <div className="px-12 py-4">
                        <div className="flex items-center flex-col pt-8">
                            <Icon svg={<FaUserCircle />} color='#2a3f54da' size='40px' />
                            <p className="text-lg text-gray-700 mt-1 mb-8">管理者詳細</p>
                            <div className="pl-10 w-2/3 mb-7 flex">
                                <p className="w-1/4">名前</p>
                                <p>{admin.name}</p>
                            </div>
                            <div className="pl-10 w-2/3 mb-7 flex">
                                <p className="w-1/4">ログインID</p>
                                <p>{admin.login_id}</p>
                            </div>
                            <div className="pl-10 w-2/3 mb-7 flex">
                                <p className="w-1/4">パスワード</p>
                                <p>●●●●●●●●</p>
                            </div>
                            <div className="pl-10 w-2/3 mb-7 flex">
                                <p className="w-1/4">権限</p>
                                <p>{AdminRole[admin.role]}</p>
                            </div>
                            <div className="pl-10 w-2/3 mb-16 flex">
                                <p className="w-1/4">ステータス</p>
                                <p><StatusIcon status={admin.status} /></p>
                            </div>
                            <div className="w-full flex justify-end">
                                <p className="mr-3">
                                    <Link to='/admin/admin' state={{ currentPage: currentPage }}>
                                        <IconBtn text="戻る" svg={<RiArrowGoBackFill />} color='info' variant='contained' />
                                    </Link>
                                </p>
                                <p>
                                    <IconBtn text="編集" svg={<FiEdit />} color='primary' variant='contained' />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})

export default AdminShow