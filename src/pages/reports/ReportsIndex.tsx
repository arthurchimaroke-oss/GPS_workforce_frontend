import SidebarLayout from "@/components/layout/SidebarLayout";
import { useNavigate } from "react-router-dom";
import { Users, TrendingDown, UserCheck, Calendar, Clock, BarChart2, ArrowRight } from "lucide-react";

const reportCategories = [
  {
    title: "Employee Data",
    description: "Demographic and workforce composition reports",
    icon: Users,
    color: "bg-blue-50 text-blue-600",
    reports: [
      { label: "Age Distribution", path: "/reports/employee-data/age" },
      { label: "Gender Distribution", path: "/reports/employee-data/gender" },
      { label: "Birthday Overview", path: "/reports/employee-data/birthday" },
    ],
  },
  {
    title: "Headcount",
    description: "Track workforce size and growth over time",
    icon: BarChart2,
    color: "bg-teal-50 text-teal-600",
    reports: [
      { label: "Headcount Overview", path: "/reports/headcount" },
    ],
  },
  {
    title: "Turnover",
    description: "Attrition, retention, and exit analysis",
    icon: TrendingDown,
    color: "bg-red-50 text-red-600",
    reports: [
      { label: "Turnover Rate", path: "/reports/turnover" },
    ],
  },
  {
    title: "Onboarding",
    description: "New hire progress and completion tracking",
    icon: UserCheck,
    color: "bg-green-50 text-green-600",
    reports: [
      { label: "Onboarding Report", path: "/reports/onboarding" },
      { label: "Offboarding Report", path: "/reports/offboarding" },
    ],
  },
  {
    title: "Time Off",
    description: "Leave usage, balances, and trends",
    icon: Calendar,
    color: "bg-purple-50 text-purple-600",
    reports: [
      { label: "Time Off Balance", path: "/reports/time-off-balance" },
      { label: "Time Off Schedule", path: "/reports/time-off-schedule" },
    ],
  },
  {
    title: "Attendance",
    description: "Presence, punctuality, and absence patterns",
    icon: Clock,
    color: "bg-orange-50 text-orange-600",
    reports: [
      { label: "My Attendance", path: "/attendance/my" },
      { label: "Team Attendance", path: "/attendance/team" },
    ],
  },
];

const quickStats = [
  { label: "Total Employees", value: "248", change: "+12 this month", up: true },
  { label: "Avg. Tenure", value: "3.2 yrs", change: "+0.1 from last year", up: true },
  { label: "Turnover Rate", value: "8.4%", change: "-1.2% vs last year", up: false },
  { label: "Onboarding Active", value: "14", change: "3 completed this week", up: true },
];

const ReportsIndex = () => {
  const navigate = useNavigate();

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">Workforce insights and analytics</p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
              <p className={`text-xs mt-1 ${stat.up ? "text-green-600" : "text-red-500"}`}>{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Report categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {reportCategories.map((cat) => (
            <div key={cat.title} className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${cat.color}`}>
                  <cat.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{cat.title}</h3>
                  <p className="text-xs text-muted-foreground">{cat.description}</p>
                </div>
              </div>
              <div className="space-y-2">
                {cat.reports.map((report) => (
                  <button
                    key={report.label}
                    onClick={() => navigate(report.path)}
                    className="w-full flex items-center justify-between text-sm text-foreground hover:text-primary px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <span>{report.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-50" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SidebarLayout>
  );
};

export default ReportsIndex;
