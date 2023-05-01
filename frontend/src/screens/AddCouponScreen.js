import React from "react"
import { useNavigate ,Link} from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import FormContainer from "../component/formContainer"
import { useSelector, useDispatch } from "react-redux"
import Loader from "../component/loader"
import Message from "../component/message"
import { addCouponAction } from "../redux/action/couponAction"

export default function AddCouponScreen() {
  const [name, setName] = React.useState("")
  const [nameValidate, setNameValidate] = React.useState("")

  const [product, setProduct] = React.useState("")
  const [productValidate, setProductValidate] = React.useState("")

  const [discountAmount, setDiscountAmount] = React.useState(0)
  const [discountAmountValidate, setDiscountAmountValidate] = React.useState("")

  const [discountType, setDiscountType] = React.useState("")
  const [discountTypeValidate, setDiscountTypeValidate] = React.useState("")

  const [expirationDate, setExpirationDate] = React.useState("")
  const [expirationDateValidation, setExpirationDateValidation] =
    React.useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addCoupon = useSelector((state) => state.addCoupon)
  const { loading, error } = addCoupon

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || name === "") {
      setNameValidate("Coupon name is required")
      return
    }
    if (!product || product === "") {
      setProductValidate("Product Id is required")
      return
    }
    if (!discountAmount || discountAmount === "") {
      setDiscountAmountValidate("Amount or percentage is required")
      return
    }
    if (!discountType || discountType === "") {
      setDiscountTypeValidate("choose one of its type")
      return
    }
    if (!expirationDate || expirationDate === "") {
      setExpirationDateValidation("Expired Date is required")
      return
    }

    dispatch(
      addCouponAction({
        name,
        product,
        discountAmount,
        discountType,
        expirationDate,
      })
    )

    navigate("/admin/coupons")
  }

  return (
    <div className='couponcreate-main'>
       <Link
        to='/admin/coupons'
        className='btn btn-dark rounded py-2 mt-3'
      >
        Go Back
      </Link>
      <FormContainer>
        <div className="pt-4">
        <h1 className="couponcreate-title">Create a new Coupon</h1>

        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mt-4">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter coupon name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {nameValidate && <p className='coupon-validate'>{nameValidate}</p>}

            <Form.Group className="mt-4">
              <Form.Label>Product</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Product ID'
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {productValidate && (
              <p className='coupon-validate'>{productValidate}</p>
            )}

            <Form.Group controlId='discountType' className="mt-4">
              <Form.Label>Discount type</Form.Label>
              <Form.Select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
              >
                <option value=''>Select...</option>
                <option value='percentage'>percentage</option>
                <option value='fixed'>fixed</option>
              </Form.Select>
            </Form.Group>
            {discountTypeValidate && (
              <p className='coupon-validate'>{discountTypeValidate}</p>
            )}

            <Form.Group className="mt-4">
              <Form.Label>Discount Amount or Percentage</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter amount or percenage'
                value={discountAmount}
                onChange={(e) => setDiscountAmount(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {discountAmountValidate && (
              <p className='coupon-validate'>{discountAmountValidate}</p>
            )}

            <Form.Group className="mt-4">
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control
                type='date'
                placeholder='Enter expiration date'
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
              />
            </Form.Group>
            {expirationDateValidation && (
              <p className='coupon-validate'>{expirationDateValidation}</p>
            )}
         <div className="couponcreate-btn-div">
         <Button className="couponcreate-btn" type='submit'>Add Coupon</Button>

         </div>
          </Form>
        )}
      </FormContainer>
    </div>
  )
}
