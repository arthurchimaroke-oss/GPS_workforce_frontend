import SettingsLayout from "@/components/layout/SettingsLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface PushNotificationsProps {
  activeTab?: string;
}

const notifications = [
  { title: "Job interview Reminder", desc: "Allows a user to receive alerts regarding scheduled job interviews", enabled: true },
  { title: "Email Invitation to Join the team", desc: "Enables users to receive alerts about upcoming job interviews that they have been invited to join", enabled: false },
  { title: "Mention In board", desc: "Enables users to receive alerts about upcoming job interviews that they have been invited to join", enabled: true },
  { title: "Update Employee Status", desc: "Enables users to receive alerts about upcoming job interviews that they have been invited to join", enabled: true },
];

const PushNotifications = ({ activeTab }: PushNotificationsProps) => {
  return (
    <SettingsLayout activeTab="/settings/push-notifications">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">Notification</h2>
        <div className="border-b border-border mb-6" />

        <div className="space-y-4">
          {notifications.map((n) => (
            <Card key={n.title}>
              <CardContent className="p-5 flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{n.title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{n.desc}</p>
                </div>
                <Switch defaultChecked={n.enabled} />
              </CardContent>
            </Card>
          ))}
        </div>

        <Button className="mt-6 px-10">Save</Button>
      </div>
    </SettingsLayout>
  );
};

export default PushNotifications;
