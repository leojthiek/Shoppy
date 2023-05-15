import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'

export default function Footer() {
  return (
    <footer>
        <Container>
            <Row>
                <Col className='text-center py-3'>
                    Copyright &copy; Leoj Store Updated
                </Col>
            </Row>
        </Container>
    </footer>
  )
}
