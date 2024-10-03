import {createSlice} from '@reduxjs/toolkit';

const loadCart = () => {
    const savedCart = localStorage.getItem('basket');
    return savedCart ? JSON.parse(savedCart) : [];
};

const loadWishlist = () => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
};

const initialState = {
    items: loadCart(),
    wishlist: loadWishlist(),
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const exists = state.items.some(item => item.id === action.payload.id);
            if (!exists) {
                state.items.push({...action.payload, quantity: 1});
                localStorage.setItem('basket', JSON.stringify(state.items));
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            localStorage.setItem('basket', JSON.stringify(state.items));
        },
        toggleFavorite: (state, action) => {
            const exists = state.wishlist.some(item => item.id === action.payload.id);
            if (exists) {
                state.wishlist = state.wishlist.filter(item => item.id !== action.payload.id);
            } else {
                state.wishlist.push(action.payload);
            }
            localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
        },
        changeQuantity: (state, action) => {
            const {id, increment} = action.payload;
            const existingItem = state.items.find(item => item.id === id);

            if (existingItem) {
                const newQuantity = existingItem.quantity + increment;
                existingItem.quantity = Math.max(newQuantity, 1);
            }

            localStorage.setItem('basket', JSON.stringify(state.items));
        },
    },
});

export const {addToCart, removeFromCart, toggleFavorite, changeQuantity} = cartSlice.actions;
export default cartSlice.reducer;