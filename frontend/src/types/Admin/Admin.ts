export type Admin = {
    id: number;
    name: string;
    login_id: string;
    password: string;
    status: number;
    role: number;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}

export type AdminNew = {
    name: string;
    login_id: string;
    password: string;
    passwordConfirm: string;
    status: number;
    role: number | '';
}

export type AdminEdit = {
    id: number;
    name: string;
    login_id: string;
    oldPassword: string;
    password: string;
    passwordConfirm: string;
    status: number;
    role: number | '';
}