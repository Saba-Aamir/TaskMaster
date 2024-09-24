import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [
        { id: 1, name: 'Work' },
        { id: 2, name: 'Personal' },
        { id: 3, name: 'Health' },
        { id: 4, name: 'Shopping' },
        { id: 5, name: 'Travel' },
    ],
    priorities: [
        { id: 1, name: 'Low' },
        { id: 2, name: 'Medium' },
        { id: 3, name: 'High' },
    ],
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategory: (state, action) => {
            state.categories.push(action.payload)
        },
        editCategory: (state, action) => {
            const { id, updatedCategory } = action.payload
            const index = state.categories.findIndex(cat => cat.id === id)
            if (index !== -1) {
                state.categories[index] = {...state.categories[index], ...updatedCategory}
            }
        },
        deleteCategory: (state, action) => {
            state.categories = state.categories.filter(cat => cat.id !== action.payload)
        },
    }
})

export const { addCategory, editCategory, deleteCategory } = categoriesSlice.actions

export default categoriesSlice.reducer