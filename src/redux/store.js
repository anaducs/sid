import { configureStore } from "@reduxjs/toolkit";
import videoReducer from './videoSlice'
import studentReducer from './studentSlice'
import attendanceSlice from './attendance'

const store = configureStore({
    reducer:{
        video:videoReducer,
        student:studentReducer,
        attendance:attendanceSlice
    }
})


export default store;