import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Category{
    id: string;
    name: string;
    description: string;
    is_active: boolean;
    created_at: string;
};

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
        createCategory(state, action){},
        updateCategory(state, action){},
        deleteCategory(state, action){},
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