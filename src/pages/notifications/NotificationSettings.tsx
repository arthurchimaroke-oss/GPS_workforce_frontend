import SidebarLayout from "@/components/layout/SidebarLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const settings = [
  { title: "Time off management", desc: "Enable/disable time off management feature for HR management dashboard", enabled: true },
  { title: "Performance Reviews", desc: "Enable/disable notifications for upcoming or overdue performance reviews", enabled: false },
  { title: "Payroll", desc: "Enable/disable notifications for new payroll information or changes", enabled: true },
  { title: "Company News", desc: "Enable/disable notifications for company news and updates", enabled: false },
  { title: "New Job Openings", desc: "Enable/disable notifications for new job openings within the company", enabled: true },
];

const NotificationSettings = () => {
  return (
    <SidebarLayout>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notification Setting</h1>
          <p className="text-muted-foreground text-sm mt-1">Setting your notification</p>
        </div>

        <div className="space-y-4">
          {settings.map((s) => (
            <Card key={s.title}>
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-base font-semibold text-foreground">{s.title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{s.desc}</p>
                </div>
                <Switch defaultChecked={s.enabled} />
              </CardContent>
            </Card>
          ))}
        </div>

        <Button className="px-10">Save Changes</Button>
      </div>
    </SidebarLayout>
  );
};

export default NotificationSettings;
