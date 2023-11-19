import React, { useEffect, useRef } from 'react'
import { FiSearch } from 'react-icons/fi';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';

import Icon from '../Admin/components/atoms/Icon';
import InputControl from './InputControl';
import SelectBox from './SelectBox';
import { AdminRoleList, AdminStatusList } from '../../consts/AdminConst';
import RadioBtn from './RadioBtn';
import IconBtn from './btns/IconBtn';
import { axiosClient } from '../../Axios/AxiosClientProvider';
import { itemOffsetState, pageState } from '../../Recoil/Admin/Admin/paginateState';
import { MAX_PAGE_COUNT } from '../../consts/CommonConst';

type Props<T> = {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    searchPath: string;
    setData: React.Dispatch<React.SetStateAction<T[]>>;
}

type Admin = {
    name: string;
    login_id: string;
    status: number | '';
    role: number | '';
}

const SearchModal = <T,>({ isModalOpen, setIsModalOpen, searchPath, setData }: Props<T>) => {
    const ref = useRef<HTMLInputElement | null>(null);
    const [page, setPage] = useRecoilState(pageState);
    const setItemOffset = useSetRecoilState(itemOffsetState);

    const useFormMethods = useForm<Admin>({
        defaultValues: {
            name: '',
            login_id: '',
            role: '',
            status: ''
        },
        mode: 'onSubmit',
    });

    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (ref.current) {
            ref.current.click();
        }
    }, [isModalOpen]);

    const { handleSubmit } = useFormMethods;
    const onSubmit: SubmitHandler<Admin> = (data: Admin) => {
        axiosClient.get(searchPath, { params: data })
            .then((res) => {
                setData(res.data);
                setPage(1);
                setItemOffset((page - 1) * MAX_PAGE_COUNT % res.data.length);
            }).catch(error => {
                throw error
            })
        setIsModalOpen(!isModalOpen);
    };
    return (
        <>
            <input type="hidden" ref={ref} data-hs-overlay="#hs-slide-up-animation-modal-search" />
            <div id="hs-slide-up-animation-modal-search" className="hs-overlay hidden w-full h-full fixed top-20 left-0 z-[60] overflow-x-hidden overflow-y-auto">
                <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 w-2/4 hs-overlay-open:duration-500 mt-14 opacity-0 ease-out transition-all m-3 sm:mx-auto">
                    <div className='p-14 h-full mx-auto w-4/4'>
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden pb-7">
                            <div className="px-12 py-1 mb-8">
                                <div className="flex items-center flex-col pt-8">
                                    <Icon svg={<FiSearch />} color='#2a3f54da' size='40px' />
                                    <p className="text-lg text-gray-700 mt-1 mb-8">管理者検索</p>
                                    <FormProvider {...useFormMethods}>
                                        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center">
                                            <div className="w-2/3 mb-7">
                                                <InputControl label="名前" name="name" />
                                            </div>
                                            <div className="w-2/3 mb-7">
                                                <InputControl label="ログインID" name="login_id" isRequired={true} />
                                            </div>
                                            <div className="w-2/3 mb-7">
                                                <SelectBox label="権限" name="role" isRequired={true} items={AdminRoleList} />
                                            </div>
                                            <div className="w-2/3 mb-7">
                                                <RadioBtn label="ステータス" name="status" isRequired={true} items={AdminStatusList} />
                                            </div>
                                            <div className="w-2/3">
                                                <IconBtn text="検索" svg={<FiSearch />} color='primary' variant='contained' size="large" isSubmit={true} />
                                            </div>
                                        </form>
                                    </FormProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchModal
