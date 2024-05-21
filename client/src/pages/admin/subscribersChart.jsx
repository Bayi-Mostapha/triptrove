import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data01 = [
  { name: 'Host', value: 1000 },
  { name: 'Guest', value: 800 },

  
];
const COLORS = ['#92DE8C', '#5AB4FE'];


export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/two-simple-pie-chart-otx9h';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={200} height={200}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data01}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
              {data01.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
