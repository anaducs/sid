import { configureStore } from "@reduxjs/toolkit";
import videoReducer from './videoSlice'
import studentReducer from './studentSlice'

const store = configureStore({
    reducer:{
        video:videoReducer,
        student:studentReducer,
    }
})


export default store;