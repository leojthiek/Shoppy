import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { getMonthlyEarning } from "../redux/action/razorpayAction";
import {useSelector,useDispatch} from 'react-redux'


export default function Charts() {
  const dispatch = useDispatch()

  const razorpayMonthlyEarning=useSelector((state)=>state.razorpayMonthlyEarning)
  const {monthlyAmount} = razorpayMonthlyEarning

  React.useEffect(()=>{
    dispatch(getMonthlyEarning())
  },[dispatch])
  return (
    <div className="chart-main" style={{ width: "100%", height: "450px" }}>
        <div className="chart-title">
            <h2>Last six(6) month Revenue</h2>
        </div>
      <ResponsiveContainer>
        <AreaChart data={monthlyAmount.response} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} >
          <defs>
            <linearGradient id="amt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="amt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="amt"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#amt)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
