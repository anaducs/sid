import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recording: false,
  videoUrl: null,
  uploadStatus: "idle",
  shouldUploadinStart: false,
  captureVideoClicked : false,
  startTimer:false
  };
const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setStartTimer:(state)=>{
      state.startTimer=true;
    },
    resetStartTimer:(state)=>{
      state.startTimer=false;
    },
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
    },
    setCaptureVideoClick:(state)=>{
      state.captureVideoClicked=true
    },
    resetCaptureVideo:(state)=>{
      state.captureVideoClicked=false
    },
    resetVideourl:(state)=>{
      state.videoUrl=null
    }
  },
});

export const {
  setStartTimer,resetStartTimer,
  uploadFailed,
  uploadSuccess,
  uploadStart,
  startRecording,
  stopRecording,
  triggerShouldUploadStart,resetuploading,setCaptureVideoClick,resetCaptureVideo,resetVideourl
} = videoSlice.actions;
export default videoSlice.reducer;
