import React from 'react'
import { useRecoilState } from 'recoil';
import { Pagination } from '@mui/material';

import { pageState } from "../../Recoil/Admin/paginateState"

type Props = {
    pageCount: number;
    dataLength: number;
    itemsPerPage: number;
    setItemOffset: React.Dispatch<React.SetStateAction<number>>;
}

const Paginate: React.FC<Props> = React.memo(({ pageCount, dataLength, itemsPerPage, setItemOffset }) => {
    const [page, setPage] = useRecoilState(pageState);

    const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setItemOffset((page - 1) * itemsPerPage % dataLength)
        setPage(page);
    };

    return (
        <div className="flex justify-center mt-7 items-center">
            <Pagination
                count={pageCount}
                onChange={handleChange}
                page={page}
                showFirstButton
                showLastButton
                // shape="rounded" //四角
            />
        </div>
    )
})

export default Paginate