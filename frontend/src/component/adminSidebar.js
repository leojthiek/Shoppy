import React from "react"

import {
  MdDashboard,
  MdOutlineProductionQuantityLimits,
  MdLocalOffer,
} from "react-icons/md"
import { BsCartCheckFill } from "react-icons/bs"
import { ImUser } from "react-icons/im"
import { RiCoupon3Fill } from "react-icons/ri"

import { LinkContainer } from "react-router-bootstrap"

export default function AdminSidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebar-center'>
        <ul>
          <p className='sidebar-center-p'>Overview</p>
          <li>
            <MdDashboard className='sidebar-icon' />
            <LinkContainer to={"/admin/dashboard"}>
              <span>Dashboard</span>
            </LinkContainer>
          </li>

          <p className='sidebar-center-p'>Controller</p>

          <li>
            <MdOutlineProductionQuantityLimits className='sidebar-icon' />
            <LinkContainer to={"/admin/productlist"}>
              <span>Products</span>
            </LinkContainer>
          </li>
          <li>
            <BsCartCheckFill className='sidebar-icon' />
            <LinkContainer to={"/admin/orderlist"}>
              <span>Orders</span>
            </LinkContainer>
          </li>
          <li>
            <ImUser className='sidebar-icon' />
            <LinkContainer to={"/admin/userlist"}>
              <span>Users</span>
            </LinkContainer>
          </li>
          <li>
            <MdLocalOffer className='sidebar-icon' />
            <LinkContainer to={"/admin/offers"}>
              <span>Offers</span>
            </LinkContainer>
          </li>
          <li>
            <RiCoupon3Fill className='sidebar-icon' />
            <LinkContainer to={"/admin/coupons"}>
              <span>Coupons</span>
            </LinkContainer>
          </li>
        </ul>
      </div>
    </div>
  )
}
