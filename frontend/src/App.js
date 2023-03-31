import Footer from "./component/Footer"
import Header from "./component/Header"
import { Container } from "react-bootstrap"
import { Route, Routes } from "react-router-dom"
import HomeScreen from "./screens/HomeScreen"
import ProductScreen from "./screens/productScreen"
import CartScreen from "./screens/cartScreen"
import LoginScreen from "./screens/loginScreen"
import RegisterScreen from "./screens/registerScreen"
import ShippingScreen from "./screens/shippingScreen"
import PaymentMethodScreen from "./screens/paymentMethodScreen"
import ProfileScreen from "./screens/profileScreen"
import PlaceOrderScreen from "./screens/PlaceOrderScreen"
import OrderScreen from "./screens/orderScreen"
import UserListScreen from "./screens/UserListScreen"


function App() {
  return (
    <>
      <Header />
      <main className='py-4'>
        <Container>
          <Routes>
            <Route path="/order/:id" Component={OrderScreen}/>
            <Route path="/placeorder" Component={PlaceOrderScreen}/>
            <Route path='/payment' Component={PaymentMethodScreen} />
            <Route path='/login/shipping' Component={ShippingScreen} />
            <Route path='/login' Component={LoginScreen} />
            <Route path='/register' Component={RegisterScreen} />
            <Route path='/profile' Component={ProfileScreen}/>
            <Route path='/product/:id' Component={ProductScreen} />
            <Route path='/cart/:id?' Component={CartScreen} />
            <Route path="/admin/userlist" Component={UserListScreen}/>
            <Route path='/' Component={HomeScreen} exact />


          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
