import SidebarLayout from "@/components/layout/SidebarLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Save } from "lucide-react";

const TrainingSettings = () => {
  return (
    <SidebarLayout>
      <div className="space-y-6 max-w-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Training Settings</h1>
            <p className="text-muted-foreground text-sm mt-1">Configure training and learning preferences</p>
          </div>
          <Button><Save className="w-4 h-4 mr-2" /> Save Changes</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">General Settings</CardTitle>
            <CardDescription>Configure default training behavior</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div><Label>Mandatory Training Reminders</Label><p className="text-xs text-muted-foreground">Send reminders for mandatory courses</p></div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div><Label>Auto-enroll New Employees</Label><p className="text-xs text-muted-foreground">Automatically enroll new hires in onboarding courses</p></div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div><Label>Certificate Generation</Label><p className="text-xs text-muted-foreground">Auto-generate certificates on course completion</p></div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Completion Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Passing Score (%)</Label>
                <Input type="number" defaultValue="70" />
              </div>
              <div className="space-y-2">
                <Label>Max Attempts for Assessment</Label>
                <Select defaultValue="3"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="1">1</SelectItem><SelectItem value="2">2</SelectItem><SelectItem value="3">3</SelectItem><SelectItem value="unlimited">Unlimited</SelectItem></SelectContent></Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Default Completion Deadline</Label>
              <Select defaultValue="30"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="7">7 days</SelectItem><SelectItem value="14">14 days</SelectItem><SelectItem value="30">30 days</SelectItem><SelectItem value="60">60 days</SelectItem><SelectItem value="90">90 days</SelectItem></SelectContent></Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div><Label>Course Assignment Notification</Label><p className="text-xs text-muted-foreground">Notify when assigned to a new course</p></div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div><Label>Deadline Reminder</Label><p className="text-xs text-muted-foreground">Remind before course deadline</p></div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div><Label>Completion Celebration</Label><p className="text-xs text-muted-foreground">Show celebration on course completion</p></div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
};

export default TrainingSettings;
