import { Box, Paper, Typography } from "@mui/material";
import * as React from 'react';
import { useState } from "react";
import { Category } from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";

export const CategoryCreate = () => {

    const [isdisabled, setIsdisabled] = useState(false);
    const [category, setCategory] = useState<Category>({
        id: "",
        name: "",
        description: "",
        is_active: false,
        created_at: ""
    });

    const handleChange = (e: any) => {}
    const handleToogle = (e: any) => {}

    return (
        <Box>
        <Paper>
            <Box p={2}>             
                <Box mb={2}>
                    <Typography variant="h4">Create Category</Typography>
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