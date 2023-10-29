import { Box, Paper, Typography } from "@mui/material";
import * as React from 'react';
import { useParams } from "react-router-dom";
import { Category, useGetCategoryQuery, useUpdateCategoryMutation } from "./categorySlice";
import { useEffect, useState } from "react";
import { CategoryForm } from "./components/CategoryForm";
import { useSnackbar } from "notistack"

export const CategoryEdit = () => {

    const id = useParams().id || "";
    const { data: category, isFetching } = useGetCategoryQuery({ id });
    const [updateCategory, status] = useUpdateCategoryMutation();
    const [categoryState, setCategoryState] = useState<Category>({
        id: "",
        name: "",
        description: "",
        is_active: false,
        created_at: ""
    });

    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setCategoryState({ ...categoryState, [name]: value });
    }

    const handleToogle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.target;
        setCategoryState({ ...categoryState, [name]: checked });
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        await updateCategory(categoryState);
    }

    useEffect(() => {
        if(category){
            setCategoryState(category.data);
        }
    }, [category]);

    useEffect(() => {
        if(status.isSuccess){
            enqueueSnackbar("Success updating category", { variant: "success" })
        }
        if(status.error){
            enqueueSnackbar("Category not updated", { variant: "error" });
        }
    }, [enqueueSnackbar, status.error, status.isSuccess]);

    return (
        <Box>
            <Paper>
                <Box p={2}>             
                    <Box mb={2}>
                        <Typography variant="h4">Edit Category</Typography>
                    </Box>
                </Box>

                <CategoryForm
                    category={categoryState}
                    isdisabled={status.isLoading}
                    isLoading={false}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    handleToogle={handleToogle}
            />
            </Paper>
        </Box>
    );
};