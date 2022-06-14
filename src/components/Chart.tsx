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
import {ChartData, selectedMachine, updateData} from "../app/machinesDataSlice";
import useInterval from "../app/useInterval";
import moment from "moment";
import {useAppDispatch, useAppSelector} from "../app/hooks";

// the speed of chart update can be adjusted
const timeTick = 500;

export default function Chart({ chartData }: {
  chartData: ChartData }) {
  const dispatch = useAppDispatch();
  const selectedMachineID = useAppSelector(selectedMachine).id;
  const theme = useTheme();

  function validate(timeDifference: number) {
    const delta = Math.floor(Math.random() * 500) - 250;

    const oldData = chartData.coordinates;
    const newAmount = oldData[oldData.length - 1].amount + delta;
    const newTime = oldData[oldData.length - 1].time + timeDifference;
    const newCoordinates = [...oldData, { amount: newAmount, time: newTime }].slice(1);
    dispatch(updateData({ machineID: selectedMachineID, chartID: chartData.id, coordinates: newCoordinates }));
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
          data={chartData.coordinates}
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
          >
            <Label
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                top: "20px",
                ...theme.typography.body1,
              }}
              dy={54}
            >
              Time
            </Label>
          </XAxis>
          {/*Make sure that charts are on the same scale*/}
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
