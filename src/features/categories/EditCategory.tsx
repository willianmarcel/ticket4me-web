import { Box, Paper, Typography } from "@mui/material";
import * as React from 'react';
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCategoryById } from "./categorySlice";
import { useState } from "react";
import { CategoryForm } from "./components/CategoryForm";

export const CategoryEdit = () => {

    const id = useParams().id || "";
    const category = useAppSelector((state) => selectCategoryById(state, id))
    const [isdisabled, setIsdisabled] = useState(false);

    const handleChange = (e: any) => {}
    const handleToogle = (e: any) => {}

    return (
        <Box>
            <Paper>
                <Box p={2}>             
                    <Box mb={2}>
                        <Typography variant="h4">Edit Category</Typography>
                    </Box>
                </Box>

                <CategoryForm
                    category={category}
                    isdisabled={isdisabled}
                    isLoading={false}
                    onSubmit={() => {}}
                    handleChange={handleChange}
                    handleToogle={handleToogle}
            />
            </Paper>
        </Box>
    );
};