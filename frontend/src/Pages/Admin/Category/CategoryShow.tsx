import React from "react";
import { useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "react-router-dom";

import useFetchShowData from "../../../hooks/useFetchShowData";
import { Category } from "../../../types/Admin/Category";
import Icon from "../components/atoms/Icon";
import IconBtn from "../../components/btns/IconBtn";
import Loading from "../../components/Loading";

const CategoryShow: React.FC = React.memo(() => {
    const id = useParams().id;
    const { data: category, isLoading } = useFetchShowData<Category>(`/api/admin/category/${id}`);
    if (isLoading) return <Loading />;
    if (category) {
        return (
            <div className='p-14 h-full mx-auto w-2/4'>
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden pb-7">
                    <div className="px-12 py-4">
                        <div className="flex items-center flex-col pt-8">
                            <Icon svg={<FaUserCircle />} color='#2a3f54da' size='40px' />
                            <p className="text-lg text-gray-700 mt-1 mb-8">カテゴリ詳細</p>
                            <div className="pl-10 w-2/3 mb-7 flex">
                                <p className="w-1/4">カテゴリ名</p>
                                <p>{category.category_name}</p>
                            </div>
                            <div className="w-full flex justify-end">
                                <p className="mr-3">
                                    <Link to='/admin/category'>
                                        <IconBtn text="戻る" svg={<RiArrowGoBackFill />} color='info' variant='contained' />
                                    </Link>
                                </p>
                                <p>
                                    <Link to={`/admin/category/edit/${category.id}`}>
                                        <IconBtn text="編集" svg={<FiEdit />} color='primary' variant='contained' />
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})

export default CategoryShow