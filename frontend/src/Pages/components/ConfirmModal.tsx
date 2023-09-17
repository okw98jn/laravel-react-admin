import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { CSSTransition } from 'react-transition-group';

import '../../css/modal.scss';
import { ModalTypeEnum } from '../../consts/CommonConst'
import Icon from '../Admin/components/atoms/Icon';

type Props = {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    type: ModalTypeEnum.Alert | ModalTypeEnum.Success;
    title?: string;
    text: string;
    handleSubmit: (e:React.FormEvent<HTMLFormElement>, id: number) => void;
    id: number;
    leftBtnText?: string;
    rightBtnText: string;
}

const ConfirmModal: React.FC<Props> = React.memo(({ isModalOpen, setIsModalOpen, type, title = '確認', text, handleSubmit, id, leftBtnText = 'キャンセル', rightBtnText }) => {
    const rightButtonColor: string = type === ModalTypeEnum.Alert ? 'bg-red-400 hover:bg-red-500' : 'bg-blue-400 hover:bg-blue-600';
    return (
        <CSSTransition
            in={isModalOpen}
            timeout={120}
            classNames="fade"
            unmountOnExit
        >

            <div className="w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto bg-gray-800 bg-opacity-50 cursor-default">
                <div className="mt-32 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                    <div className="flex flex-col bg-white border shadow-sm rounded-xl">
                        <div className="flex justify-between items-center py-3 px-4 border-b">
                            <p className="font-bold text-gray-800">{title}</p>
                            <button className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 transition-all text-sm" onClick={() => setIsModalOpen(false)}>
                                <Icon svg={<AiOutlineClose />} size='20px' color='' />
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto">
                            <p className="mt-1 text-gray-800 dark:text-gray-400">{text}</p>
                        </div>
                        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                            <button className="w-28 py-3 px-4 rounded-md border text-gray-700 shadow-sm align-middle hover:bg-gray-50 transition duration-300 ease-in-out text-sm" onClick={() => setIsModalOpen(false)}>{leftBtnText}</button>
                            <form onSubmit={e => handleSubmit(e, id)}>
                                <button className={`w-28 py-3 px-4 rounded-md border shadow-sm align-middle text-white transition duration-300 ease-in-out text-sm ${rightButtonColor}`}>{rightBtnText}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </CSSTransition >
    );
})

export default ConfirmModal
