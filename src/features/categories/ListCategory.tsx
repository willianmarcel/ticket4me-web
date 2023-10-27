import { Box, Button, IconButton, Typography } from "@mui/material";
import * as React from 'react';
import { useAppSelector } from "../../app/hooks";
import { selectCategories } from "./categorySlice";
import { Link } from "react-router-dom";
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import DeleteIcon from "@mui/icons-material/Delete";

export const CategoryList = () => {

    const categories = useAppSelector(selectCategories);

    const columns: GridColDef[] = [
        { 
            field: 'name', 
            headerName: 'Name', 
            flex: 1,
            renderCell: renderNameCell
        },
        { 
            field: 'is_active', 
            headerName: 'Active', 
            flex: 1,
            type: "boolean",
            renderCell: renderIsActiveCell
        },
        { 
            field: 'created_at', 
            headerName: 'Created At', 
            flex: 1
        },
        { 
            field: 'id', 
            headerName: 'Actions', 
            flex: 1,
            renderCell: renderActionCell
        },
    ];

    function renderNameCell(params: GridRenderCellParams){
        return (
            <Link
                style={{ textDecoration: "none" }}
                to={`/categories/edit/${params.id}`}    
            >
                <Typography color="primary">{params.value}</Typography>
            </Link>
        );
    }

    function renderActionCell(params: GridRenderCellParams){
        return (
            <IconButton
                color="secondary"
                onClick={() => console.log("clicked")}
                aria-label="delete"    
            >
                <DeleteIcon />
            </IconButton>
        );
    }

    function renderIsActiveCell(row: GridRenderCellParams){
        return (
            <Typography color={row.value ? "primary" : "secondary"}>
                {row.value ? "Active" : "Inactive"}
            </Typography>
        );
    }

    const rows = categories.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description,
        is_active: category.is_active,
        created_at: new Date(category.created_at).toLocaleDateString('pt-BR')
    }))

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
            <Box sx={{ display: "flex", height: 600 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        }
                    }}
                    disableColumnFilter={true}
                    disableColumnSelector={true}
                    disableRowSelectionOnClick={true}
                    disableDensitySelector={true}
                    pageSizeOptions={[5]}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: {
                          showQuickFilter: true,
                          quickFilterProps: { debounceMs: 500 }
                        },
                      }}
                />
            </Box>
        </Box>
    );
};

