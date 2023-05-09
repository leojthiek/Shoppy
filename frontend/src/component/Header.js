import React from "react"
import { Nav, Navbar, Container, NavDropdown, Image } from "react-bootstrap"
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


// using baseUrl because image logo got broken on admin page
  const BaseUrl=window.location.origin

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  React.useEffect(()=>{
    dispatch(getCartItem())
  },[dispatch])

  return (
    <header>
      <Navbar variant='dark' expand='lg' collapseOnSelect className="custom-header">
        <Container>
          <div className="header-title-logo">
            <Image className="header-logo" src={`${BaseUrl}/images/logo.png`} alt="logo"></Image>
          <LinkContainer to='/'>
            <Navbar.Brand className="header-title">STORE</Navbar.Brand>
          </LinkContainer>
          </div>
         

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
                  <LinkContainer to={"/admin/dashboard"}>
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
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
