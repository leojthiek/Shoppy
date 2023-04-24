import React from "react"
import { Form, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import FormContainer from "../component/formContainer"
import { saveShippingAddress } from "../redux/action/cartAction"
import CheckOutSteps from "../component/checkoutSteps"
import Message from "../component/message"

export default function ShippingScreen() {
  //  const cart=useSelector(state => state.cart)
  //  const {shippingAddress}=cart
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [address, setAddress] = React.useState("")
  const [city, setCity] = React.useState("")
  const [pincode, setPincode] = React.useState("")
  const [country, setCountry] = React.useState("")
  const [states, setStates] = React.useState("")
  const [pincodeError,setPincodeError]=React.useState('')

  const statesInIndia = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ]

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, pincode, country,states }))
    navigate("/payment")
  }

  function handlePincodeChange(e) {
    const pin = e.target.value;
    setPincode(pin);
    if (pin.length !== 6 || !/^\d+$/.test(pin)) {
      setPincodeError('pincode is invalid and should be atleast 6 Number length');
      return
    }else{
      setPincodeError('')
    }
  }
  

  return (
    <div className="shipping-container">
    <FormContainer>
      <div className="shipping-step">
      <CheckOutSteps step1 step2 />

      </div>
      <h1 className="shipping-title">SHIPPING CHECKOUT</h1>

      <Form onSubmit={handleSubmit} className="shipping-form">
        <Form.Group controlId='address' className="shipping-address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
            autoComplete="false"
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country' className="shipping-country">
          <Form.Label>Country</Form.Label>
          <Form.Select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value=''>Select...</option>
            <option value='india'>India</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId='state' className="shipping-state">
          <Form.Label>State</Form.Label>
          <Form.Select
            type='text'
            placeholder='Enter State'
            value={states}
            required
            onChange={(e) => setStates(e.target.value)}
          >
            <option value=''>Select state ...</option>
            {statesInIndia.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId='city' className="shipping-city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter City'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
            autoComplete="false"

          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='pincode' className="shipping-pin">
          <Form.Label>Pin Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Pin code'
            value={pincode}
            required
            onChange={handlePincodeChange}
            autoComplete="false"

          ></Form.Control>
        </Form.Group>
        {pincodeError && <Message variant='danger'>{pincodeError}</Message>}
       <div className="shipping-div">
       <Button className='shipping-btn' type='submit' variant='primary'>
          continue
        </Button>
       </div>
       
      </Form>
    </FormContainer>
    </div>
  )
}
