import SidebarLayout from "@/components/layout/SidebarLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Save } from "lucide-react";

const PerformanceSettings = () => {
  return (
    <SidebarLayout>
      <div className="space-y-6 max-w-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Performance Settings</h1>
            <p className="text-muted-foreground text-sm mt-1">Configure performance review cycles and rating scales</p>
          </div>
          <Button><Save className="w-4 h-4 mr-2" /> Save Changes</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Review Cycles</CardTitle>
            <CardDescription>Configure default review cycle settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Annual Review Month</Label>
                <Select defaultValue="march">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(m => (
                      <SelectItem key={m} value={m.toLowerCase()}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Review Duration (days)</Label>
                <Input type="number" defaultValue="30" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Enable Mid-Year Reviews</p>
                <p className="text-xs text-muted-foreground">Automatically schedule mid-year review cycles</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Probation Reviews</p>
                <p className="text-xs text-muted-foreground">Auto-create reviews for employees in probation</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Rating Scale</CardTitle>
            <CardDescription>Configure the performance rating scale</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Rating System</Label>
              <Select defaultValue="5-star">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="5-star">5-Star Rating</SelectItem>
                  <SelectItem value="10-point">10-Point Scale</SelectItem>
                  <SelectItem value="letter">Letter Grade (A-F)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="space-y-3">
              {[
                { label: "Exceptional", range: "4.5 - 5.0", color: "bg-accent" },
                { label: "Exceeds Expectations", range: "3.5 - 4.4", color: "bg-primary" },
                { label: "Meets Expectations", range: "2.5 - 3.4", color: "bg-yellow-500" },
                { label: "Needs Improvement", range: "1.5 - 2.4", color: "bg-orange-500" },
                { label: "Unsatisfactory", range: "1.0 - 1.4", color: "bg-destructive" },
              ].map((tier) => (
                <div key={tier.label} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${tier.color}`} />
                  <span className="text-sm font-medium text-foreground flex-1">{tier.label}</span>
                  <span className="text-xs text-muted-foreground">{tier.range}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Notifications</CardTitle>
            <CardDescription>Configure review-related notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "Review Reminders", desc: "Send reminders for upcoming reviews" },
              { title: "Goal Deadline Alerts", desc: "Notify when goal deadlines are approaching" },
              { title: "Feedback Notifications", desc: "Notify employees when they receive feedback" },
              { title: "Cycle Completion", desc: "Notify managers when review cycles complete" },
            ].map((item) => (
              <div key={item.title} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
};

export default PerformanceSettings;
