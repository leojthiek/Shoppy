import React from 'react'
import {Container,Row,Col} from 'react-bootstrap'

export default function formContainer({children}) {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
            {children}
        </Col>
      </Row>
    </Container>
  )
}
