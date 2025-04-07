import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setStudentName,
  setStudentId,
  setStudentEmail,
  resetStudentEmail,
  setErrormsg,
  resetErrormsg,
  resetStudenName,
  resetStudentId,
} from "../redux/studentSlice";
import {
  triggerShouldUploadStart,
  uploadFailed,
  uploadSuccess,
  uploadStart,
  setCaptureVideoClick,
  resetCaptureVideo,
  resetVideourl,
  setStartTimer,
  resetStartTimer,
} from "../redux/videoSlice";
import "../styles/components/registrationform.css";
import { api } from "../helper/api";

function RegistrationForm() {
  const dispatch = useDispatch();
  const { videoUrl, captureVideoClicked, startTimer } = useSelector(
    (state) => state.video
  );
  const { name, email, id, errormsg } = useSelector((state) => state.student);
  const handleInput = (e) => {
    switch (e.target.name) {
      case "studentName":
        dispatch(setStudentName(e.target.value));
        break;
      case "studentId":
        dispatch(setStudentId(e.target.value));
        break;
      case "studentEmail":
        dispatch(setStudentEmail(e.target.value));
        break;
    }
  };
  const validation = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    dispatch(resetErrormsg());
    if (!name) {
      dispatch(setErrormsg("name is required"));
      return false;
    } else if (!id) {
      dispatch(setErrormsg("ID is required"));
      return false;
    }else if (!email){
      dispatch(setErrormsg("email is required"));
      return false;
    } else if (!emailRegex.test(email)) {
      dispatch(setErrormsg("Invalid email format"));
      return false;}else {
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
      dispatch(resetStartTimer());
      dispatch(setCaptureVideoClick());
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
        formData.append("student_email",email);
        formData.append("file", videoBlob, "video.mp4");
        dispatch(resetStartTimer());
        dispatch(uploadStart());

        const res = await fetch(`${api}/upload`, {
          method: "POST",
          body: formData,
        });
        const resData = await res.json()
        console.log(resData);
        
        if (!res.ok) {
          dispatch(uploadFailed());
          dispatch(setErrormsg(resData.detail || "upload failed"))
        } else {
          dispatch(resetCaptureVideo());
          dispatch(uploadSuccess());
          dispatch(resetStudenName());
          dispatch(resetStudentId());
          dispatch(resetStudentEmail());
          dispatch(resetVideourl());
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
            type="email"
            name="studentEmail"
            placeholder="Email"
            value={email}
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
              <button disabled={startTimer} onClick={handleUpload}>
                Register
              </button>
            </div>
          ) : (
            !captureVideoClicked && (
              <button onClick={handleVideoCAM}>Capture Video</button>
            )
          )}
          {errormsg && <p className="error">{errormsg}</p>}
        </div>
      </div>
    </>
  );
}

export default RegistrationForm;
