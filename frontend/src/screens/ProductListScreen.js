import React from "react"
import { Row, Col, Button, Table } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Message from "../component/message"
import Loader from "../component/loader"
import Paginate from "../component/paginate"
import {
  productListAction,
  deleteProductAction,
  productCreateAction,
} from "../redux/action/ProductAction"
import { PRODUCT_CREATE_RESET } from "../redux/constant/productListConstant"
import AdminSidebar from "../component/adminSidebar"
import { Offcanvas } from "react-bootstrap"
import { useMediaQuery } from "@mui/material"

export default function ProductListScreen() {
  const [show, setShow] = React.useState(false)
  const isSmallScreen = useMediaQuery("(max-width:987px)")
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const pageNumber = params.pageNumber

  const productList = useSelector((state) => state.productList)
  const { products, error, loading, pages, page } = productList

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
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login")
    }
    if (createSuccess) {
      navigate(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(productListAction("", pageNumber))
    }
  }, [
    successDelete,
    dispatch,
    userInfo,
    createSuccess,
    createdProduct,
    navigate,
    pageNumber,
  ])

  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete this product completely")) {
      dispatch(deleteProductAction(id))
    }
  }

  const createProducthandler = () => {
    dispatch(productCreateAction())
  }

  return (
    <Row>
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
        <Col md={2}>
          <AdminSidebar />
        </Col>
      )}
      <Col md={10}>
    <div className="product-list">
      <Row className='align-items-center'>
        <Col>
          <h4 className="product-list-title">Product list :</h4>
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
        <>
          <Table bordered hover responsive className='table-sm'>
            <thead>
              <tr className="product-list-head">
                <td>ID</td>
                <td>NAME</td>
                <td>PRICE</td>
                <td>CATEGORY</td>
                <td>BRAND</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="product-list-row">
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
                    &nbsp;
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
          <Paginate pages={pages} page={page} isAdmin={true}/>
        </>
      )}
    </div>
    </Col>
    </Row>
  )
}
