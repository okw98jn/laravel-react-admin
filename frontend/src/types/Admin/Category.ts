export type Category = {
    id: number;
    category_name: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}

export type CategoryNew = {
    category_name: string;
}

export type CategoryEdit = {
    id: number;
    category_name: string;
}