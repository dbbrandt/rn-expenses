import {createSlice} from '@reduxjs/toolkit';

const expenseSlice = createSlice({
    name: 'expenses',
    initialState: {
        expenseData: []
    },
    // With redux toolkit you can mutate state unlike plain redux because the toolkit takes care of it.
    reducers: {
        addSomeData: (state, action) => {
            const { id, title, date, amount } = action.payload;
            state.expenseData.push({
                id: action.payload.id,
                title: title,
                date: date,
                amount: amount,
            });
        },
        removeSomeData: (state, action) => {
            state.someData = state.someData.filter((item) => item.id != action.payload.id);
        }
    }
});

export const addExpense = expenseSlice.actions.addSomeData;
export const removeSomeData = expenseSlice.actions.removeSomeData;
export default expenseSlice.reducer;