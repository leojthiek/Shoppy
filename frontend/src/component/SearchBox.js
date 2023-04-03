import React from "react"
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function SearchBox() {
  const [keyword, setkeyword] = React.useState("")

  const navigate=useNavigate()

  const submitHandler=(e)=>{
    e.preventDefault()
    if(keyword.trim()){
        navigate(`/search/${keyword}`)
    }else{
        navigate('/')
    }
  }
  return (
    <Form onSubmit={submitHandler} className='d-flex'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setkeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type="submit" variant="success">Search</Button>
    </Form>
  )
}
