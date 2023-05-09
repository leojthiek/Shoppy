import { Card,Badge } from "react-bootstrap"
import Review from "./review"
import { Link } from "react-router-dom"

export default function product({ product }) {
  

  function addDecimal(num) {
    return Math.round((num * 100) / 100).toFixed(2)
  }

  const discountPercentage = ((product.price - product.offerPrice) / product.price) * 100;
  return (
    <Card className=' rounded h-100'>
       {product.offerPrice && (
        <Badge pill variant="danger" className="position-absolute top-0 start-0 m-3">
          {discountPercentage.toFixed(0)}% Off
        </Badge>
      )}
      <Link to ={`/product/${product._id}`}>
        <Card.Img className='product-image' src={product.images[0]} variant='top' />
      </Link>
      <Card.Body className="card-body">
        <Link to={`/product/${product._id}`} style={{textDecoration:'none'}}>
          <Card.Text as='div'>
            <strong className="card-title">{product.name}</strong>
          </Card.Text>
        </Link>
        <div className="py-2">
          <Review
            value={product.rating}
            text={`${product.numReviews} Review`}
            color={'yellow'}
          />
          </div>
        
          {product.offerPrice ? (
          <div className="d-flex justify-content-between">
            <Card.Text className="text-muted py-2" as="h6">
              <del> MRP &#8377;{product.price}</del>
            </Card.Text>
            <Card.Text className="py-2" as="h5">
            &#8377;{addDecimal(product.offerPrice)}
            </Card.Text>
          </div>
        ) : (
          <Card.Text className="py-2" as="h5">
            &#8377;{product.price}
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  )
}
