import { configureStore, createSlice} from '@reduxjs/toolkit';
// import authSlice from '../features/auth/authSlice';

const authSlice = createSlice({
  name: 'auth',
  initialState:{
    isLoggedIn:false,
    adminisLoggedIn:false,
   
  },
  reducers: {
    login(state){
      state.isLoggedIn = true
    },
    logout(state){
      state.isLoggedIn = false
      localStorage.removeItem("userId")
    },
    adminLogin(state){
      state.adminisLoggedIn = true
     
    },
    adminLogout(state){
      state.adminisLoggedIn = false
      localStorage.removeItem("userId")
    },
  }

})
export const  authActions = authSlice.actions
export  const store = configureStore({
  reducer: authSlice.reducer,
  
});
