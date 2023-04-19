import React from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { Form, Button, Image } from "react-bootstrap"
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
  const [nameValidator, setNameValidator] = React.useState("")

  const [price, setPrice] = React.useState(0)
  const [priceValidator, setPriceValidator] = React.useState("")

  const [brand, setBrand] = React.useState("")
  const [brandValidator, setBrandValidator] = React.useState("")

  const [category, setCategory] = React.useState("")
  const [categoryValidator, setCategoryValidator] = React.useState("")

  const [image, setImage] = React.useState("")
  // const [imageValidator, setImageValidator] = React.useState("")

  const [description, setDescription] = React.useState("")
  const [descriptionValidator, setDescriptionValidator] = React.useState("")

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

    if (!name || name === "") {
      setNameValidator("Product name is required")
      return
    }
    if (!price || price === "") {
      setPriceValidator("Product price is required")
      return
    } else if (isNaN(price)) {
      setPriceValidator("price should be a number")
      return
    }
    if (!brand || brand === "") {
      setBrandValidator("Product brand is required")
      return
    }

    if (!category || setCategoryValidator === "") {
      setCategoryValidator("Product category is required")
      return
    }

    if (!description || description === "") {
      setDescriptionValidator("Product Description is required")
    }

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

  const handleImageUpload = (e) => {
    const file = e.target.files[0]

    if (file) {
      TransformFile(file)
    }
  }

  const TransformFile = (file) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setImage(reader.result)
    }
  }

  return (
    <div className='product-edit-screen'>
      <Link
        to='/admin/productlist'
        className='btn btn-danger rounded py-2 mt-3'
      >
        Go Back
      </Link>
      <FormContainer>
        {product.name === "sample Name" ? (
          <h1 className='edit-product-title'>Create Product</h1>
        ) : (
          <h1 className='edit-product-title'>Edit Product</h1>
        )}

        {loadingupdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler} className='form-container'>
            <Form.Group controlId='name' className='edit-product-name'>
              <Form.Label>Name</Form.Label>
              <Form.Control 
                className='edit-control-name'
                type='text'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {nameValidator && (
              <Message variant='danger'>{nameValidator}</Message>
            )}

            <Form.Group controlId='price' className='edit-product-price'>
              <Form.Label>price</Form.Label>
              <Form.Control
                className='edit-control-name'
                type='text'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {priceValidator && (
              <Message variant='danger'>{priceValidator}</Message>
            )}

            <Form.Group controlId='brand' className='edit-product-brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                className='edit-control-name'
                type='text'
                placeholder='Enter Brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {brandValidator && (
              <Message variant='danger'>{brandValidator}</Message>
            )}

            <Form.Group controlId='category' className='edit-product-category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                className='edit-control-name'
                type='text'
                placeholder='Enter Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {categoryValidator && (
              <Message variant='danger'>{categoryValidator}</Message>
            )}

            <Form.Group controlId='image' className='edit-product-image'>
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                className='edit-control-name'
                type='file'
                accept='image/jpeg, image/jpg, image/png'
                placeholder='Upload an Image'
                onChange={handleImageUpload}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Image className='preview-image' src={image} />
            </Form.Group>

            <Form.Group
              controlId='description'
              className='edit-product-description'
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                className='edit-control-name'
                type='text'
                placeholder='Enter Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {descriptionValidator && (
              <Message variant='danger'>{descriptionValidator}</Message>
            )}

            <Form.Group controlId='countInStock' className='edit-product-stock'>
              <Form.Label>Stock</Form.Label>
              <Form.Control
                className='edit-control-name'
                type='text'
                placeholder='Enter No.of Stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <div className='d-grid py-2'>
              <Button type='Submit' variant='primary' className='rounded'>
                Update
              </Button>
            </div>
          </Form>
        )}
      </FormContainer>
    </div>
  )
}
