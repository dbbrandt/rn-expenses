// yarn add @reduxjs/toolkit
// yarn add react-redux

import { configureStore } from "@reduxjs/toolkit";
import expenseReReducer from './data';

export const store = configureStore({
    reducer: {
        expenses: expenseReReducer
    }
});

