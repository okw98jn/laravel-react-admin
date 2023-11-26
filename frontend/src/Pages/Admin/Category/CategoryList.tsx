import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import useFetchData from "../../../hooks/useFetchData";
import { MAX_PAGE_COUNT } from "../../../consts/CommonConst";
import { CategoryTheadInfo } from "../../../consts/AdminConst";
import { Category } from "../../../types/Admin/Category";
import TableHeader from "../components/molecules/TableHeader";
import Loading from "../../components/Loading";
import Thead from "../components/organisms/Thead";
import Tbody from "./components/Tbody";
import Paginate from "../../components/Paginate";
import { categoryPageState, categoryItemOffsetState } from "../../../Recoil/Admin/Category/paginateState";

const ProductList: React.FC = React.memo(() => {
    const { data: categories, setData: setCategories, isLoading } = useFetchData<Category>('/api/admin/category/categories');
    const [currentItems, setCurrentItems] = useState<Category[]>([]);
    const [pageCount, setPageCount] = useState<number>(0);
    const [page, setPage] = useRecoilState(categoryPageState);
    const [itemOffset, setItemOffset] = useRecoilState(categoryItemOffsetState);

    useEffect(() => {
        const endOffset = itemOffset + MAX_PAGE_COUNT;
        setCurrentItems(categories.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(categories.length / MAX_PAGE_COUNT));
    }, [categories, itemOffset]);

    if (isLoading) return <Loading />;

    return (
        <div className='p-14 h-full w-11/12 mx-auto'>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden pb-7">
                <TableHeader<Category> title="カテゴリ一覧" createPagePath="/admin/category/new" searchPath="/api/admin/category/search" setData={setCategories} />
                <table className="min-w-full divide-y divide-gray-200 border-b">
                    <Thead trList={CategoryTheadInfo} />
                    <Tbody allCategory={categories} categories={currentItems} setCategories={setCategories} />
                </table>
                <Paginate pageCount={pageCount} dataLength={categories.length} itemsPerPage={MAX_PAGE_COUNT} setItemOffset={setItemOffset} page={page} setPage={setPage} />
            </div>
        </div >
    )
})

export default ProductList