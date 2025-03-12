import React, { useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import {  
  startRecording,
  stopRecording,
  resetuploading,
  setStartTimer,
  resetStartTimer
} from "../redux/videoSlice";
import '../styles/components/video.css'
import Timer from "./Timer";


function Video() {
  const timer = 25000
 
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const dispatch = useDispatch();
  const { uploadStatus } = useSelector(
    (state) => state.video
  );
  const { name, id } = useSelector((state) => state.student);
  const { shouldUploadinStart,videoUrl,startTimer} = useSelector((state) => state.video);
  const handleRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    dispatch(startRecording());

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    const chunks = [];

    mediaRecorder.ondataavailable = (event) => chunks.push(event.data);

    mediaRecorder.onstop = () => {
      if (chunks.length > 0) {
        const blob = new Blob(chunks, { type: "video/mp4" });
        dispatch(stopRecording(blob));
      }
      dispatch(resetuploading()) // recording reset
    };

    mediaRecorder.start()
    dispatch(setStartTimer())

    setTimeout(() => {
      mediaRecorder.stop();
      stream.getTracks().forEach((track) => track.stop());
      dispatch(resetStartTimer())
    }, timer);
  };


  useEffect(() => {
    if (shouldUploadinStart) {
      handleRecording();
    }
  }, [shouldUploadinStart]);

  return (
    <>

      {shouldUploadinStart && 
       <div className="preview">
        <video ref={videoRef} autoPlay className="videoarea" /> 
        {startTimer&& <Timer timer={timer}/>}
        <h4>show both sides and front of your face</h4>
       </div>}
      
      {videoUrl && !shouldUploadinStart && 
      <div className="preview">
        <h3>Preview</h3>
        <video src={videoUrl} autoPlay loop className="videoarea" />
      </div>
      }
      <div className="bottom">
      {videoUrl && uploadStatus && uploadStatus !== 'idle' && <p>{uploadStatus}</p>}

      </div>
      
    </>
  );
}

export default Video;
