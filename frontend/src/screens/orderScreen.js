import React from "react"
import { Link, useParams } from "react-router-dom"
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../component/message"
import Loader from "../component/loader"
import { orderDetailsAction } from "../redux/action/orderAction"

export default function OrderScreen() {
  const params = useParams()
  const orderId = params.id
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  React.useEffect(() => {
    dispatch(orderDetailsAction(orderId))
    // dispatch(orderToPayAction(orderId))
  }, [dispatch, orderId])

  function addDecimal(num) {
    return Math.round((num * 100) / 100).toFixed(2)
  }
  const itemPrice = addDecimal(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )

  async function handlePay(e) {
    e.preventDefault()

    const options = {
      key: "rzp_test_DpEiARQNa3GZlP",
      amount: parseInt(order.totalPrice * 100),
      currency: "INR",
      name: "Shoppy",
      description: "test transaction",
      order_id: order.id,
      handler: function (response) {
        alert(response.razorpay_payment_id)
        alert(response.razorpay_order_id)
        alert(response.razorpay_signature)
      },
      prefill: {
        name: "leoj",
        email: "example@gmail.com",
        contact: "111111111",
      },
      theme: {
        color: "#F37254",
      },
    }

    const razorpay = new window.Razorpay(options)

    razorpay.open()
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h2>Order {order._id}</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name : </strong>
                {order.user.name}
              </p>
              <p>
                <a href={`mailto: ${order.user.email}`}>{order.user.email}</a>
              </p>

              <p>
                <strong>Address : </strong>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country},
              </p>
              {order.isDelivered ? (
                <Message variant='success'>paid On {order.deliveredAt}</Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method : </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>paid On {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItem.length === 0 ? (
                <Message>No Order Items</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItem.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${" "}
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
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              {/* i forgot to add itemPrice somewhere which is not present in the data base so i define itemprice seperately */}
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col> Rs {itemPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping Price</Col>
                  <Col> Rs {order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col> Rs {order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>Rs {addDecimal(order.totalPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className='d-grid'>
                <Button onClick={handlePay}>Proceed to payment</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}
