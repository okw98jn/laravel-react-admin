import React, { useState } from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUserCircle } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

import Icon from "../components/atoms/Icon";
import IconBtn from "../../components/btns/IconBtn";
import PasswordInput from "../../components/PasswordInput";
import Input from "../../components/InputControl";
import RadioBtn from "../../components/RadioBtn";
import SelectBox from "../../components/SelectBox";
import { AdminRoleList, AdminStatusEnum, AdminStatusList } from "../../../consts/AdminConst";
import StoreValidation from "../../../Validation/Admin/Admin/StoreValidation";
import { useSnackbar } from "../../../Recoil/Admin/snackbarState";
import { axiosClient } from '../../../Axios/AxiosClientProvider';

type Admin = {
    name: string;
    login_id: string;
    password: string;
    passwordConfirm: string;
    status: number;
    role: number | '';
}

const AdminNew: React.FC = React.memo(() => {
    const [isLoading, setIsLoading] = useState(false);
    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const useFormMethods = useForm<Admin>({
        defaultValues: {
            name: '',
            login_id: '',
            password: '',
            passwordConfirm: '',
            role: '',
            status: AdminStatusEnum.Valid
        },
        mode: 'onSubmit',
        resolver: zodResolver(StoreValidation)
    });

    const { handleSubmit } = useFormMethods;
    const onSubmit: SubmitHandler<Admin> = (data: Admin) => {
        setIsLoading(true);
        axiosClient.post('/api/admin/admin/admin', data)
            .then((res) => {
                setIsLoading(false);
                navigate(`/admin/admin/${res.data.id}`);
                openSnackbar({
                    text: '登録が完了しました',
                    severity: 'success'
                });
            }).catch(error => {
                setIsLoading(false);
                throw error
            })
    };

    return (
        <div className='p-14 h-full w-2/4'>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden pb-7">
                <div className="px-12 py-4 mb-8">
                    <div className="flex items-center flex-col pt-8">
                        <Icon svg={<FaUserCircle />} color='#2a3f54da' size='40px' />
                        <p className="text-lg text-gray-700 mt-1 mb-8">管理者追加</p>
                        <FormProvider {...useFormMethods}>
                            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center">
                                <div className="w-2/3 mb-7">
                                    <Input label="名前" name="name" isRequired={true} />
                                </div>
                                <div className="w-2/3 mb-7">
                                    <Input label="ログインID" name="login_id" isRequired={true} />
                                </div>
                                <div className="w-2/3 mb-7">
                                    <PasswordInput label="パスワード" name="password" />
                                </div>
                                <div className="w-2/3 mb-7">
                                    <PasswordInput label="パスワード(確認)" name="passwordConfirm" />
                                </div>
                                <div className="w-2/3 mb-7">
                                    <SelectBox label="権限" name="role" isRequired={true} items={AdminRoleList} />
                                </div>
                                <div className="w-2/3 mb-7">
                                    <RadioBtn label="ステータス" name="status" isRequired={true} items={AdminStatusList} />
                                </div>
                                <div className="w-2/3">
                                    <IconBtn text="登録" svg={<FiPlus />} color='primary' variant='contained' size="large" isLoading={isLoading} isSubmit={true} />
                                </div>
                            </form>
                        </FormProvider>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default AdminNew