import { useState } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Calendar, Star, FileText, Eye } from "lucide-react";

const reviews = [
  { id: 1, employee: "Sarah Johnson", reviewer: "Mark Thompson", type: "Annual", period: "2025", rating: 4.8, status: "Completed", date: "Mar 10, 2026" },
  { id: 2, employee: "Mike Chen", reviewer: "Mark Thompson", type: "Annual", period: "2025", rating: 4.5, status: "Completed", date: "Mar 9, 2026" },
  { id: 3, employee: "Emily Davis", reviewer: "Lisa Park", type: "Mid-Year", period: "H1 2026", rating: 0, status: "Pending", date: "Mar 15, 2026" },
  { id: 4, employee: "James Wilson", reviewer: "Mark Thompson", type: "Annual", period: "2025", rating: 0, status: "Scheduled", date: "Mar 20, 2026" },
  { id: 5, employee: "Tom Brown", reviewer: "Anna Lee", type: "Probation", period: "Q1 2026", rating: 4.3, status: "Completed", date: "Mar 8, 2026" },
  { id: 6, employee: "David Kim", reviewer: "Anna Lee", type: "PIP Review", period: "Feb 2026", rating: 3.5, status: "Completed", date: "Mar 1, 2026" },
  { id: 7, employee: "Lisa Park", reviewer: "Mark Thompson", type: "Annual", period: "2025", rating: 0, status: "Draft", date: "Mar 12, 2026" },
];

const reviewCycles = [
  { name: "Annual Performance Review 2025", status: "In Progress", total: 45, completed: 28, due: "Apr 30, 2026" },
  { name: "Mid-Year Review H1 2026", status: "Upcoming", total: 45, completed: 0, due: "Jul 31, 2026" },
  { name: "Probation Reviews Q1 2026", status: "In Progress", total: 8, completed: 5, due: "Mar 31, 2026" },
];

const PerformanceReviews = () => {
  const [tab, setTab] = useState("all");

  const filtered = tab === "all" ? reviews : reviews.filter(r => r.status.toLowerCase() === tab);

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Performance Reviews</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage review cycles and individual assessments</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline"><Calendar className="w-4 h-4 mr-2" /> Schedule Cycle</Button>
            <Button><Plus className="w-4 h-4 mr-2" /> New Review</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {reviewCycles.map((cycle) => (
            <Card key={cycle.name}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-sm font-semibold text-foreground">{cycle.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    cycle.status === "In Progress" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                  }`}>{cycle.status}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>{cycle.completed}/{cycle.total} completed</span>
                  <span>Due: {cycle.due}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full transition-all" style={{ width: `${(cycle.completed / cycle.total) * 100}%` }} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">All Reviews</CardTitle>
            <Select defaultValue="all-types">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-types">All Types</SelectItem>
                <SelectItem value="annual">Annual</SelectItem>
                <SelectItem value="mid-year">Mid-Year</SelectItem>
                <SelectItem value="probation">Probation</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              </TabsList>
              <TabsContent value={tab} className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Reviewer</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead className="text-center">Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((review) => (
                      <TableRow key={review.id}>
                        <TableCell className="font-medium">{review.employee}</TableCell>
                        <TableCell className="text-muted-foreground">{review.reviewer}</TableCell>
                        <TableCell><span className="text-xs bg-muted px-2 py-1 rounded">{review.type}</span></TableCell>
                        <TableCell className="text-muted-foreground">{review.period}</TableCell>
                        <TableCell className="text-center">
                          {review.rating > 0 ? (
                            <div className="flex items-center justify-center gap-1">
                              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                              <span>{review.rating}</span>
                            </div>
                          ) : <span className="text-muted-foreground">—</span>}
                        </TableCell>
                        <TableCell>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            review.status === "Completed" ? "bg-accent/10 text-accent" :
                            review.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                            review.status === "Draft" ? "bg-blue-100 text-blue-700" :
                            "bg-muted text-muted-foreground"
                          }`}>{review.status}</span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{review.date}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            {review.status === "Completed" ? <Eye className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
};

export default PerformanceReviews;
