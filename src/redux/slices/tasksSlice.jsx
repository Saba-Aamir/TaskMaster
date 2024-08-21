import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tasks: [
    { id: 1, title: 'Complete project report', category: 'Work', completed: false },
    { id: 2, title: 'Grocery shopping', category: 'Personal', completed: false },
    { id: 3, title: 'Attend team meeting', category: 'Work', completed: true },
    { id: 4, title: 'Read a book', category: 'Personal', completed: false },
    { id: 5, title: 'Plan weekend trip', category: 'Personal', completed: false },
    { id: 6, title: 'Submit expense report', category: 'Work', completed: true },
  ],
  statusFilter: 'all',
  priorityFilter: 'all',
  categoryFilter: 'all',
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload)
    },
    editTask: (state, action) => {
      const { id, updatedTask } = action.payload
      const index = state.tasks.findIndex(task => task.id === id)
      if (index !== -1) {
        state.tasks[index] = {...state.tasks[index], ...updatedTask}
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
    },
    toggleTaskStatus: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload)
      if (task) {
        task.status = task.status === 'complete' ? 'incomplete' : 'complete'
      }
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload
    },
    setPriorityFilter: (state, action) => {
      state.priorityFilter = action.payload
    },
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { 
  addTask,
  editTask,
  deleteTask,
  toggleTaskStatus,
  setStatusFilter,
  setPriorityFilter,
  setCategoryFilter,
 } = tasksSlice.actions

export default tasksSlice.reducer