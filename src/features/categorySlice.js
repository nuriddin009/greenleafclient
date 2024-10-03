import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../utils/instance.js';

// Async thunk to fetch categories from the API
export const fetchCategories = createAsyncThunk('category/fetchCategories', async () => {
    const response = await instance.get('/v1/category');
    return response.data.elements;
});

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        isMenuOpen: false,
        status: 'idle', // Tracks loading status
        error: null, // Handles errors
    },
    reducers: {
        setMenuOpen: (state) => {
            state.isMenuOpen = true;
        },
        closeMenu: (state) => {
            state.isMenuOpen = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload; // Store fetched categories
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

// Export the actions to be used in the component
export const { setMenuOpen, closeMenu } = categorySlice.actions;

// Export the reducer to be added to the store
export default categorySlice.reducer;