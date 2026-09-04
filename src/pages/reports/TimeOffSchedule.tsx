import SidebarLayout from "@/components/layout/SidebarLayout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const statusColors: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  "ON BOARDING": "bg-yellow-100 text-yellow-700",
  PROBATION: "bg-orange-100 text-orange-700",
  "ON LEAVE": "bg-red-100 text-red-700",
};

const employees = [
  { name: "Pristia Candra", email: "lincoln@unpixel.com", id: "UN001", title: "UI UX Designer", from: "Aug 21 2023", to: "Aug 28 2023", type: "Engagement", status: "ACTIVE" },
  { name: "Hanna Baptista", email: "hanna@unpixel.com", id: "UN002", title: "Graphic Designer", from: "Jun 24 2023", to: "Jun 27 2023", type: "Unpaid Time Off", status: "ON BOARDING" },
  { name: "Miracle Geidt", email: "miracle@unpixel.com", id: "UN003", title: "Finance", from: "Feb 10 2023", to: "Feb 12 2023", type: "Unpaid Time Off", status: "PROBATION" },
  { name: "Rayna Torff", email: "rayna@unpixel.com", id: "UN004", title: "Project Manager", from: "Sep 01 2023", to: "Sep 02 2023", type: "Sick Leave (Unpaid)", status: "ACTIVE" },
  { name: "Giana Lipshutz", email: "giana@unpixel.com", id: "UN005", title: "Creative Director", from: "Jul 11 2023", to: "Jul 14 2023", type: "Relative Funneral", status: "ON LEAVE" },
  { name: "James George", email: "james@unpixel.com", id: "UN006", title: "Lead Designer", from: "Aug 07 2023", to: "Aug 10 2023", type: "Annual", status: "ACTIVE" },
  { name: "Jordyn George", email: "jordyn@unpixel.com", id: "UN007", title: "IT Support", from: "Dec 18 2022", to: "Dec 20 2022", type: "Unpaid Time Off", status: "ON BOARDING" },
  { name: "Skylar Herwitz", email: "skylar@unpixel.com", id: "UN008", title: "3D Designer", from: "Nov 25 2022", to: "Nov 28 2022", type: "Sick Leave (Unpaid)", status: "ACTIVE" },
];

const TimeOffSchedule = () => {
  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Time Off Schedule</h1>
            <p className="text-sm text-muted-foreground mt-1">List Report &gt; Time Off Schedule</p>
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
                <TableHead>Job Title</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Employee Status</TableHead>
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
                  <TableCell className="text-muted-foreground">{emp.title}</TableCell>
                  <TableCell className="text-muted-foreground">{emp.from}</TableCell>
                  <TableCell className="text-muted-foreground">{emp.to}</TableCell>
                  <TableCell className="text-muted-foreground">{emp.type}</TableCell>
                  <TableCell>
                    <span className={`text-[10px] font-semibold px-3 py-1 rounded-full ${statusColors[emp.status] || "bg-muted text-muted-foreground"}`}>
                      {emp.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

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

export default TimeOffSchedule;
