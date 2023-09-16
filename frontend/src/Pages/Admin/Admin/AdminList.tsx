import React, { useEffect, useState } from "react";

import useFetchData from "../../../hooks/useFetchData";
import { API_URL } from "../../../consts/CommonConst";
import { MAX_PAGE_COUNT } from "../../../consts/CommonConst";
import { AdminTheadInfo } from "../../../consts/AdminConst";
import Admin from "../../../types/Admin";
import TableHeader from "../components/molecules/TableHeader";
import Loading from "../../components/Loading";
import Thead from "../components/organisms/Thead";
import Tbody from "./components/Tbody";
import Paginate from "../../components/Paginate";

const AdminList: React.FC = React.memo(() => {
    const { data: admins, isLoading, error } = useFetchData<Admin>(`${API_URL}/api/admin/admin/admins`);
    const itemsPerPage: number = MAX_PAGE_COUNT;
    const [currentItems, setCurrentItems] = useState<Admin[]>([]);
    const [pageCount, setPageCount] = useState<number>(0);
    const [itemOffset, setItemOffset] = useState<number>(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(admins.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(admins.length / itemsPerPage));
    }, [admins, itemOffset, itemsPerPage]);

    if (isLoading) return <Loading />;
    if (error) return <p>エラー</p>;

    return (
        <div className='p-14 h-full w-3/4'>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden pb-7">
                <TableHeader title="管理者一覧" newPath="/admin/admin/new" searchPath="" />
                <table className="min-w-full divide-y divide-gray-200 border-b">
                    <Thead trList={AdminTheadInfo} />
                    <Tbody admins={currentItems} />
                </table>
                <Paginate pageCount={pageCount} dataLength={admins.length} itemsPerPage={itemsPerPage} setItemOffset={setItemOffset} />
            </div>
        </div >
    )
})

export default AdminList