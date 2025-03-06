import React from 'react'
import RegistrationForm from '../components/registrationForm'
import Video from '../components/Video'
import '../styles/StudentRegistration.css'

function StudentRegistration() {
  return (
    <>
    <div className="viewarea">
    <Video/>
    <RegistrationForm />
    </div>
   
    </>
    
  )
}

export default StudentRegistration