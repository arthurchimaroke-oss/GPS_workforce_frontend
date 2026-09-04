import SidebarLayout from "@/components/layout/SidebarLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Bell, Settings, Users } from "lucide-react";

const notifications = [
  { title: "Training session reminder", desc: "Don't forget to join our upcoming training session on the HR Management Dashboard. Learn best practices and get the most out of our system.", time: "Now", icon: Bell, iconBg: "bg-destructive/10", iconColor: "text-destructive" },
  { title: "New Integration Announcement", desc: "Don't forget to join our upcoming training session on the HR Management Dashboard. Learn best practices and get the most out of our system.", time: "9:00 AM", icon: Settings, iconBg: "bg-muted", iconColor: "text-muted-foreground" },
  { title: "User feedback survey", desc: "Don't forget to join our upcoming training session on the HR Management Dashboard. Learn best practices and get the most out of our system.", time: "1 Oct 2022", icon: Users, iconBg: "bg-accent/10", iconColor: "text-accent" },
  { title: "Overdue Performance Review", desc: "Your performance review was due on 1 Oct 2022. Please contact your manager to schedule a review as soon as possible.", time: "20 Sep 2022", icon: Bell, iconBg: "bg-destructive/10", iconColor: "text-destructive" },
  { title: "New Training Opportunity", desc: "A new training course has been added to the learning management system. Click here to view the course and enroll.", time: "1 Sep 2022", icon: Users, iconBg: "bg-accent/10", iconColor: "text-accent" },
];

const NotificationsList = () => {
  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Notification</h1>
            <p className="text-muted-foreground text-sm mt-1">This is All your notification</p>
          </div>
          <div className="relative">
            <Input placeholder="Search what you need" className="w-64 pr-10" />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        <div className="space-y-4">
          {notifications.map((n, i) => (
            <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full ${n.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <n.icon className={`w-5 h-5 ${n.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-foreground">{n.title}</h3>
                    <span className="text-xs text-muted-foreground flex-shrink-0 ml-4">{n.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{n.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SidebarLayout>
  );
};

export default NotificationsList;
