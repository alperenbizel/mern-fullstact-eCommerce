import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

export const fetchUserProfile=createAsyncThunk('user/fetchProfile',async(_, thunkAPI)=>{
    try {
        const token =localStorage.getItem('token');
        const res=await axios.get('http://localhost:8000/api/me',{
            headers:{
                Authorization:`Bearer ${token}`
            },
               cache: 'no-store'
        })
        
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

const userSlice=createSlice({
    name:'user',
    initialState:{
        userInfo:null,
        loading:true,
        error:null,
    },
    reducers:{
        logout:(state)=>{
            state.userInfo=null;
            localStorage.removeItem('token')
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUserProfile.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
           
          })
          .addCase(fetchUserProfile.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
          });
    }
})
export const { logout } = userSlice.actions;
export default userSlice.reducer;