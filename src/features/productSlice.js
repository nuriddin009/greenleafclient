import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import instance from '../utils/instance.js';


export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
    const response = await instance.get('/v1/product');
    return response.data.elements;
});

export const searchProducts = createAsyncThunk('product/searchProducts',
    async (searchTerm) => {
        const response = await instance.get(`/v1/product?search=${searchTerm}`);
        return response.data.elements;
    });

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        status: 'idle',
        error: null,
    },
    reducers: {}, // Add synchronous reducers if needed
    extraReducers: (builder) => {
        // Handle fetchProducts
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload; // Set products to fetched data
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Handle searchProducts
            .addCase(searchProducts.pending, (state) => {
                state.status = 'loading'; // You might want to keep loading state separately for search
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload; // Update products with search results
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default productSlice.reducer;