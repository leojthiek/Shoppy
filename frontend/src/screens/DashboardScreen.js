import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import Offcanvas from "react-bootstrap/Offcanvas"
import AdminSidebar from "../component/adminSidebar"
import { useMediaQuery } from "@material-ui/core"
import { Row, Col, Navbar } from "react-bootstrap"
import Widget from "../component/widget"
import Progress from "../component/progress"
import Charts from "../component/charts"
import LatestTransaction from "../component/dashboardTable"
import { useSelector , useDispatch} from "react-redux"
import { countUserAction, userListAction } from "../redux/action/userAction"
import { allOrderListAction, countOrderAction } from "../redux/action/orderAction"
import { getBalance, getBalanceCountAction } from "../redux/action/razorpayAction"

export default function DashboardScreen() {
  const [show, setShow] = useState(false)
  const isSmallScreen = useMediaQuery("(max-width:987px)") // check if screen size is less than or equal to 600px

  const dispatch = useDispatch()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const userList = useSelector((state)=> state.userList)
  const {users} = userList
 const count = users && users.length

 const allOrders = useSelector((state)=>state.allOrders)
 const {orders} = allOrders
 const Ordercount = orders && orders.length

 const razorpayBalance = useSelector((state)=> state.razorpayBalance)
 const {balance}= razorpayBalance

 const userCount = useSelector((state)=> state.userCount)
 const {user}=userCount

 const orderCount=useSelector((state)=>state.orderCount)
 const {orderItem} = orderCount

 const razorpayBalanceCount = useSelector((state)=>state.razorpayBalanceCount)
 const {balanceCount}=razorpayBalanceCount



 React.useEffect(()=>{
   dispatch(userListAction())
   dispatch(allOrderListAction())
   dispatch(getBalance())
   dispatch(countUserAction())
   dispatch(countOrderAction())
   dispatch(getBalanceCountAction())
 },[dispatch])

  return (
    <Row className='dashboard-screen'>
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
        // render normal sidebar for big screens
        <Col md={2} sm={12} xs={12} className='sidebar-col'>
          <div className='sidebar-large'>
            <AdminSidebar />
          </div>
        </Col>
      )}
      <Col md={10} sm={12} xs={12} className='dashboard-widget'>
        <Widget type='users' count={count}/>
        <Widget type='orders' count={Ordercount}/>
        <Widget type='earnings' count={balance}/>
        <Widget type='balance' />
        <Progress type='user' item={user}/>
        <Progress type='order' item={orderItem}/>
        <Progress type='earning'item={balanceCount}/>
        
        <Charts />
      </Col>
      <Row>
        <h2 className='transaction-title'>Lastest Transaction </h2>
        <Col md={12} className='transaction-main'>
          <LatestTransaction />
        </Col>
      </Row>
    </Row>
  )
}
