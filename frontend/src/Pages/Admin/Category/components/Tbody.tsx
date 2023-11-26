import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import TableTd from "../../components/molecules/TableTd";
import TableTdBtn from "../../components/molecules/TableTdBtn";
import { Category } from "../../../../types/Admin/Category";
import { categoryPageState, categoryItemOffsetState } from "../../../../Recoil/Admin/Category/paginateState";
import { MAX_PAGE_COUNT } from "../../../../consts/CommonConst";

type Props = {
    allCategory: Category[];
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

const Tbody: React.FC<Props> = React.memo(({ allCategory, categories, setCategories }) => {
    const [page, setPage] = useRecoilState(categoryPageState);
    const setItemOffset = useSetRecoilState(categoryItemOffsetState);
    const pageBaseNo = (page * MAX_PAGE_COUNT) - MAX_PAGE_COUNT;
    return (
        <tbody className="divide-y divide-gray-200">
            {categories.map((category, index) => {
                const createdAtDate = new Date(category.created_at);
                const formattedCreatedAt = `${createdAtDate.getFullYear()}年${(createdAtDate.getMonth() + 1).toString().padStart(2, '0')}月${createdAtDate.getDate().toString().padStart(2, '0')}日`;

                return (
                    <tr key={category.id} className="hover:bg-gray-200 transition duration-300 ease-in-out even:bg-gray-50">
                        <TableTd text={pageBaseNo + index + 1} />
                        <TableTd text={category.category_name} />
                        <TableTd text={formattedCreatedAt} />
                        <TableTdBtn<Category>
                            id={category.id}
                            data={allCategory}
                            setData={setCategories}
                            showPath={`/admin/category/${category.id}`}
                            editPath={`/admin/category/edit/${category.id}`}
                            modalApi={'/api/admin/category/delete'}
                            modalTitle="カテゴリを削除しますか？"
                            snackbarText="削除が完了しました"
                            snackbarSeverity="success"
                            page={page}
                            setPage={setPage}
                            setItemOffset={setItemOffset}
                        />
                    </tr>
                );
            })}
        </tbody>
    )
})

export default Tbody