import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
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
    setStudentEmail:(state,action)=>{
      state.email = action.payload;
    },
    resetStudenName:(state)=>{
      state.name=''
    },
    resetStudentId:(state)=>{
      state.id=''
    },
    resetStudentEmail:(state)=>{
      state.email=''
    }
    ,
    setErrormsg:(state,action)=>{
      state.errormsg=action.payload
    },
    resetErrormsg:(state)=>{
      state.errormsg=''
    }
  },
});


export const {setStudentName,setStudentEmail,setStudentId,setErrormsg,resetStudentEmail,resetErrormsg,resetStudenName,resetStudentId} = studentSlice.actions;
export default studentSlice.reducer;