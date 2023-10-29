import React from 'react'
import { Results } from '../../../types/Category'
import { DataGrid, GridColDef, GridFilterModel, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Box, IconButton, Typography } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  data: Results | undefined;
  perPage: number;
  isFetching: boolean;
  rowsPerPage?: number[];

  handleOnPageChange: (page: number) => void;
  handleFilterChange: (filterModel: GridFilterModel) => void;
  handleOnPageSizeChange: (pageSize: number) => void;
  handleDelete: (id: string) => void;
}

export function CategoriesTable({
  data,
  perPage,
  isFetching,
  rowsPerPage,
  handleOnPageChange,
  handleFilterChange,
  handleOnPageSizeChange,
  handleDelete
}: Props) {

  const slotProps = {
    toolbar: {
      showQuickFilter: true,
      QuickFiltersProps: { debounceMs: 500 }
    },
  };

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
          onClick={() => handleDelete(params.value)}
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

function mapDataToGridRows(data: Results){
  const { data: categories } = data;
  return categories.map((category) => ({
    id: category.id,
    name: category.name,
    isActive: category.is_active,
    created_at: new Date(category.created_at).toLocaleDateString("pt-BR"),
  }));
}

const rows = data ? mapDataToGridRows(data) : [];
const rowCount = data?.meta.total ?? 0;

return (
    <Box sx={{ display: "flex", height: 600 }}>
        <DataGrid 
            rows={rows}
            columns={columns}
            pagination={true}
            pageSizeOptions={[perPage]}
            slots={{ toolbar: GridToolbar }}
            slotProps={slotProps}
            filterMode={"server"}
            paginationMode={"server"}
            loading={isFetching}
            rowCount={rowCount}
            disableColumnFilter={true}
            disableColumnSelector={true}
            disableRowSelectionOnClick={true}
            disableDensitySelector={true}
            checkboxSelection={false}
        />
    </Box>
);

}
