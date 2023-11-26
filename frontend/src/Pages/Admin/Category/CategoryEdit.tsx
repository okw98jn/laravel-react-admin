import React, { useEffect } from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUserCircle } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

import Icon from "../components/atoms/Icon";
import IconBtn from "../../components/btns/IconBtn";
import Input from "../../components/InputControl";
import UpdateValidation from "../../../Validation/Admin/Category/UpdateValidation";
import { useSnackbar } from "../../../Recoil/Admin/snackbarState";
import { axiosClient } from '../../../Axios/AxiosClientProvider';
import useFetchShowData from "../../../hooks/useFetchShowData";
import { CategoryEdit } from "../../../types/Admin/Category";

const CategoryEdit: React.FC = React.memo(() => {
    const id = useParams().id;
    const { data: category, isLoading, setIsLoading } = useFetchShowData<CategoryEdit>(`/api/admin/category/${id}`);
    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const useFormMethods = useForm<CategoryEdit>({
        defaultValues: {
            id: 0,
            category_name: '',
        },
        mode: 'onSubmit',
        resolver: zodResolver(UpdateValidation)
    });

    const { handleSubmit, setValue, register } = useFormMethods;

    useEffect(() => {
        if (category) {
            setValue('id', category.id)
            setValue('category_name', category.category_name)
        }
    }, [setValue, category])
    
    const onSubmit: SubmitHandler<CategoryEdit> = (data: CategoryEdit) => {
        setIsLoading(true);
        axiosClient.post(`/api/admin/category/update/${data.id}`, data)
            .then((res) => {
                setIsLoading(false);
                navigate(`/admin/category/${res.data.id}`);
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
                        <p className="text-lg text-gray-700 mt-1 mb-8">カテゴリ編集</p>
                        <FormProvider {...useFormMethods}>
                            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center">
                                <div className="w-2/3 mb-7">
                                    <Input label="カテゴリ名" name="category_name" isRequired={true} />
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

export default CategoryEdit