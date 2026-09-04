import SidebarLayout from "@/components/layout/SidebarLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp, Award, Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Active Goals", value: "124", change: "+12%", icon: Target, color: "text-accent" },
  { label: "Reviews Due", value: "18", change: "This month", icon: TrendingUp, color: "text-destructive" },
  { label: "Top Performers", value: "32", change: "+5%", icon: Award, color: "text-primary" },
  { label: "Teams Reviewed", value: "8/12", change: "67%", icon: Users, color: "text-accent" },
];

const recentReviews = [
  { name: "Sarah Johnson", role: "Product Designer", rating: 4.8, status: "Completed", date: "Mar 10, 2026" },
  { name: "Mike Chen", role: "Frontend Dev", rating: 4.5, status: "Completed", date: "Mar 9, 2026" },
  { name: "Emily Davis", role: "HR Manager", rating: 4.2, status: "Pending", date: "Mar 15, 2026" },
  { name: "James Wilson", role: "Data Analyst", rating: 0, status: "Scheduled", date: "Mar 20, 2026" },
];

const topGoals = [
  { goal: "Increase customer satisfaction by 15%", progress: 78, department: "Support" },
  { goal: "Launch new product feature", progress: 65, department: "Engineering" },
  { goal: "Reduce employee turnover by 10%", progress: 90, department: "HR" },
  { goal: "Improve onboarding completion rate", progress: 45, department: "HR" },
];

const PerformanceOverview = () => {
  const navigate = useNavigate();

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Performance Overview</h1>
            <p className="text-muted-foreground text-sm mt-1">Track goals, reviews, and team performance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/performance/reviews")}>View Reviews</Button>
            <Button onClick={() => navigate("/performance/my")}>My Performance</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold">Recent Reviews</CardTitle>
              <Button variant="ghost" size="sm" className="text-accent" onClick={() => navigate("/performance/reviews")}>
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentReviews.map((review) => (
                  <div key={review.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                        {review.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{review.name}</p>
                        <p className="text-xs text-muted-foreground">{review.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        review.status === "Completed" ? "bg-accent/10 text-accent" :
                        review.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {review.status}
                      </span>
                      {review.rating > 0 && (
                        <p className="text-xs text-muted-foreground mt-1">⭐ {review.rating}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold">Top Goals</CardTitle>
              <Button variant="ghost" size="sm" className="text-accent" onClick={() => navigate("/performance/my")}>
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topGoals.map((goal) => (
                  <div key={goal.goal} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{goal.goal}</p>
                      <span className="text-xs text-muted-foreground">{goal.progress}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={goal.progress} className="flex-1 h-2" />
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{goal.department}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default PerformanceOverview;
