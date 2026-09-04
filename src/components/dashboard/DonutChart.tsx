import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

interface DonutChartProps {
  title: string;
  centerValue: string;
  centerLabel: string;
  data: { name: string; value: number; color: string }[];
  filterLabel?: string;
}

const DonutChart = ({ title, centerValue, centerLabel, data, filterLabel = "All Time" }: DonutChartProps) => (
  <div className="bg-card border border-border rounded-xl p-5">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-semibold text-foreground">{title}</h3>
      <span className="text-xs text-hr-text-light">{filterLabel} ▾</span>
    </div>

    <div className="relative w-40 h-40 mx-auto mb-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={70}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-foreground">{centerValue}</span>
        <span className="text-xs text-hr-text-light">{centerLabel}</span>
      </div>
    </div>

    <div className="space-y-2">
      {data.map((item) => (
        <div key={item.name} className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-hr-text">{item.name}</span>
          </div>
          <span className="font-medium text-foreground">{item.value}</span>
        </div>
      ))}
    </div>
  </div>
);

export default DonutChart;
