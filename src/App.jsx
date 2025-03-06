import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Video from "./components/Video";
import "./styles/App.css";
import StudentRegistration from "./pages/StudentRegistration";

function App() {
  return (
    <Provider store={store}>
     <StudentRegistration/>
    </Provider>
  );
}

export default App;
