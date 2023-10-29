import { Box, Button, FormControl, FormControlLabel, FormGroup, Grid, Switch, TextField } from '@mui/material'
import React from 'react'
import { Category } from '../categorySlice';
import { Link } from 'react-router-dom';

type Props = {
    category: Category;
    isdisabled?: boolean;
    isLoading?: boolean;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleToogle: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function CategoryForm({
    category,
    isdisabled = false,
    isLoading = false,
    handleSubmit,
    handleChange,
    handleToogle
}:Props) {
    
    return (
        <Box p={2}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                name="name"
                                label="Name"
                                value={category.name}
                                disabled={isdisabled}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                name="description"
                                label="Description"
                                value={category.description}
                                disabled={isdisabled}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        name="is_active"
                                        color="secondary"
                                        onChange={handleToogle}
                                        checked={category.is_active}
                                        inputProps={{ "aria-label": "controlled" }}
                                    />
                                }
                                label="Active"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" gap={2}>
                            <Button variant="contained" component={Link} to="/categories">Back</Button>
                            <Button type="submit" variant="contained" color="secondary" disabled={isdisabled}>Save</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>

                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}
