import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null, // null when no user is logged in, otherwise stores user data
    isAuthenticated: false,
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  }

  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.status = 'loading'
        },
        loginSuccess: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true
            state.status = 'succeeded'
            state.error = null
        },
        loginFailure: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        },
        logout: (state) => {
            state.user = null
            state.isAuthenticated = false
            state.status = 'idle'
            state.error = null
        },
        updateUser: (state, action) => {
            if (state.isAuthenticated) {
                state.user = {...state.user, ...action.payload}
            }
        },
    }
  })

  export const { 
    loginRequest,
    loginSuccess,
    loginFailure,
    logout,
    updateUser,
  } = userSlice.actions

  export default userSlice.reducer