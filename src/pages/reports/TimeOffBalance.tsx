import SidebarLayout from "@/components/layout/SidebarLayout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const employees = [
  { name: "Pristia Candra", email: "lincoln@unpixel.com", id: "UN001", dept: "Team Product", title: "UI UX Designer", office: "Unpixel Office", entitlement: 12, carryOver: 0, request: 0 },
  { name: "Hanna Baptista", email: "hanna@unpixel.com", id: "UN002", dept: "Team Product", title: "Graphic Designer", office: "Unpixel Office", entitlement: 30, carryOver: 0, request: 0 },
  { name: "Miracle Geidt", email: "miracle@unpixel.com", id: "UN003", dept: "Team Product", title: "Finance", office: "Unpixel Office", entitlement: 0, carryOver: 0, request: 0 },
  { name: "Rayna Torff", email: "rayna@unpixel.com", id: "UN004", dept: "Team Product", title: "Project Manager", office: "Unpixel Office", entitlement: 180, carryOver: 0, request: 0 },
  { name: "Giana Lipshutz", email: "giana@unpixel.com", id: "UN005", dept: "Team Product", title: "Creative Director", office: "Unpixel Office", entitlement: 5, carryOver: 0, request: 0 },
  { name: "James George", email: "james@unpixel.com", id: "UN006", dept: "Team Product", title: "Lead Designer", office: "Unpixel Office", entitlement: 10, carryOver: 0, request: 0 },
  { name: "Jordyn George", email: "jordyn@unpixel.com", id: "UN007", dept: "Team Product", title: "IT Support", office: "Unpixel Office", entitlement: 10, carryOver: 0, request: 0 },
  { name: "Skylar Herwitz", email: "skylar@unpixel.com", id: "UN008", dept: "Team Product", title: "3D Designer", office: "Unpixel Office", entitlement: 0, carryOver: 0, request: 0 },
];

const TimeOffBalance = () => {
  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Time Off Balance</h1>
            <p className="text-sm text-muted-foreground mt-1">List Report &gt; Time Off Balance</p>
          </div>
          <Button className="bg-foreground text-background hover:bg-foreground/90">
            <Download className="w-4 h-4 mr-2" /> Download Data
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <Select defaultValue="all"><SelectTrigger className="w-40"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Offices</SelectItem><SelectItem value="unpixel">Unpixel Office</SelectItem></SelectContent></Select>
          <Select defaultValue="all"><SelectTrigger className="w-40"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Jobs</SelectItem><SelectItem value="designer">Designer</SelectItem></SelectContent></Select>
          <Select defaultValue="all"><SelectTrigger className="w-40"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Status</SelectItem><SelectItem value="active">Active</SelectItem></SelectContent></Select>
          <Select defaultValue="all"><SelectTrigger className="w-48"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Departement</SelectItem><SelectItem value="product">Team Product</SelectItem></SelectContent></Select>
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
                <TableHead>Office</TableHead>
                <TableHead>Entitlement</TableHead>
                <TableHead>Carry Over</TableHead>
                <TableHead>Request</TableHead>
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
                  <TableCell className="text-muted-foreground">{emp.office}</TableCell>
                  <TableCell>{emp.entitlement}</TableCell>
                  <TableCell>{emp.carryOver}</TableCell>
                  <TableCell>{emp.request}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" disabled>&lt;</Button>
              <Button variant="default" size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <span className="px-2 text-muted-foreground">...</span>
              <Button variant="outline" size="sm">10</Button>
              <Button variant="outline" size="sm">&gt;</Button>
            </div>
            <p className="text-sm text-muted-foreground">Showing 1 to 8 of 50 entries</p>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default TimeOffBalance;
