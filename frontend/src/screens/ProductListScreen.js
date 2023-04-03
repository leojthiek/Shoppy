import React from "react"
import { Row, Col, Button, Table } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Message from "../component/message"
import Loader from "../component/loader"
import {
  productListAction,
  deleteProductAction,
  productCreateAction,
} from "../redux/action/ProductAction"
import { PRODUCT_CREATE_RESET } from "../redux/constant/productListConstant"

export default function ProductListScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productList = useSelector((state) => state.productList)
  const { products, error, loading } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productDelete = useSelector((state) => state.productDelete)
  const {
    error: errorDelete,
    loading: loadingDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    error: createError,
    loading: createLoading,
    success: createSuccess,
    product: createdProduct,
  } = productCreate



  React.useEffect(() => {
    dispatch({type:PRODUCT_CREATE_RESET})

    if(!userInfo || !userInfo.isAdmin){
      navigate('/login')
    }
    if(createSuccess){
      navigate(`/admin/product/${createdProduct._id}/edit`)
    }else{
      dispatch(productListAction())
    }
    
  },[successDelete,
    dispatch,
    userInfo,
    createSuccess,
    createdProduct,
    navigate,])

  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete this product completely")) {
      dispatch(deleteProductAction(id))
    }
  }

  const createProducthandler = () => {
    dispatch(productCreateAction())
  }
   

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='d-flex justify-content-end'>
          <Button className='my-3' onClick={createProducthandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {createLoading && <Loader />}
      {createError && <Message variant='danger'>{createError}</Message>}
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <td>ID</td>
              <td>NAME</td>
              <td>PRICE</td>
              <td>CATEGORY</td>
              <td>BRAND</td>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>Rs,{product.price}</td>

                <td>{product.category}</td>

                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button
                      variant='light'
                      className='btn-sm'
                      style={{ color: "black" }}
                    >
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => handleDelete(product._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}
