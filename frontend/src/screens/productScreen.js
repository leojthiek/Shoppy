import React from "react"
import { Link, useParams } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Review from "../component/review"
import ReactImageMagnify from "react-image-magnify"
import {
  productDetailAction,
  productCreateReviewsAction,
} from "../redux/action/ProductAction"
import Loader from "../component/loader"
import Message from "../component/message"
import { PRODUCT_CREATE_REVIEWS_RESET } from "../redux/constant/productListConstant"

export default function ProductScreen() {
  const [mainImage, setMainImage] = React.useState(null)
  const [showAllReviews, setShowAllReviews] = React.useState(false)
  const [isMobile,setIsMobile]=React.useState(false)

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
    if (successProductReviews) {
      alert("review submitted")
      setRating(0)
      setComment("")
      dispatch({ type: PRODUCT_CREATE_REVIEWS_RESET })
    }
    dispatch(productDetailAction(params.id))
  }, [params, dispatch, successProductReviews])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      productCreateReviewsAction(params.id, {
        rating,
        comment,
      })
    )

    setComment("")
    setRating(0)
  }

  const toggleShowAllReviews = () => {
    setShowAllReviews(!showAllReviews)
  }


  React.useEffect(() => {
    // set mainImage when product is defined
    if (product && product.images) {
      setMainImage(product.images[0])
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1399);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [product])

  return (
    <div className='product-screen-main'>
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
              {mainImage && (
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: product.name,
                      isFluidWidth:isMobile,
                      src: mainImage,
                      width: 600,
                      height:isMobile ? undefined : 400,
                      
                      
                    },
                    largeImage: {
                      src: mainImage,
                      width: 1250,
                      height: 1450,
                    },
                    lensStyle: { backgroundColor: "rgba(0,0,0,.6)" },
                    shouldUsePositiveSpaceLens: true,
                    enlargedImageContainerDimensions: {
                      width: "150%",
                      height: "180%",
                    },
                    enlargedImageContainerStyle: {
                      zIndex: 9999,
                    },
                    isHintEnabled: true,
                    zoomLensStyle: { backgroundColor: "rgba(255,255,255,0.5)" },
                  }}
                />
              )}

              <Row
                className='mt-4'
                style={{ display: "flex", justifyContent: "center" }}
              >
                {product.images &&
                  product.images.map((image, index) => (
                    <Col
                      key={index}
                      style={{ marginLeft: index !== 0 ? "-150px" : "0" }}
                    >
                      <Image
                        onClick={() => setMainImage(image)}
                        className='productscreen-image-array'
                        src={image}
                        alt={product.name}
                      ></Image>
                    </Col>
                  ))}
              </Row>
            </Col>

            <Col md={3} >
              <ListGroup variant='flush'>
                <ListGroup.Item className='productscreen-details'>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item className='productscreen-details'>
                  <Review
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item className='productscreen-details'>
                  Price: Rs-{product.price}
                </ListGroup.Item>
                <ListGroup.Item className='productscreen-details'>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item className='productscreen-summary'>
                    <Row>
                      <Col>Price :</Col>
                      <Col>
                        <strong>Rs-{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='productscreen-summary'>
                    <Row>
                      <Col>Status</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item className='productscreen-summary'>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Select
                            className='productscreen-summary'
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
                  <Link to={`/cart/${params.id}?qty=${qty}`} style={{textDecoration:'none'}}>
                    <ListGroup.Item className='productscreen-summary-btn'>
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
          <Row className='py-4'>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.slice(0, 3).map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Review value={review.rating} />
                    <p>{review.createdAt?.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                {product.reviews.length > 3 && !showAllReviews && (
                  <Button variant='link' onClick={toggleShowAllReviews}>
                    {showAllReviews ? "Show less reviews" : "Show all reviews"}
                  </Button>
                )}
               
                {showAllReviews &&
                  product.reviews.slice(3).map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Review value={review.rating} />
                      <p>{review.createdAt?.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                     
                    </ListGroup.Item>
                   
                  ))}
                   <Button variant="link" onClick={toggleShowAllReviews}>
                      {showAllReviews && 'show less reviews'}
                    </Button> 
                  
                
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
                      <Button type='submit'>Submit</Button>
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
    </div>
  )
}
