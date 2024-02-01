import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./states/categorySlice";

export const store = configureStore({
    reducer: {
        categoryReducer: categorySlice
    }
})