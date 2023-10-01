import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { AlertColor } from '@mui/material';
import { useRecoilState } from 'recoil';

import { MAX_PAGE_COUNT, ModalTypeEnum } from '../../../../consts/CommonConst'
import Icon from '../atoms/Icon';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import ConfirmModal from '../../../components/ConfirmModal';
import { useSnackbar } from '../../../../Recoil/Admin/snackbarState';
import Admin from '../../../../types/Admin';
import { axiosClient } from '../../../../Axios/AxiosClientProvider';
import { pageState } from '../../../../Recoil/Admin/paginateState';

type Props = {
    id: number;
    data: Admin[];
    setData: React.Dispatch<React.SetStateAction<Admin[]>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    modalApi: string;
    modalTitle: string;
    snackbarText: string;
    snackbarSeverity: AlertColor;
}
const TableTdBtn: React.FC<Props> = React.memo(({ id, data, setData, setIsLoading, modalTitle, modalApi, snackbarText, snackbarSeverity }) => {
    const [page, setPage]               = useRecoilState(pageState);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { openSnackbar }              = useSnackbar();
    const handleSubmit                  = (e: React.FormEvent<HTMLFormElement>, id: number): void => {
        setIsLoading(true);
        e.preventDefault();
        axiosClient.post(modalApi, { id: id })
            .then(() => {
                openSnackbar({
                    text: snackbarText,
                    severity: snackbarSeverity
                });
                const newData = data.filter(item => {
                    return item.id !== id
                });
                setData(newData);
                if (newData.length % MAX_PAGE_COUNT === 0) {
                    setPage(page - 1);
                } else {
                    setPage(page);
                }

            }).catch(error => {
                throw error;
            }).finally(() => {
                setIsModalOpen(false);
                setIsLoading(false);
            })
    }
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