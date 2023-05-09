import React from "react"
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"

export default function Progress({ type, item }) {

  function abbreviateNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num;
  }
  
  let data
  switch (type) {
    case "user":
      data = {
        title: "USERS",
        count:item && item.userCountToday,
        desc:'No. of new users',
        month:item && item.userCountMonth,
        prevMonth:item && item.userCountPrevMonth
      }
      break
      case "order":
      data = {
        title: "ORDERS",
        count: item && item.orderCountToday,
        desc:'No. of  orders',
        month:item && item.orderCountMonth,
        prevMonth:item && item.orderCountPrevMonth

      }
      break
      case "earning":
      data = {
        title: "EARNINGS",
        count: item && item.balanceToday,
        desc:'No. of earning amount ',
        month:item && item.balanceMonth,
        prevMonth:item && item.balancePrevMonth
        
      }
      break

    default:
      break
  }

  const percentageChange = data.prevMonth === 0 && data.month !== 0
  ? 100
  : ((data.month - data.prevMonth) / data.prevMonth * 100);

  return (
    <div className='progress-main'>
      <div className='progress-title'>
        <h3 className='progress-h3'>{ data && data.title}</h3>
      </div>
      <div className='progress-center'>
        <div className='progress-chart'>
          <CircularProgressbar value={percentageChange} text={`${percentageChange.toFixed(1)}%`} />
        </div>
      </div>
      <div className='progress-bottom'>
        <p>{ data && data.desc}</p>
      </div>
      <div className='progress-footer'>
        <p>
          Prev month 
        </p>
       
        <p>
          This month 
        </p>
       

        <p>
          Today
        </p>
       
      </div>
      <div className="progress-footer-icon">
      <p>
        <KeyboardArrowDownIcon />
        </p>
        <p>
        <KeyboardArrowDownIcon />
        </p>
        <p>
        <KeyboardArrowDownIcon />
        </p>
      </div>
     
      <div className='progress-no'>
        <p>{ abbreviateNumber(data.prevMonth)}</p>
        <p>{ abbreviateNumber(data.month)}</p>
        <p>{ abbreviateNumber(data.count && data.count)}</p>
      </div>
    </div>
  )
}
