import SidebarLayout from "@/components/layout/SidebarLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save } from "lucide-react";

const ExpenseSettings = () => {
  return (
    <SidebarLayout>
      <div className="space-y-6 max-w-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Expense Settings</h1>
            <p className="text-muted-foreground text-sm mt-1">Configure expense management policies</p>
          </div>
          <Button><Save className="w-4 h-4 mr-2" /> Save Changes</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Approval Workflow</CardTitle>
            <CardDescription>Configure how expenses are reviewed and approved</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Default Approver</Label>
              <Select defaultValue="manager"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="manager">Direct Manager</SelectItem><SelectItem value="hr">HR Department</SelectItem><SelectItem value="finance">Finance Department</SelectItem></SelectContent></Select>
            </div>
            <div className="flex items-center justify-between">
              <div><Label>Auto-approve Under Threshold</Label><p className="text-xs text-muted-foreground">Auto-approve expenses below a certain amount</p></div>
              <Switch />
            </div>
            <div className="space-y-2">
              <Label>Auto-approve Threshold</Label>
              <div className="relative max-w-xs">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                <Input type="number" defaultValue="50" className="pl-7" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Spending Limits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Monthly Limit per Employee</Label>
                <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span><Input type="number" defaultValue="2000" className="pl-7" /></div>
              </div>
              <div className="space-y-2">
                <Label>Single Expense Limit</Label>
                <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span><Input type="number" defaultValue="500" className="pl-7" /></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Policies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div><Label>Receipt Required</Label><p className="text-xs text-muted-foreground">Require receipt upload for all expenses</p></div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div><Label>Mileage Tracking</Label><p className="text-xs text-muted-foreground">Enable mileage-based expense claims</p></div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>Mileage Rate (per mile)</Label>
              <div className="relative max-w-xs"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span><Input type="number" defaultValue="0.67" step="0.01" className="pl-7" /></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
};

export default ExpenseSettings;
