import React, { useState, useEffect } from 'react'
import { Box, Button, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "./categorySlice";
import { CategoriesTable } from './components/CategoriesTable';
import { GridFilterModel } from '@mui/x-data-grid';

export const CategoryList = () => {

    const [rowsPerPage] = useState([10, 25, 50, 100]);
    const [perPage, setPerpage] = useState(10);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const options = { perPage, search, page }

    const { data, isFetching, error } = useGetCategoriesQuery(options);
    const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();
    const { enqueueSnackbar } = useSnackbar();

    function handleOnPageChange(page: number){
        setPage(page + 1);
    }

    function handleOnPageSizeChange(perPage: number){
        setPerpage(perPage);
    }

    function handleFilterChange(filterModel: GridFilterModel){
        if(filterModel.quickFilterValues?.length){
            const search = filterModel.quickFilterValues.join("");
            setSearch(search);
        }
        return setSearch("");
    }
    
    async function handlerDeleteCategory(id: string){
        await deleteCategory({id});
    }

    useEffect(() => {
        if(deleteCategoryStatus.isSuccess){
            enqueueSnackbar(`Category deleted successfully`, {variant: "success"})
        }
        if(deleteCategoryStatus.error){
            enqueueSnackbar(`Category not deleted`, {variant: "error"})
        }
    }, [deleteCategoryStatus, enqueueSnackbar]);

    if(error){
        return <Typography>Error fetching categories</Typography>
    }

    return (
        <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="flex-end">
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/categories/create"
                    style={{ marginBottom: "1rem" }}
                >
                    New Category
                </Button>
            </Box>
            <CategoriesTable 
                data={data}
                isFetching={isFetching}
                perPage={perPage}
                rowsPerPage={rowsPerPage}
                handleDelete={handlerDeleteCategory}         
                handleOnPageChange={handleOnPageChange}     
                handleOnPageSizeChange={handleOnPageSizeChange}   
                handleFilterChange={handleFilterChange}                                                                       
            />
        </Box>
    );
};

