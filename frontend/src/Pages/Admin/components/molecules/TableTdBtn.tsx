import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

import { API_URL, ModalTypeEnum } from '../../../../consts/CommonConst'
import Icon from '../atoms/Icon';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import ConfirmModal from '../../../components/ConfirmModal';
import { useSnackbar } from '../../../../Recoil/Admin/snackbarState';
import Loading from '../../../components/Loading';

type Props = {
    id: number;
    modalTitle: string;
}
const TableTdBtn: React.FC<Props> = React.memo(({ id, modalTitle }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { openSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>, id: number): void => {
        e.preventDefault();
        setIsLoading(true);
        axios.post(`${API_URL}/api/admin/admin/delete`, { id: id })
            .then(() => {
                openSnackbar({
                    text: '削除が完了しました',
                    severity: 'success'
                });
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                setIsLoading(false);
                setIsModalOpen(false);
            })
    }
    if (isLoading) return <Loading />;
    return (
        <td className="h-px w-px whitespace-nowrap">
            <div className="px-6 py-1.5 flex">
                <div className="py-3 px-4 text-gray-500" onClick={() => setIsModalOpen(!isModalOpen)}>
                    <Icon svg={<FiTrash2 />} size='20px' color='' />
                </div>
                <ConfirmModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} type={ModalTypeEnum.Alert} text={modalTitle} handleSubmit={handleSubmit} id={id} rightBtnText='削除' />
                <Link to={'/'} className="py-3 px-4 text-gray-500">
                    <Icon svg={<FiEdit />} size='20px' color='' />
                </Link>
            </div>
        </td>
    )
})

export default TableTdBtn