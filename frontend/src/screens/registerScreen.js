import React from "react"
import { Link,useNavigate } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../component/message"
import Loader from "../component/loader"
import { registerAction } from "../redux/action/userAction"
import FormContainer from "../component/formContainer"

export default function RegisterScreen() {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [message,setMessage]=React.useState(null)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const userRegister=useSelector(state=>state.userRegister)
  const {error,loading,userInfo}=userRegister
  const redirect=window.location.search ? window.location.search.split('=')[1]:'/'




  React.useEffect(()=>{
     if(userInfo){
       navigate(redirect)
     }
  },[navigate,redirect,userInfo])

  const submitHandler=(e)=>{
      e.preventDefault()
    
      if(password !== confirmPassword){
        setMessage('password do not match')
      }
      dispatch(registerAction(name,email,password))
   }

   const handleGoogleRegister=()=>{
    window.open("http://localhost:5000/auth/google", '_self')
   }

  return (
    <div className="register-form">
    <FormContainer>
      <h1 className="register-title">Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader/>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          {/* <Form.Label>Name</Form.Label> */}
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br/>
        <Form.Group controlId='email'>
          {/* <Form.Label>Email Address</Form.Label> */}
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br/>

        <Form.Group controlId='password'>
          {/* <Form.Label>Password</Form.Label> */}
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br/>

        <Form.Group controlId='ConfirmPassword'>
          {/* <Form.Label> Confirm Password</Form.Label> */}
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <div className="d-grid py-4">
        <Button className="rounded" type="submit" variant="primary">Register</Button>

        </div>
      </Form>
      <div className="text-center">
        <p>or</p>
      </div>
      <div className="d-grid">
        <Button className="rounded" onClick={handleGoogleRegister}>Register with Google</Button>
      </div>
       
      <Row className="py-3">
        <Col>Have an Account? {''}
        <Link to={redirect ? `/login?redirect=${redirect}`: '/login'} className="register">
            Login
        </Link>
        </Col>
      </Row>
    </FormContainer>
    </div>
  )
}
