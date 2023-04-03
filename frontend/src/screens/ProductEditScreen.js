import React from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../component/message"
import Loader from "../component/loader"
import FormContainer from "../component/formContainer"
import {
  productDetailAction,
  productUpdateAction,
} from "../redux/action/ProductAction"
import { PRODUCT_UPDATE_RESET } from "../redux/constant/productListConstant"

export default function ProductEditScreen() {
  const params = useParams()
  const navigate = useNavigate()
  const productId = params.id
  const dispatch = useDispatch()

  const [name, setName] = React.useState("")
  const [price, setPrice] = React.useState(0)
  const [brand, setBrand] = React.useState("")
  const [category, setCategory] = React.useState("")
  const [image, setImage] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [countInStock, setCountInStock] = React.useState(0)

  const productDetails = useSelector((state) => state.productDetails)
  const { product, loading, error } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    success: updateSuccess,
    loading: loadingupdate,
    error: errorUpdate,
  } = productUpdate

  React.useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      navigate("/admin/productlist")
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(productDetailAction(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setBrand(product.brand)
        setCategory(product.category)
        setImage(product.image)
        setDescription(product.description)
        setCountInStock(product.countInStock)
      }
    }
  }, [
    dispatch,
    product.name,
    product.price,
    product.brand,
    product.category,
    product.image,
    product.description,
    product.countInStock,
    product._id,
    productId,
    navigate,
    updateSuccess,
  ])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      productUpdateAction({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    )
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingupdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>price</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Upload an Image'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter No.of Stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='Submit' variant='primary' className='rounded'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}
