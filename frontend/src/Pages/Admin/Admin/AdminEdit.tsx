import React, { useEffect } from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUserCircle } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

import Icon from "../components/atoms/Icon";
import IconBtn from "../../components/btns/IconBtn";
import PasswordInput from "../../components/PasswordInput";
import Input from "../../components/InputControl";
import RadioBtn from "../../components/RadioBtn";
import SelectBox from "../../components/SelectBox";
import { AdminRoleList, AdminStatusEnum, AdminStatusList } from "../../../consts/AdminConst";
import UpdateValidation from "../../../Validation/Admin/Admin/UpdateValidation";
import { useSnackbar } from "../../../Recoil/Admin/snackbarState";
import { axiosClient } from '../../../Axios/AxiosClientProvider';
import useFetchShowData from "../../../hooks/useFetchShowData";
import { AdminEdit } from "../../../types/Admin/Admin";

const AdminEdit: React.FC = React.memo(() => {
    const id = useParams().id;
    const { data: admin, isLoading, setIsLoading } = useFetchShowData<AdminEdit>(`/api/admin/admin/${id}`);
    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const useFormMethods = useForm<AdminEdit>({
        defaultValues: {
            id: 0,
            name: '',
            login_id: '',
            oldPassword: '',
            password: '',
            passwordConfirm: '',
            role: '',
            status: AdminStatusEnum.Valid
        },
        mode: 'onSubmit',
        resolver: zodResolver(UpdateValidation)
    });

    const { handleSubmit, setValue, register } = useFormMethods;

    useEffect(() => {
        if (admin) {
            setValue('id', admin.id)
            setValue('name', admin.name)
            setValue('login_id', admin.login_id)
            setValue('role', admin.role)
            setValue('status', admin.status)
        }
    }, [setValue, admin])
    
    const onSubmit: SubmitHandler<AdminEdit> = (data: AdminEdit) => {
        setIsLoading(true);
        axiosClient.post(`/api/admin/admin/update/${data.id}`, data)
            .then((res) => {
                setIsLoading(false);
                navigate(`/admin/admin/${res.data.id}`);
                openSnackbar({
                    text: '編集が完了しました',
                    severity: 'success'
                });
            }).catch(error => {
                setIsLoading(false);
                throw error
            })
    };

    return (
        <div className='p-14 h-full mx-auto w-2/4'>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden pb-7">
                <div className="px-12 py-4 mb-8">
                    <div className="flex items-center flex-col pt-8">
                        <Icon svg={<FaUserCircle />} color='#2a3f54da' size='40px' />
                        <p className="text-lg text-gray-700 mt-1 mb-8">管理者編集</p>
                        <FormProvider {...useFormMethods}>
                            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center">
                                <div className="w-2/3 mb-7">
                                    <Input label="名前" name="name" isRequired={true} />
                                </div>
                                <div className="w-2/3 mb-7">
                                    <Input label="ログインID" name="login_id" isRequired={true} />
                                </div>
                                <div className="w-2/3 mb-7">
                                    <PasswordInput label="変更前のパスワード" name="oldPassword" isRequired={false} />
                                </div>
                                <div className="w-2/3 mb-7">
                                    <PasswordInput label="パスワード" name="password" isRequired={false} />
                                </div>
                                <div className="w-2/3 mb-7">
                                    <PasswordInput label="パスワード(確認)" name="passwordConfirm" isRequired={false} />
                                </div>
                                <div className="w-2/3 mb-7">
                                    <SelectBox label="権限" name="role" isRequired={true} items={AdminRoleList} />
                                </div>
                                <div className="w-2/3 mb-7">
                                    <RadioBtn label="ステータス" name="status" isRequired={true} items={AdminStatusList} />
                                </div>
                                <div className="w-2/3">
                                    <IconBtn text="編集" svg={<FiEdit />} color='primary' variant='contained' size="large" isLoading={isLoading} isSubmit={true} />
                                </div>
                                <input {...register("id")} type="hidden" />
                            </form>
                        </FormProvider>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default AdminEdit