import React from "react"
import { Row, Col, Table, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { deleteOfferAction, getAllOffer } from "../redux/action/offerAction"
import { useSelector, useDispatch } from "react-redux"
import Loader from "../component/loader"
import Message from "../component/message"
import { LinkContainer } from "react-router-bootstrap"
import AdminSidebar from "../component/adminSidebar"

export default function OfferListScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const offerList = useSelector((state) => state.offerList)
  const { loading, error, offers } = offerList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const createOffer = useSelector((state) => state.createOffer)
  const { success } = createOffer

  const offerDelete = useSelector((state) => state.offerDelete)
  const {
    error: deleteError,
    loading: deleteLoading,
    success: deleteSuccess,
  } = offerDelete

  React.useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllOffer())
    }
  }, [dispatch, userInfo, deleteSuccess, success])

  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete this coupon completely")) {
      dispatch(deleteOfferAction(id))
    }
  }
  const handleClick = () => {
    navigate("/admin/offer/create")
  }

  return (
    <Row>
      <Col md={2}>
        <AdminSidebar />
      </Col>
      <Col md={10}>
        <div className='coupon-main'>
          <Row>
            <Col>
              <h4 className='couponscreen-title'>Offer List</h4>
            </Col>
            <Col className='d-flex justify-content-end'>
              <Button onClick={handleClick} className='my-3'>
                <i className='fas fa-plus'></i> Create New Offer
              </Button>
            </Col>
          </Row>

          {deleteLoading && <Loader />}
          {deleteError && <Message variant='danger'>{deleteError}</Message>}

          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Table bordered hover responsive className='table-sm'>
              <thead>
                <tr className='couponscreen-table-head'>
                  <td>OFFER ID</td>
                  <td>OFFER TITLE</td>
                  <td>CATEGORY</td>
                  <td>DISCOUNT PERCENTAGE</td>
                  <td>STATUS</td>

                  <td></td>
                </tr>
              </thead>
              <tbody>
                {offers.map((offer) => (
                  <tr key={offer._id} className='couponscreen-table-main'>
                    <td>{offer._id}</td>
                    <td>{offer.title}</td>
                    <td>{offer.category}</td>
                    <td>{offer.discountPercentage}</td>
                    <td>
                      {new Date(offer.endDate).getTime() >
                      new Date().getTime() ? (
                        <i className='fas fa-circle text-success'></i>
                      ) : (
                        <i className='fas fa-circle text-danger'></i>
                      )}
                    </td>

                    <td>
                      <LinkContainer to={`/admin/offer/${offer._id}`}>
                        <Button
                          variant='light'
                          className='btn-sm'
                          style={{ color: "black" }}
                        >
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      &nbsp;
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => handleDelete(offer._id)}
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
