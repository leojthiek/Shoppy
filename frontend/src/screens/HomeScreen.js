import React from "react"
import { Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Product from "../component/product"
import { productListAction } from "../redux/action/ProductAction"
import Loader from "../component/loader"
import Message from "../component/message"
import ProductCrousel from "../component/ProductCrousel"
// import Crousel from "../component/crousel"
import Paginate from "../component/paginate"

export default function HomeScreen() {
  const dispatch = useDispatch()
  const params=useParams()

  const keyword=params.keyword
  const pageNumber=params.pageNumber || 1
 

  const productList = useSelector((state) => state.productList)
  const { error, loading, products,page,pages} = productList

  React.useEffect(() => {
    dispatch(productListAction(keyword,pageNumber))
  }, [dispatch,keyword,pageNumber])

  

  return (
    <>
      {!keyword && <ProductCrousel/>}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader/>
      ) : error ? (
        <Message varient="danger">{error}</Message>
      ) : (
        <>
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
        </>
      )}
      

    </>
  )
}
