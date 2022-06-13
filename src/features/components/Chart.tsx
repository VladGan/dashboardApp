import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Title from "./Title";
import { ChartData } from "../../app/machinesDataSlice";
import { useState } from "react";
import useInterval from "../../app/useInterval";
import moment from "moment";

// the speed of chart update can be adjusted
const timeTick = 3000;

export default function Chart({ chartData }: { chartData: ChartData }) {
  const [data, setData] = useState(chartData.coordinates);
  const theme = useTheme();

  function validate(timeDifference: number) {
    setData((prevData) => {
      const delta = Math.floor(Math.random() * 500) - 250;
      const newAmount = prevData[prevData.length - 1].amount + delta;
      const newTime = prevData[prevData.length - 1].time + timeDifference;
      return [...prevData, { amount: newAmount, time: newTime }].slice(1);
    });
  }
  useInterval(() => {
    validate(timeTick);
  }, timeTick);

  const CustomizedAxisTick = (props: any) => {
    const { x, y, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-90)"
          fontSize={12}
        >
          {moment(payload.value).format("hh:mm:ss")}
        </text>
      </g>
    );
  };

  return (
    <React.Fragment>
      <Title>{chartData.name}</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 45,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            tick={<CustomizedAxisTick />}
            domain={[0, "dataMax"]}
          >
            <Label
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                paddingTop: "20px",
                ...theme.typography.body1,
              }}
            >
              Time
            </Label>
          </XAxis>
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              {chartData.name}
            </Label>
          </YAxis>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
