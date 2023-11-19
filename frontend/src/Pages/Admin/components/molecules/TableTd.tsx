import React from 'react'

import { AdminStatusEnum } from '../../../../consts/AdminConst'
import StatusIcon from '../atoms/StatusIcon';

type TableTdProps = {
    text?: string | number | null;
    status?: AdminStatusEnum.Valid | AdminStatusEnum.InValid | null;
}

const TableTd: React.FC<TableTdProps> = React.memo(({ text = null, status = null }) => {
    return (
        <td className="whitespace-nowrap">
            <div className="px-6 py-5">
                {status !== null ? (
                    <StatusIcon status={status} />
                ) : (
                    <div className="flex items-center gap-x-3">
                        <span className="block text-sm text-gray-500">{text}</span>
                    </div>
                )}
            </div>
        </td>
    )
})

export default TableTd