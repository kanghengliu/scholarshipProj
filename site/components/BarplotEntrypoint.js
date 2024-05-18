import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  LabelList,
  defs,
  linearGradient,
  stop,
} from "recharts";

const CustomAreaChart = () => {
  const data = [
    {
      temp: '10.23 °C',
      percentage: 0.700000,
      dacade: "1985",
    },
    {
      temp: '10.78 °C',
      percentage: 0.873836,
      dacade: "1995",
    },
    {
      temp: '10.75 °C',
      percentage: 0.863618,
      dacade: "2005",
    },
    {
      temp: '11.17 °C',
      percentage: 1.00000,
      dacade: "2015",
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 50,
          right: 20,
          left: 20,
          bottom: 5,
        }}
        style={{ background: "transparent" }}
      >
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="black" stopOpacity={0} />
            <stop offset="100%" stopColor="black" stopOpacity={1} />
          </linearGradient>
        </defs>
        <Bar dataKey="percentage" fill="url(#gradient)">
          <LabelList dataKey="temp" position="insideTop" fill="#fff" fontSize="8rem" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomAreaChart;

