import SidebarLayout from "@/components/layout/SidebarLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Plus, Building2, MapPin, Trash2 } from "lucide-react";

const departments = [
  { name: "Engineering", head: "Mark Thompson", employees: 24, status: "Active" },
  { name: "Design", head: "Sarah Johnson", employees: 8, status: "Active" },
  { name: "Human Resources", head: "Emily Davis", employees: 6, status: "Active" },
  { name: "Marketing", head: "Lisa Park", employees: 12, status: "Active" },
  { name: "Sales", head: "James Wilson", employees: 18, status: "Active" },
  { name: "Finance", head: "Tom Brown", employees: 5, status: "Active" },
];

const locations = [
  { name: "San Francisco HQ", address: "123 Business Ave, CA 94102", employees: 45, type: "Headquarters" },
  { name: "New York Office", address: "456 Park Ave, NY 10022", employees: 22, type: "Branch" },
  { name: "London Office", address: "10 Downing St, London", employees: 12, type: "Branch" },
  { name: "Remote", address: "—", employees: 15, type: "Virtual" },
];

const CompanySettings = () => {
  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Company Settings</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage departments, locations, and company structure</p>
          </div>
          <Button><Save className="w-4 h-4 mr-2" /> Save Changes</Button>
        </div>

        <Tabs defaultValue="departments">
          <TabsList>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="work-schedule">Work Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="departments" className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">{departments.length} departments</p>
              <Button size="sm"><Plus className="w-4 h-4 mr-2" /> Add Department</Button>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead>Head</TableHead>
                      <TableHead className="text-center">Employees</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departments.map((dept) => (
                      <TableRow key={dept.name}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-accent" />
                            <span className="font-medium">{dept.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{dept.head}</TableCell>
                        <TableCell className="text-center">{dept.employees}</TableCell>
                        <TableCell>
                          <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">{dept.status}</span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm"><Trash2 className="w-4 h-4 text-muted-foreground" /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="locations" className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">{locations.length} locations</p>
              <Button size="sm"><Plus className="w-4 h-4 mr-2" /> Add Location</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {locations.map((loc) => (
                <Card key={loc.name}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mt-0.5">
                          <MapPin className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-foreground">{loc.name}</h3>
                          <p className="text-xs text-muted-foreground">{loc.address}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs bg-muted px-2 py-0.5 rounded">{loc.type}</span>
                            <span className="text-xs text-muted-foreground">{loc.employees} employees</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm"><Trash2 className="w-4 h-4 text-muted-foreground" /></Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="work-schedule" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Default Work Schedule</CardTitle>
                <CardDescription>Set the standard working hours for your organization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Work Start Time</Label>
                    <Input type="time" defaultValue="09:00" />
                  </div>
                  <div className="space-y-2">
                    <Label>Work End Time</Label>
                    <Input type="time" defaultValue="17:00" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label>Working Days</Label>
                  <div className="flex gap-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                      <button
                        key={day}
                        className={`w-10 h-10 rounded-lg text-xs font-medium transition-colors ${
                          i < 5 ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Flexible Hours</p>
                    <p className="text-xs text-muted-foreground">Allow employees to set their own schedules</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Remote Work</p>
                    <p className="text-xs text-muted-foreground">Enable remote work options</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarLayout>
  );
};

export default CompanySettings;
