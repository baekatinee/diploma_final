import React from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Секция 1', value: 200, fill: '#8884d8' },
  { name: 'Секция 2', value: 100, fill: '#83a6ed' },
  { name: 'Секция 3', value: 50, fill: '#8dd1e1' },
  { name: 'Секция 4', value: 30, fill: '#82ca9d' },
];

const CustomRadialBarChart = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="80%" barSize={15} data={data}>
            <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise dataKey="value" />
            {/* <Legend iconSize={10} layout="vertical" verticalAlign="bottom" align="center" /> */}
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default CustomRadialBarChart;