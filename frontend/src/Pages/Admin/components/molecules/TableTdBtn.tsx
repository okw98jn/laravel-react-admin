import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import { ModalTypeEnum } from '../../../../consts/CommonConst'
import Icon from '../atoms/Icon';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import ConfirmModal from '../../../components/ConfirmModal';

const TableTdBtn: React.FC = React.memo(() => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return (
        <td className="h-px w-px whitespace-nowrap">
            <div className="px-6 py-1.5 flex">
                <div className="py-3 px-4 text-gray-500" onClick={() => setIsModalOpen(!isModalOpen)}>
                    <Icon svg={<FiTrash2 />} size='20px' color='' />
                </div>
                <ConfirmModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} type={ModalTypeEnum.Alert} text='管理者を削除しますか?' rightBtnText='削除' />
                <Link to={'/'} className="py-3 px-4 text-gray-500">
                    <Icon svg={<FiEdit />} size='20px' color='' />
                </Link>
            </div>
        </td>
    )
})

export default TableTdBtn