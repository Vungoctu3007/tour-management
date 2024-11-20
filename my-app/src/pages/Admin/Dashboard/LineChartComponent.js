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

class LineChartComponent extends PureComponent {
  render() {
    const data = [
      { name: "T1", revenue: 5000, bookings: 240 },
      { name: "T2", revenue: 4000, bookings: 180 },
      { name: "T3", revenue: 6000, bookings: 300 },
      { name: "T4", revenue: 8000, bookings: 450 },
      { name: "T5", revenue: 7000, bookings: 380 },
      { name: "T6", revenue: 6500, bookings: 340 },
      { name: "T7", revenue: 9000, bookings: 500 },
      { name: "T8", revenue: 8500, bookings: 480 },
      { name: "T9", revenue: 7300, bookings: 420 },
      { name: "T10", revenue: 7800, bookings: 440 },
      { name: "T11", revenue: 8100, bookings: 460 },
      { name: "T12", revenue: 9200, bookings: 550 },
    ];

    return (
      <ResponsiveContainer width="100%" height="100%">
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
          <XAxis dataKey="name" label={{ value: "Tháng", position: "insideBottomRight", offset: -5 }} />
          <YAxis label={{ value: "Doanh thu & Lượt đặt", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            name="Doanh thu (VNĐ)"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="bookings"
            name="Lượt đặt chỗ"
            stroke="#82ca9d"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default LineChartComponent;
