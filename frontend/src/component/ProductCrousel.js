import React from "react"
import { Link } from "react-router-dom"
import { Carousel, Image } from "react-bootstrap"
import { productTopRatedAction } from "../redux/action/ProductAction"
import { useDispatch, useSelector } from "react-redux"

export default function ProductCrousel() {
  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productTopRated)
  const { products } = productTopRated

  React.useEffect(() => {
    dispatch(productTopRatedAction())
  }, [dispatch])

  return (
    <Carousel pause='hover' className='carousel' indicators={false} controls={false} >
      {products && products.map((product) => (
        <Carousel.Item key={product._id} className="carousel-item">
          <Link to={`/product/${product._id}`}>
            <Image
              src={product.images[0]}
              alt={product.name}
              className='carousel-image'
              fluid
            ></Image>
            <div className='carousel-empty-div'></div>
            <Carousel.Caption className='carousel-caption'>
              <h2 className='carousel-text'>
                {product.name} Rs-{product.price}
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}
