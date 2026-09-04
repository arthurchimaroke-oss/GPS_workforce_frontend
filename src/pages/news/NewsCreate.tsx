import SidebarLayout from "@/components/layout/SidebarLayout";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ImagePlus, X } from "lucide-react";
import { useState } from "react";

const categories = ["Company News", "Product Update", "HR Announcement", "Events", "Culture", "Industry News"];

const NewsCreate = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [publishNow, setPublishNow] = useState(true);

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      setTags((prev) => [...prev, tagInput.trim()]);
      setTagInput("");
    }
  };

  return (
    <SidebarLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/news")} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-foreground">Create Article</h1>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 space-y-5">
          {/* Cover image */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Cover Image</label>
            <div className="border-2 border-dashed border-border rounded-xl h-48 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary transition-colors text-muted-foreground">
              <ImagePlus className="w-8 h-8" />
              <p className="text-sm">Click to upload cover image</p>
              <p className="text-xs">PNG, JPG up to 5MB</p>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Article Title *</label>
            <input
              className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter article title..."
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Category</label>
            <select className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Select a category</option>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Content */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Content *</label>
            <textarea
              rows={10}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Write your article content here..."
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

          {/* Publish options */}
          <div className="flex items-center gap-3 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={publishNow} onChange={(e) => setPublishNow(e.target.checked)} className="rounded" />
              <span className="text-sm text-foreground">Publish immediately</span>
            </label>
          </div>

          {!publishNow && (
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Schedule Date</label>
              <input type="datetime-local" className="h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={() => navigate("/news")} className="px-4 py-2 text-sm rounded-lg border border-border text-foreground hover:bg-muted transition-colors">
            Cancel
          </button>
          <button className="px-4 py-2 text-sm rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-colors">
            Save Draft
          </button>
          <button className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            {publishNow ? "Publish Now" : "Schedule"}
          </button>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default NewsCreate;
