import React from "react"
import { Row, Col, Table, Button } from "react-bootstrap"
import  {useNavigate} from 'react-router-dom'
import { deleteCouponAction, getAllCoupons } from "../redux/action/couponAction"
import { useSelector, useDispatch } from "react-redux"
import Loader from "../component/loader"
import Message from "../component/message"
import AdminSidebar from "../component/adminSidebar"

export default function CouponScreen() {
  const dispatch = useDispatch()
  const navigate=useNavigate()

  const couponList = useSelector((state) => state.couponList)
  const { loading, error, coupons } = couponList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const addCoupon = useSelector((state) => state.addCoupon)
  const { success } = addCoupon

  const couponDelete = useSelector((state) => state.couponDelete)
  const {
    error: deleteError,
    loading:deleteLoading,
    success: deleteSuccess,
  } = couponDelete


  React.useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllCoupons())
    }
  }, [dispatch, userInfo,deleteSuccess,success])

  const handleDelete=(id)=>{
    if (window.confirm("Do you want to delete this coupon completely")) {
        dispatch(deleteCouponAction(id))
  }
}
const handleClick=()=>{
    navigate('/admin/coupon/create')
}



  return (
    <Row>
      <Col md={2}>
      <AdminSidebar/>
      </Col>
      <Col md={10}>
    <div className="coupon-main">
      <Row>
        <Col>
          <h4 className='couponscreen-title'>Coupon List</h4>
        </Col>
        <Col className='d-flex justify-content-end'>
          <Button onClick={handleClick} className='my-3'>
            <i className='fas fa-plus'></i> Create New Coupon
          </Button>
        </Col>
      </Row>

      {deleteLoading && <Loader/>}
      {deleteError && <Message variant='danger'>{deleteError}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table bordered hover responsive className='table-sm'>
          <thead>
            <tr className="couponscreen-table-head">
              <td> COUPON CODE</td>
              <td>PRODUCT ID</td>
              <td>DISCOUNT</td>
              <td>DISCOUNT TYPE</td>
              <td>EXPIRATION DATE</td>
              <td>STATUS</td>


              <td></td>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon._id} className="couponscreen-table-main">
                <td>{coupon.name}</td>
                <td>{coupon.product}</td>
                <td>{coupon.discountAmount}</td>
                <td>{coupon.discountType}</td>
                <td>{coupon.expirationDate.slice(0,10)}</td>
                <td>
                  {new Date(coupon.expirationDate).getTime() >
                  new Date().getTime() ? (
                    <i className='fas fa-circle text-success'></i>
                  ) : (
                    <i className='fas fa-circle text-danger'></i>
                  )}
                </td>
              
                <td>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => handleDelete(coupon._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
    </Col>
    </Row>
  )
}
