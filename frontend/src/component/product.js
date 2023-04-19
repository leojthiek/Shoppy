import { Card } from "react-bootstrap"
import Review from "./review"
import { Link } from "react-router-dom"

export default function product({ product }) {
  return (
    <Card className=' rounded h-100'>
      <Link to ={`/product/${product._id}`}>
        <Card.Img className='product-image' src={product.image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`} style={{textDecoration:'none'}}>
          <Card.Text as='div'>
            <strong>{product.name}</strong>
          </Card.Text>
        </Link>
        <div className="py-2">
          <Review
            value={product.rating}
            text={`${product.numReviews} Review`}
            color={'yellow'}
          />
          </div>
        

        <Card.Text className="py-2" as='h5'>Rs-{product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}
