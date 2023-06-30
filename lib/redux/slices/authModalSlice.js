import { createSlice } from "@reduxjs/toolkit";

export const authModalSlice = createSlice({
  name: 'authModal',
  initialState: 'hiden',
  reducers: {
    showLogin: (state) => { return state = "login" },
    showRegister: (state) => { return state = "register" },
    hide: (state) => { return state = 'hiden' }
  }
})

export const { showLogin, showRegister, hide } = authModalSlice.actions

export default authModalSlice.reducer