import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeSidebarLayout from "@/components/layout/EmployeeSidebarLayout";
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
  { name: "Esential Tax", createdBy: "Jennifer Law", initials: "JL", date: "24 Mar 2023", description: "Files about the importance of essential tasks", files: 5, size: "22 mb", share: "Everyone" },
  { name: "Project Manager", createdBy: "Dulce Philips", initials: "DP", date: "21 Jan 2023", description: "-", files: 3, size: "15 mb", share: "Everyone" },
  { name: "UIUX Designer", createdBy: "Miracle Franci", initials: "MF", date: "10 Jan 2023", description: "Standard of procedure about UI UX Design Team", files: 2, size: "11 mb", share: "Everyone" },
  { name: "IT Development", createdBy: "Davis Curtis", initials: "DC", date: "01 Jan 2022", description: "Standard of procedure about IT Dev Team", files: 4, size: "20 mb", share: "Everyone" },
];

const DocumentsList = () => {
  const navigate = useNavigate();
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [folderName, setFolderName] = useState("Designer Essensial");
  const [folderDesc, setFolderDesc] = useState("");
  const [shareType, setShareType] = useState("Employee Group");

  const shareGroups = ["Onboarding Group", "Offboarding Group", "Probationary Group", "All Employee", "Fulltime Employee (Non- resigned employee)"];

  return (
    <EmployeeSidebarLayout>
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Documents</h1>
            <p className="text-sm text-hr-text-light">These are the uploaded documents</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm text-hr-text">
              <span>01 Jan 2023 - 10 Mar 2023</span>
              <CalendarDays className="w-4 h-4 text-hr-text-light" />
            </div>
            <button onClick={() => setShowNewFolder(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-hr-navy text-white text-sm font-medium hover:opacity-90">
              <Plus className="w-4 h-4" /> New Folder
            </button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-hr-text-light">
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
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50 cursor-pointer" onClick={() => navigate(`/documents/${i}`)}>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-hr-text-light" />
                      <span className="text-foreground font-medium">{f.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-hr-teal/20 flex items-center justify-center text-[10px] font-semibold text-hr-teal">{f.initials}</div>
                      <span className="text-hr-text">{f.createdBy}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-hr-text">
                    <div className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5 text-hr-text-light" /> {f.date}</div>
                  </td>
                  <td className="py-3 px-4 text-hr-text max-w-[200px] truncate">{f.description}</td>
                  <td className="py-3 px-4 text-hr-text">{f.files}</td>
                  <td className="py-3 px-4 text-hr-text">{f.size}</td>
                  <td className="py-3 px-4">
                    <button onClick={(e) => { e.stopPropagation(); setShowShare(true); }} className="text-hr-text hover:text-foreground">
                      {f.share}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded flex items-center justify-center text-hr-text-light hover:bg-muted"><ChevronLeft className="w-4 h-4" /></button>
              <button className="w-8 h-8 rounded flex items-center justify-center text-sm font-medium bg-hr-navy text-white">1</button>
              <button className="w-8 h-8 rounded flex items-center justify-center text-hr-text-light hover:bg-muted"><ChevronRight className="w-4 h-4" /></button>
            </div>
            <div className="flex items-center gap-2 text-sm text-hr-text-light">
              <span>Showing 1 to 10 of 4 entries</span>
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
                  <input value={folderName} onChange={(e) => setFolderName(e.target.value)} className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-hr-teal" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Description</label>
                  <input value={folderDesc} onChange={(e) => setFolderDesc(e.target.value)} placeholder="Input description folder" className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-hr-teal" />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-border flex justify-end gap-3">
              <button onClick={() => setShowNewFolder(false)} className="px-6 py-2.5 rounded-lg border border-border text-sm font-medium text-hr-text hover:bg-muted">Cancel</button>
              <button className="px-6 py-2.5 rounded-lg bg-hr-navy text-white text-sm font-medium hover:opacity-90">Create</button>
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
                      shareType === opt ? "border-hr-teal text-foreground" : "border-border text-hr-text-light"
                    )}
                  >
                    {opt}
                    <span className={cn("w-4 h-4 rounded-full border-2", shareType === opt ? "border-hr-teal bg-hr-teal" : "border-border")} />
                  </button>
                ))}
              </div>
              {shareType === "Employee Group" && (
                <div className="border border-border rounded-lg p-3 flex flex-wrap gap-2 mb-6">
                  {shareGroups.map((g) => (
                    <span key={g} className="flex items-center gap-1 px-2.5 py-1 bg-muted rounded-md text-sm text-hr-text">
                      <X className="w-3 h-3 cursor-pointer" /> {g}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex justify-center gap-3">
                <button onClick={() => setShowShare(false)} className="px-6 py-2.5 rounded-lg border border-border text-sm font-medium text-hr-text hover:bg-muted">Cancel</button>
                <button className="px-6 py-2.5 rounded-lg bg-hr-teal text-white text-sm font-medium hover:opacity-90">Share Now</button>
              </div>
            </div>
          </div>
        </>
      )}
    </EmployeeSidebarLayout>
  );
};

export default DocumentsList;
