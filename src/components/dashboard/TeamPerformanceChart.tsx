import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", projectTeam: 35000, productTeam: 38000 },
  { month: "Feb", projectTeam: 42000, productTeam: 35000 },
  { month: "Mar", projectTeam: 38000, productTeam: 40000 },
  { month: "Apr", projectTeam: 55000, productTeam: 50000 },
  { month: "May", projectTeam: 48000, productTeam: 52000 },
  { month: "Jun", projectTeam: 58000, productTeam: 45000 },
  { month: "Jul", projectTeam: 52000, productTeam: 48000 },
];

const TeamPerformanceChart = () => (
  <div className="bg-card border border-border rounded-xl p-5 h-full">
    <div className="flex justify-between items-center mb-4">
      <div>
        <h3 className="font-semibold text-foreground">Team Performance</h3>
        <div className="flex items-center gap-4 mt-1">
          <div className="flex items-center gap-1.5 text-xs">
            <div className="w-2.5 h-2.5 rounded-full bg-hr-teal" />
            <span className="text-hr-text-light">Project Team</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#E5A93D" }} />
            <span className="text-hr-text-light">Product Team</span>
          </div>
        </div>
      </div>
      <span className="text-xs border border-border rounded-lg px-3 py-1.5 text-hr-text-light">
        Last 7 month 📅
      </span>
    </div>

    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorProject" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0D9488" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#0D9488" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorProduct" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#E5A93D" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#E5A93D" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--hr-text-light))" }} axisLine={false} tickLine={false} />
        <YAxis
          tick={{ fontSize: 12, fill: "hsl(var(--hr-text-light))" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v / 1000}k`}
        />
        <Tooltip />
        <Area type="monotone" dataKey="projectTeam" stroke="#0D9488" strokeWidth={2} fill="url(#colorProject)" />
        <Area type="monotone" dataKey="productTeam" stroke="#E5A93D" strokeWidth={2} fill="url(#colorProduct)" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default TeamPerformanceChart;
