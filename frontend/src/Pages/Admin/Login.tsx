import React, { useState } from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUserCircle } from "react-icons/fa";
import { AxiosResponse } from "axios";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import Input from "../components/InputControl";
import IconBtn from "../components/btns/IconBtn";
import Icon from "./components/atoms/Icon";
import LoginValidation from "../../Validation/Admin/LoginValidation";
import { axiosClient } from "../../Axios/AxiosClientProvider";
import { useSnackbar } from "../../Recoil/Admin/snackbarState";
import PasswordInput from "../components/PasswordInput";
import { loadingState } from "../../Recoil/Admin/loading";
import { useAdminState } from "../../Recoil/Admin/auth";

type LoginRequest = {
    login_id: string;
    password: string;
}

type LoginResponse = {
    id: number;
    name: string;
    role: number;
}

const Login: React.FC = React.memo(() => {
    const { setAdmin } = useAdminState();
    const [isLoginError, setIsLoginError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useRecoilState(loadingState);
    const navigate = useNavigate();
    const { openSnackbar } = useSnackbar();
    const useFormMethods = useForm<LoginRequest>({
        defaultValues: {
            login_id: '',
            password: '',
        },
        mode: 'onSubmit',
        resolver: zodResolver(LoginValidation)
    });

    const { handleSubmit } = useFormMethods;
    const onSubmit: SubmitHandler<LoginRequest> = (data: LoginRequest) => {
        setIsLoading(true);
        axiosClient.get('/sanctum/csrf-cookie').then(() => {
            axiosClient.post('/api/admin/login/', data)
                .then((res: AxiosResponse<LoginResponse>) => {
                    setIsLoading(false);
                    if (res.data.id) {
                        const authAdmin = {
                            id: res.data.id,
                            name: res.data.name,
                            role: res.data.role,
                        }
                        setAdmin(authAdmin);
                        navigate(`/admin`);
                        openSnackbar({
                            text: 'ログイン成功',
                            severity: 'success'
                        });
                    } else {
                        setIsLoginError(true);
                    }
                }).catch(error => {
                    setIsLoading(false);
                    throw error
                })
        })
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
                        <PasswordInput name="password" label="パスワード" isRequired={false} size="medium" />
                    </div>
                    {isLoginError && (
                        <p className="text-red-600 text-sm mb-3">ログインIDまたはパスワードが間違っています</p>
                    )}
                    <div className="w-full">
                        <IconBtn text="ログイン" color='primary' variant='contained' size="large" isSubmit={true} isLoading={isLoading} />
                    </div>
                </form>
            </FormProvider>
        </div>
    )
})

export default Login