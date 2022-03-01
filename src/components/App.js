import Signup from "./auth/Signup";
import React from "react"
import { AuthProvider } from "../contexts/authContext"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Profile from "./auth/Profile"
import Login from "./auth/Login";
import PrivateRoute from "./auth/privateRoute"
import ForgotPassword from "./auth/ForgotPassword";
import UpdateProfile from "./auth/UpdateProfile";
import Dashboard from "./twodrive/components/Dashboard";


function App() {
  return (
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Drive Routes */}
              <Route path="/" element={
                <PrivateRoute>
                  <Dashboard/>
                </PrivateRoute>
              }/>
              {/*Profile Routes*/}
              <Route path="/profile" element={
                <PrivateRoute>
                  <Profile/>
                </PrivateRoute>
              }/>
              {/*Auth Routes*/}
              <Route path="/update-profile" element={
                <PrivateRoute>
                  <UpdateProfile/>
                </PrivateRoute>
              }/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/forgot-password" element={<ForgotPassword/>}/>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
  )
}

export default App;
