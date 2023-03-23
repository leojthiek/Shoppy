import React from "react"
import { Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Product from "../component/product"
import { productListAction } from "../redux/action/productListActiion"
import Loader from "../component/loader"
import Message from "../component/message"

export default function HomeScreen() {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { error, loading, products } = productList

  React.useEffect(() => {
    dispatch(productListAction())
  }, [dispatch])

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader/>
      ) : error ? (
        <Message varient="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}
