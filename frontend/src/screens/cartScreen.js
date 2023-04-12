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

  const userCartItems = cartItems.filter((item) => item.user === userInfo._id)


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

  return (
    <Row>
      <h1>SHOPPING CART</h1>
      <Col md={8}>
        {cartItems.length === 0 ? (
          <Message>
            your card is empty <Link to='/'>Go back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {userCartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                   { <Image src={item.image.url} alt={item.name} fluid rounded />}
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`} style={{textDecoration:'none'}}>{item.name}</Link>
                  </Col>
                  <Col md={2}>Rs-{item.price}</Col>
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
                      variant='light'
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
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              Rs-{" "}
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item className='btn btn-block'>
              <Link to={`/login?redirect=shipping`}>
                <Button
                  className='rounded'
                  type='button'
                  disabled={cartItems.length === 0}
                >
                  Proceed To Checkout
                </Button>
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}
