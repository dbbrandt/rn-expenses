import {createSlice} from '@reduxjs/toolkit';

const expenseSlice = createSlice({
    name: 'expenses',
    initialState: {
        expenseData: []
    },
    // With redux toolkit you can mutate state unlike plain redux because the toolkit takes care of it.
    reducers: {
        addExpense: (state, action) => {
            const { id, title, date, amount } = action.payload;
            state.expenseData.push({
                id: id,
                title: title,
                date: date,
                amount: amount,
            });
        },
        updateExpense: (state, action) => {
            const { id, title, date, amount } = action.payload;
            const index = state.expenseData.findIndex(x => x.id === id);
            state.expenseData[index] = {
                id: id,
                title: title,
                date: date,
                amount: amount,
            };
        },
        removeExpense: (state, action) => {
            state.expenseData = state.expenseData.filter((item) => item.id != action.payload.id);
        }
    }
});

export const addExpense = expenseSlice.actions.addExpense;
export const updateExpense = expenseSlice.actions.updateExpense;
export const removeExpense = expenseSlice.actions.removeExpense;
export default expenseSlice.reducer;