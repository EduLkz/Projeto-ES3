import { configureStore } from "@reduxjs/toolkit";
import logReducer from './slices/logSlice'

export default configureStore({
    reducer: {
        isLogged: logReducer
    }
})