import React from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUserCircle } from "react-icons/fa";

import Input from "../components/InputControl";
import IconBtn from "../components/btns/IconBtn";
import Icon from "./components/atoms/Icon";
import LoginStoreValidation from "../../Validation/Admin/LoginStoreValidation";

type AdminLogin = {
    login_id: string;
    password: string;
}
const Login: React.FC = React.memo(() => {
    const useFormMethods = useForm<AdminLogin>({
        defaultValues: {
            login_id: '',
            password: '',
        },
        mode: 'onSubmit',
        resolver: zodResolver(LoginStoreValidation)
    });

    const { handleSubmit } = useFormMethods;
    const onSubmit: SubmitHandler<AdminLogin> = () => {
        alert(1)
    };
    return (
        <div className="w-1/5 mx-auto pt-24">
            <div className="mb-8 flex flex-col items-center">
                <Icon svg={<FaUserCircle />} color='#2a3f54da' size='50px' />
                <h1 className="text-2xl mt-2 font-normal">Sign in</h1>
            </div>
            <FormProvider {...useFormMethods}>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center">
                    <div className="mb-5 w-full">
                        <Input name="login_id" label="ログインID" size="medium" />
                    </div>
                    <div className="mb-5 w-full">
                        <Input name="password" label="パスワード" size="medium" />
                    </div>
                    <div className="w-full">
                        <IconBtn text="ログイン" color='primary' variant='contained' size="large" isSubmit={true} />
                    </div>
                </form>
            </FormProvider>
        </div>
    )
})

export default Login