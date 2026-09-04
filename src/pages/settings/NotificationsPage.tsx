import SidebarLayout from "@/components/layout/SidebarLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Mail, MessageSquare, Smartphone, Save } from "lucide-react";

const notifications = [
  { category: "Leave & Attendance", items: [
    { title: "Leave Request Submitted", desc: "When an employee submits a leave request", email: true, push: true, inApp: true },
    { title: "Leave Approved/Rejected", desc: "When your leave is approved or rejected", email: true, push: true, inApp: true },
    { title: "Attendance Reminder", desc: "Daily clock-in/out reminders", email: false, push: true, inApp: false },
  ]},
  { category: "Performance", items: [
    { title: "Review Assigned", desc: "When a performance review is assigned to you", email: true, push: true, inApp: true },
    { title: "Goal Deadline", desc: "When goal deadlines are approaching", email: true, push: true, inApp: true },
    { title: "Feedback Received", desc: "When someone gives you feedback", email: true, push: false, inApp: true },
  ]},
  { category: "Payroll", items: [
    { title: "Payslip Available", desc: "When your monthly payslip is ready", email: true, push: true, inApp: true },
    { title: "Payroll Processing", desc: "Payroll processing status updates", email: true, push: false, inApp: true },
  ]},
  { category: "General", items: [
    { title: "News & Announcements", desc: "Company news and updates", email: false, push: false, inApp: true },
    { title: "Document Shared", desc: "When a document is shared with you", email: true, push: false, inApp: true },
    { title: "System Maintenance", desc: "Scheduled maintenance alerts", email: true, push: true, inApp: true },
  ]},
];

const NotificationsPage = () => {
  return (
    <SidebarLayout>
      <div className="space-y-6 max-w-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Notification Preferences</h1>
            <p className="text-muted-foreground text-sm mt-1">Choose how you want to be notified</p>
          </div>
          <Button><Save className="w-4 h-4 mr-2" /> Save</Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: Mail, label: "Email", count: "12 active", color: "text-primary" },
            { icon: Smartphone, label: "Push", count: "8 active", color: "text-accent" },
            { icon: Bell, label: "In-App", count: "15 active", color: "text-yellow-600" },
          ].map((ch) => (
            <Card key={ch.label}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <ch.icon className={`w-5 h-5 ${ch.color}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{ch.label}</p>
                  <p className="text-xs text-muted-foreground">{ch.count}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {notifications.map((group) => (
          <Card key={group.category}>
            <CardHeader>
              <CardTitle className="text-base">{group.category}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {group.items.map((item) => (
                <div key={item.title} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                      <Switch defaultChecked={item.email} className="scale-75" />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Smartphone className="w-3.5 h-3.5 text-muted-foreground" />
                      <Switch defaultChecked={item.push} className="scale-75" />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Bell className="w-3.5 h-3.5 text-muted-foreground" />
                      <Switch defaultChecked={item.inApp} className="scale-75" />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </SidebarLayout>
  );
};

export default NotificationsPage;
