import "./App.css";
import React, { useState,useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Components/Home/Home";
import QuizQuestions from "./Components/Quiz/QuizQuestions";

import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";

import Userprofile from './Components/UserProfile/Userprofile';
import Lesson from './Components/Lesson/Lesson';
import { loginStatus } from "./utils/loginStatus";

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await loginStatus();
        let userdata = { _id: result._id, name: result.fullName };
        setUser(userdata);
        if (result._id) {
          window.sessionStorage.setItem("userId", result._id);
          window.sessionStorage.setItem("userFullName", result.fullName);
        }
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataAsync();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/quiz/:language/:lessonName" element={<QuizQuestions />} />
          {/* <Route path="/quiz" element={<QuizQuestions questions={questions} />} /> */}
          {/* <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/lesson" element={<Lesson />} />
          <Route path="/profile" element={<Profile />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Add a wildcard route to redirect to the home page for unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />

          <Route path="/userprofile" element={<Userprofile />} />
          <Route path="/lesson/:language" element={<Lesson />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
