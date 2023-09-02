import React from 'react'
import ReactPaginate from 'react-paginate';

import '../../css/paginate.scss';

type Props = {
    pageCount: number;
    dataLength: number;
    itemsPerPage: number;
    setItemOffset: React.Dispatch<React.SetStateAction<number>>;
}

const Paginate: React.FC<Props> = React.memo(({pageCount, dataLength, itemsPerPage, setItemOffset}) => {
    const handlePageClick = ({ selected }: { selected: number }) => {
        const newOffset = selected * itemsPerPage % dataLength;
        setItemOffset(newOffset);
    };

    return (
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
    )
})

export default Paginate