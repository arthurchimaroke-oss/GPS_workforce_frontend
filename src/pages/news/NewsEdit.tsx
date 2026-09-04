import SidebarLayout from "@/components/layout/SidebarLayout";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ImagePlus, X, Trash2 } from "lucide-react";
import { useState } from "react";

const categories = ["Company News", "Product Update", "HR Announcement", "Events", "Culture", "Industry News"];

const mockArticle = {
  title: "Q1 2024 Company All-Hands Meeting Recap",
  category: "Company News",
  content: `Last week, we held our Q1 All-Hands meeting, bringing together our entire team for an update on company direction, key milestones, and what's ahead for the coming quarter.\n\nCEO Jane Doe opened with a review of our Q4 performance, highlighting record revenue growth of 32% year-over-year and the successful launch of three new product features.\n\nWe also recognized five employees for their exceptional contributions, and teams shared updates on upcoming initiatives across Engineering, Marketing, and Operations.`,
  tags: ["all-hands", "Q1", "company-update"],
  published: true,
};

const NewsEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tags, setTags] = useState<string[]>(mockArticle.tags);
  const [tagInput, setTagInput] = useState("");
  const [published, setPublished] = useState(mockArticle.published);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      setTags((prev) => [...prev, tagInput.trim()]);
      setTagInput("");
    }
  };

  return (
    <SidebarLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/news")} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-foreground">Edit Article</h1>
          </div>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-destructive border border-destructive/30 hover:bg-destructive/10 transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>

        {showDeleteConfirm && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 flex items-center justify-between">
            <p className="text-sm text-destructive font-medium">Are you sure you want to delete this article? This cannot be undone.</p>
            <div className="flex gap-2">
              <button onClick={() => setShowDeleteConfirm(false)} className="px-3 py-1.5 text-xs rounded-lg border border-border text-foreground hover:bg-muted">Cancel</button>
              <button onClick={() => navigate("/news")} className="px-3 py-1.5 text-xs rounded-lg bg-destructive text-white hover:bg-destructive/90">Delete</button>
            </div>
          </div>
        )}

        <div className="bg-card border border-border rounded-xl p-6 space-y-5">
          {/* Cover image */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Cover Image</label>
            <div className="border-2 border-dashed border-border rounded-xl h-48 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary transition-colors text-muted-foreground bg-muted/30">
              <ImagePlus className="w-8 h-8" />
              <p className="text-sm">Click to replace cover image</p>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Article Title *</label>
            <input
              defaultValue={mockArticle.title}
              className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Category</label>
            <select defaultValue={mockArticle.category} className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Content */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Content *</label>
            <textarea
              defaultValue={mockArticle.content}
              rows={10}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-xs font-medium text-foreground">
                  {tag}
                  <button onClick={() => setTags(tags.filter((t) => t !== tag))}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={addTag}
              className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Type a tag and press Enter..."
            />
          </div>

          {/* Published toggle */}
          <div className="flex items-center gap-3 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                onClick={() => setPublished(!published)}
                className={`w-10 h-5 rounded-full transition-colors cursor-pointer flex items-center px-0.5 ${published ? "bg-primary" : "bg-muted"}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${published ? "translate-x-5" : "translate-x-0"}`} />
              </div>
              <span className="text-sm text-foreground">{published ? "Published" : "Draft"}</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={() => navigate("/news")} className="px-4 py-2 text-sm rounded-lg border border-border text-foreground hover:bg-muted transition-colors">
            Cancel
          </button>
          <button className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default NewsEdit;
