import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import { Circle ,Line} from "rc-progress";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setColor,
  setPresent,
  resetPresent,
  setStudents,
  setTotalStrength,
} from "../redux/attendance";
import { api } from "../helper/api";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalWorkingDays = 80
  const { color, present, students, totalStrength } = useSelector(
    (state) => state.attendance
  );

  const [value, setValue] = useState(0);

  useEffect(() => {
    getAttendace();
    getStudents();
    

    return () => {
      dispatch(resetPresent());
    };
  }, []);

  useEffect(() => {
    
    const attendancePercent = (present / totalStrength) * 100;
    setValue(attendancePercent);
    if (attendancePercent >= 70) {
      dispatch(setColor("green"));
    } else if (attendancePercent < 70 && attendancePercent >= 50) {
      dispatch(setColor("orange"));
    } else if (attendancePercent < 50) {
      dispatch(setColor("red"));
    }
    dispatch(setTotalStrength(students.length));
    
  }, [present, students]);

  
  const getAttendace = async () => {
    const res = await fetch(`${api}/attendance/today`, {
      method: "GET",
    });
    const resData = await res.json();
    
   resData.attendance === 'No attendance yet' ? dispatch(setPresent(0)):dispatch(setPresent(resData.attendance.length))

    
    
    
  };

  const getStudents = async () => {
    const preres = await fetch(`${api}/students`, {
      method: "GET",
    });
    const res = await preres.json();
    dispatch(setStudents(res.students));
  };

  const openCamera = async()=>{
    await fetch(`${api}/detect`,{
      method:"GET"
    })
    setTimeout(()=>{
      getAttendace()
    },50000)
  }


  return (
    <>
      <div className="grid-container">
        <div className="left-side">
          <div className="today"onClick={()=>{
              navigate('/today-attendance')
            }} >
            <Circle
              percent={value}
              strokeWidth={5}
              trailWidth={4}
              strokeColor={color}
            />
            <div className="inside" onClick={()=>{
              navigate('/today-attendance')
            }}>
              <p>
                {present}/{totalStrength}
              </p>
            </div>
            <h3 className="below">Today's Strength</h3>
          </div>
          <div className="start-attendance">
            <button className="Camera" onClick={openCamera}>START ATTENDANCE</button>
          </div>
        </div>

        <div className="right-side">
          <div className="student-list">
            {totalStrength === 0 ? (
              <p>No students</p>
            ) : (
              students.map((student) => (
                <div key={student.student_id} className="list" onClick={()=>{
                  
                }}>
                  <p>{student.student_name}</p> <div className="SUB"><Line percent={(student.attendance_count / totalWorkingDays ) * 100} 
  strokeWidth={4}
  trailWidth={4}
  strokeColor="#4caf50"/>{student.attendance_count}/{totalWorkingDays}</div> 
                </div>
              ))
            )}
          </div>
          <div className="start-attendance-r">
            <button className="start" onClick={()=>{navigate(`/register`)}}>ADD STUDENTS</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
