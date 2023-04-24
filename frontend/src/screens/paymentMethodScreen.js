import React from "react"
import { Form, Button, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import FormContainer from "../component/formContainer"
import { savePaymentMethod } from "../redux/action/cartAction"
import CheckOutSteps from "../component/checkoutSteps"

export default function PaymentMethodScreen() {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!shippingAddress) {
    navigate("/login/shipping")
  }

  const [paymentMethod, setPaymentMethod] = React.useState('')

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate("/placeorder")
  }

  return (
    <div className="paymentscreen-main">
    <FormContainer>
      <CheckOutSteps step1 step2 step3 />

      <h1 className="paymentscreen-title">Payment Method</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label as='legend' className="paymentscreen-title">Select Method</Form.Label>

          <Col>
            <Form.Check className="paymentscreen-radio"
              type='radio'
              label='Razorpay'
              id='Razorpay'
              value='Razorpay'
              name="paymentMethod"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
             <Form.Check className="paymentscreen-radio"
              type='radio'
              label='COD'
              id='COD'
              value='COD'
              name="paymentMethod"    
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
         <div className="paymentscreen-btn-div">
         <Button className='paymentscreen-btn' type='submit' variant='primary'>
          continue
        </Button>
         </div>
       
      </Form>
    </FormContainer>
    </div>
  )
}
