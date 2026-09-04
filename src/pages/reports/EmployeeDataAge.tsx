import SidebarLayout from "@/components/layout/SidebarLayout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const ageGroups = [
  { range: "18–24", count: 18 },
  { range: "25–34", count: 72 },
  { range: "35–44", count: 85 },
  { range: "45–54", count: 48 },
  { range: "55–64", count: 20 },
  { range: "65+", count: 5 },
];

const generations = [
  { name: "Gen Z (1997–2012)", value: 18, color: "#0D9488" },
  { name: "Millennials (1981–1996)", value: 110, color: "#1B2559" },
  { name: "Gen X (1965–1980)", value: 85, color: "#6366f1" },
  { name: "Boomers (1946–1964)", value: 35, color: "#f59e0b" },
];

const deptAvgAge = [
  { dept: "Engineering", avg: 31 },
  { dept: "Marketing", avg: 34 },
  { dept: "HR", avg: 38 },
  { dept: "Finance", avg: 42 },
  { dept: "Sales", avg: 29 },
  { dept: "Operations", avg: 36 },
];

const EmployeeDataAge = () => (
  <SidebarLayout>
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Age Distribution</h1>
        <p className="text-sm text-muted-foreground mt-1">Workforce demographic breakdown by age</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Average Age", value: "37.2" },
          { label: "Youngest Employee", value: "21" },
          { label: "Oldest Employee", value: "67" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-4">Age Group Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ageGroups}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="range" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#0D9488" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-4">Generation Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={generations} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}>
                {generations.map((g, i) => <Cell key={i} fill={g.color} />)}
              </Pie>
              <Legend iconType="circle" iconSize={10} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4">Average Age by Department</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={deptAvgAge} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" domain={[20, 50]} tick={{ fontSize: 12 }} />
            <YAxis dataKey="dept" type="category" width={90} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="avg" fill="#1B2559" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </SidebarLayout>
);

export default EmployeeDataAge;
