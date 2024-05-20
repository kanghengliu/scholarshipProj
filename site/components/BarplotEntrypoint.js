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
import { useMediaQuery } from 'react-responsive';

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

  // Use media queries to determine the screen size
  const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 601px) and (max-width: 1024px)' });

  // Define font sizes based on screen size
  const tempFontSize = isSmallScreen ? '2rem' : isMediumScreen ? '3rem' : '4rem';
  const dacadeFontSize = isSmallScreen ? '6rem' : isMediumScreen ? '7rem' : '8rem';

  const containerStyle = {
    pointerEvents: "none"
  };

  return (
    <ResponsiveContainer width="100%" height="100%" style={containerStyle}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 50,
          right: 5,
          left: 5,
          bottom: 5,
        }}
        style={{ background: "transparent" }}
        barSize="22.5%"
      >
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="black" stopOpacity={0.9} />
            <stop offset="100%" stopColor="black" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Bar dataKey="percentage" fill="url(#gradient)">
          <LabelList dataKey="temp" position="top" fill="#fff" fontSize={tempFontSize} fontWeight="normal" />
          <LabelList dataKey="dacade" position="insideTop" fill="rgba(255, 255, 255, 0.8)" fontSize={dacadeFontSize} fontWeight="bold" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomAreaChart;
