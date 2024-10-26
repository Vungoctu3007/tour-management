import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const data = [
  { name: "T1", uv: 4000, pv: 2400 },
  { name: "T2", uv: 3000, pv: 1398 },
  { name: "T3", uv: 2000, pv: 9800 },
  { name: "T4", uv: 2780, pv: 3908 },
  { name: "T5", uv: 1890, pv: 4800 },
  { name: "T6", uv: 2390, pv: 3800 },
  { name: "T7", uv: 3490, pv: 4300 },
  { name: "T8", uv: 3490, pv: 4300 },
  { name: "T9", uv: 3490, pv: 4300 },
  { name: "T10", uv: 3490, pv: 4300 },
  { name: "T11", uv: 3490, pv: 4300 },
  { name: "T12", uv: 3490, pv: 4300 },
];
class LineChartComponent extends PureComponent {
  render() {
    return (
      <ResponsiveContainer style={{backgroundColor:"transparent"}}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
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
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default LineChartComponent;
