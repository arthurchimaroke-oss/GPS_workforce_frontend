import SidebarLayout from "@/components/layout/SidebarLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Monitor, Laptop, Smartphone, Headphones, Plus, Search, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Total Assets", value: "342", icon: Package },
  { label: "Assigned", value: "285", icon: Monitor },
  { label: "Available", value: "42", icon: Laptop },
  { label: "Under Repair", value: "15", icon: Smartphone },
];

const assets = [
  { id: "AST-001", name: 'MacBook Pro 16"', type: "Laptop", assignee: "Sarah Johnson", department: "Engineering", status: "Assigned", condition: "Good", purchaseDate: "Jan 15, 2025" },
  { id: "AST-002", name: "Dell Monitor 27\"", type: "Monitor", assignee: "Mike Chen", department: "Design", status: "Assigned", condition: "Good", purchaseDate: "Mar 03, 2025" },
  { id: "AST-003", name: "iPhone 15 Pro", type: "Phone", assignee: "—", department: "—", status: "Available", condition: "New", purchaseDate: "Dec 01, 2025" },
  { id: "AST-004", name: "Sony WH-1000XM5", type: "Headphones", assignee: "Alex Turner", department: "Marketing", status: "Assigned", condition: "Fair", purchaseDate: "Jun 20, 2024" },
  { id: "AST-005", name: 'ThinkPad X1 Carbon', type: "Laptop", assignee: "—", department: "—", status: "Under Repair", condition: "Poor", purchaseDate: "Sep 10, 2024" },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "Laptop": return Laptop;
    case "Monitor": return Monitor;
    case "Phone": return Smartphone;
    default: return Headphones;
  }
};

const AssetList = () => {
  const navigate = useNavigate();

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Asset Management</h1>
            <p className="text-muted-foreground text-sm mt-1">Track and manage company assets</p>
          </div>
          <Button><Plus className="w-4 h-4 mr-2" /> Add Asset</Button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {stats.map((s) => (
            <Card key={s.label}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{s.value}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-accent/10"><s.icon className="w-5 h-5 text-accent" /></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-base">All Assets</CardTitle>
            <div className="relative w-64">
              <Input placeholder="Search assets..." className="pl-9" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assets.map((asset) => {
                  const Icon = getTypeIcon(asset.type);
                  return (
                    <TableRow key={asset.id} className="cursor-pointer hover:bg-muted/50" onClick={() => navigate(`/assets/${asset.id}`)}>
                      <TableCell className="font-mono text-xs">{asset.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium text-foreground">{asset.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{asset.type}</TableCell>
                      <TableCell className="text-muted-foreground">{asset.assignee}</TableCell>
                      <TableCell className="text-muted-foreground">{asset.department}</TableCell>
                      <TableCell>
                        <Badge variant={asset.condition === "Good" || asset.condition === "New" ? "default" : "secondary"}>{asset.condition}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={asset.status === "Assigned" ? "default" : asset.status === "Available" ? "outline" : "destructive"}>{asset.status}</Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
};

export default AssetList;
