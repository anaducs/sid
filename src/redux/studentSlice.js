import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  id: "",
  errormsg : ''
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudentName: (state, action) => {
      state.name = action.payload;
    },
    setStudentId: (state, action) => {
      state.id = action.payload;
    },
    resetStudenName:(state)=>{
      state.name=''
    },
    resetStudentId:(state)=>{
      state.id=''
    },
    setErrormsg:(state,action)=>{
      state.errormsg=action.payload
    },
    resetErrormsg:(state)=>{
      state.errormsg=''
    }
  },
});


export const {setStudentName,setStudentId,setErrormsg,resetErrormsg,resetStudenName,resetStudentId} = studentSlice.actions;
export default studentSlice.reducer;