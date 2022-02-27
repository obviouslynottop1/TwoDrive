import Signup from "./Signup";
import React from "react"
import { Container } from 'react-bootstrap'
import { AuthProvider } from "../contexts/authContext"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./privateRoute";

function App() {
  return (
    
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
      >
      
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <PrivateRoute exact path="/" element={<Dashboard/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
        
      </div>
      
    </Container>
    


  )
}

export default App;
