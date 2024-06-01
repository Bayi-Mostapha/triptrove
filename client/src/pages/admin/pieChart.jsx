import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, Tooltip, ResponsiveContainer } from 'recharts';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export const Example1 = ({data01})=> {
 
    if(data01 === null){
      return <p>loadin</p>;
    }
    return (
      <PieChart width={200} height={200} >
        <Pie
          data={data01}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data01.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    );
  }

