import React from "react"
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined"
import ProductionQuantityLimitsOutlinedIcon from "@mui/icons-material/ProductionQuantityLimitsOutlined"
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined"
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined"
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber"
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn"
import { LinkContainer } from "react-router-bootstrap"

export default function AdminSidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebar-center'>
        <ul>
          <p className='sidebar-center-p'>Overview</p>
          <li>
            <DashboardCustomizeOutlinedIcon className='sidebar-icon' />
            <LinkContainer to={'/admin/dashboard'}>
              <span>Dashboard</span>
            </LinkContainer>
          </li>

          <p className='sidebar-center-p'>Controller</p>

          <li>
            <ProductionQuantityLimitsOutlinedIcon className='sidebar-icon' />
            <LinkContainer to={"/admin/productlist"}>
              <span>Products</span>
            </LinkContainer>
          </li>
          <li>
            <AssignmentTurnedInIcon className='sidebar-icon' />
            <LinkContainer to={"/admin/orderlist"}>
            <span>Orders</span>

            </LinkContainer>
          </li>
          <li>
            <GroupOutlinedIcon className='sidebar-icon' />
            <LinkContainer to={'/admin/userlist'}>
            <span>Users</span>

            </LinkContainer>
          </li>
          <li>
            <LocalOfferOutlinedIcon className='sidebar-icon' />
            <LinkContainer to={'/admin/offers'}>
            <span>Offers</span>

            </LinkContainer>
          </li>
          <li>
            <ConfirmationNumberIcon className='sidebar-icon' />
            <LinkContainer to={'/admin/coupons'}>
            <span>Coupons</span>
            </LinkContainer>
          </li>
        </ul>
      </div>
    </div>
  )
}
