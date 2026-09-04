import SidebarLayout from "@/components/layout/SidebarLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Clock, Award, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const myCourses = [
  { id: 1, title: "Leadership Essentials", category: "Management", progress: 75, duration: "8 hours", remaining: "2 hours", deadline: "Mar 30, 2026", status: "in-progress" },
  { id: 2, title: "Data Privacy & Compliance", category: "Compliance", progress: 100, duration: "3 hours", remaining: "0 hours", deadline: "Feb 15, 2026", status: "completed", certificate: true },
  { id: 3, title: "Agile Project Management", category: "Professional", progress: 30, duration: "12 hours", remaining: "8.4 hours", deadline: "Apr 15, 2026", status: "in-progress" },
  { id: 4, title: "Advanced Excel", category: "Technical", progress: 0, duration: "6 hours", remaining: "6 hours", deadline: "May 01, 2026", status: "not-started" },
  { id: 5, title: "Workplace Safety", category: "Compliance", progress: 100, duration: "2 hours", remaining: "0 hours", deadline: "Jan 20, 2026", status: "completed", certificate: true },
];

const MyCourses = () => {
  const navigate = useNavigate();
  const inProgress = myCourses.filter((c) => c.status === "in-progress");
  const completed = myCourses.filter((c) => c.status === "completed");
  const notStarted = myCourses.filter((c) => c.status === "not-started");

  const renderCourse = (course: typeof myCourses[0]) => (
    <Card key={course.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/training/courses/${course.id}`)}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <BookOpen className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">{course.title}</h3>
              <p className="text-xs text-muted-foreground">{course.category}</p>
            </div>
          </div>
          <Badge variant={course.status === "completed" ? "default" : course.status === "in-progress" ? "secondary" : "outline"}>
            {course.status === "completed" ? "Completed" : course.status === "in-progress" ? "In Progress" : "Not Started"}
          </Badge>
        </div>
        <div className="space-y-2">
          <Progress value={course.progress} className="h-1.5" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.remaining} remaining</span>
            <span>Due {course.deadline}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          {course.certificate && (
            <span className="flex items-center gap-1 text-xs text-accent"><Award className="w-3 h-3" /> Certificate earned</span>
          )}
          {course.status === "in-progress" && (
            <Button size="sm" variant="outline" className="ml-auto"><Play className="w-3 h-3 mr-1" /> Continue</Button>
          )}
          {course.status === "not-started" && (
            <Button size="sm" className="ml-auto"><Play className="w-3 h-3 mr-1" /> Start</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Courses</h1>
          <p className="text-muted-foreground text-sm mt-1">Track your learning progress and certifications</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Card><CardContent className="pt-6 text-center"><p className="text-2xl font-bold text-foreground">{inProgress.length}</p><p className="text-xs text-muted-foreground">In Progress</p></CardContent></Card>
          <Card><CardContent className="pt-6 text-center"><p className="text-2xl font-bold text-foreground">{completed.length}</p><p className="text-xs text-muted-foreground">Completed</p></CardContent></Card>
          <Card><CardContent className="pt-6 text-center"><p className="text-2xl font-bold text-foreground">{notStarted.length}</p><p className="text-xs text-muted-foreground">Not Started</p></CardContent></Card>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All ({myCourses.length})</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress ({inProgress.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
            <TabsTrigger value="not-started">Not Started ({notStarted.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">{myCourses.map(renderCourse)}</TabsContent>
          <TabsContent value="in-progress" className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">{inProgress.map(renderCourse)}</TabsContent>
          <TabsContent value="completed" className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">{completed.map(renderCourse)}</TabsContent>
          <TabsContent value="not-started" className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">{notStarted.map(renderCourse)}</TabsContent>
        </Tabs>
      </div>
    </SidebarLayout>
  );
};

export default MyCourses;
