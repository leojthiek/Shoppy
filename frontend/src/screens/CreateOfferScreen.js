import React from "react"
import { useNavigate, Link } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import FormContainer from "../component/formContainer"
import { useSelector, useDispatch } from "react-redux"
import Loader from "../component/loader"
import Message from "../component/message"
import { createOfferAction } from "../redux/action/offerAction"
import { productCategoryAction } from "../redux/action/ProductAction"

export default function CreateOfferScreen() {
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
  const [endDateValidation, setEndDateValidation] = React.useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const createOffer = useSelector((state) => state.createOffer)
  const { loading, error } = createOffer

  const productCategory = useSelector((state) => state.productCategory)
  const { categories } = productCategory

  const handleSubmit = (e) => {
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
    if (
      endDate &&
      endDate !== "" &&
      endDate < new Date().toISOString().slice(0, 10)
    ) {
      setEndDateValidation("End Date should not be in the past")
      return
    }

    dispatch(
      createOfferAction({
        title,
        category,
        discountPercentage,
        startDate,
        endDate,
      })
    )

    navigate("/admin/offers")
  }

  React.useEffect(() => {
    dispatch(productCategoryAction())
  }, [dispatch])

  return (
    <div className='couponcreateOffer-main'>
      <Link to='/admin/offers' className='btn btn-dark rounded py-2 mt-3'>
        Go Back
      </Link>
      <FormContainer>
        <div className='pt-4'>
          <h1 className='couponcreateOffer-title'>create a new Offer</h1>
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={handleSubmit}>
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
              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value=''>Choose category...</option>
                {categories && categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Form.Select>
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
            {endDateValidation && (
              <p className='coupon-validate'>{endDateValidation}</p>
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
