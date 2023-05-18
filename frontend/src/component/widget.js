import React from "react"
import { Col, Row, Card } from "react-bootstrap"


import { MdAccountBalance } from "react-icons/md"
import { ImUser } from "react-icons/im"
import { BsCartCheckFill,BsCurrencyRupee } from "react-icons/bs"


export default function Widget({ type ,count}) {

  let data
  switch (type) {
    case "users":
      data = {
        title: "USERS",
        ismoney: false,
        icon: <ImUser className='widget-icon' style={{color:'green',backgroundColor: 'rgb(171, 202, 171)'}}/>,
        link: "See all users",
        count:count
      }
      break
    case "orders":
      data = {
        title: "ORDERS",
        ismoney: false,
        icon: <BsCartCheckFill className='widget-icon' style={{backgroundColor:'rgb(236, 235, 231)',color:'goldenrod'}}  />,
        link: "See all orders",
        count:count
      }
      break
    case "earnings":
      data = {
        title: "EARNINGS",
        ismoney: true,
        icon: <BsCurrencyRupee className='widget-icon'style={{ backgroundColor: 'rgb(204, 171, 178)',color:'crimson'}} />,
        link: "View all transaction",
        count:count.balance
      }
      break
    case "balance":
      data = {
        title: "BALANCE",
        ismoney: true,
        icon: <MdAccountBalance className='widget-icon' style={{color:'purple',backgroundColor:'rgb(164, 123, 164)'}} />,
      }

      break

    default:
      break
  }

  function abbreviateNumber(num) {
    if (num >= 10000000) {
      return (num / 10000000).toFixed(1) + ' Cr';
    }
    if (num >= 100000) {
      return (num / 100000).toFixed(1) + ' Lakh';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + ' K';
    }
    return num;
  }
  
  return (
    <Row>
      <Col>
        <Card className='widget-card'>
          <Card.Body className='widget-body'>
            <div className='left-widget'>
              <Card.Title>{data.title}</Card.Title>
              <Card.Text className='widget-amount'>
                {data.ismoney && <>&#8377;</>}{abbreviateNumber(data.count)}
              </Card.Text>
              <Card.Link className='widget-list'>{data.link}</Card.Link>
            </div>
            <div className='right-widget'>
              {data.icon}
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
