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

  const [paymentMethod, setPaymentMethod] = React.useState("paypal")

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(savePaymentMethod({ paymentMethod }))
    navigate("/placeorder")
  }

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 step3 />

      <h1>Payment Method</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>

          <Col>
            <Form.Check
              type='radio'
              label='paypal or creditcard'
              id='paypal'
              value='paypal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
             <Form.Check
              type='radio'
              label='Stripe'
              id='stripe'
              value='stripe'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button className='payment-btn' type='submit' variant='primary'>
          continue
        </Button>
      </Form>
    </FormContainer>
  )
}
