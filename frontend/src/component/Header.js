import React from "react"
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../redux/action/userAction"
import SearchBox from "./SearchBox"
import {getCartItem} from '../redux/action/cartAction'

export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
    navigate("/login")
  }

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  React.useEffect(()=>{
    dispatch(getCartItem())
  },[dispatch])

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Shoppy</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='navlist-header'>
              <SearchBox />

              <LinkContainer to='/cart'>
                <Nav.Link>
                  <div className='header-cart-icon'>
                    <i className='fas fa-shopping-cart'></i>
                    <span className='header-cart-no'>
                      {userInfo ? cartItems.reduce((acc, item) => acc + item.qty, 0):0}
                    </span>
                  </div>
                
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to={"/profile"}>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title={"Admin"} id='Admin Menu'>
                  <LinkContainer to={"/admin/userlist"}>
                    <NavDropdown.Item>User</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={"/admin/productlist"}>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={"/admin/orderlist"}>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={"/admin/coupons"}>
                    <NavDropdown.Item>Coupon</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
                
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
