import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { apiSlice } from "../api/apiSlice";
import { CategoryParams, Result, Results } from "../../types/Category";

export interface Category{
    id: string;
    name: string;
    description: string;
    is_active: boolean;
    created_at: string;
};

const endpointUrl: string = "/categories";

function parseQueryParams(params: CategoryParams){
    const query = new URLSearchParams();

    if(params.page){
        query.append("page", params.page.toString());
    }

    if(params.perPage){
        query.append("per_page", params.perPage.toString());
    }

    if(params.search){
        query.append("search", params.search.toString());
    }

    if(params.isActive){
        query.append("is_active", params.isActive.toString());
    }

    return query.toString();
}

function getCategories({ page = 1, perPage = 10, search = "" }) {
    const params = { page, perPage, search, isActive: true };

    return `${endpointUrl}?${parseQueryParams(params)}`;
}

function deleteCategoryMutation(category: Category){
    return {
        url: `${endpointUrl}/${category.id}`,
        method: "DELETE"
    };
}

function createCategoryMutation(category: Category){
    return { 
        url: endpointUrl, 
        method: "POST", 
        body: category 
    };
}

function updateCategoryMutation(category: Category){
    return { 
        url: `${endpointUrl}/${category.id}`,
        method: "PUT", 
        body: category 
    };
}

function getCategoryQuery({id}:{id: string}) {
    return `${endpointUrl}/${id}`;
}


export const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: ({query, mutation}) => ({
        getCategories: query<Results, CategoryParams>({
            query: getCategories,
            providesTags: ["Categories"]
        }),
        getCategory: query<Result, {id: string}>({
            query: getCategoryQuery,
            providesTags: ["Categories"]
        }),
        createCategory: mutation<Result, Category>({
            query: createCategoryMutation,
            invalidatesTags: ["Categories"]
        }),
        deleteCategory: mutation<Result, {id: string}>({
            query: deleteCategoryMutation,
            invalidatesTags: ["Categories"]
        }),
        updateCategory: mutation<Result, Category>({
            query: updateCategoryMutation,
            invalidatesTags: ["Categories"]
        })
    }),
});

const category: Category = {
    id: "a57c127b-8bbb-4da9-a52d-0e85182c4b1f",
    name: "Teste 7",
    description: "teste de description",
    is_active: true,
    created_at: "2023-10-26T23:10:27.680666"
};

export const initialState = [
    category, 
    { ...category, id: "157c127b-8bbb-4da9-a52d-0e85182c4b1f", name: "globo", description: "teste 8", is_active: true },
    { ...category, id: "257c127b-8bbb-4da9-a52d-0e85182c4b1f", name: "cultura", description: "teste 9", is_active: true },
    { ...category, id: "357c127b-8bbb-4da9-a52d-0e85182c4b1f", name: "teste 10", description: "teste 10", is_active: false }
];

const categoriesSlice = createSlice({
    name: "categories",
    initialState: initialState,
    reducers:{
        createCategory(state, action){
            state.push(action.payload);
        },
        updateCategory(state, action){
            const index = state.findIndex((category) => category.id === action.payload.id);
            state[index] = action.payload;
        },
        deleteCategory(state, action){
            const index = state.findIndex((category) => category.id === action.payload.id);
            state.splice(index, 1);
        },
    }
});

export const selectCategories = (state: RootState) => state.categories;

export const selectCategoryById = (state: RootState, id: string) => {
    const category = state.categories.find((category) => category.id == id);
    return category || {
        id: "",
        name: "",
        description: "",
        is_active: false,
        created_at: ""
    };
}

export default categoriesSlice.reducer;

export const { 
    createCategory, 
    updateCategory, 
    deleteCategory 
} = categoriesSlice.actions;

export const { 
    useGetCategoriesQuery, 
    useGetCategoryQuery,
    useDeleteCategoryMutation, 
    useCreateCategoryMutation,
    useUpdateCategoryMutation
} = categoriesApiSlice;