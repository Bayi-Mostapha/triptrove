import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { curveCardinal } from 'd3-shape';

const data = [
  {
    name: 'Page A',
    platformFee: 100,
    subscription: 50,
    total: 2400 + 100 + 50
  },
  {
    name: 'Page B',
    platformFee: 100,
    subscription: 50,
    total: 2210 + 100 + 50
  },
  {
    name: 'Page A',
    platformFee: 100,
    subscription: 50,
    total: 2400 + 100 + 50
  },
  {
    name: 'Page B',
    platformFee: 100,
    subscription: 50,
    total: 2210 + 100 + 50
  },
  {
    name: 'Page A',
    platformFee: 100,
    subscription: 50,
    total: 2400 + 100 + 50
  },
  {
    name: 'Page B',
    platformFee: 100,
    subscription: 50,
    total: 2210 + 100 + 50
  },

];

const cardinal = curveCardinal.tension(0.2);

// Custom tooltip to show platformFee and subscription
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip p-2 border-[2px] border-green-400 bg-green-100">
        <p className="intro text-green-600">{`Total: ${data.total}`}</p>
        <p className="desc">{`Platform Fee: ${data.platformFee}`}</p>
        <p className="desc">{`Subscription: ${data.subscription}`}</p>
      </div>
    );
  }

  return null;
};

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/area-chart-different-shapes-6lwnhy';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
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
          <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
