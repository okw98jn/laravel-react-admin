import React from 'react'

type TableThProps = {
    title?: string | null;
}

const TableTh: React.FC<TableThProps> = React.memo(({ title = null }) => {
    return (
        <th scope="col" className="px-6 py-3 text-left">
            <div className="flex items-center gap-x-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">{title}</span>
            </div>
        </th>
    )
})

export default TableTh