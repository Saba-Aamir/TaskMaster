import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './slices/tasksSlice'
import categoriesReducer from './slices/categoriesSlice'
import userReducer from './slices/userSlice'

export default configureStore({
  reducer: {
    tasks: tasksReducer,
    categories: categoriesReducer,
    user: userReducer,
  }
});