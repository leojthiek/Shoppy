import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams,useNavigate } from "react-router-dom"
import { Row, Col, ListGroup, Image, Button, Form, Card } from "react-bootstrap"
import Message from "../component/message"
import { addCartAction ,getCartItem,cartRemoveAction} from "../redux/action/cartAction"

export default function CartScreen() {
  const params = useParams()
  const productId=params.id
  const dispatch = useDispatch()
  const navigate=useNavigate()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart


  const userLogin=useSelector((state)=>state.userLogin)
  const {userInfo}=userLogin

  const userCartItems = cartItems && userInfo ? cartItems.filter((item) => item.user === userInfo._id || userInfo.id) : []


  const quantity = window.location.search
    ? Number(window.location.search.split("=")[1])
    : 1

  React.useEffect(() => {
  if(!userInfo){
    navigate('/login')
  }else{
    dispatch(getCartItem())
  }

  if(productId){
    dispatch(addCartAction(productId,quantity))

  }
  
  }, [dispatch, quantity,navigate,productId,userInfo])

  const removeFromCartHandler = (id) => {
    dispatch(cartRemoveAction(id))
    navigate('/cart')
    dispatch(getCartItem())
    
  }

  function addDecimal(num) {
    return Math.round((num * 100) / 100).toFixed(2)
  }

  return (
    <Row>
      <h1 className="cartscreen-title">SHOPPING CART</h1>
      <Col md={8}>
        {cartItems.length === 0 ? (
          <Message>
            your card is empty <Link to='/'>Go back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {userCartItems.map((item) => (
              <ListGroup.Item key={item._id} className="cartscreen-main">
                <Row>
                  <Col md={2}>
                   { <Image className="cart-image" src={item.image[0]} alt={item.name} fluid rounded />}
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`} className="cartscreen-name" style={{textDecoration:'none'}}>{item.name}</Link>
                  </Col>
                  <Col className="cartscreen-price" md={2}>{item.product.offerPrice ? <p>&#8377;{addDecimal(item.product.offerPrice)}</p>:<p>&#8377;{item.price}</p>}</Col>
                  <Col md={2}>
                    <Form.Select
                      value={item.qty}
                      onChange={(e) =>{
                        dispatch(
                          addCartAction(item._id, Number(e.target.value))
                        )
                       
                      }
                      
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x}>{x + 1}</option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='danger'
                      onClick={() => removeFromCartHandler(item.product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card className="cartscreen-summary-card">
          <ListGroup variant='flush'>
            <ListGroup.Item className="cartscreen-summary-subtotal">
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              Rs-{" "}
              {addDecimal(cartItems
                .reduce((acc, item) => acc + item.qty *( item.product.offerPrice ? item.product.offerPrice : item.price), 0)
                )}
            </ListGroup.Item>
              {cartItems.length > 0 &&  <ListGroup.Item className='cartscreen-btn-div'>
              <Link to={`/login?redirect=shipping`} className="d-grid" style={{textDecoration:'none'}}>
                <Button
                  className='cartscreen-btn'
                  type='button'
                  disabled={cartItems.length === 0}
                >
                  Proceed To Checkout
                </Button>
              </Link>
            </ListGroup.Item>}
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}
