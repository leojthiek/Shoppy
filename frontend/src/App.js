import Footer from "./component/Footer"
import Header from "./component/Header"
import { Container } from "react-bootstrap"
import { Route, Routes } from "react-router-dom"
import HomeScreen from "./screens/HomeScreen"
import ProductScreen from "./screens/productScreen"

function App() {
  return (
    <>
      <Header />
      <main className='py-4'>
        <Container>
          <Routes>
            <Route path='/' Component={HomeScreen} exact />
            <Route path='/product/:id' Component={ProductScreen} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
