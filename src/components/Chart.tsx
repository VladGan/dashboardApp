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
import {ChartData, selectedMachine, updateData} from "../slices/machinesDataSlice";
import useInterval from "../hooks/useInterval";
import moment from "moment";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";

// the speed of chart update can be adjusted
const timeTick = 500;

// chart data is passes to make the component easier to understand and reuse => given coordinates,
// it renders them. But could
// have just pass chart id and get coordinates from the store.
export default function Chart({ chartData }: {
  chartData: ChartData }) {
  // some of the chart's update related logic. In real case this data would come from web socket connection
  // and won't be handled here in 'dumb' component.
  const dispatch = useAppDispatch();
  const selectedMachineID = useAppSelector(selectedMachine).id;
  const theme = useTheme();

  // Takes time difference and updates previous array of coordinates with a new one (cutting the oldest one out)
  // Emulates the data package from the server.
  function validate(timeDifference: number) {
    const delta = Math.floor(Math.random() * 500) - 250;

    const oldData = chartData.coordinates;
    const newAmount = oldData[oldData.length - 1].amount + delta;
    const newTime = oldData[oldData.length - 1].time + timeDifference;
    const newCoordinates = [...oldData, { amount: newAmount, time: newTime }].slice(1);
    dispatch(updateData({ machineID: selectedMachineID, chartID: chartData.id, coordinates: newCoordinates }));
  }

  // useInterval is a custom hook from Dan Abramov to emulate JS's setInterval and avoid closure issues caused by the
  // function passed to it.
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
          {/*Custom tick to display time.*/}
          {moment(payload.value).format("hh:mm:ss")}
        </text>
      </g>
    );
  };

  // simple chart from recharts examples.
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
