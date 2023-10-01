import { z } from 'zod';

import { axiosClient } from '../../../Axios/AxiosClientProvider';

const UpdateValidation = z.object({
    id: z.number(),
    name: z.string()
        .nonempty({ message: '名前は必須です' })
        .max(20, { message: '名前は20文字以下である必要があります' }),
    login_id: z.string()
        .nonempty({ message: 'ログインIDは必須です' })
        .max(20, { message: 'ログインIDは20文字以下である必要があります' })
        .regex(
            /^[0-9a-zA-Z]*$/,
            'ログインIDは半角英数字で入力してください'
        ),
    oldPassword: z.string()
        .nonempty({ message: '変更前のパスワードは必須です' }),
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
}).superRefine(async ({ id, login_id, }, ctx) => {
    let loginIdExists: boolean = false;
    await axiosClient.post(`/api/admin/admin/login_id_duplicate_check`, { id: id, login_id: login_id })
        .then((res) => {
            loginIdExists = res.data && true;
        }).catch(error => {
            throw error
        })
    if (loginIdExists) {
        ctx.addIssue({
            path: ['login_id'],
            code: 'custom',
            message: 'ログインIDは既に使用されています',
        });
    }
}).superRefine(async ({ id, oldPassword, }, ctx) => {
    let isPasswordMatching: boolean = false;
    await axiosClient.post(`/api/admin/admin/password_check`, { id: id, oldPassword: oldPassword })
        .then((res) => {
            isPasswordMatching = res.data && true;
        }).catch(error => {
            throw error
        })
        if (!isPasswordMatching) {
        ctx.addIssue({
            path: ['oldPassword'],
            code: 'custom',
            message: '変更前のパスワードが一致しません',
        });
    }
}).superRefine(({ password, passwordConfirm, }, ctx) => {
    if (password !== passwordConfirm) {
        ctx.addIssue({
            path: ['passwordConfirm'],
            code: 'custom',
            message: 'パスワードが一致しません',
        });
    }
});

export default UpdateValidation;