import SidebarLayout from "@/components/layout/SidebarLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Laptop, Edit, Trash2, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const history = [
  { date: "Jan 15, 2025", action: "Purchased", details: "Purchased from Apple Store — $2,499" },
  { date: "Jan 20, 2025", action: "Assigned", details: "Assigned to Sarah Johnson (Engineering)" },
  { date: "Jun 01, 2025", action: "Maintenance", details: "Battery replacement — $199" },
  { date: "Jun 05, 2025", action: "Returned", details: "Back in service after maintenance" },
];

const AssetDetail = () => {
  const navigate = useNavigate();

  return (
    <SidebarLayout>
      <div className="space-y-6 max-w-4xl">
        <Button variant="ghost" onClick={() => navigate(-1)}><ArrowLeft className="w-4 h-4 mr-2" /> Back to Assets</Button>

        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-accent/10"><Laptop className="w-8 h-8 text-accent" /></div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">MacBook Pro 16"</h1>
              <p className="text-muted-foreground text-sm">AST-001 · Laptop</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline"><Edit className="w-4 h-4 mr-2" /> Edit</Button>
            <Button variant="outline"><UserPlus className="w-4 h-4 mr-2" /> Reassign</Button>
            <Button variant="destructive" size="icon"><Trash2 className="w-4 h-4" /></Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Asset Information</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                ["Asset ID", "AST-001"],
                ["Name", 'MacBook Pro 16"'],
                ["Type", "Laptop"],
                ["Brand", "Apple"],
                ["Serial Number", "C02ZX1ABCDEF"],
                ["Purchase Date", "Jan 15, 2025"],
                ["Purchase Price", "$2,499.00"],
                ["Warranty Until", "Jan 15, 2028"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium text-foreground">{value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Assignment Details</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">SJ</div>
                <div>
                  <p className="text-sm font-medium text-foreground">Sarah Johnson</p>
                  <p className="text-xs text-muted-foreground">Engineering · Senior Developer</p>
                </div>
              </div>
              <Separator />
              {[
                ["Status", <Badge key="s">Assigned</Badge>],
                ["Condition", <Badge key="c" variant="secondary">Good</Badge>],
                ["Assigned Date", "Jan 20, 2025"],
                ["Location", "HQ — Floor 3, Desk 42"],
              ].map(([label, value]) => (
                <div key={String(label)} className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium text-foreground">{value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><CardTitle className="text-base">Asset History</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {history.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent mt-1.5" />
                    {i < history.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium text-foreground">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.details}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
};

export default AssetDetail;
