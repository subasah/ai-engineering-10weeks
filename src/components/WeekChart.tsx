import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { ChartConfig } from "../data/chartData";

interface WeekChartProps {
  config: ChartConfig;
}

interface TooltipPayload {
  dataKey: string;
  value: number;
  color: string;
  name: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl px-4 py-3 text-sm shadow-xl"
      style={{
        backgroundColor: "#1a1f3c",
        border: "1px solid rgba(124, 58, 237, 0.4)",
        color: "#e2e8f0",
      }}
    >
      <p className="font-bold mb-2 text-white">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} style={{ color: entry.color }}>
          {entry.name}: <span className="font-semibold">{entry.value}</span>
        </p>
      ))}
    </div>
  );
}

export default function WeekChart({ config }: WeekChartProps) {
  return (
    <div
      className="rounded-xl overflow-hidden p-5"
      style={{
        background: "linear-gradient(135deg, #13162a 0%, #1a1f3c 100%)",
        border: "1px solid rgba(124, 58, 237, 0.2)",
      }}
    >
      <div className="flex items-start gap-2 mb-1">
        <span className="text-lg">📈</span>
        <div>
          <h3 className="text-white font-semibold text-sm">{config.title}</h3>
          <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>
            {config.description}
          </p>
        </div>
      </div>

      <div className="mt-4" style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={config.data}
            margin={{ top: 4, right: 16, left: -16, bottom: 0 }}
            barCategoryGap="25%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(124, 58, 237, 0.1)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fill: "#64748b", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(124, 58, 237, 0.06)" }}
            />
            <Legend
              wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
              formatter={(value) => (
                <span style={{ color: "#94a3b8" }}>{value}</span>
              )}
            />
            {config.bars.map((bar) => (
              <Bar
                key={bar.key}
                dataKey={bar.key}
                name={bar.label}
                fill={bar.color}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
