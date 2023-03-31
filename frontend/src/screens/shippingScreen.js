import React from "react"
import { Form, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import FormContainer from "../component/formContainer"
import { saveShippingAddress } from "../redux/action/cartAction"
import CheckOutSteps from "../component/checkoutSteps" 

export default function ShippingScreen() {
  //  const cart=useSelector(state => state.cart)
  //  const {shippingAddress}=cart
   const dispatch=useDispatch()
   const navigate=useNavigate()


  const [address, setAddress] = React.useState('')
  const [city, setCity] = React.useState('')
  const [postalCode, setPostalCode] = React.useState('')
  const [country, setCountry] = React.useState('')


  function handleSubmit(e){
   e.preventDefault()
   dispatch(saveShippingAddress({address,city,postalCode,country}))
   navigate('/payment')
  }

  return (
    <FormContainer>
        <CheckOutSteps step1 step2 />
      <h1>Shipping</h1>

      <Form onSubmit={handleSubmit}>

        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter City'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Postal code'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button className="py-3 rounded" type="submit" variant="primary">continue</Button>
  
      </Form>
    </FormContainer>
  )
}
