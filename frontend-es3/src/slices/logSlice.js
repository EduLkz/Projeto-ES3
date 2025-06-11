import { createSlice } from "@reduxjs/toolkit";

export const logSlice = createSlice({
    name: 'isLogged',
    initialState: {
        value: false,
        userType: 0,
        driverCoord: []
    },
    reducers: {
        setLogged: (state, action) => {
            state.value = action.payload;
        },
        setUserType: (state, action) => {
            state.userType = action.payload;
        },
        setDriverCoord: (state, action) => {
            state.driverCoord = action.payload;
        },
    }
})

export const { setLogged, setUserType, setDriverCoord } = logSlice.actions

export default logSlice.reducer