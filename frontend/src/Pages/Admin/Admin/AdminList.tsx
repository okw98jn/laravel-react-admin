import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';

import useFetchData from "../../../hooks/useFetchData";
import { baseUrl } from "../../../consts/CommonConst";
import { AdminTheadInfo, MAX_PAGE_COUNT } from "../../../consts/AdminConst";
import Admin from "../../../types/Admin";
import TableHeader from "../components/molecules/TableHeader";
import Loading from "../../components/Loading";
import Thead from "../components/organisms/Thead";
import Tbody from "./components/Tbody";
import '../../../css/paginate.scss';


const AdminList: React.FC = React.memo(() => {
    const { data: admins, isLoading, error } = useFetchData<Admin>(`${baseUrl}/api/admin/admin/admins`);

    const itemsPerPage: number = MAX_PAGE_COUNT;
    const [currentItems, setCurrentItems] = useState<Admin[]>([]);
    const [pageCount, setPageCount] = useState<number>(0);
    const [itemOffset, setItemOffset] = useState<number>(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(admins.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(admins.length / itemsPerPage));
    }, [admins, itemOffset, itemsPerPage]);

    const handlePageClick = ({ selected }: { selected: number }) => {
        const newOffset = selected * itemsPerPage % admins.length;
        setItemOffset(newOffset);
    };

    if (isLoading) return <Loading />;
    if (error) return <p>エラー</p>;

    return (
        <>
            <TableHeader title="管理者一覧" newPath="/admin/admin/new" searchPath="" />
            <table className="min-w-full divide-y divide-gray-200 border-b">
                <Thead trList={AdminTheadInfo} />
                <Tbody admins={currentItems} />
            </table>
            <div className="flex justify-center mt-4">
                <ReactPaginate
                    nextLabel=">"
                    previousLabel="<"
                    breakLabel="..."
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </div>
        </>
    )
})

export default AdminList