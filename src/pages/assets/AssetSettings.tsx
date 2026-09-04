import SidebarLayout from "@/components/layout/SidebarLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Save, Plus, X } from "lucide-react";

const categories = ["Laptop", "Monitor", "Phone", "Headphones", "Keyboard", "Mouse", "Tablet", "Printer"];

const AssetSettings = () => {
  return (
    <SidebarLayout>
      <div className="space-y-6 max-w-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Asset Settings</h1>
            <p className="text-muted-foreground text-sm mt-1">Configure asset management preferences</p>
          </div>
          <Button><Save className="w-4 h-4 mr-2" /> Save Changes</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Asset Categories</CardTitle>
            <CardDescription>Manage asset type categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((cat) => (
                <Badge key={cat} variant="secondary" className="gap-1 px-3 py-1.5">
                  {cat} <X className="w-3 h-3 cursor-pointer opacity-50 hover:opacity-100" />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input placeholder="Add new category..." className="max-w-xs" />
              <Button variant="outline" size="sm"><Plus className="w-4 h-4 mr-1" /> Add</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tracking & Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div><Label>Warranty Expiry Alerts</Label><p className="text-xs text-muted-foreground">Get notified before warranty expires</p></div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div><Label>Maintenance Reminders</Label><p className="text-xs text-muted-foreground">Schedule periodic maintenance reminders</p></div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div><Label>Auto-depreciation Tracking</Label><p className="text-xs text-muted-foreground">Track asset value depreciation automatically</p></div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">ID Format</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Prefix</Label><Input defaultValue="AST" /></div>
              <div className="space-y-2"><Label>Starting Number</Label><Input type="number" defaultValue="001" /></div>
            </div>
            <p className="text-xs text-muted-foreground">Preview: AST-001, AST-002, AST-003...</p>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
};

export default AssetSettings;
