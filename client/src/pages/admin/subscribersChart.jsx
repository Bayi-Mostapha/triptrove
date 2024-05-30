import React, { PureComponent, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';


const COLORS = ['#92DE8C', '#5AB4FE'];


export const Example = ({data01})=> {
   
    if(data01 === null){
      return <p>loadin</p>;
    }
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

