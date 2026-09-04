import SidebarLayout from "@/components/layout/SidebarLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, DollarSign, Clock, CheckCircle2, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Total Expenses", value: "$45,230", icon: DollarSign },
  { label: "Pending", value: "12", icon: Clock },
  { label: "Approved", value: "84", icon: CheckCircle2 },
  { label: "Rejected", value: "3", icon: XCircle },
];

const expenses = [
  { id: "EXP-001", employee: "Sarah Johnson", category: "Travel", description: "Client meeting flight — NYC", amount: "$1,250.00", date: "Mar 10, 2026", status: "Approved" },
  { id: "EXP-002", employee: "Mike Chen", category: "Software", description: "Figma annual license", amount: "$144.00", date: "Mar 08, 2026", status: "Approved" },
  { id: "EXP-003", employee: "Alex Turner", category: "Meals", description: "Team lunch — Q1 celebration", amount: "$320.00", date: "Mar 12, 2026", status: "Pending" },
  { id: "EXP-004", employee: "Emily Davis", category: "Equipment", description: "Ergonomic keyboard", amount: "$189.00", date: "Mar 11, 2026", status: "Pending" },
  { id: "EXP-005", employee: "James Wilson", category: "Travel", description: "Conference hotel stay", amount: "$850.00", date: "Mar 05, 2026", status: "Rejected" },
];

const ExpenseList = () => {
  const navigate = useNavigate();

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Expense Management</h1>
            <p className="text-muted-foreground text-sm mt-1">Track and manage employee expense claims</p>
          </div>
          <Button onClick={() => navigate("/expenses/create")}><Plus className="w-4 h-4 mr-2" /> New Expense</Button>
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
            <CardTitle className="text-base">All Expenses</CardTitle>
            <div className="relative w-64">
              <Input placeholder="Search expenses..." className="pl-9" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((exp) => (
                  <TableRow key={exp.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-mono text-xs">{exp.id}</TableCell>
                    <TableCell className="font-medium text-foreground">{exp.employee}</TableCell>
                    <TableCell><Badge variant="outline">{exp.category}</Badge></TableCell>
                    <TableCell className="text-muted-foreground max-w-[200px] truncate">{exp.description}</TableCell>
                    <TableCell className="text-right font-semibold text-foreground">{exp.amount}</TableCell>
                    <TableCell className="text-muted-foreground">{exp.date}</TableCell>
                    <TableCell>
                      <Badge variant={exp.status === "Approved" ? "default" : exp.status === "Pending" ? "secondary" : "destructive"}>{exp.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
};

export default ExpenseList;
