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
    <Form onSubmit={submitHandler} className='search-box'>
      <Form.Control className="search-box-input"
        type='text'
        name='q'
        onChange={(e) => setkeyword(e.target.value)}
        placeholder='Search Products...'
      ></Form.Control>
      <Button type="submit" className="search-box-button"  variant="danger">Search</Button>
    </Form>
  )
}
