import React from "react"
import { Link, useParams } from "react-router-dom"
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../component/message"
import Loader from "../component/loader"

import {
  orderDetailsAction,
  orderDeliverAction,
  orderToPayAction,
} from "../redux/action/orderAction"
import { ORDER_DELIVER_RESET ,ORDER_PAY_RESET} from "../redux/constant/orderConstant"
import axios from "axios"

export default function OrderScreen() {
  const params = useParams()
  const orderId = params.id
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const {cartItems}=cart

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const orderPay=useSelector((state)=>state.orderPay)
  const {success:successPay,loading:loadingPay}=orderPay

  function addDecimal(num) {
    return Math.round((num * 100) / 100).toFixed(2)
  }
  const itemPrice = addDecimal(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )

  const deliverhandler = () => {
    dispatch(orderDeliverAction(order))
  }

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = src
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  React.useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js")

    if (!order || successPay|| successDeliver || order._id !== orderId) {
      dispatch({type:ORDER_PAY_RESET})
      dispatch({ type: ORDER_DELIVER_RESET })
      
      dispatch(orderDetailsAction(orderId))
    }
  }, [dispatch, orderId, order, successDeliver,successPay])

  async function handlePay(e) {
    e.preventDefault()

    const { data } = await axios.post(`/razorpay/pay/${orderId}`)

    const options = {
      key: "rzp_test_DpEiARQNa3GZlP",
      currency: data.currency,
      amount: data.amount.toString(),
      name: "Shoppy",
      description: "Testing Transaction",
      image: "",
      order_id: data.id,
      handler: function () {
         dispatch(orderToPayAction(orderId))
      },
      prefill: {
        name: "leoj",
        email: "example@gmail.com",
        contact: "1111111111",
      },
    }
    const paymentObj= new window.Razorpay(options)
    paymentObj.open()
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h2 className="orderscreen-id">Order {order._id}</h2>
      <Row >
        <Col md={8}>
          <ListGroup variant='flush' >
            <ListGroup.Item className="orderscreen-list-group">
              <h2>Shipping</h2>
              <p>
                <strong>Name : </strong>
                {order.user.name}
              </p>
              <p>
                <a className="orderscreen-email" href={`mailto: ${order.user.email}`}style={{textDecoration:'none'}}>Email :{order.user.email}</a>
              </p>

              <p>
                <strong>Address : </strong>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.country},
                {order.shippingAddress.states},
                {order.shippingAddress.pincode},

              </p>
              {order.isDelivered ? (
                <Message variant='success'>Delivered at :{order.deliveredAt}</Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item className="orderscreen-list-group">
              <h2>Payment Method</h2>
              <p>
                <strong>Method : </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>paid at :{order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item className="orderscreen-list-group">
              <h2>Order Items</h2>
              {order.orderItem.length === 0 ? (
                <Message>No Order Items</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItem.map((item, index) => (
                    <ListGroup.Item key={index} className="orderscreen-list-group">
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
                          <Link to={`/product/${item.product}`} style={{textDecoration:'none'}} className="orderscreen-product-name">
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x Rs-{item.price} = Rs{" "}
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
          <Card className="orderscreen-card-summary">
            <ListGroup variant='flush'>
              <ListGroup.Item className="orderscreen-list-group">
                <h2>Order Summary</h2>
              </ListGroup.Item>

              {/* i forgot to add itemPrice somewhere which is not present in the database so i define itemprice seperately */}
              <ListGroup.Item className="orderscreen-list-group">
                <Row>
                  <Col>Items</Col>
                  <Col> Rs {itemPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="orderscreen-list-group">
                <Row>
                  <Col>Shipping Price</Col>
                  <Col> Rs {order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="orderscreen-list-group">
                <Row>
                  <Col>Total</Col>
                  <Col>Rs {addDecimal(order.totalPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className='orderscreen-pay-button'>
                {loadingPay && <Loader/>}
                {!order.isPaid ? (
                  <Button className="orderscreen-btn" onClick={handlePay}>Proceed to payment</Button>
                ) : (
                  ""
                )}
              </ListGroup.Item>

              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item className='orderscreen-pay-button'>
                    <Button className="orderscreen-btn" type='button' onClick={deliverhandler}>
                      Mark as Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}
