import { Card } from "react-bootstrap"
import Review from "./review"
import { Link } from "react-router-dom"

export default function product({ product }) {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to ={`/product/${product._id}`}>
        <Card.Img className='product-image' src={product.image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Text as='div'>
            <strong>{product.name}</strong>
          </Card.Text>
        </Link>
        
          <Review
            value={product.rating}
            text={`${product.numReviews} Review`}
            color={'yellow'}
          />
        

        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}
