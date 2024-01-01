"use client";
import {
  ResponsiveContainer,
  BarChart as Chart,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

export default function BarChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer height="100%" width="100%">
      <Chart data={data}>
        <XAxis dataKey="state" />
        <YAxis />
        <Bar
          dataKey="percentage"
          label={{
            position: "top",
          }}
          radius={[6, 6, 0, 0]}
          className="fill-orange10"
        />
      </Chart>
    </ResponsiveContainer>
  );
}
