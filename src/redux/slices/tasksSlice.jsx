import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tasks: [],
  statusFilter: 'all',
  priorityFilter: 'all',
  categoryFilter: 'all',
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.unshift(action.payload)
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
      const taskId = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === taskId);

      if (taskIndex !== -1) {
        const task = state.tasks[taskIndex];
        const updatedTask = { ...task, completed: !task.completed };

        state.tasks.splice(taskIndex, 1);

        if (updatedTask.completed) {
          state.tasks.push(updatedTask);
        } else {
          state.tasks.unshift(updatedTask);
        }
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
  setTasks,
  addTask,
  editTask,
  deleteTask,
  toggleTaskStatus,
  setStatusFilter,
  setPriorityFilter,
  setCategoryFilter,
 } = tasksSlice.actions

export default tasksSlice.reducer