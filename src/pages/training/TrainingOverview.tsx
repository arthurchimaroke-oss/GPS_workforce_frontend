import SidebarLayout from "@/components/layout/SidebarLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, GraduationCap, Clock, Award, Plus, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Total Courses", value: "24", icon: BookOpen, change: "+3 this month" },
  { label: "Active Learners", value: "156", icon: GraduationCap, change: "82% of employees" },
  { label: "Avg. Completion", value: "73%", icon: Clock, change: "+5% vs last month" },
  { label: "Certifications", value: "89", icon: Award, change: "12 pending" },
];

const featuredCourses = [
  { id: 1, title: "Leadership Essentials", category: "Management", enrolled: 45, duration: "8 hours", progress: 68, status: "Active" },
  { id: 2, title: "Data Privacy & Compliance", category: "Compliance", enrolled: 120, duration: "3 hours", progress: 92, status: "Active" },
  { id: 3, title: "Agile Project Management", category: "Professional", enrolled: 32, duration: "12 hours", progress: 41, status: "Active" },
  { id: 4, title: "Effective Communication", category: "Soft Skills", enrolled: 67, duration: "5 hours", progress: 55, status: "Draft" },
];

const TrainingOverview = () => {
  const navigate = useNavigate();

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Training & Learning</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage courses and track employee learning progress</p>
          </div>
          <Button onClick={() => navigate("/training/courses")}>
            <Plus className="w-4 h-4 mr-2" /> Create Course
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-accent/10">
                    <stat.icon className="w-5 h-5 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-base">Featured Courses</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate("/training/courses")}>
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuredCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => navigate(`/training/courses/${course.id}`)}
                  className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">{course.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{course.category} · {course.duration}</p>
                    </div>
                    <Badge variant={course.status === "Active" ? "default" : "secondary"}>{course.status}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{course.enrolled} enrolled</span>
                      <span>{course.progress}% avg. completion</span>
                    </div>
                    <Progress value={course.progress} className="h-1.5" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
};

export default TrainingOverview;
