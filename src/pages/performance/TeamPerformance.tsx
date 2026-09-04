import SidebarLayout from "@/components/layout/SidebarLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Star, TrendingUp, TrendingDown, Minus } from "lucide-react";

const teamMembers = [
  { name: "Sarah Johnson", role: "Product Designer", goals: 5, completed: 4, rating: 4.8, trend: "up", avatar: "SJ" },
  { name: "Mike Chen", role: "Frontend Developer", goals: 6, completed: 4, rating: 4.5, trend: "up", avatar: "MC" },
  { name: "Emily Davis", role: "HR Specialist", goals: 4, completed: 2, rating: 4.2, trend: "stable", avatar: "ED" },
  { name: "James Wilson", role: "Data Analyst", goals: 5, completed: 3, rating: 3.9, trend: "down", avatar: "JW" },
  { name: "Lisa Park", role: "UX Researcher", goals: 4, completed: 3, rating: 4.6, trend: "up", avatar: "LP" },
  { name: "Tom Brown", role: "Backend Developer", goals: 7, completed: 5, rating: 4.3, trend: "stable", avatar: "TB" },
  { name: "Anna Lee", role: "Project Manager", goals: 5, completed: 4, rating: 4.7, trend: "up", avatar: "AL" },
  { name: "David Kim", role: "QA Engineer", goals: 4, completed: 1, rating: 3.5, trend: "down", avatar: "DK" },
];

const departmentScores = [
  { dept: "Engineering", score: 4.3, goalCompletion: 72 },
  { dept: "Design", score: 4.6, goalCompletion: 85 },
  { dept: "HR", score: 4.1, goalCompletion: 65 },
  { dept: "Marketing", score: 4.4, goalCompletion: 78 },
  { dept: "Sales", score: 3.9, goalCompletion: 60 },
];

const TeamPerformance = () => {
  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Team Performance</h1>
            <p className="text-muted-foreground text-sm mt-1">Monitor your team's goals and performance metrics</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="q1-2026">
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="q1-2026">Q1 2026</SelectItem>
                <SelectItem value="q4-2025">Q4 2025</SelectItem>
                <SelectItem value="q3-2025">Q3 2025</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Export</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {departmentScores.map((dept) => (
            <Card key={dept.dept}>
              <CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">{dept.dept}</p>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-xl font-bold text-foreground">{dept.score}</span>
                </div>
                <Progress value={dept.goalCompletion} className="h-1.5 mb-1" />
                <p className="text-xs text-muted-foreground">{dept.goalCompletion}% goals met</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-center">Goals</TableHead>
                  <TableHead className="text-center">Completed</TableHead>
                  <TableHead className="text-center">Completion</TableHead>
                  <TableHead className="text-center">Rating</TableHead>
                  <TableHead className="text-center">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member) => (
                  <TableRow key={member.name}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                          {member.avatar}
                        </div>
                        <span className="font-medium text-foreground">{member.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{member.role}</TableCell>
                    <TableCell className="text-center">{member.goals}</TableCell>
                    <TableCell className="text-center">{member.completed}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Progress value={(member.completed / member.goals) * 100} className="w-16 h-2" />
                        <span className="text-xs text-muted-foreground">{Math.round((member.completed / member.goals) * 100)}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm">{member.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {member.trend === "up" && <TrendingUp className="w-4 h-4 text-accent mx-auto" />}
                      {member.trend === "down" && <TrendingDown className="w-4 h-4 text-destructive mx-auto" />}
                      {member.trend === "stable" && <Minus className="w-4 h-4 text-muted-foreground mx-auto" />}
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

export default TeamPerformance;
