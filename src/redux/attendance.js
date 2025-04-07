import { createSlice } from "@reduxjs/toolkit";

const initialState={
present:0,
color:"green",
students:[],
totalStrength:0
}

const attendanceSlice = createSlice({
    name:'attendance',
    initialState,
    reducers:{
        setPresent:(state,action)=>{
            state.present=action.payload
        },
        setTotalStrength:(state,action)=>{
            state.totalStrength=action.payload
        },
        resetPresent:(state)=>{
            state.present=0
        },
        setColor:(state,action)=>{
            state.color=action.payload
        },
        setStudents:(state,action)=>{
            state.students = action.payload
        }
    }
})
export const {
    setPresent,resetPresent,setColor,setStudents,setTotalStrength
}=attendanceSlice.actions;

export default attendanceSlice.reducer