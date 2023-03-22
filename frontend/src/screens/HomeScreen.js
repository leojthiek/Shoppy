import React from "react"
import { Row, Col } from "react-bootstrap"
import Product from "../component/product"


export default function HomeScreen() {
  const [products,setProducts]=React.useState([])

  React.useEffect(()=>{
    fetch('/api/products')
    .then(res => res.json())
    .then(data => setProducts(data))
  },[])
  return (
    <div>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
           <Product product={product}/>
          </Col>
        ))}
      </Row>
    </div>
  )
}
