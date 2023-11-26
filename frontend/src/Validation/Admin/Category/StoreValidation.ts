import { z } from 'zod';

import { axiosClient } from '../../../Axios/AxiosClientProvider';

const StoreValidation = z.object({
    category_name: z.string()
        .nonempty({ message: 'カテゴリ名は必須です' })
        .superRefine(async (category_name, ctx) => {
            let categoryNameExists: boolean = false;
            await axiosClient.post(`/api/admin/category/category_name_duplicate_check`, { category_name: category_name })
                .then((res) => {
                    categoryNameExists = res.data && true;
                }).catch(error => {
                    throw error
                })
            if (categoryNameExists) {
                ctx.addIssue({
                    code: 'custom',
                    message: 'カテゴリ名は既に使用されています',
                });
            }
        }),
});

export default StoreValidation;