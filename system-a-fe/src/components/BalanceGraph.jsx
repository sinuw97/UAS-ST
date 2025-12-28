import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "Dec 12", balance: 1100 },
  { date: "Dec 13", balance: 1200 },
  { date: "Dec 14", balance: 1350 },
  { date: "Dec 15", balance: 1563 },
  { date: "Dec 16", balance: 1800 },
  { date: "Dec 17", balance: 2100 },
  { date: "Dec 18", balance: 2300 },
];

export const ChartSaldo = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <XAxis dataKey="date"/>
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="balance"
          stroke="#2E7D32"
          fill="#E8F5E9"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}