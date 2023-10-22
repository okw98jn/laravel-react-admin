import { z } from 'zod';

const LoginValidation = z.object({
    login_id: z.string()
        .nonempty({ message: 'ログインIDは必須です' }),
    password: z.string()
        .nonempty({ message: 'パスワードは必須です' })
});

export default LoginValidation;