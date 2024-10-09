import {configureStore} from '@reduxjs/toolkit';
import cartReducer from '../features/cartSlice';
import categoryReducer from '../features/categorySlice';
import productReducer from '../features/productSlice.js'

const store = configureStore({
    reducer: {
        cart: cartReducer,
        category: categoryReducer,
        product: productReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['category/setMenuOpen'], // or any other action type
            },
        }),
});

export default store;