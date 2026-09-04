import SidebarLayout from "@/components/layout/SidebarLayout";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar } from "recharts";

const monthlyTurnover = [
  { month: "Jan", rate: 1.2, hires: 8, exits: 3 },
  { month: "Feb", rate: 0.8, hires: 6, exits: 2 },
  { month: "Mar", rate: 1.5, hires: 10, exits: 4 },
  { month: "Apr", rate: 1.1, hires: 7, exits: 3 },
  { month: "May", rate: 0.9, hires: 9, exits: 2 },
  { month: "Jun", rate: 1.4, hires: 5, exits: 4 },
  { month: "Jul", rate: 1.8, hires: 4, exits: 5 },
  { month: "Aug", rate: 1.2, hires: 8, exits: 3 },
  { month: "Sep", rate: 0.7, hires: 11, exits: 2 },
  { month: "Oct", rate: 1.0, hires: 9, exits: 3 },
  { month: "Nov", rate: 1.3, hires: 6, exits: 3 },
  { month: "Dec", rate: 0.5, hires: 4, exits: 1 },
];

const exitReasons = [
  { name: "Better Opportunity", value: 38, color: "#0D9488" },
  { name: "Compensation", value: 25, color: "#1B2559" },
  { name: "Work-Life Balance", value: 18, color: "#6366f1" },
  { name: "Relocation", value: 10, color: "#f59e0b" },
  { name: "Other", value: 9, color: "#94a3b8" },
];

const deptTurnover = [
  { dept: "Sales", rate: 14.2 },
  { dept: "Engineering", rate: 6.8 },
  { dept: "Marketing", rate: 9.1 },
  { dept: "HR", rate: 5.4 },
  { dept: "Finance", rate: 4.2 },
  { dept: "Operations", rate: 11.3 },
];

const EmployeeTurnoverRate = () => (
  <SidebarLayout>
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Turnover Rate</h1>
        <p className="text-sm text-muted-foreground mt-1">Attrition trends, exit reasons, and department analysis</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Annual Turnover", value: "8.4%", sub: "vs 9.6% last year", good: true },
          { label: "Total Exits (YTD)", value: "35", sub: "Across all departments", good: null },
          { label: "Avg. Tenure (Exits)", value: "2.1 yrs", sub: "Before leaving", good: null },
          { label: "Voluntary Exits", value: "82%", sub: "of total exits", good: false },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-2xl font-bold text-foreground mt-1">{s.value}</p>
            <p className={`text-xs mt-1 ${s.good === true ? "text-green-600" : s.good === false ? "text-red-500" : "text-muted-foreground"}`}>{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4">Monthly Turnover Rate (%)</h3>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={monthlyTurnover}>
            <defs>
              <linearGradient id="turnoverGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0D9488" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#0D9488" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Area type="monotone" dataKey="rate" stroke="#0D9488" fill="url(#turnoverGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-4">Exit Reasons</h3>
          <ResponsiveContainer width="100%" height={230}>
            <PieChart>
              <Pie data={exitReasons} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={85} label={({ percent }) => `${(percent * 100).toFixed(0)}%`}>
                {exitReasons.map((r, i) => <Cell key={i} fill={r.color} />)}
              </Pie>
              <Legend iconType="circle" iconSize={10} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-4">Turnover Rate by Department (%)</h3>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={deptTurnover} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis dataKey="dept" type="category" width={85} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="rate" fill="#1B2559" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </SidebarLayout>
);

export default EmployeeTurnoverRate;
