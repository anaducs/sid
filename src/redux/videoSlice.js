import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recording: false,
  videoUrl: null,
  uploadStatus: "idle",
  shouldUploadinStart: false,
  };
const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    startRecording: (state) => {
      state.recording = true;
      state.uploadStatus = "idle";
    },
    stopRecording: (state, action) => {
      state.recording = false;
      if(state.videoUrl){
        URL.revokeObjectURL(state.videoUrl)
      }
      state.videoUrl = URL.createObjectURL(action.payload)
    },
    uploadStart: (state) => {
      state.uploadStatus = "uploading...";
    },
    uploadSuccess: (state) => {
      state.uploadStatus = "uploaded";
    },
    uploadFailed: (state) => {
      state.uploadStatus = "Failed";
    },
    triggerShouldUploadStart: (state) => {
        state.shouldUploadinStart=true
    },
    resetuploading : (state)=>{
      state.shouldUploadinStart=false
    }
  },
});

export const {
  uploadFailed,
  uploadSuccess,
  uploadStart,
  startRecording,
  stopRecording,
  triggerShouldUploadStart,resetuploading
} = videoSlice.actions;
export default videoSlice.reducer;
