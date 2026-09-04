import { useNavigate, useParams } from "react-router-dom";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Clock, Eye, Share2, Bookmark, ThumbsUp, MessageCircle } from "lucide-react";

const NewsDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const article = {
    id: 1,
    title: "Company Achieves Record Revenue in Q1 2024",
    category: "Company News",
    date: "March 15, 2024",
    author: "John Smith",
    authorRole: "CEO",
    readTime: "3 min read",
    views: 1248,
    likes: 87,
    comments: 23,
    image: "/placeholder.svg",
    content: `
      <p>We're thrilled to announce that our company has achieved record-breaking revenue in the first quarter of 2024, marking a significant milestone in our growth journey. This achievement reflects the hard work and dedication of our entire team.</p>
      
      <h2>Key Highlights</h2>
      <ul>
        <li>Revenue increased by 45% compared to Q1 2023</li>
        <li>Customer base grew by 30% with strong retention rates</li>
        <li>Launched three major product features that drove significant engagement</li>
        <li>Expanded our team by 25% to support continued growth</li>
      </ul>
      
      <h2>Looking Ahead</h2>
      <p>As we move into Q2, we're focused on maintaining this momentum while investing in innovation and our people. We're excited about several upcoming initiatives:</p>
      
      <ul>
        <li>Launch of our new product line in May</li>
        <li>Opening of our Austin office</li>
        <li>Enhanced employee benefits program</li>
        <li>Sustainability initiatives to reduce our environmental impact</li>
      </ul>
      
      <h2>Thank You</h2>
      <p>This success wouldn't be possible without the incredible efforts of every team member. Your creativity, dedication, and passion for what we do continues to drive our company forward. Thank you for being part of this journey.</p>
      
      <p>Here's to an even more successful Q2!</p>
    `,
  };

  const relatedArticles = [
    {
      id: 2,
      title: "Introducing New Employee Benefits Program",
      category: "Benefits",
      date: "March 12, 2024",
      image: "/placeholder.svg",
    },
    {
      id: 5,
      title: "New Office Opening in Austin, Texas",
      category: "Company News",
      date: "March 5, 2024",
      image: "/placeholder.svg",
    },
  ];

  return (
    <SidebarLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/news")}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to News
        </Button>

        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="aspect-video bg-muted relative">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8">
            <Badge className="mb-4">{article.category}</Badge>
            
            <h1 className="text-3xl font-bold text-foreground mb-4">
              {article.title}
            </h1>

            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-hr-teal/20 flex items-center justify-center text-xs font-semibold text-hr-teal">
                  {article.author.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="font-medium text-foreground">{article.author}</div>
                  <div className="text-xs">{article.authorRole}</div>
                </div>
              </div>
              <Separator orientation="vertical" className="h-8" />
              <span>{article.date}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {article.views.toLocaleString()} views
              </span>
            </div>

            <div className="flex items-center gap-3 mb-8">
              <Button variant="outline" size="sm">
                <ThumbsUp className="w-4 h-4 mr-2" />
                Like ({article.likes})
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Comment ({article.comments})
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="ml-auto">
                <Bookmark className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>

            <div 
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </div>

        {relatedArticles.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Related Articles</h2>
            <div className="grid grid-cols-2 gap-4">
              {relatedArticles.map((related) => (
                <Card
                  key={related.id}
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate(`/news/${related.id}`)}
                >
                  <div className="aspect-video bg-muted relative">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <Badge variant="outline" className="mb-2">
                      {related.category}
                    </Badge>
                    <h3 className="font-semibold mb-1 line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{related.date}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </SidebarLayout>
  );
};

export default NewsDetail;
