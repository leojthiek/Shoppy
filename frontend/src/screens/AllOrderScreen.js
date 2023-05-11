import React from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Table, Button, Col,Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../component/loader"
import Message from "../component/message"
import { allOrderListAction } from "../redux/action/orderAction"
import AdminSidebar from "../component/adminSidebar"
import { Offcanvas } from "react-bootstrap"
import { useMediaQuery } from "@mui/material"

export default function AllOrderListScreen() {

  const [show, setShow] = React.useState(false)
  const isSmallScreen = useMediaQuery("(max-width:987px)")


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const allOrders = useSelector((state) => state.allOrders)
  const { orders, error, loading } = allOrders

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  React.useEffect(() => {

    if (userInfo && userInfo.isAdmin) {
      dispatch(allOrderListAction())
    } else {
      navigate("/login")
    }

  }, [dispatch, navigate, userInfo])

  return (
    <Row>
      {isSmallScreen ? ( // render offcanvas component only for small screens
        <div>
          <Button
            className='sidebar-menu'
            variant='primary'
            onClick={handleShow}
          >
            menu
          </Button>

          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <Offcanvas.Body>
              <AdminSidebar />
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      ) : (
        <Col md={2}>
          <AdminSidebar />
        </Col>
      )}
    <Col md={10}>
    <div className="pt-4">
    <h1 className="orderlist-title">Orders list :</h1>

    </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table  bordered hover responsive className='table-sm'>
          <thead>
            <tr className="orderlist-head">
              <td>ID</td>
              <td>USER</td>
              <td>DATE</td>
              <td>TOTAL</td>
              <td>PAID</td>
              <td>DELIVERED</td>

              <td></td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="orderlist-row">
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>

                <td>{order.createdAt?.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                 <td>
                  {order.isPaid ? (
                      <i className="fas fa-check"></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: "red" }}></i>
                  )}
                </td>

                <td>
                  {order.isDelivered ? (
                    <i className="fas fa-check"/>
                  ) : (
                    <i className='fas fa-times' style={{ color: "red" }}></i>
                  )}
                </td> 
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      
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
  )
}
