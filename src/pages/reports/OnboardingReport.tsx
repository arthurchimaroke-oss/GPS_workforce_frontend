import SidebarLayout from "@/components/layout/SidebarLayout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from "recharts";

const completionTrend = [
  { month: "Jul", completed: 4, inProgress: 2, notStarted: 1 },
  { month: "Aug", completed: 6, inProgress: 3, notStarted: 2 },
  { month: "Sep", completed: 5, inProgress: 4, notStarted: 1 },
  { month: "Oct", completed: 8, inProgress: 2, notStarted: 1 },
  { month: "Nov", completed: 7, inProgress: 3, notStarted: 2 },
  { month: "Dec", completed: 9, inProgress: 2, notStarted: 0 },
];

const avgTimeDept = [
  { dept: "Engineering", days: 18 },
  { dept: "Sales", days: 12 },
  { dept: "Marketing", days: 14 },
  { dept: "HR", days: 10 },
  { dept: "Finance", days: 16 },
  { dept: "Operations", days: 13 },
];

const statusData = [
  { name: "Completed", value: 39, color: "#0D9488" },
  { name: "In Progress", value: 14, color: "#1B2559" },
  { name: "Not Started", value: 7, color: "#94a3b8" },
];

const recentActivity = [
  { name: "James Okafor", dept: "Engineering", status: "Completed", completedTasks: 12, totalTasks: 12, date: "Mar 8" },
  { name: "Lily Zhang", dept: "Marketing", status: "In Progress", completedTasks: 8, totalTasks: 12, date: "Mar 1" },
  { name: "Marcus Brown", dept: "Sales", status: "In Progress", completedTasks: 5, totalTasks: 10, date: "Feb 28" },
  { name: "Fatima Hassan", dept: "Finance", status: "Not Started", completedTasks: 0, totalTasks: 11, date: "Mar 4" },
  { name: "David Park", dept: "Operations", status: "Completed", completedTasks: 10, totalTasks: 10, date: "Mar 6" },
];

const statusColors: Record<string, string> = {
  "Completed": "bg-green-100 text-green-700",
  "In Progress": "bg-blue-100 text-blue-700",
  "Not Started": "bg-gray-100 text-gray-600",
};

const OnboardingReport = () => (
  <SidebarLayout>
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Onboarding Report</h1>
        <p className="text-sm text-muted-foreground mt-1">New hire onboarding progress and completion tracking</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Onboarding", value: "60", sub: "All time" },
          { label: "Completed", value: "39", sub: "65% completion rate" },
          { label: "In Progress", value: "14", sub: "Active right now" },
          { label: "Avg. Completion Time", value: "14 days", sub: "Across departments" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-2xl font-bold text-foreground mt-1">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-4">Monthly Onboarding Completion</h3>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={completionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="completed" name="Completed" fill="#0D9488" stackId="a" />
              <Bar dataKey="inProgress" name="In Progress" fill="#1B2559" stackId="a" />
              <Bar dataKey="notStarted" name="Not Started" fill="#94a3b8" stackId="a" radius={[4, 4, 0, 0]} />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-4">Status Breakdown</h3>
          <ResponsiveContainer width="100%" height={230}>
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={40} label={({ percent }) => `${(percent * 100).toFixed(0)}%`}>
                {statusData.map((s, i) => <Cell key={i} fill={s.color} />)}
              </Pie>
              <Legend iconType="circle" iconSize={10} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4">Avg. Completion Time by Department (days)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={avgTimeDept} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis dataKey="dept" type="category" width={85} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="days" fill="#6366f1" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4">Recent Onboarding Activity</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground text-left">
                <th className="pb-3 font-medium">Employee</th>
                <th className="pb-3 font-medium">Department</th>
                <th className="pb-3 font-medium">Progress</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Start Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentActivity.map((e) => (
                <tr key={e.name}>
                  <td className="py-3 font-medium text-foreground">{e.name}</td>
                  <td className="py-3 text-muted-foreground">{e.dept}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-muted rounded-full h-1.5">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: `${(e.completedTasks / e.totalTasks) * 100}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{e.completedTasks}/{e.totalTasks}</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[e.status]}`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="py-3 text-muted-foreground">{e.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </SidebarLayout>
);

export default OnboardingReport;
