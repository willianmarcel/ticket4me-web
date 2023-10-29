export interface Results{
    meta: Meta;
    data: Category[]
}

export interface Result{
    data: Category;
    meta: Meta;
}

export interface Category{
    id: string;
    name: string;
    description: null | string;
    is_active: boolean;
    created_at: string;
}

export interface Meta{
    current_page: number;
    per_page: number;
    total: number
}

export interface CategoryParams{
    page?: number;
    perPage?: number;
    search?: string;
    isActive?: boolean;
}