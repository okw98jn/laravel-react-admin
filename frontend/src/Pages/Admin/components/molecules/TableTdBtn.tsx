import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { AlertColor } from '@mui/material';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { MAX_PAGE_COUNT, ModalTypeEnum } from '../../../../consts/CommonConst'
import Icon from '../atoms/Icon';
import { FiEdit, FiInfo, FiTrash2 } from 'react-icons/fi';
import ConfirmModal from '../../../components/ConfirmModal';
import { useSnackbar } from '../../../../Recoil/Admin/snackbarState';
import Admin from '../../../../types/Admin';
import { axiosClient } from '../../../../Axios/AxiosClientProvider';
import { itemOffsetState, pageState } from '../../../../Recoil/Admin/Admin/paginateState';
import { loadingState } from '../../../../Recoil/Admin/loading';

type Props = {
    id: number;
    data: Admin[];
    setData: React.Dispatch<React.SetStateAction<Admin[]>>;
    modalApi: string;
    showPath: string;
    editPath: string;
    modalTitle: string;
    snackbarText: string;
    snackbarSeverity: AlertColor;
}
const TableTdBtn: React.FC<Props> = React.memo(({ id, data, setData, modalTitle, modalApi, showPath, editPath, snackbarText, snackbarSeverity }) => {
    const [page, setPage] = useRecoilState(pageState);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { openSnackbar } = useSnackbar();
    const setIsLoading = useSetRecoilState(loadingState);
    const setItemOffset = useSetRecoilState(itemOffsetState);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>, id: number): void => {
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
                //最後のデータを削除した際に1つ前のページに戻る
                const shouldDecrementPage = newData.length % MAX_PAGE_COUNT === 0;
                setPage(shouldDecrementPage ? page - 1 : page);
                setItemOffset((page - 1) * MAX_PAGE_COUNT % newData.length);
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
                <Link to={showPath} className="py-3 px-4 text-gray-500">
                    <Icon svg={<FiInfo />} size='20px' color='' />
                </Link>
                <Link to={editPath} className="py-3 px-4 text-gray-500">
                    <Icon svg={<FiEdit />} size='20px' color='' />
                </Link>
                <div className="py-3 px-4 text-gray-500 hover:text-blue-500 hover:cursor-pointer" onClick={() => setIsModalOpen(!isModalOpen)}>
                    <Icon svg={<FiTrash2 />} size='20px' color='' />
                </div>
                <ConfirmModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} type={ModalTypeEnum.Alert} text={modalTitle} handleSubmit={handleSubmit} id={id} rightBtnText='削除' />
            </div>
        </td>
    )
})

export default TableTdBtn