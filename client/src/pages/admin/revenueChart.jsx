import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { curveCardinal } from 'd3-shape';

// const data = [
//   {
//     name: 'Page A',
//     platformFee: 100,
//     subscription: 50,
//     total: 2400 + 100 + 50
//   },
//   {
//     name: 'Page B',
//     platformFee: 100,
//     subscription: 50,
//     total: 2210 + 100 + 50
//   },
//   {
//     name: 'Page A',
//     platformFee: 100,
//     subscription: 50,
//     total: 2400 + 100 + 50
//   },
//   {
//     name: 'Page B',
//     platformFee: 100,
//     subscription: 50,
//     total: 2210 + 100 + 50
//   },
//   {
//     name: 'Page A',
//     platformFee: 100,
//     subscription: 50,
//     total: 2400 + 100 + 50
//   },
//   {
//     name: 'Page B',
//     platformFee: 100,
//     subscription: 50,
//     total: 2210 + 100 + 50
//   },

// ];

const cardinal = curveCardinal.tension(0.2);

// Custom tooltip to show platformFee and subscription
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip p-2 border-[2px] border-violet-400 bg-violet-100">
        <p className="intro text-violet-700">{`Total: ${data.total}`}</p>
        <p className="desc text-black">{`Platform Fee: ${data.totalFees}`}</p>
        <p className="desc text-black">{`Subscription: ${data.totalSubscription}`}</p>
      </div>
    );
  }

  return null;
};


export const RevChart = ({data01})=> {
 
  if(data01 === null){
    return <p>loadin</p>;
  }
  
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data01}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="total" stroke="#7065F0" fill="#7065F0" fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

