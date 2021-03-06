import React, { useRef, useState } from "react";
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { useAuth } from "../../contexts/authContext"
import { Link, useNavigate } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";

export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useNavigate()
    
    function handleSubmit(e){

        e.preventDefault()
        
    
       if (passwordRef.current.value !== passwordConfirmRef.current.value){
           return setError('Passwords do not match.')
       }

       const promises = []
       setLoading(true)
       setError("")

        if (emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            history('/')
        }).catch(() => {
            setError("Failed to update account :(")
        }).finally(() =>{
            setLoading(false)
        })
     }
  return (
    <CenteredContainer>
      <Card>
          <Card.Body>          
              <h2 className='text-center mb-4'>Update Profile</h2>
                {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                  <Form.Group id="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}/> 
                  </Form.Group>
                  <Form.Group id="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep the same"/> 
                  </Form.Group>
                  <Form.Group id="passwordConfirm">
                      <Form.Label>Password Confirmation</Form.Label>
                      <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same"/> 
                  </Form.Group>
                  <Button className="w-100 mt-3" type="submit" disabled={loading}>Update</Button>
              </Form>
          </Card.Body>
      </Card>
        <div className='w-100 text-center mt-2 text-white'><Link to="/profile">Go back? </Link></div>
    </CenteredContainer>
  )
}
