import { createSlice } from '@reduxjs/toolkit'

 

export const homeSlice = createSlice({
  name: 'home',
  initialState:{
    url:{  },
    genres:{}
  },
  reducers: {
     getApiConfigruration:(state,action)=>{
        state.url=action.payload;
     },
     getGeners:(state,action)=>{
        state.genres=action.payload;
     }
  },
})

// Action creators are generated for each case reducer function
export const { getGeners,   getApiConfigruration} = homeSlice.actions

export default homeSlice.reducer