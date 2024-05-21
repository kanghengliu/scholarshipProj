import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import useSWR from 'swr';

// Custom hook to fetch data
const fetcher = (url) => fetch(url).then((res) => res.json());

const useHistoryData = () => {
  const { data, error } = useSWR('/history_PPT.json', fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

const Example = () => {
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
          left: 0,
          bottom: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -10 }} />
        <YAxis label={{ value: 'Precipitation (PPT)', angle: -90, position: 'Left' }} />
        <Tooltip />
        <Legend verticalAlign="top" height={36}/>
        <Area type="monotone" dataKey="annual" stroke="#8884d8" fill="#8884d8" name="Annual PPT" />
        <Area type="monotone" dataKey="summer" stroke="#82ca9d" fill="#82ca9d" name="Summer PPT" />
        <Area type="monotone" dataKey="winter" stroke="#ffc658" fill="#ffc658" name="Winter PPT" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Example;
