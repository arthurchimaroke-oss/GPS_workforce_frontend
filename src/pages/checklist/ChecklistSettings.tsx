import { useState } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, MoreVertical, Search, Trash2, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const ChecklistSettings = () => {
  const [newTemplateOpen, setNewTemplateOpen] = useState(false);
  const [templateDetailOpen, setTemplateDetailOpen] = useState(false);
  const [newTaskOpen, setNewTaskOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const templates = [
    {
      id: 1,
      name: "Engineering Onboarding",
      type: "Onboarding",
      tasks: 16,
      department: "Engineering",
      lastModified: "2024-03-01",
    },
    {
      id: 2,
      name: "Sales Onboarding",
      type: "Onboarding",
      tasks: 14,
      department: "Sales",
      lastModified: "2024-02-28",
    },
    {
      id: 3,
      name: "Standard Offboarding",
      type: "Offboarding",
      tasks: 15,
      department: "All",
      lastModified: "2024-02-25",
    },
    {
      id: 4,
      name: "Manager Onboarding",
      type: "Onboarding",
      tasks: 18,
      department: "All",
      lastModified: "2024-02-20",
    },
  ];

  const templateTasks = [
    {
      id: 1,
      title: "Complete employee information form",
      category: "Documentation",
      dueIn: "Day 1",
      assignedTo: "HR Team",
    },
    {
      id: 2,
      title: "Sign employment contract",
      category: "Documentation",
      dueIn: "Day 1",
      assignedTo: "Legal Team",
    },
    {
      id: 3,
      title: "Setup company email account",
      category: "IT Setup",
      dueIn: "Day 2",
      assignedTo: "IT Team",
    },
    {
      id: 4,
      title: "Complete IT security training",
      category: "Training",
      dueIn: "Day 3",
      assignedTo: "IT Security",
    },
    {
      id: 5,
      title: "Meet with direct manager",
      category: "Meetings",
      dueIn: "Day 5",
      assignedTo: "Manager",
    },
  ];

  const handleViewTemplate = (template: any) => {
    setSelectedTemplate(template);
    setTemplateDetailOpen(true);
  };

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Checklist Settings</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage onboarding and offboarding templates
            </p>
          </div>
        </div>

        <Tabs defaultValue="templates" className="space-y-6">
          <TabsList>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-4">
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search templates..." className="pl-9" />
                </div>
                <Button
                  size="sm"
                  className="bg-hr-teal hover:bg-hr-teal/90"
                  onClick={() => setNewTemplateOpen(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Template
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Tasks</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates.map((template) => (
                    <TableRow
                      key={template.id}
                      className="cursor-pointer"
                      onClick={() => handleViewTemplate(template)}
                    >
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{template.type}</Badge>
                      </TableCell>
                      <TableCell>{template.department}</TableCell>
                      <TableCell>{template.tasks} tasks</TableCell>
                      <TableCell>{template.lastModified}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="categories">
            <div className="bg-card rounded-lg border border-border p-6">
              <p className="text-muted-foreground">Category management coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="automation">
            <div className="bg-card rounded-lg border border-border p-6">
              <p className="text-muted-foreground">Automation settings coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* New Template Sheet */}
      <Sheet open={newTemplateOpen} onOpenChange={setNewTemplateOpen}>
        <SheetContent className="sm:max-w-[500px]">
          <SheetHeader>
            <SheetTitle>Create New Template</SheetTitle>
          </SheetHeader>
          <div className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label>Template Name</Label>
              <Input placeholder="e.g., Engineering Onboarding" />
            </div>

            <div className="space-y-2">
              <Label>Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="onboarding">Onboarding</SelectItem>
                  <SelectItem value="offboarding">Offboarding</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Department</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Brief description of this template..."
                rows={3}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button className="flex-1 bg-hr-teal hover:bg-hr-teal/90">
                Create Template
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setNewTemplateOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Template Detail Dialog */}
      <Dialog open={templateDetailOpen} onOpenChange={setTemplateDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedTemplate?.name}</DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Badge variant="outline">{selectedTemplate.type}</Badge>
                <Badge variant="secondary">{selectedTemplate.department}</Badge>
                <span className="text-sm text-muted-foreground ml-auto">
                  {selectedTemplate.tasks} tasks
                </span>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Template Tasks</h3>
                <Button
                  size="sm"
                  className="bg-hr-teal hover:bg-hr-teal/90"
                  onClick={() => setNewTaskOpen(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </div>

              <div className="space-y-2">
                {templateTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="font-medium mb-1">{task.title}</div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <Badge variant="outline" className="text-xs">
                          {task.category}
                        </Badge>
                        <span>Due: {task.dueIn}</span>
                        <span>Assigned: {task.assignedTo}</span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* New Task Sheet */}
      <Sheet open={newTaskOpen} onOpenChange={setNewTaskOpen}>
        <SheetContent className="sm:max-w-[500px]">
          <SheetHeader>
            <SheetTitle>Add New Task</SheetTitle>
          </SheetHeader>
          <div className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label>Task Title</Label>
              <Input placeholder="e.g., Complete employee information form" />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Task description..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="documentation">Documentation</SelectItem>
                    <SelectItem value="it-setup">IT Setup</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="meetings">Meetings</SelectItem>
                    <SelectItem value="benefits">Benefits</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Due In</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day-1">Day 1</SelectItem>
                    <SelectItem value="day-2">Day 2</SelectItem>
                    <SelectItem value="day-3">Day 3</SelectItem>
                    <SelectItem value="day-5">Day 5</SelectItem>
                    <SelectItem value="week-1">Week 1</SelectItem>
                    <SelectItem value="week-2">Week 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Assigned To</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select team/person" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hr">HR Team</SelectItem>
                  <SelectItem value="it">IT Team</SelectItem>
                  <SelectItem value="legal">Legal Team</SelectItem>
                  <SelectItem value="manager">Direct Manager</SelectItem>
                  <SelectItem value="security">IT Security</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button className="flex-1 bg-hr-teal hover:bg-hr-teal/90">
                Add Task
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setNewTaskOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </SidebarLayout>
  );
};

export default ChecklistSettings;
