import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Day 1', confirmed: 4000, cancelled: 2400 },
  { name: 'Day 2', confirmed: 3000, cancelled: 1398 },
  { name: 'Day 3', confirmed: 2000, cancelled: 9800 },
  { name: 'Day 4', confirmed: 2780, cancelled: 3908 },
  { name: 'Day 5', confirmed: 1890, cancelled: 4800 },
  { name: 'Day 6', confirmed: 2390, cancelled: 3800 },
  { name: 'Day 7', confirmed: 3490, cancelled: 4300 },
  { name: 'Day 8', confirmed: 4000, cancelled: 2400 },
  { name: 'Day 9', confirmed: 3000, cancelled: 1398 },
  { name: 'Day 10', confirmed: 2000, cancelled: 9800 },
  { name: 'Day 11', confirmed: 2780, cancelled: 3908 },
  { name: 'Day 12', confirmed: 1890, cancelled: 4800 },
  { name: 'Day 13', confirmed: 2390, cancelled: 3800 },
  { name: 'Day 14', confirmed: 3490, cancelled: 4300 },
  { name: 'Day 15', confirmed: 4000, cancelled: 2400 },
  { name: 'Day 16', confirmed: 3000, cancelled: 1398 },
  { name: 'Day 17', confirmed: 2000, cancelled: 9800 },
  { name: 'Day 18', confirmed: 2780, cancelled: 3908 },
  { name: 'Day 19', confirmed: 1890, cancelled: 4800 },
  { name: 'Day 20', confirmed: 2390, cancelled: 3800 },
  { name: 'Day 21', confirmed: 3490, cancelled: 4300 },
  { name: 'Day 22', confirmed: 4000, cancelled: 2400 },
  { name: 'Day 23', confirmed: 3000, cancelled: 1398 },
  { name: 'Day 24', confirmed: 2000, cancelled: 9800 },
  { name: 'Day 25', confirmed: 2780, cancelled: 3908 },
  { name: 'Day 26', confirmed: 1890, cancelled: 4800 },
  { name: 'Day 27', confirmed: 2390, cancelled: 3800 },
  { name: 'Day 28', confirmed: 3490, cancelled: 4300 },
  { name: 'Day 29', confirmed: 4000, cancelled: 2400 },
  { name: 'Day 30', confirmed: 3000, cancelled: 1398 },
];

export default class Example extends PureComponent {
  render() {
    return (
     
        <div className='w-full h-full'>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="confirmed" stackId="a" fill="#8884d8" />
              <Bar dataKey="cancelled" stackId="a" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      
    );
  }
}
