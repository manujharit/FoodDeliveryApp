import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
    name: 'location',
    initialState: {
        coords: {
            lat: '',
            lng: ''
        }
    },
    reducers: {
        changeLocation: (state, action) => {
            state.coords = { ...state.coords, lat: action.payload.lat, lng: action.payload.lng }
        }
    }
})

export const {changeLocation} =locationSlice.actions
export default locationSlice.reducer