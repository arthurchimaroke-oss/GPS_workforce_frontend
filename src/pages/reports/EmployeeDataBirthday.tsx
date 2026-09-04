import SidebarLayout from "@/components/layout/SidebarLayout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const monthlyBirthdays = [
  { month: "Jan", count: 18 },
  { month: "Feb", count: 14 },
  { month: "Mar", count: 22 },
  { month: "Apr", count: 16 },
  { month: "May", count: 21 },
  { month: "Jun", count: 19 },
  { month: "Jul", count: 24 },
  { month: "Aug", count: 20 },
  { month: "Sep", count: 17 },
  { month: "Oct", count: 23 },
  { month: "Nov", count: 15 },
  { month: "Dec", count: 28 },
];

const quarterlyData = [
  { name: "Q1 (Jan–Mar)", value: 54, color: "#0D9488" },
  { name: "Q2 (Apr–Jun)", value: 56, color: "#1B2559" },
  { name: "Q3 (Jul–Sep)", value: 61, color: "#6366f1" },
  { name: "Q4 (Oct–Dec)", value: 66, color: "#f59e0b" },
];

const upcoming = [
  { name: "Sarah Johnson", dept: "Marketing", date: "Mar 12", daysLeft: 3 },
  { name: "Michael Chen", dept: "Engineering", date: "Mar 15", daysLeft: 6 },
  { name: "Amara Osei", dept: "HR", date: "Mar 18", daysLeft: 9 },
  { name: "Jake Williams", dept: "Sales", date: "Mar 22", daysLeft: 13 },
  { name: "Priya Patel", dept: "Finance", date: "Mar 28", daysLeft: 19 },
];

const EmployeeDataBirthday = () => (
  <SidebarLayout>
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Birthday Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">Employee birthday distribution and upcoming celebrations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-4">Birthdays by Month</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyBirthdays}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#0D9488" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-4">Quarterly Distribution</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={quarterlyData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}>
                {quarterlyData.map((q, i) => <Cell key={i} fill={q.color} />)}
              </Pie>
              <Legend iconType="circle" iconSize={10} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4">🎂 Upcoming Birthdays (Next 30 days)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground text-left">
                <th className="pb-3 font-medium">Employee</th>
                <th className="pb-3 font-medium">Department</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Days Left</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {upcoming.map((e) => (
                <tr key={e.name} className="py-3">
                  <td className="py-3 font-medium text-foreground">{e.name}</td>
                  <td className="py-3 text-muted-foreground">{e.dept}</td>
                  <td className="py-3 text-foreground">{e.date}</td>
                  <td className="py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${e.daysLeft <= 7 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                      {e.daysLeft} days
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </SidebarLayout>
);

export default EmployeeDataBirthday;
