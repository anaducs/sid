import React from "react";
import RegistrationForm from "../components/registrationForm";
import Video from "../components/Video";
import "../styles/StudentRegistration.css";
import { useSelector } from "react-redux";


function StudentRegistration() {
  const {captureVideoClicked} =useSelector((state)=>state.video);
  return (
    <>
      <div className="viewarea">
        <div className={captureVideoClicked ? 'top' :'hidden'}>
          <Video />
        </div>
        <div className="bottom">
          <RegistrationForm />
        </div>
      </div>
    </>
  );
}

export default StudentRegistration;
