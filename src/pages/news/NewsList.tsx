import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Search, Plus, Clock, Eye, TrendingUp } from "lucide-react";

const NewsList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  const newsArticles = [
    {
      id: 1,
      title: "Company Achieves Record Revenue in Q1 2024",
      excerpt: "We're thrilled to announce that our company has achieved record-breaking revenue in the first quarter of 2024...",
      category: "Company News",
      date: "March 15, 2024",
      readTime: "3 min read",
      views: 1248,
      image: "/placeholder.svg",
      status: "published",
    },
    {
      id: 2,
      title: "Introducing New Employee Benefits Program",
      excerpt: "We're excited to launch our enhanced benefits program designed to support your health, wellness, and financial goals...",
      category: "Benefits",
      date: "March 12, 2024",
      readTime: "5 min read",
      views: 2156,
      image: "/placeholder.svg",
      status: "published",
    },
    {
      id: 3,
      title: "Team Building Event: Summer Retreat 2024",
      excerpt: "Save the date! Our annual summer retreat is scheduled for July 15-17. This year we're heading to Lake Tahoe...",
      category: "Events",
      date: "March 10, 2024",
      readTime: "2 min read",
      views: 892,
      image: "/placeholder.svg",
      status: "published",
    },
    {
      id: 4,
      title: "Sustainability Initiative Launch",
      excerpt: "As part of our commitment to environmental responsibility, we're launching a comprehensive sustainability program...",
      category: "Company News",
      date: "March 8, 2024",
      readTime: "4 min read",
      views: 1567,
      image: "/placeholder.svg",
      status: "published",
    },
    {
      id: 5,
      title: "New Office Opening in Austin, Texas",
      excerpt: "We're expanding! Our new Austin office will open in May 2024, creating opportunities for remote and local talent...",
      category: "Company News",
      date: "March 5, 2024",
      readTime: "3 min read",
      views: 2034,
      image: "/placeholder.svg",
      status: "published",
    },
    {
      id: 6,
      title: "Employee Spotlight: Sarah Johnson",
      excerpt: "This month we're celebrating Sarah Johnson from our Engineering team for her outstanding contributions...",
      category: "People",
      date: "March 1, 2024",
      readTime: "4 min read",
      views: 1123,
      image: "/placeholder.svg",
      status: "published",
    },
  ];

  const categories = ["all", "company-news", "benefits", "events", "people"];
  
  const filteredArticles = newsArticles.filter((article) => {
    if (activeTab === "all") return true;
    return article.category.toLowerCase().replace(" ", "-") === activeTab;
  });

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Company News</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Stay updated with the latest company announcements and updates
            </p>
          </div>
          <Button size="sm" className="bg-hr-teal hover:bg-hr-teal/90">
            <Plus className="w-4 h-4 mr-2" />
            New Article
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Articles</p>
                <p className="text-2xl font-semibold mt-1">{newsArticles.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-semibold mt-1">
                  {newsArticles.reduce((sum, article) => sum + article.views, 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-semibold mt-1">6</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="company-news">Company News</TabsTrigger>
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="people">People</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search articles..." className="pl-9 w-64" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {filteredArticles.map((article) => (
              <Card
                key={article.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/news/${article.id}`)}
              >
                <div className="aspect-video bg-muted relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 left-3 bg-white/90 text-foreground hover:bg-white">
                    {article.category}
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {article.views.toLocaleString()}
                      </span>
                    </div>
                    <span>{article.date}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default NewsList;
