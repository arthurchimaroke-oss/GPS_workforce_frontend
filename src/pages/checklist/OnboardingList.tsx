import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Download, Plus } from "lucide-react";

const OnboardingList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  const onboardingData = [
    {
      id: 1,
      employee: "Sarah Johnson",
      department: "Engineering",
      position: "Senior Developer",
      startDate: "2024-03-15",
      progress: 75,
      tasksCompleted: 12,
      tasksTotal: 16,
      status: "In Progress",
    },
    {
      id: 2,
      employee: "Michael Chen",
      department: "Marketing",
      position: "Marketing Manager",
      startDate: "2024-03-10",
      progress: 100,
      tasksCompleted: 14,
      tasksTotal: 14,
      status: "Completed",
    },
    {
      id: 3,
      employee: "Emily Rodriguez",
      department: "Sales",
      position: "Sales Representative",
      startDate: "2024-03-20",
      progress: 45,
      tasksCompleted: 6,
      tasksTotal: 13,
      status: "In Progress",
    },
    {
      id: 4,
      employee: "David Kim",
      department: "HR",
      position: "HR Specialist",
      startDate: "2024-03-18",
      progress: 90,
      tasksCompleted: 11,
      tasksTotal: 12,
      status: "In Progress",
    },
  ];

  const filteredData = onboardingData.filter((item) => {
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
            <h1 className="text-2xl font-semibold text-foreground">Onboarding</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Track and manage employee onboarding progress
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button size="sm" className="bg-hr-teal hover:bg-hr-teal/90">
              <Plus className="w-4 h-4 mr-2" />
              Start Onboarding
            </Button>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All ({onboardingData.length})</TabsTrigger>
                <TabsTrigger value="in-progress">
                  In Progress ({onboardingData.filter((d) => d.status === "In Progress").length})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed ({onboardingData.filter((d) => d.status === "Completed").length})
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
                <TableHead>Start Date</TableHead>
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
                  onClick={() => navigate(`/checklist/onboarding/${item.id}`)}
                >
                  <TableCell className="font-medium">{item.employee}</TableCell>
                  <TableCell>{item.department}</TableCell>
                  <TableCell>{item.position}</TableCell>
                  <TableCell>{item.startDate}</TableCell>
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

export default OnboardingList;
