import React from "react"
import { Link, useParams } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Review from "../component/review"
import {
  productDetailAction,
  productCreateReviewsAction,
} from "../redux/action/ProductAction"
import Loader from "../component/loader"
import Message from "../component/message"
import { PRODUCT_CREATE_REVIEWS_RESET } from "../redux/constant/productListConstant"

export default function ProductScreen() {
  const [rating, setRating] = React.useState(0)
  const [comment, setComment] = React.useState("")
  const [qty, setQty] = React.useState(1)

  const params = useParams()

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { error, loading, product } = productDetails

  const productReviewsCreate = useSelector(
    (state) => state.productReviewsCreate
  )
  const { error: errorProductReviews, success: successProductReviews } =
    productReviewsCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  React.useEffect(() => {
    if(successProductReviews){
      alert('review submitted')
      setRating(0)
      setComment('')
      dispatch({type:PRODUCT_CREATE_REVIEWS_RESET})
    }
    dispatch(productDetailAction(params.id))
  }, [params, dispatch,successProductReviews])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      productCreateReviewsAction(params.id, {
        rating,
        comment,
      })
    )
    
    setComment('')
    setRating(0)
  }

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
        <>
          <Row>
            <Col md={6}>
              {/* fluid to force image to stay inside column */}
            {product.image && <Image src={product.image.url}fluid />}
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
                <ListGroup.Item>Price: Rs-{product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
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
                        <strong>Rs-{product.price}</strong>
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
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
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
                        disabled={product.countInStock === 0}
                      >
                        Add To Cart
                      </Button>
                    </ListGroup.Item>
                  </Link>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="py-4">
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Review value={review.rating} />
                    <p>{review.createdAt?.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Review</h2>
                  {errorProductReviews && (
                    <Message variant='danger'>{errorProductReviews}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Select
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value='1'>Select...</option>
                          <option value='2'>Poor</option>
                          <option value='3'>Good</option>
                          <option value='4'>Very Good</option>
                          <option value='5'>Excellent</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          rows='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button className="rounded" type='submit'>Submit</Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to={"/login"}>Sign In</Link> to write a
                      review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}
