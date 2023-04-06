import React from "react"
import { Link,useNavigate } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../component/message"
import Loader from "../component/loader"
import { login } from "../redux/action/userAction"
import FormContainer from "../component/formContainer"

export default function LoginScreen({history}) {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const userLogin=useSelector(state=>state.userLogin)
  const {error,loading,userInfo}=userLogin
  const redirect=window.location.search ? window.location.search.split('=')[1]:'/'


  React.useEffect(()=>{
     if(userInfo){
       navigate(redirect)
     }else{
      setPassword('')
     }
  },[navigate,redirect,userInfo])

  const submitHandler=(e)=>{
      e.preventDefault()
      dispatch(login(email,password))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader/>}
      <Form onSubmit={submitHandler}autoComplete='off' >
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">Sign In</Button>
      </Form>
       
      <Row className="py-3">
        <Col>New Customer ? {''}
        <Link to={redirect ? `/register?redirect=${redirect}`: '/register'}>
            Register
        </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}
