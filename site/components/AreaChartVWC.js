import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import useSWR from 'swr';

// Custom hook to fetch data
const fetcher = (url) => fetch(url).then((res) => res.json());

const useHistoryData = () => {
  const { data, error } = useSWR('/history_VWC.json', fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

const AreaChartvwc = () => {
  const { data, isLoading, isError } = useHistoryData();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 15,
          bottom: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -10 }} />
        <YAxis label={{ value: 'volumetric water content (VWC)', angle: -90, position: 'Left', dx: -20}} />
        <Tooltip />
        <Legend verticalAlign="top" height={36}/>
        <Area type="monotone" dataKey="spring" stroke="#8884d8" fill="#8884d8" name="spring VWC" />
        <Area type="monotone" dataKey="summer" stroke="#82ca9d" fill="#82ca9d" name="Summer VWC" />
        <Area type="monotone" dataKey="fall" stroke="#82ca9d" fill="#82ca9d" name="fall VWC" />
        <Area type="monotone" dataKey="winter" stroke="#ffc658" fill="#ffc658" name="Winter VWC" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartvwc;
