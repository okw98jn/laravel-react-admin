import React from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import Icon from "../components/atoms/Icon";
import { FaUserCircle } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

import IconBtn from "../../components/btns/IconBtn";
import PasswordInput from "../../components/PasswordInput";
import Input from "../../components/InputControl";
import RadioBtn from "../../components/RadioBtn";
import SelectBox from "../../components/SelectBox";
import { AdminRoleList, AdminStatusEnum, AdminStatusList } from "../../../consts/AdminConst";
import Admin from "../../../types/Admin";

const validation = z.object({
    name: z.string()
        .nonempty({ message: '名前は必須です' })
        .max(20, { message: '名前は20文字以下である必要があります' }),
    login_id: z.string()
        .nonempty({ message: 'ログインIDは必須です' })
        .max(20, { message: 'ログインIDは20文字以下である必要があります' }),
    password: z.string()
        .nonempty({ message: 'パスワードは必須です' })
        .min(8, 'パスワードは8文字以上で入力してください')
        .regex(
            /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
            'パスワードは半角英数字混合で入力してください'
        ),
    passwordConfirm: z.string()
        .nonempty({ message: 'パスワード(確認)は必須です' }),
    role: z.number({ invalid_type_error: '権限は必須です' }),
    status: z.number()
}).superRefine(({ password, passwordConfirm, }, ctx) => {
    if (password !== passwordConfirm) {
        ctx.addIssue({
            path: ['passwordConfirm'],
            code: 'custom',
            message: 'パスワードが一致しません',
        });
    }
});

const AdminNew: React.FC = React.memo(() => {
    const useFormMethods = useForm<Admin>({
        defaultValues: {
            name: '',
            login_id: '',
            password: '',
            passwordConfirm: '',
            role: '',
            status: AdminStatusEnum.Valid
        },
        mode: 'onChange',
        resolver: zodResolver(validation)
    });
    const { handleSubmit } = useFormMethods;
    const onSubmit: SubmitHandler<Admin> = (data: Admin) => {
        console.log(data);
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
                                    <PasswordInput />
                                </div>
                                <div className="w-2/3 mb-7">
                                    <PasswordInput isConfirm={true} />
                                </div>
                                <div className="w-2/3 mb-7">
                                    <SelectBox label="権限" name="role" isRequired={true} items={AdminRoleList} />
                                </div>
                                <div className="w-2/3 mb-7">
                                    <RadioBtn label="ステータス" name="status" isRequired={true} items={AdminStatusList} />
                                </div>
                                <div className="w-2/3" onClick={handleSubmit(onSubmit)}>
                                    <IconBtn text="登録" svg={<FiPlus />} color='primary' variant='contained' size="large" />
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