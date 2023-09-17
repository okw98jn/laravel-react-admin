type Admin = {
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

export default Admin