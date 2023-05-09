import React from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../component/message"
import Loader from "../component/loader"
import FormContainer from "../component/formContainer"
import { getSingleOffer, updateOfferAction } from "../redux/action/offerAction"
import { UPDATE_OFFER_RESET } from "../redux/constant/offerConstant"

export default function OfferEditScreen() {
  const { id } = useParams()
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [title, setTitle] = React.useState("")
  const [titleValidate, setTitleValidate] = React.useState("")

  const [category, setCategory] = React.useState("")
  const [categoryValidate, setCategoryValidate] = React.useState("")

  const [discountPercentage, setDiscountPercentage] = React.useState(0)
  const [discountPercentageValidate, setDiscountPercentageValidate] =
    React.useState("")

  const [startDate, setStartDate] = React.useState("")
  const [startDateValidate, setStartDateValidate] = React.useState("")

  const [endDate, setEndDate] = React.useState("")
  const [endDateValidate, setEndDateValidate] = React.useState("")

  const getOffer = useSelector((state) => state.getOffer)
  const { offer, loading, error } = getOffer


  const offerUpdate = useSelector((state) => state.offerUpdate)
  const {
    success: updateSuccess,
    loading: loadingupdate,
    error: errorUpdate,
  } = offerUpdate

  React.useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: UPDATE_OFFER_RESET })
      navigate("/admin/offers")
    } else {
      if (!offer.title) {
        dispatch(getSingleOffer(id))
      } else {
        setTitle(offer.title)
        setCategory(offer.category)
        setDiscountPercentage(offer.discountPercentage)
        setStartDate(offer.startDate)
        setEndDate(offer.endDate)
      }
    }
  }, [
    dispatch,
    offer.title,
    offer.category,
    offer.discountPercentage,
    offer.startDate,
    offer.endDate,
    id,
    navigate,
    updateSuccess,
  ])

  const submitHandler = (e) => {
    e.preventDefault()

    if (!title || title === "") {
      setTitleValidate("Title is required")
      return
    }
    if (!category || category === "") {
      setCategoryValidate("Category is required")
      return
    }
    if (!discountPercentage || discountPercentage === "") {
      setDiscountPercentageValidate(" percentage is required")
      return
    }
    if (
      startDate &&
      startDate !== "" &&
      startDate < new Date().toISOString().slice(0, 10)
    ) {
      setStartDateValidate("Start date should not be in the past")
      return
    }
      // if (endDate && endDate !== "" && endDate < new Date().toISOString().slice(0, 10)) {
      //   setEndDateValidate("End Date should not be in the past")
      //   return
      // }
    dispatch(
      updateOfferAction({
        id,
        title,
        category,
        discountPercentage,
        startDate,
        endDate,
      })
    )
  }

  return (
    <div className='product-edit-screen'>
      <Link
        to='/admin/productlist'
        className='btn btn-danger rounded py-2 mt-5'
      >
        Go Back
      </Link>
      <FormContainer>
        <h1 className='edit-product-title'>Edit Offer Details</h1>

        {loadingupdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler} className='form-container'>
            <Form.Group className='mt-4'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {titleValidate && (
              <p className='coupon-validate'>{titleValidate}</p>
            )}

            <Form.Group className='mt-4'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {categoryValidate && (
              <p className='coupon-validate'>{categoryValidate}</p>
            )}

            <Form.Group controlId='discountType' className='mt-4'>
              <Form.Label>Dicount Percentage</Form.Label>
              <Form.Control
                type='number'
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {discountPercentageValidate && (
              <p className='coupon-validate'>{discountPercentageValidate}</p>
            )}

            <Form.Group className='mt-4'>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type='date'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {startDateValidate && (
              <p className='coupon-validate'>{startDateValidate}</p>
            )}

            <Form.Group className='mt-4'>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type='date'
                placeholder='Enter expiration date'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>
            {endDateValidate && (
              <p className='coupon-validate'>{endDateValidate}</p>
            )}
            <div className='couponcreateOffer-btn-div'>
              <Button className='couponcreateOffer-btn' type='submit'>
                Add Offer
              </Button>
            </div>
          </Form>
        )}
      </FormContainer>
    </div>
  )
}
