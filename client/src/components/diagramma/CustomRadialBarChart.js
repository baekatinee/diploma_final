import React from 'react';
import { BarChart, Bar,  ResponsiveContainer, Legend } from 'recharts';

const data = [
  {
    name: '18-24',
    BYN: 31.47,
    pv: 2400,
    fill: '#8884d8',
  },
  {
    name: '25-29',
    BYN: 26.69,
    pv: 4567,
    fill: '#83a6ed',
  },
  {
    name: '30-34',
    BYN: 15.69,
    pv: 1398,
    fill: '#8dd1e1',
  },
  {
    name: '35-39',
    BYN: 8.22,
    pv: 9800,
    fill: '#82ca9d',
  },
  {
    name: '40-49',
    BYN: 8.63,
    pv: 3908,
    fill: '#a4de6c',
  },
  {
    name: '50+',
    BYN: 2.63,
    pv: 4800,
    fill: '#d0ed57',
  },
  {
    name: 'unknow',
    BYN: 6.67,
    pv: 4800,
    fill: '#ffc658',
  },
];



const CustomRadialBarChart = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '500px', height: '250px' }}>
        <ResponsiveContainer>
        <BarChart width={150} height={40} data={data}>
          <Bar dataKey="BYN" fill="#8884d8" />
        </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default CustomRadialBarChart;