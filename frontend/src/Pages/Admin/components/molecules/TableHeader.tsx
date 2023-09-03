import React from 'react'
import { Link } from 'react-router-dom';
import { FiPlus, FiSearch } from 'react-icons/fi';

import IconBtn from '../../../components/btns/IconBtn';

type Props = {
    title: string;
    searchPath: string;
    newPath: string;
}

const TableHeader: React.FC<Props> = React.memo(({ title, searchPath, newPath }) => {
    return (
        <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200">
            <div>
                <p className="text-xl font-semibold text-gray-700">{title}</p>
            </div>
            <div>
                <div className="inline-flex gap-x-2">
                    <Link to={searchPath}>
                        <IconBtn text="検索" svg={<FiSearch />} color='info' variant='contained' />
                    </Link>
                    <Link to={newPath}>
                        <IconBtn text="追加" svg={<FiPlus />} color='primary' variant='contained' />
                    </Link>
                </div>
            </div>
        </div>
    )
})

export default TableHeader