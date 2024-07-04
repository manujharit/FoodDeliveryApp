import { configureStore } from "@reduxjs/toolkit"
import locationReducer from './locationSlice.js'
import cartReducer from './cartSlice.js'

const appStore = configureStore({
    reducer: {
        location: locationReducer,
        cart: cartReducer
    }
})


export default appStore;
