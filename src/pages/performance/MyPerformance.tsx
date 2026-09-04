import EmployeeSidebarLayout from "@/components/layout/EmployeeSidebarLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, Plus, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const goals = [
  { id: 1, title: "Complete React certification", category: "Development", progress: 85, deadline: "Apr 15, 2026", status: "on-track" },
  { id: 2, title: "Mentor 2 junior developers", category: "Leadership", progress: 50, deadline: "Jun 30, 2026", status: "on-track" },
  { id: 3, title: "Reduce bug resolution time by 20%", category: "Performance", progress: 30, deadline: "Mar 31, 2026", status: "at-risk" },
  { id: 4, title: "Deliver Q1 project milestones", category: "Delivery", progress: 100, deadline: "Mar 14, 2026", status: "completed" },
  { id: 5, title: "Improve code review turnaround", category: "Quality", progress: 60, deadline: "May 30, 2026", status: "on-track" },
];

const feedbacks = [
  { from: "Sarah Johnson", role: "Team Lead", date: "Mar 10, 2026", comment: "Great work on the dashboard redesign. Your attention to detail has significantly improved the user experience.", type: "praise" },
  { from: "Mike Chen", role: "Peer", date: "Mar 5, 2026", comment: "Always willing to help with code reviews. Provides constructive and actionable feedback.", type: "praise" },
  { from: "Emily Davis", role: "Manager", date: "Feb 28, 2026", comment: "Consider focusing more on documentation. Your code is excellent but could benefit from better inline comments.", type: "improvement" },
];

const skills = [
  { name: "React/TypeScript", level: 90 },
  { name: "System Design", level: 75 },
  { name: "Communication", level: 85 },
  { name: "Leadership", level: 65 },
  { name: "Problem Solving", level: 88 },
  { name: "Time Management", level: 70 },
];

const MyPerformance = () => {
  return (
    <EmployeeSidebarLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Performance</h1>
            <p className="text-muted-foreground text-sm mt-1">Track your goals, feedback, and growth</p>
          </div>
          <Button><Plus className="w-4 h-4 mr-2" /> Add Goal</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Total Goals", value: goals.length, icon: Target },
            { label: "Completed", value: goals.filter(g => g.status === "completed").length, icon: CheckCircle2 },
            { label: "In Progress", value: goals.filter(g => g.status === "on-track").length, icon: Clock },
            { label: "At Risk", value: goals.filter(g => g.status === "at-risk").length, icon: AlertCircle },
          ].map((s) => (
            <Card key={s.label}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="goals">
          <TabsList>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>

          <TabsContent value="goals" className="mt-4 space-y-3">
            {goals.map((goal) => (
              <Card key={goal.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        goal.status === "completed" ? "bg-accent" :
                        goal.status === "at-risk" ? "bg-destructive" : "bg-primary"
                      }`} />
                      <h3 className="text-sm font-medium text-foreground">{goal.title}</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{goal.category}</span>
                      <span className="text-xs text-muted-foreground">{goal.deadline}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-5">
                    <Progress value={goal.progress} className="flex-1 h-2" />
                    <span className="text-xs font-medium text-muted-foreground w-10">{goal.progress}%</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="feedback" className="mt-4 space-y-3">
            {feedbacks.map((fb, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                        {fb.from.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{fb.from}</p>
                        <p className="text-xs text-muted-foreground">{fb.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        fb.type === "praise" ? "bg-accent/10 text-accent" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {fb.type === "praise" ? "Praise" : "Growth Area"}
                      </span>
                      <span className="text-xs text-muted-foreground">{fb.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground ml-11">{fb.comment}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="skills" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Skill Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground font-medium">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </EmployeeSidebarLayout>
  );
};

export default MyPerformance;
