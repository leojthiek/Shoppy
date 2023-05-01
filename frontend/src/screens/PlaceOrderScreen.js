import React from "react"
import { Button, Row, Col, ListGroup, Image, Card, Form } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import Message from "../component/message"
import CheckoutSteps from "../component/checkoutSteps"
import { Link, useNavigate } from "react-router-dom"
import { orderCreateAction } from "../redux/action/orderAction"
import { applyCouponAction } from "../redux/action/couponAction"
import Loader from "../component/loader"

export default function PlaceOrderScreen() {
  const [name, setName] = React.useState("")
  const [validateCoupon,setValidateCoupon]=React.useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart)

  function addDecimal(num) {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  const applyCoupon = useSelector((state) => state.applyCoupon)
  const { loading: loadingCoupon, error: errorCoupon, coupon } = applyCoupon

  cart.itemPrice = addDecimal(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )

  cart.shippingPrice = addDecimal(cart.itemPrice > 500 ? 0 : 59)

  cart.totalPrice = addDecimal(
    Number(cart.itemPrice) + Number(cart.shippingPrice)
  )

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, error, success } = orderCreate

  if (coupon) {
    if (coupon.discountType === "percentage") {
      cart.totalPrice = addDecimal(
        cart.totalPrice - (cart.totalPrice * coupon.discountAmount) / 100
      )
    } else if (coupon.discountType === "fixed") {
      cart.totalPrice = addDecimal(cart.totalPrice - coupon.discountAmount)
    }
  }

  React.useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`)
    }
  }, [navigate, order, success])

  const handleSubmit = () => {
    dispatch(
      orderCreateAction({
        orderItem: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemPrice: cart.itemPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }


  const handleCoupon = (e) => {
    e.preventDefault()


  
    if(!coupon){
      if (window.confirm("Please confirm,Once coupon applied cannot be undone")) {
        dispatch(applyCouponAction(name))
        setName('')
          
      }
  
    
    }
  }

  return (
    <div className='placeorderscreen-main'>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item className='placeorderscreen-shipping'>
              <h2 className='placeorderscreen-shipping-title'>Shipping</h2>
              <p>
                <strong>Address : </strong>
                {cart.shippingAddress.address},{cart.shippingAddress.city},
                {cart.shippingAddress.country},{cart.shippingAddress.states},{" "}
                {cart.shippingAddress.pincode},
              </p>
            </ListGroup.Item>

            <ListGroup.Item className='placeorderscreen-payment'>
              <h2 className='placeorderscreen-payment-title'>Payment Method</h2>
              <strong>Method :</strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item className='placeorderscreen-order'>
              <h2 className='placeorderscreen-order-title'>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item
                      key={index}
                      className='placeorderscreen-items'
                    >
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image[0]}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link
                            to={`/product/${item.product}`}
                            style={{ textDecoration: "none" }}
                            className='placeorderscreen-name'
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x Rs-{item.price} = Rs-{" "}
                          {addDecimal(`${item.qty * item.price}`)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card className='placeorderscreen-card'>
            <ListGroup variant='flush'>
              <ListGroup.Item className='placeorderscreen-summary'>
                <h2 className='placeorderscreen-summary-title'>
                  Order Summary
                </h2>
              </ListGroup.Item>
              <ListGroup.Item className='placeorderscreen-summary'>
                <Row>
                  <Col>Items</Col>
                  <Col>Rs-{cart.itemPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className='placeorderscreen-summary'>
                <Row>
                  <Col>Shipping Price</Col>
                  <Col>Rs-{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              {coupon && (
                <ListGroup.Item className='placeorderscreen-summary'>
                  <Row>
                    <Col>
                      Coupon Applied (
                      {coupon.discountType === "fixed"
                        ? `Rs-${coupon.discountAmount}`
                        : `${coupon.discountAmount}%`}
                      )
                    </Col>
                    <Col>
                      
                      {coupon.discountType === "percentage"
                        ? addDecimal((cart.itemPrice * coupon.discountAmount) / 100)
                        : coupon.discountAmount}
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
           

              <ListGroup.Item className='placeorderscreen-summary'>
                <Row>
                  <Col>Total</Col>
                  <Col>Rs-{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className='placeorderscreen-summary'>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item className='placeorderscreen-btn-div'>
                <Button
                  type='button'
                  className='placeorderscreen-btn'
                  disabled={cart.cartItems === 0}
                  onClick={handleSubmit}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>

            {loadingCoupon && <Loader />}
            {errorCoupon && <Message variant='danger'>{errorCoupon}</Message>}
            <ListGroup >
              <ListGroup.Item className="placeorderscreen-coupon">
                <Form onSubmit={handleCoupon} >
                  <Form.Label style={{color:'white'}}>Enter Coupon Code Here</Form.Label>
                  <div className="placeorderscreen-coupon-main">
                  <Form.Control 
                    type='input'
                    style={{ backgroundColor: "white", color: "black" }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                  <Button type='submit' className='placeorderscreen-coupon-btn'>
                    Apply
                  </Button>
                  </div>
                 
                </Form>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
