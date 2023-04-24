import React from "react"
import { useNavigate } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"
import { Form, Button, Row, Col, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../component/message"
import Loader from "../component/loader"
import {
  userDetailsAction,
  updateUserProfileAction,
} from "../redux/action/userAction"
import { listMyOrderAction } from "../redux/action/orderAction"
import { USER_UPDATE_PROFILE_RESET } from "../redux/constant/userConstant"

export default function ProfileScreen() {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  // const [password, setPassword] = React.useState("")
  // const [confirmPassword, setConfirmPassword] = React.useState("")
  // const [message, setMessage] = React.useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userDetails = useSelector((state) => state.userDetails)
  const { error, loading, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const updatedUser = useSelector((state) => state.userUpdate)
  const { success } = updatedUser

  const orderListMy = useSelector((state) => state.orderListMy)
  const { orders, loading: loadingOrders, error: errorOrders } = orderListMy

  React.useEffect(() => {
    if (!userInfo) {
      navigate("/login")
    } else {
      if (!user.name) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(userDetailsAction("profile"))
        dispatch(listMyOrderAction())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [navigate, userInfo, dispatch, user, success])

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(updateUserProfileAction({ id: user._id, name, email }))
  }

  return (
    <div className='profilescreen-container'>
      <Row>
        <Col md={3} className='profilescreen-user'>
          <h2 className='profilescreen-user-title'>User Profile</h2>
          {success && <Message variant='success'>Profile updated</Message>}
          {/* {message && <Message variant='danger'>{message}</Message>} */}
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler} className='py-3'>
            <Form.Group controlId='name' className='profilescreen-name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
              disabled
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email' className='profilescreen-email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                 disabled
                type='emil'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* <Form.Group controlId='password' className="profilescreen-password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='ConfirmPassword' className="profilescreen-confirmpassord">
            <Form.Label> Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group> */}

            {/* <div className='profilescreen-btn-div'>
              <Button
                className='profilescreen-btn'
                type='submit'
                variant='primary'
              >
                Update
              </Button> */}
            {/* </div> */}
          </Form>
        </Col>

        <Col md={9}>
          <h2 className="profilescreen-order-title">My Orders</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message>{errorOrders}</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr className="profilescreen-order-head">
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="profilescreen-order-row">
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          "N/A"
                        )
                      ) : (
                        <p>No</p>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          "N/A"
                        )
                      ) : (
                        <p>No</p>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button variant='danger' className='btn-sm rounded'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </div>
  )
}
