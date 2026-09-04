import SidebarLayout from "@/components/layout/SidebarLayout";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from "recharts";

const headcountTrend = [
  { month: "Jan", total: 218 },
  { month: "Feb", total: 222 },
  { month: "Mar", total: 225 },
  { month: "Apr", total: 228 },
  { month: "May", total: 231 },
  { month: "Jun", total: 234 },
  { month: "Jul", total: 232 },
  { month: "Aug", total: 236 },
  { month: "Sep", total: 240 },
  { month: "Oct", total: 244 },
  { month: "Nov", total: 246 },
  { month: "Dec", total: 248 },
];

const deptHeadcount = [
  { dept: "Engineering", count: 68 },
  { dept: "Sales", count: 44 },
  { dept: "Operations", count: 50 },
  { dept: "Marketing", count: 38 },
  { dept: "Finance", count: 28 },
  { dept: "HR", count: 20 },
];

const locationData = [
  { name: "New York HQ", value: 98, color: "#1B2559" },
  { name: "San Francisco", value: 72, color: "#0D9488" },
  { name: "Remote", value: 54, color: "#6366f1" },
  { name: "London", value: 24, color: "#f59e0b" },
];

const employmentType = [
  { name: "Full-time", value: 198, color: "#0D9488" },
  { name: "Part-time", value: 28, color: "#1B2559" },
  { name: "Contractor", value: 22, color: "#6366f1" },
];

const Headcount = () => (
  <SidebarLayout>
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Headcount</h1>
        <p className="text-sm text-muted-foreground mt-1">Workforce size, growth trends, and distribution</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Employees", value: "248", sub: "+12 this year" },
          { label: "New Hires (YTD)", value: "47", sub: "Across all depts" },
          { label: "Departures (YTD)", value: "35", sub: "Net growth: +12" },
          { label: "Open Positions", value: "14", sub: "Being recruited" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-2xl font-bold text-foreground mt-1">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4">Headcount Growth (2024)</h3>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={headcountTrend}>
            <defs>
              <linearGradient id="hcGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1B2559" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#1B2559" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis domain={[200, 260]} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Area type="monotone" dataKey="total" stroke="#1B2559" fill="url(#hcGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="bg-card border border-border rounded-xl p-5 lg:col-span-2">
          <h3 className="font-semibold text-foreground mb-4">Headcount by Department</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={deptHeadcount}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="dept" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#0D9488" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-4">Employment Type</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={employmentType} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={40} label={({ percent }) => `${(percent * 100).toFixed(0)}%`}>
                {employmentType.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Legend iconType="circle" iconSize={10} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4">Distribution by Location</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {locationData.map((loc) => (
            <div key={loc.name} className="text-center p-4 rounded-lg border border-border">
              <p className="text-2xl font-bold" style={{ color: loc.color }}>{loc.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{loc.name}</p>
              <p className="text-xs font-medium text-foreground">{((loc.value / 248) * 100).toFixed(1)}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </SidebarLayout>
);

export default Headcount;
