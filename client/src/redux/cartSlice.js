import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        restaurants: {},
        totalAmount: 0
    },
    reducers: {
        addItem: (state, action) => {
            const { restaurantId, item } = action.payload;
            if (!state.restaurants[restaurantId]) {
                state.restaurants[restaurantId] = {
                    info: item.restaurantInfo || {},
                    items: {}
                };
            }
            if (state.restaurants[restaurantId].items[item.id]) {
                state.restaurants[restaurantId].items[item.id].quantity++;
            } else {
                state.restaurants[restaurantId].items[item.id] = { ...item, quantity: 1 };
            }
            state.totalAmount += (item.price / 100 || item.defaultPrice / 100);
        },
        removeItem: (state, action) => {
            const { restaurantId, itemId } = action.payload;
            if (state.restaurants[restaurantId] && state.restaurants[restaurantId].items[itemId]) {
                const item = state.restaurants[restaurantId].items[itemId];
                state.totalAmount -= (item.price / 100 || item.defaultPrice / 100) * item.quantity; 
                delete state.restaurants[restaurantId].items[itemId];
                if (Object.keys(state.restaurants[restaurantId].items).length === 0) {
                    delete state.restaurants[restaurantId];
                }
            }
        },
        updateQuantity: (state, action) => {
            const { restaurantId, itemId, quantity } = action.payload;
            if (state.restaurants[restaurantId] && state.restaurants[restaurantId].items[itemId]) {
                const item = state.restaurants[restaurantId].items[itemId];
                if (item.price || item.defaultPrice) { 
                    state.totalAmount += (quantity - item.quantity) * (item.price / 100 || item.defaultPrice / 100); 
                }
                item.quantity = quantity;
                if (quantity === 0) {
                    delete state.restaurants[restaurantId].items[itemId];
                    if (Object.keys(state.restaurants[restaurantId].items).length === 0) {
                        delete state.restaurants[restaurantId];
                    }
                }
            }
        },
        clearCart: (state) => {
            state.totalAmount = 0; 
            state.restaurants = {};
        }
    }
});

export const { addItem, removeItem, updateQuantity, setRestaurant, clearCart } = cartSlice.actions;

export default cartSlice.reducer;