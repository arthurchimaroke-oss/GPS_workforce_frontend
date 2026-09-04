import { useState, useEffect } from "react";
import EmployeeSidebarLayout from "@/components/layout/EmployeeSidebarLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/dashboard/StatCard";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import MyPayments from "@/components/employee/MyPayments";
import EmployeeBenefits from "@/components/employee/EmployeeBenefits";
import EmployeeDocuments from "@/components/employee/EmployeeDocuments";
import EmployeeWallet from "@/components/employee/EmployeeWallet";
import BankTransfer from "@/components/employee/BankTransfer";
import { ClaimSalary } from "@/components/payroll/ClaimSalary";
import {
  Clock,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  Coffee,
  Briefcase,
  Heart,
  FileText,
  Bell,
  Plus,
  Download,
  Eye,
  Pencil,
  Users,
  BadgeDollarSign
} from "lucide-react";

const EmployeeDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState("dashboard");
  const [isClockedIn, setIsClockedIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClockInOut = () => {
    setIsClockedIn(!isClockedIn);
  };

  // Dashboard View
  const renderDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome back, John!</h1>
        <p className="text-sm text-muted-foreground">Here's your personal dashboard overview</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Clock className="w-6 h-6" />}
          value="7.5h"
          label="Today's Hours"
          change="+0.5h from yesterday"
          positive
        />
        <StatCard
          icon={<Coffee className="w-6 h-6" />}
          value="12 days"
          label="Time Off Balance"
          change="3 days used"
          positive
        />
        <StatCard
          icon={<DollarSign className="w-6 h-6" />}
          value="$4,250"
          label="Monthly Salary"
          change="+2.5% from last month"
          positive
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          value="92%"
          label="Performance"
          change="Excellent rating"
          positive
        />
      </div>

      {/* Clock In/Out Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800">Clock Status</p>
              <p className="text-3xl font-bold text-blue-900 mt-1">
                {isClockedIn ? "CLOCKED IN" : "CLOCKED OUT"}
              </p>
              <p className="text-xs text-blue-700 mt-2">Last update: Today at 9:00 AM</p>
            </div>
            <Button
              onClick={handleClockInOut}
              size="lg"
              className={`${
                isClockedIn
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {isClockedIn ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Clock Out
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Clock In
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Request Time Off</p>
                <p className="text-xs text-muted-foreground">Submit leave request</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <FileText className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm font-medium">View Payslip</p>
                <p className="text-xs text-muted-foreground">Latest salary slip</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Bell className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Announcements</p>
                <p className="text-xs text-muted-foreground">Company updates</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <Briefcase className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium">My Tasks</p>
                <p className="text-xs text-muted-foreground">Active assignments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { title: "Clocked in at 9:00 AM", time: "Today" },
            { title: "Submitted time off request", time: "2 days ago" },
            { title: "Performance review completed", time: "1 week ago" },
            { title: "Salary payment received", time: "1 week ago" }
          ].map((activity, i) => (
            <div key={i} className="flex items-center gap-3 pb-3 border-b last:border-0">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  // Time Off View
  const renderTimeOff = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Time Off Requests</h1>
        <p className="text-sm text-muted-foreground">Manage your time off balance and requests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">20 days</div>
            <p className="text-xs text-muted-foreground mt-1">Annual allowance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Used This Year</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8 days</div>
            <p className="text-xs text-muted-foreground mt-1">40% of balance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12 days</div>
            <p className="text-xs text-muted-foreground mt-1">Available balance</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Pending Requests</CardTitle>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Request
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { type: "Vacation", from: "Mar 25, 2026", to: "Mar 29, 2026", status: "Pending" },
              { type: "Sick Leave", from: "Mar 20, 2026", to: "Mar 20, 2026", status: "Approved" }
            ].map((request, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{request.type}</p>
                  <p className="text-sm text-muted-foreground">{request.from} - {request.to}</p>
                </div>
                <Badge variant={request.status === "Approved" ? "default" : "secondary"}>
                  {request.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Attendance View
  const renderAttendance = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Attendance</h1>
        <p className="text-sm text-muted-foreground">Track your attendance and work hours</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={<Clock className="w-6 h-6" />}
          value="160h"
          label="Hours This Month"
          change="On track"
          positive
        />
        <StatCard
          icon={<Calendar className="w-6 h-6" />}
          value="20 days"
          label="Days Worked"
          change="This month"
          positive
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          value="98%"
          label="Attendance Rate"
          change="+2% from last month"
          positive
        />
        <StatCard
          icon={<AlertCircle className="w-6 h-6" />}
          value="0"
          label="Late Arrivals"
          change="This month"
          positive
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Summary - March 2026</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { date: "Mar 19, 2026", in: "9:00 AM", out: "5:30 PM", hours: 8.5 },
            { date: "Mar 18, 2026", in: "8:45 AM", out: "5:15 PM", hours: 8.5 },
            { date: "Mar 17, 2026", in: "9:15 AM", out: "6:00 PM", hours: 8.75 }
          ].map((record, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">{record.date}</p>
                <p className="text-sm text-muted-foreground">{record.in} - {record.out}</p>
              </div>
              <Badge variant="outline">{record.hours}h</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  // Payroll View
  const renderPayroll = () => (
    <div className="space-y-6">
      <MyPayments />
    </div>
  );

  // Performance View
  const renderPerformance = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Performance</h1>
        <p className="text-sm text-muted-foreground">Track your performance metrics and goals</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Score</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-600">92%</div>
            <p className="text-muted-foreground mt-2">Q1 2026 Rating</p>
            <Badge className="mt-3">Excellent</Badge>
          </div>

          <div className="space-y-4">
            {[
              { metric: "Communication", score: 90, target: 100 },
              { metric: "Technical Skills", score: 95, target: 100 },
              { metric: "Problem Solving", score: 88, target: 100 },
              { metric: "Team Collaboration", score: 92, target: 100 }
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">{item.metric}</p>
                  <span className="text-sm text-muted-foreground">{item.score}/100</span>
                </div>
                <Progress value={(item.score / item.target) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Goals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { title: "Complete React certification", progress: 85, deadline: "Apr 15, 2026" },
            { title: "Lead 2 project initiatives", progress: 50, deadline: "Jun 30, 2026" }
          ].map((goal, i) => (
            <div key={i} className="space-y-2 pb-4 border-b last:border-0">
              <div className="flex items-center justify-between">
                <p className="font-medium">{goal.title}</p>
                <span className="text-sm text-muted-foreground">{goal.progress}%</span>
              </div>
              <Progress value={goal.progress} className="h-2" />
              <p className="text-xs text-muted-foreground">Due: {goal.deadline}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  // Benefits View
  const renderBenefits = () => (
    <div className="space-y-6">
      <EmployeeBenefits />
    </div>
  );

  // Documents View
  const renderDocuments = () => (
    <div className="space-y-6">
      <EmployeeDocuments />
    </div>
  );

  // Wallet View
  const renderWallet = () => (
    <div className="space-y-6">
      <EmployeeWallet />
    </div>
  );

  // Bank Transfer View
  const renderBankTransfer = () => (
    <div className="space-y-6">
      <BankTransfer />
    </div>
  );

  // Claim Salary View
  const renderClaimSalary = () => (
    <div className="space-y-6">
      <ClaimSalary />
    </div>
  );

  if (loading) {
    return (
      <EmployeeSidebarLayout currentView={currentView} onViewChange={setCurrentView}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-3">
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-muted rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </EmployeeSidebarLayout>
    );
  }

  return (
    <EmployeeSidebarLayout currentView={currentView} onViewChange={setCurrentView}>
      {currentView === "dashboard" && renderDashboard()}
      {currentView === "timeoff" && renderTimeOff()}
      {currentView === "attendance" && renderAttendance()}
      {currentView === "payroll" && renderPayroll()}
      {currentView === "performance" && renderPerformance()}
      {currentView === "benefits" && renderBenefits()}
      {currentView === "wallet" && renderWallet()}
      {currentView === "banktransfer" && renderBankTransfer()}
      {currentView === "claimsalary" && renderClaimSalary()}
      {currentView === "documents" && renderDocuments()}
    </EmployeeSidebarLayout>
  );
};

export default EmployeeDashboard;