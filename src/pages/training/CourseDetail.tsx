import SidebarLayout from "@/components/layout/SidebarLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, BookOpen, Clock, Users, Award, Play, CheckCircle2, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const modules = [
  { title: "Introduction to Leadership", duration: "30 min", completed: true },
  { title: "Communication Styles", duration: "45 min", completed: true },
  { title: "Conflict Resolution", duration: "1 hour", completed: true },
  { title: "Building Trust", duration: "45 min", completed: false, current: true },
  { title: "Delegation Strategies", duration: "1 hour", completed: false },
  { title: "Feedback & Coaching", duration: "1.5 hours", completed: false },
  { title: "Team Motivation", duration: "45 min", completed: false, locked: true },
  { title: "Final Assessment", duration: "30 min", completed: false, locked: true },
];

const CourseDetail = () => {
  const navigate = useNavigate();

  return (
    <SidebarLayout>
      <div className="space-y-6 max-w-4xl">
        <Button variant="ghost" onClick={() => navigate(-1)}><ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>

        <div className="flex items-start justify-between">
          <div>
            <Badge className="mb-2">Management</Badge>
            <h1 className="text-2xl font-bold text-foreground">Leadership Essentials</h1>
            <p className="text-muted-foreground text-sm mt-1">Master the fundamentals of effective leadership and team management</p>
          </div>
          <Button><Play className="w-4 h-4 mr-2" /> Continue Learning</Button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: Clock, label: "Duration", value: "8 hours" },
            { icon: BookOpen, label: "Modules", value: "8 modules" },
            { icon: Users, label: "Enrolled", value: "45 learners" },
            { icon: Award, label: "Certificate", value: "On completion" },
          ].map((item) => (
            <Card key={item.label}>
              <CardContent className="pt-4 pb-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10"><item.icon className="w-4 h-4 text-accent" /></div>
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-semibold text-foreground">{item.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Your Progress</CardTitle>
              <span className="text-sm font-semibold text-accent">75%</span>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={75} className="h-2 mb-2" />
            <p className="text-xs text-muted-foreground">3 of 8 modules completed · ~2 hours remaining</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Course Modules</CardTitle></CardHeader>
          <CardContent className="space-y-1">
            {modules.map((mod, i) => (
              <div key={i}>
                <div className={`flex items-center gap-3 py-3 px-3 rounded-lg ${mod.current ? "bg-accent/5 border border-accent/20" : ""}`}>
                  {mod.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  ) : mod.locked ? (
                    <Lock className="w-5 h-5 text-muted-foreground/40 flex-shrink-0" />
                  ) : (
                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${mod.current ? "border-accent" : "border-muted-foreground/30"}`} />
                  )}
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${mod.locked ? "text-muted-foreground/50" : "text-foreground"}`}>
                      {i + 1}. {mod.title}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">{mod.duration}</span>
                  {mod.current && <Badge variant="outline" className="text-accent border-accent">Current</Badge>}
                </div>
                {i < modules.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
};

export default CourseDetail;
