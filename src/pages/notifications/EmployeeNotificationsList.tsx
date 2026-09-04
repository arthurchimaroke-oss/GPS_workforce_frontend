import { useState } from "react";
import EmployeeSidebarLayout from "@/components/layout/EmployeeSidebarLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Bell, Clock, CheckCircle, AlertCircle, Info } from "lucide-react";

const notifications = [
  { 
    title: "Payroll Processed", 
    desc: "Your payroll for this month has been processed successfully. Your net pay will be deposited on the 25th.", 
    time: "5 min ago", 
    type: "success",
    unread: true 
  },
  { 
    title: "Time Off Approved", 
    desc: "Your time off request from March 25-27 has been approved by your manager.", 
    time: "2 hours ago", 
    type: "success",
    unread: true 
  },
  { 
    title: "Performance Review Due", 
    desc: "Your self-assessment for the Q1 performance review is due in 3 days. Please complete it before the deadline.", 
    time: "1 day ago", 
    type: "warning",
    unread: false 
  },
  { 
    title: "New Document Available", 
    desc: "A new company policy document has been shared with you. Please review it at your earliest convenience.", 
    time: "2 days ago", 
    type: "info",
    unread: false 
  },
  { 
    title: "Training Reminder", 
    desc: "Don't forget about your scheduled training session tomorrow at 2:00 PM EST.", 
    time: "3 days ago", 
    type: "info",
    unread: false 
  },
  { 
    title: "Benefits Enrollment Open", 
    desc: "Open enrollment for health benefits is now open. Please review your options and make your selections by April 15th.", 
    time: "5 days ago", 
    type: "info",
    unread: false 
  },
];

const EmployeeNotificationsList = () => {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotifications = notifications.filter(n => {
    if (filter === "unread" && !n.unread) return false;
    if (searchQuery && !n.title.toLowerCase().includes(searchQuery.toLowerCase()) && !n.desc.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "success": return CheckCircle;
      case "warning": return AlertCircle;
      default: return Info;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case "success": return "bg-green-100 text-green-600";
      case "warning": return "bg-amber-100 text-amber-600";
      default: return "bg-blue-100 text-blue-600";
    }
  };

  return (
    <EmployeeSidebarLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
            <p className="text-muted-foreground text-sm mt-1">Stay updated with your latest notifications</p>
          </div>
          <div className="relative">
            <Input 
              placeholder="Search notifications..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pr-10" 
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 border-b border-border">
          <button
            onClick={() => setFilter("all")}
            className={`pb-2 text-sm font-medium transition-colors ${
              filter === "all" 
                ? "text-primary border-b-2 border-primary" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All Notifications
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`pb-2 text-sm font-medium transition-colors ${
              filter === "unread" 
                ? "text-primary border-b-2 border-primary" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Unread ({notifications.filter(n => n.unread).length})
          </button>
        </div>

        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No notifications found</p>
            </div>
          ) : (
            filteredNotifications.map((n, i) => {
              const Icon = getIcon(n.type);
              const colorClass = getColor(n.type);
              
              return (
                <Card 
                  key={i} 
                  className={`cursor-pointer hover:shadow-md transition-shadow ${n.unread ? "border-l-4 border-l-primary" : ""}`}
                >
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full ${colorClass} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold text-foreground">{n.title}</h3>
                        <span className="text-xs text-muted-foreground flex-shrink-0 ml-4 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {n.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{n.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </EmployeeSidebarLayout>
  );
};

export default EmployeeNotificationsList;
