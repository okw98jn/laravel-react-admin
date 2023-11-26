import React from 'react'
import { Pagination } from '@mui/material';

type Props = {
    pageCount: number;
    dataLength: number;
    itemsPerPage: number;
    setItemOffset: React.Dispatch<React.SetStateAction<number>>;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Paginate: React.FC<Props> = React.memo(({ pageCount, dataLength, itemsPerPage, setItemOffset, page, setPage }) => {

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