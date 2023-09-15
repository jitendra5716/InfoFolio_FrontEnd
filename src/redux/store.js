import { configureStore } from "@reduxjs/toolkit";
import { userReducers } from "./userReducer";

export const store = configureStore({
    reducer:{
        userReducers
    }
});