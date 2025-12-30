import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CustomDot } from "../components/CustomDots.jsx"

export const ChartSaldo = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="balance"
          stroke="#2E7D32"
          fill="#E8F5E9"
          strokeWidth={2}
          dot={<CustomDot />}
          activeDot={{ r: 6}}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
