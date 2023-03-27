import React from "react"
import { Link, useParams } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Review from "../component/review"
import { productDetailAction } from "../redux/action/productListActiion"
import Loader from "../component/loader"
import Message from "../component/message"

export default function ProductScreen() {
  const [qty, setQty] = React.useState(1)

  const params = useParams()
  
  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.productDetails)
  const { error, loading, product } = productDetails

  React.useEffect(() => {
    dispatch(productDetailAction(params.id))
  }, [params, dispatch])


  return (
    <>
      <Link to='/' className='btn btn-dark my-3 rounded'>
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            {/* fluid to force image to stay inside column */}
            <Image src={product.image} fluid />
          </Col>

          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Review
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: ${product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price :</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Select
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
               
                {/* display grid to keep the button in block */}
                <Link to={`/cart/${params.id}?qty=${qty}`}>
                <ListGroup.Item className='d-grid'>
                  <Button 
                  type='button'
                  disabled={product.countInStock === 0}>
                    Add To Cart
                  </Button>
                </ListGroup.Item>
                </Link>
               
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}
