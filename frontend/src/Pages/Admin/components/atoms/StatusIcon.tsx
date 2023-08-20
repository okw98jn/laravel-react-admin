import React from 'react'

import { AdminStatusEnum } from '../../../../consts/AdminConst'

type StatusIconProps = {
    status?: AdminStatusEnum.Valid | AdminStatusEnum.InValid;
}

const StatusIcon: React.FC<StatusIconProps> = React.memo(({ status }) => {
    let statusElement: JSX.Element | undefined = undefined;
    if (status === AdminStatusEnum.Valid) {
        statusElement = (
            <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <svg className="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                有効
            </span>
        );
    } else if (status === AdminStatusEnum.InValid) {
        statusElement = (
            <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                <svg className="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 0 0-8 8c0 4.418 3.582 8 8 8s8-3.582 8-8a8 8 0 0 0-8-8zm.25 4.75a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0V4.75zm0 7a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0z" />
                </svg>
                無効
            </span>
        );
    }

    return (
        statusElement
    )
})

export default StatusIcon