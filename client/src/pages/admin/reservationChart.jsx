import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// const data = [
//   {
//     name: 'Page A',
//     confirmed: 100,
//     cancelled: 50,
    
//   },
//   {
//     name: 'Page B',
//     confirmed: 100,
//     cancelled: 50,
    
//   },
//   {
//     name: 'Page A',
//     confirmed: 100,
//     cancelled: 50,
    
//   },
//   {
//     name: 'Page B',
//     confirmed: 100,
//     cancelled: 50,
    
//   },
//   {
//     name: 'Page A',
//     confirmed: 100,
//     cancelled: 50,
   
//   },
//   {
//     name: 'Page B',
//     confirmed: 100,
//     cancelled: 50,
    
//   },

// ];

export const ReserChart = ({data01})=> {
 
  if(data01 === null){
    return <p>loadin</p>;
  }
  
    return (
     
        <div className='w-full h-full'>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data01}
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
