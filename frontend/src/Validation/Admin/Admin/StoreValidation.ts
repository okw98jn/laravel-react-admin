import { z } from 'zod';

const StoreValidation = z.object({
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

export default StoreValidation;