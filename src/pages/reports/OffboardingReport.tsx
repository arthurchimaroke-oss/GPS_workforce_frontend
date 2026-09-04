import SidebarLayout from "@/components/layout/SidebarLayout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const chartData = [
  { month: "01/2023", value: 1 },
  { month: "02/2023", value: 3 },
  { month: "03/2023", value: 1 },
  { month: "04/2023", value: 0 },
  { month: "05/2023", value: 0 },
  { month: "06/2023", value: 0 },
  { month: "07/2023", value: 0 },
  { month: "08/2023", value: 0 },
  { month: "09/2023", value: 0 },
  { month: "10/2023", value: 0 },
  { month: "11/2023", value: 0 },
  { month: "12/2023", value: 0 },
];

const employees = [
  { name: "Pristia Candra", email: "lincoln@unpixel.com", id: "UN001", dept: "Designer", title: "UI UX Designer", type: "Fulltime", resignDate: "21 Feb 2023", lastDate: "21 Feb 2023" },
  { name: "Hanna Baptista", email: "hanna@unpixel.com", id: "UN002", dept: "Designer", title: "Graphic Designer", type: "Contractor", resignDate: "21 Feb 2023", lastDate: "21 Feb 2023" },
  { name: "Miracle Geidt", email: "miracle@unpixel.com", id: "UN003", dept: "Finance", title: "CFO", type: "Freelance", resignDate: "21 Feb 2023", lastDate: "21 Feb 2023" },
];

const OffboardingReport = () => {
  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Offboarding</h1>
            <p className="text-sm text-muted-foreground mt-1">List Report &gt; Offboarding</p>
          </div>
          <Button className="bg-foreground text-background hover:bg-foreground/90">
            <Download className="w-4 h-4 mr-2" /> Download Data
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Input defaultValue="01 Jan 2023 - 10 Mar 2023" className="w-64 pr-10" readOnly />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
          <Select defaultValue="all"><SelectTrigger className="w-40"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Reason</SelectItem><SelectItem value="resign">Resignation</SelectItem><SelectItem value="termination">Termination</SelectItem></SelectContent></Select>
          <Select defaultValue="all"><SelectTrigger className="w-40"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Types</SelectItem><SelectItem value="fulltime">Fulltime</SelectItem><SelectItem value="contract">Contract</SelectItem></SelectContent></Select>
          <Select defaultValue="all"><SelectTrigger className="w-48"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Departements</SelectItem><SelectItem value="design">Design</SelectItem><SelectItem value="finance">Finance</SelectItem></SelectContent></Select>
          <Select defaultValue="all"><SelectTrigger className="w-40"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Office</SelectItem><SelectItem value="hq">HQ</SelectItem></SelectContent></Select>
        </div>

        {/* Chart */}
        <div className="bg-card rounded-xl border border-border p-6">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.value > 0 ? "hsl(var(--primary))" : "hsl(var(--muted))"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee Name</TableHead>
                <TableHead>Employee ID</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead>Employee Type</TableHead>
                <TableHead>Resignation Date</TableHead>
                <TableHead>Last Working Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs bg-muted">{emp.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-foreground">{emp.name}</p>
                        <p className="text-xs text-muted-foreground">{emp.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{emp.id}</TableCell>
                  <TableCell className="text-muted-foreground">{emp.dept}</TableCell>
                  <TableCell className="text-muted-foreground">{emp.title}</TableCell>
                  <TableCell className="text-muted-foreground">{emp.type}</TableCell>
                  <TableCell className="text-muted-foreground">{emp.resignDate}</TableCell>
                  <TableCell className="text-muted-foreground">{emp.lastDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default OffboardingReport;
