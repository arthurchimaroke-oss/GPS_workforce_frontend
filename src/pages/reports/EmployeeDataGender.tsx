import SidebarLayout from "@/components/layout/SidebarLayout";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const genderData = [
  { name: "Male", value: 138, color: "#1B2559" },
  { name: "Female", value: 102, color: "#0D9488" },
  { name: "Non-binary", value: 8, color: "#6366f1" },
];

const deptGender = [
  { dept: "Engineering", male: 34, female: 12, other: 2 },
  { dept: "Marketing", male: 14, female: 22, other: 1 },
  { dept: "HR", male: 8, female: 24, other: 2 },
  { dept: "Finance", male: 20, female: 16, other: 1 },
  { dept: "Sales", male: 28, female: 14, other: 1 },
  { dept: "Operations", male: 34, female: 14, other: 1 },
];

const seniorityGender = [
  { level: "C-Suite", male: 6, female: 2 },
  { level: "Director", male: 12, female: 8 },
  { level: "Manager", male: 24, female: 18 },
  { level: "Senior", male: 42, female: 32 },
  { level: "Mid", male: 34, female: 28 },
  { level: "Junior", male: 20, female: 14 },
];

const EmployeeDataGender = () => (
  <SidebarLayout>
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Gender Distribution</h1>
        <p className="text-sm text-muted-foreground mt-1">Diversity and inclusion workforce analytics</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {genderData.map((g) => (
          <div key={g.name} className="bg-card border border-border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold" style={{ color: g.color }}>{g.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{g.name}</p>
            <p className="text-xs font-medium text-foreground">{((g.value / 248) * 100).toFixed(1)}%</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-4">Overall Gender Split</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={50} label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}>
                {genderData.map((g, i) => <Cell key={i} fill={g.color} />)}
              </Pie>
              <Legend iconType="circle" iconSize={10} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-4">Gender by Seniority Level</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={seniorityGender} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis dataKey="level" type="category" width={65} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="male" name="Male" fill="#1B2559" stackId="a" />
              <Bar dataKey="female" name="Female" fill="#0D9488" stackId="a" radius={[0, 4, 4, 0]} />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4">Gender by Department</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={deptGender}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="dept" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="male" name="Male" fill="#1B2559" stackId="a" />
            <Bar dataKey="female" name="Female" fill="#0D9488" stackId="a" />
            <Bar dataKey="other" name="Non-binary" fill="#6366f1" stackId="a" radius={[4, 4, 0, 0]} />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </SidebarLayout>
);

export default EmployeeDataGender;
