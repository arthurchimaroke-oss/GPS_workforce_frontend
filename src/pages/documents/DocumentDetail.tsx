import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "@/components/layout/SidebarLayout";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Eye,
  FileText,
  Trash2,
  Upload,
} from "lucide-react";

const files = [
  { name: "Esential Tax 01.pdf", size: "1 mb" },
  { name: "Esential Tax 02.pdf", size: "1.5 mb" },
  { name: "Esential Tax 03.pdf", size: "2 mb" },
  { name: "Esential Tax 05.pdf", size: "2 mb" },
  { name: "Esential Tax 01.pdf", size: "2.5 mb" },
];

const DocumentDetail = () => {
  const navigate = useNavigate();
  const [hasFiles] = useState(true);

  return (
    <SidebarLayout>
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Esential Tax</h1>
            <div className="flex items-center gap-2 text-sm text-hr-text-light">
              <button onClick={() => navigate("/documents")} className="hover:text-foreground">List Document</button>
              <span>›</span>
              <span className="text-foreground font-medium">Esential Tax</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-hr-text hover:bg-muted">
              <Upload className="w-4 h-4" /> Upload
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-hr-navy text-white text-sm font-medium hover:opacity-90">
              <Download className="w-4 h-4" /> Download
            </button>
          </div>
        </div>

        {!hasFiles ? (
          <div className="bg-card border border-border rounded-xl flex flex-col items-center justify-center py-24 text-center">
            <div className="text-6xl mb-4">📄</div>
            <h2 className="text-xl font-bold text-foreground mb-2">There's is no document here</h2>
            <p className="text-sm text-hr-text-light mb-6">Please add new news by clicking "Upload File" below</p>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-hr-navy text-white text-sm font-medium hover:opacity-90">
              <Upload className="w-4 h-4" /> Upload File
            </button>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-hr-text-light">
                  <th className="text-left py-3 px-4 font-medium">Name ↕</th>
                  <th className="text-left py-3 px-4 font-medium">Size</th>
                  <th className="text-right py-3 px-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {files.map((f, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-hr-text-light" />
                        <span className="text-foreground">{f.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-hr-text">{f.size}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="w-8 h-8 rounded-full bg-hr-teal flex items-center justify-center text-white hover:opacity-80"><Eye className="w-3.5 h-3.5" /></button>
                        <button className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white hover:opacity-80"><Copy className="w-3.5 h-3.5" /></button>
                        <button className="w-8 h-8 rounded-full bg-destructive flex items-center justify-center text-white hover:opacity-80"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
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
        )}
      </div>
    </SidebarLayout>
  );
};

export default DocumentDetail;
