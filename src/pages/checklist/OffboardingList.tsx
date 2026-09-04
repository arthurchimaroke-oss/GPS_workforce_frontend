import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Download, Plus } from "lucide-react";

const OffboardingList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  const offboardingData = [
    {
      id: 1,
      employee: "James Wilson",
      department: "Sales",
      position: "Sales Manager",
      lastDate: "2024-03-30",
      progress: 60,
      tasksCompleted: 9,
      tasksTotal: 15,
      status: "In Progress",
      reason: "Resignation",
    },
    {
      id: 2,
      employee: "Lisa Anderson",
      department: "Marketing",
      position: "Content Writer",
      lastDate: "2024-03-25",
      progress: 100,
      tasksCompleted: 12,
      tasksTotal: 12,
      status: "Completed",
      reason: "Resignation",
    },
    {
      id: 3,
      employee: "Robert Taylor",
      department: "Engineering",
      position: "Junior Developer",
      lastDate: "2024-04-05",
      progress: 30,
      tasksCompleted: 4,
      tasksTotal: 13,
      status: "In Progress",
      reason: "Termination",
    },
  ];

  const filteredData = offboardingData.filter((item) => {
    if (activeTab === "all") return true;
    if (activeTab === "in-progress") return item.status === "In Progress";
    if (activeTab === "completed") return item.status === "Completed";
    return true;
  });

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Offboarding</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage employee offboarding process
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button size="sm" className="bg-hr-teal hover:bg-hr-teal/90">
              <Plus className="w-4 h-4 mr-2" />
              Start Offboarding
            </Button>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All ({offboardingData.length})</TabsTrigger>
                <TabsTrigger value="in-progress">
                  In Progress ({offboardingData.filter((d) => d.status === "In Progress").length})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed ({offboardingData.filter((d) => d.status === "Completed").length})
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search employees..."
                className="pl-9 w-64"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Last Date</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Tasks</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow
                  key={item.id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/checklist/offboarding/${item.id}`)}
                >
                  <TableCell className="font-medium">{item.employee}</TableCell>
                  <TableCell>{item.department}</TableCell>
                  <TableCell>{item.position}</TableCell>
                  <TableCell>{item.lastDate}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.reason}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-hr-teal"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">{item.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.tasksCompleted}/{item.tasksTotal}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={item.status === "Completed" ? "default" : "secondary"}
                      className={
                        item.status === "Completed"
                          ? "bg-green-500/10 text-green-700 hover:bg-green-500/20"
                          : "bg-blue-500/10 text-blue-700 hover:bg-blue-500/20"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default OffboardingList;
