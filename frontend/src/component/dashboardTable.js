import React, { useEffect } from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Table, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../component/loader"
import Message from "../component/message"
import { allOrderListAction } from "../redux/action/orderAction"

export default function LatestTransaction() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const allOrders = useSelector((state) => state.allOrders)
  const { orders, error, loading } = allOrders

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(allOrderListAction())
    } else {
      navigate("/login")
    }
  }, [dispatch, navigate, userInfo])

  const paidOrders = orders && orders.filter((order) => order.isPaid)

  

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table bordered hover responsive className='table-sm'>
            <thead>
              <tr className='orderlist-head'>
                <td>PAYMENT ID</td>
                <td>PRODUCT</td>
                <td>CLIENT</td>
                <td>DATE</td>
                <td>AMOUNT</td>
                <td>PAID</td>
              </tr>
            </thead>
            <tbody>
              {paidOrders.map((order) => (
                
                <tr key={order._id} className='orderlist-row'>
                  <td>{order.paymentId.toString()}</td>
                  {order.orderItem.map((item)=> <td key={item._id}>{item.name}</td>)}
                  <td>
                    {order.user.name ? order.user.name.toString() : "Unknown"}
                  </td>
                  <td>{order.paidAt?.substring(0, 10)}</td>
                  <td>{order.totalPrice.toString()}</td>
                  <td>
                    {order.isPaid ? (
                      <i className='fas fa-check' style={{ color: "green" }} />
                    ) : (
                      <i className='fas fa-times' style={{ color: "red" }} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}
