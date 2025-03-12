import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Video from "./components/Video";
import "./styles/App.css";
import StudentRegistration from "./pages/StudentRegistration";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
        
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<StudentRegistration />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
