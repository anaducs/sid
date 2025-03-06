import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setStudentName,
  setStudentId,
  setErrormsg,
  resetErrormsg,
  resetStudenName,resetStudentId
} from "../redux/studentSlice";
import {
  triggerShouldUploadStart,
  uploadFailed,
  uploadSuccess,
  uploadStart,
  setCaptureVideoClick 
  ,resetCaptureVideo,resetVideourl
} from "../redux/videoSlice";
import "../styles/components/registrationform.css";
import { api } from "../helper/api";
import { useNavigate } from "react-router-dom";


function RegistrationForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { videoUrl,captureVideoClicked } = useSelector((state) => state.video);
  const { name, id, errormsg } = useSelector((state) => state.student);
  const handleInput = (e) => {
    switch (e.target.name) {
      case "studentName":
        dispatch(setStudentName(e.target.value));
        break;
      case "studentId":
        dispatch(setStudentId(e.target.value));
        break;
    }
  };
  const validation = () => {
    dispatch(resetErrormsg());
    if (!name) {
      dispatch(setErrormsg("name is required"));
      return false;
    } else if (!id) {
      dispatch(setErrormsg("ID is required"));
      return false;
    } else {
      return true;
    }
  };
  useEffect(() => {
    if (errormsg) {
      setTimeout(() => {
        dispatch(resetErrormsg());
      }, 5000);
    }
  }, [errormsg]);

  const handleVideoCAM = () => {
    if (validation()) {
      dispatch(setCaptureVideoClick())
      dispatch(triggerShouldUploadStart());
    }
    
  };
  const handleUpload = async () => {
    if (validation()) {
      if (!videoUrl) {
        dispatch(setErrormsg("there is no video file"));
        return;
      }
        try {
        const response = await fetch(videoUrl);
        const videoBlob = await response.blob();
        const formData = new FormData();
        formData.append("student_name", name);
        formData.append("student_id", id);
        formData.append("file", videoBlob, "video.mp4");

        dispatch(uploadStart())

        const res = await fetch(`${api}/upload`,{method:"POST",body:formData})
        console.log(res);
        

        if(!res.ok){
          dispatch(uploadFailed())
        }else{
         dispatch(resetCaptureVideo())         
         dispatch(uploadSuccess())
         dispatch(resetStudenName())
         dispatch(resetStudentId())
         dispatch(resetVideourl())
         
         
        }


      } catch (error) {
        console.log("error", error);
      }

    }
  };

  return (
    <>
      <div className="formpart">
        <h1>Student Registration</h1>
        <div className="inputs">
          <input
            type="text"
            name="studentName"
            placeholder="Name"
            value={name}
            onChange={handleInput}
          />
          <input
            type="text"
            name="studentId"
            placeholder="University Reg No."
            value={id}
            onChange={handleInput}
          />
          {videoUrl ? (
            <div className="uploadsection">
              <button onClick={handleVideoCAM}>Retake</button>{" "}
              <button onClick={handleUpload}>Register</button>
            </div>
          ) : (
            !captureVideoClicked && <button onClick={handleVideoCAM}>Capture Video</button>
          )}
          {errormsg && <p className="error">{errormsg}</p>}
        </div>
      </div>
    </>
  );
}

export default RegistrationForm;
