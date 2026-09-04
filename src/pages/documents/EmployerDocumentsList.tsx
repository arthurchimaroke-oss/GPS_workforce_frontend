import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "@/components/layout/SidebarLayout";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  FileText,
  FolderPlus,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const folders = [
  { name: "Company Policies", createdBy: "HR Admin", initials: "HA", date: "15 Mar 2026", description: "Official company policies and guidelines", files: 8, size: "45 mb", share: "All Employees" },
  { name: "Tax Documents", createdBy: "Finance Team", initials: "FT", date: "10 Mar 2026", description: "Tax forms and related documents", files: 12, size: "38 mb", share: "All Employees" },
  { name: "Employment Contracts", createdBy: "Legal Dept", initials: "LD", date: "05 Mar 2026", description: "Employee contract templates and signed contracts", files: 25, size: "67 mb", share: "HR Only" },
  { name: "Training Materials", createdBy: "L&D Team", initials: "LT", date: "01 Mar 2026", description: "Onboarding and training resources", files: 18, size: "120 mb", share: "All Employees" },
];

const EmployerDocumentsList = () => {
  const navigate = useNavigate();
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [folderDesc, setFolderDesc] = useState("");
  const [shareType, setShareType] = useState("Everyone");

  const shareGroups = ["All Employees", "HR Only", "Management", "Finance", "Department Heads"];

  return (
    <SidebarLayout>
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Documents</h1>
            <p className="text-sm text-muted-foreground">Manage company documents and files</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm text-muted-foreground">
              <span>01 Jan 2026 - 21 Mar 2026</span>
              <CalendarDays className="w-4 h-4 text-muted-foreground" />
            </div>
            <button onClick={() => setShowNewFolder(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
              <Plus className="w-4 h-4" /> New Folder
            </button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left py-3 px-4 font-medium">Name ↕</th>
                <th className="text-left py-3 px-4 font-medium">Created By ↕</th>
                <th className="text-left py-3 px-4 font-medium">Created Date</th>
                <th className="text-left py-3 px-4 font-medium">Description ↕</th>
                <th className="text-left py-3 px-4 font-medium">Number Of Files</th>
                <th className="text-left py-3 px-4 font-medium">Size</th>
                <th className="text-left py-3 px-4 font-medium">Share With</th>
              </tr>
            </thead>
            <tbody>
              {folders.map((f, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50 cursor-pointer" onClick={() => navigate(`/employer-documents/${i}`)}>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground font-medium">{f.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-semibold text-primary">{f.initials}</div>
                      <span className="text-foreground">{f.createdBy}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    <div className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5 text-muted-foreground" /> {f.date}</div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground max-w-[200px] truncate">{f.description}</td>
                  <td className="py-3 px-4 text-muted-foreground">{f.files}</td>
                  <td className="py-3 px-4 text-muted-foreground">{f.size}</td>
                  <td className="py-3 px-4">
                    <button onClick={(e) => { e.stopPropagation(); setShowShare(true); }} className="text-muted-foreground hover:text-foreground">
                      {f.share}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded flex items-center justify-center text-muted-foreground hover:bg-muted"><ChevronLeft className="w-4 h-4" /></button>
              <button className="w-8 h-8 rounded flex items-center justify-center text-sm font-medium bg-primary text-primary-foreground">1</button>
              <button className="w-8 h-8 rounded flex items-center justify-center text-muted-foreground hover:bg-muted"><ChevronRight className="w-4 h-4" /></button>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Showing 1 to 4 of 4 entries</span>
              <span className="font-medium text-foreground">Show 10 ▴</span>
            </div>
          </div>
        </div>
      </div>

      {/* New Folder Slide-over */}
      {showNewFolder && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowNewFolder(false)} />
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 flex flex-col shadow-xl">
            <div className="p-8 flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-6">Add New Folder</h2>
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Name <span className="text-destructive">*</span></label>
                  <input value={folderName} onChange={(e) => setFolderName(e.target.value)} className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Description</label>
                  <input value={folderDesc} onChange={(e) => setFolderDesc(e.target.value)} placeholder="Input description folder" className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-border flex justify-end gap-3">
              <button onClick={() => setShowNewFolder(false)} className="px-6 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:bg-muted">Cancel</button>
              <button className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">Create</button>
            </div>
          </div>
        </>
      )}

      {/* Share Dialog */}
      {showShare && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowShare(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-card rounded-2xl shadow-xl p-8 max-w-lg w-full mx-4">
              <h2 className="text-xl font-bold text-foreground text-center mb-6">Share With</h2>
              <div className="flex gap-2 mb-4">
                {["Everyone", "Department", "Offices", "Employee Group"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setShareType(opt)}
                    className={cn(
                      "flex-1 py-2.5 rounded-lg border text-sm font-medium flex items-center justify-center gap-2",
                      shareType === opt ? "border-primary text-foreground" : "border-border text-muted-foreground"
                    )}
                  >
                    {opt}
                    <span className={cn("w-4 h-4 rounded-full border-2", shareType === opt ? "border-primary bg-primary" : "border-border")} />
                  </button>
                ))}
              </div>
              {shareType === "Employee Group" && (
                <div className="border border-border rounded-lg p-3 flex flex-wrap gap-2 mb-6">
                  {shareGroups.map((g) => (
                    <span key={g} className="flex items-center gap-1 px-2.5 py-1 bg-muted rounded-md text-sm text-muted-foreground">
                      <X className="w-3 h-3 cursor-pointer" /> {g}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex justify-center gap-3">
                <button onClick={() => setShowShare(false)} className="px-6 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:bg-muted">Cancel</button>
                <button className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">Share Now</button>
              </div>
            </div>
          </div>
        </>
      )}
    </SidebarLayout>
  );
};

export default EmployerDocumentsList;
