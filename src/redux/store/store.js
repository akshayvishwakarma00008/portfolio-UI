import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../slices/AppTheme/AppTheme"

const store = configureStore({
    reducer:{
        theme: themeReducer
    }
});

export default store;