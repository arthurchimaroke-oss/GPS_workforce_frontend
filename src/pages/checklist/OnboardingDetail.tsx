import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, Calendar, Clock, User, Mail, Phone } from "lucide-react";

const OnboardingDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [editTaskOpen, setEditTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const employee = {
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 123-4567",
    department: "Engineering",
    position: "Senior Developer",
    startDate: "March 15, 2024",
    progress: 75,
  };

  const tasks = [
    {
      id: 1,
      title: "Complete employee information form",
      description: "Fill out personal and emergency contact details",
      dueDate: "2024-03-15",
      assignedTo: "HR Team",
      status: "completed",
      category: "Documentation",
    },
    {
      id: 2,
      title: "Sign employment contract",
      description: "Review and sign the employment agreement",
      dueDate: "2024-03-15",
      assignedTo: "Legal Team",
      status: "completed",
      category: "Documentation",
    },
    {
      id: 3,
      title: "Setup company email account",
      description: "Create and configure company email with IT",
      dueDate: "2024-03-16",
      assignedTo: "IT Team",
      status: "completed",
      category: "IT Setup",
    },
    {
      id: 4,
      title: "Complete IT security training",
      description: "Watch security videos and complete quiz",
      dueDate: "2024-03-18",
      assignedTo: "IT Security",
      status: "completed",
      category: "Training",
    },
    {
      id: 5,
      title: "Meet with direct manager",
      description: "1-on-1 introduction and role overview",
      dueDate: "2024-03-20",
      assignedTo: "Manager",
      status: "pending",
      category: "Meetings",
    },
    {
      id: 6,
      title: "Team introduction meeting",
      description: "Meet the engineering team members",
      dueDate: "2024-03-20",
      assignedTo: "Manager",
      status: "pending",
      category: "Meetings",
    },
    {
      id: 7,
      title: "Setup development environment",
      description: "Install required software and tools",
      dueDate: "2024-03-21",
      assignedTo: "IT Team",
      status: "pending",
      category: "IT Setup",
    },
    {
      id: 8,
      title: "Complete benefits enrollment",
      description: "Select health insurance and retirement plans",
      dueDate: "2024-03-25",
      assignedTo: "HR Team",
      status: "pending",
      category: "Benefits",
    },
  ];

  const handleEditTask = (task: any) => {
    setSelectedTask(task);
    setEditTaskOpen(true);
  };

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/checklist/onboarding")}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold text-foreground">{employee.name}</h1>
              <p className="text-sm text-muted-foreground">
                {employee.position} • {employee.department}
              </p>
            </div>
            <div className="text-right space-y-1">
              <div className="text-sm text-muted-foreground">Start Date</div>
              <div className="text-sm font-medium">{employee.startDate}</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Email</div>
                <div className="text-sm font-medium">{employee.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Phone</div>
                <div className="text-sm font-medium">{employee.phone}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Progress</div>
                <div className="text-sm font-medium">{employee.progress}% Complete</div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">Overall Progress</h2>
              <span className="text-sm text-muted-foreground">
                {tasks.filter((t) => t.status === "completed").length}/{tasks.length} tasks
              </span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-hr-teal"
                style={{ width: `${employee.progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold mb-4">Onboarding Tasks</h2>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => handleEditTask(task)}
              >
                <Checkbox
                  checked={task.status === "completed"}
                  className="mt-1"
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h3 className="font-medium text-foreground">{task.title}</h3>
                    <Badge variant="outline" className="shrink-0">
                      {task.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Due: {task.dueDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {task.assignedTo}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Sheet open={editTaskOpen} onOpenChange={setEditTaskOpen}>
        <SheetContent className="sm:max-w-[500px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit Task</SheetTitle>
          </SheetHeader>
          {selectedTask && (
            <div className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label>Task Title</Label>
                <Input defaultValue={selectedTask.title} />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea defaultValue={selectedTask.description} rows={3} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select defaultValue={selectedTask.category}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Documentation">Documentation</SelectItem>
                      <SelectItem value="IT Setup">IT Setup</SelectItem>
                      <SelectItem value="Training">Training</SelectItem>
                      <SelectItem value="Meetings">Meetings</SelectItem>
                      <SelectItem value="Benefits">Benefits</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select defaultValue={selectedTask.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Due Date</Label>
                <Input type="date" defaultValue={selectedTask.dueDate} />
              </div>

              <div className="space-y-2">
                <Label>Assigned To</Label>
                <Select defaultValue={selectedTask.assignedTo}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HR Team">HR Team</SelectItem>
                    <SelectItem value="IT Team">IT Team</SelectItem>
                    <SelectItem value="Legal Team">Legal Team</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="IT Security">IT Security</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-hr-teal hover:bg-hr-teal/90">
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setEditTaskOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </SidebarLayout>
  );
};

export default OnboardingDetail;
