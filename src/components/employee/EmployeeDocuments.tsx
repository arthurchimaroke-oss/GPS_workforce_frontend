import React from 'react';
import { 
  FileText, 
  Search, 
  Download, 
  Eye, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Folder, 
  ChevronRight, 
  Plus,
  Filter,
  ShieldCheck,
  Lock,
  ArrowRight,
  History,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EmployeeDocuments = () => {
  const [activeFolder, setActiveFolder] = React.useState('all');

  const folders = [
    { id: 'all', name: 'All Documents', count: 12, icon: Folder },
    { id: 'paystubs', name: 'Paystubs', count: 6, icon: FileText },
    { id: 'tax', name: 'Tax Forms', count: 2, icon: ShieldCheck },
    { id: 'agreements', name: 'Agreements', count: 4, icon: Lock },
  ];

  const documents = [
    { id: 1, name: 'Paystub_Mar_2026.pdf', type: 'paystubs', size: '124 KB', date: 'Mar 15, 2026', status: 'Verified' },
    { id: 2, name: 'Paystub_Feb_2026.pdf', type: 'paystubs', size: '122 KB', date: 'Feb 15, 2026', status: 'Verified' },
    { id: 3, name: '2025_W2_Form.pdf', type: 'tax', size: '450 KB', date: 'Jan 31, 2026', status: 'Verified' },
    { id: 4, name: 'Employment_Agreement.pdf', type: 'agreements', size: '2.4 MB', date: 'Jan 05, 2026', status: 'Signed' },
    { id: 5, name: 'NDA_Agreement.pdf', type: 'agreements', size: '1.1 MB', date: 'Jan 05, 2026', status: 'Signed' },
  ];

  const filteredDocs = activeFolder === 'all' 
    ? documents 
    : documents.filter(doc => doc.type === activeFolder);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">My Documents</h1>
          <p className="text-zinc-500 font-medium mt-1">Access your paystubs, tax forms, and employment agreements.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-white border border-zinc-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-50 transition-all flex items-center gap-2">
            <History className="w-4 h-4" />
            Access History
          </button>
          <button className="px-6 py-3 bg-zinc-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Upload Document
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Folders Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-[40px] p-6 border border-zinc-100 shadow-sm space-y-2">
            <p className="px-4 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4">Folders</p>
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setActiveFolder(folder.id)}
                className={cn(
                  "w-full flex items-center px-4 py-3.5 rounded-2xl transition-all group",
                  activeFolder === folder.id 
                    ? "bg-zinc-950 text-white shadow-xl shadow-zinc-200" 
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                )}
              >
                <folder.icon className={cn("w-5 h-5 shrink-0", activeFolder === folder.id ? "text-white" : "text-zinc-400 group-hover:text-zinc-900")} />
                <span className="ml-4 font-bold text-sm tracking-tight">{folder.name}</span>
                <span className={cn(
                  "ml-auto text-[10px] font-black px-2 py-0.5 rounded-full",
                  activeFolder === folder.id ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-400"
                )}>
                  {folder.count}
                </span>
              </button>
            ))}
          </div>

          <div className="bg-zinc-950 rounded-[40px] p-8 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-emerald-500/20 transition-colors" />
            <div className="relative z-10">
              <ShieldCheck className="w-10 h-10 text-emerald-400 mb-6" />
              <h3 className="text-xl font-black tracking-tight mb-2">Secure Vault</h3>
              <p className="text-zinc-400 text-xs leading-relaxed mb-6">Your documents are encrypted with AES-256 and stored on a private, secure network.</p>
              <button className="text-[10px] font-black text-emerald-400 uppercase tracking-widest hover:text-emerald-300 transition-colors flex items-center gap-2">
                Security Settings <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Document List */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Search documents..." 
                className="w-full pl-12 pr-6 py-3.5 bg-white border border-zinc-200 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-zinc-950 transition-all"
              />
            </div>
            <button className="px-6 py-3.5 bg-white border border-zinc-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-50 transition-all flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>

          <div className="bg-white rounded-[40px] border border-zinc-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-50">
                    <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Document Name</th>
                    <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Size</th>
                    <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Date Added</th>
                    <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Status</th>
                    <th className="px-8 py-6"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {filteredDocs.map((doc) => (
                    <tr key={doc.id} className="group hover:bg-zinc-50/50 transition-colors cursor-pointer">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-400 group-hover:bg-zinc-950 group-hover:text-white transition-all">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-black text-zinc-900">{doc.name}</p>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{doc.type}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-bold text-zinc-500">{doc.size}</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-bold text-zinc-500">{doc.date}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span className="text-xs font-black text-zinc-600 uppercase tracking-widest">{doc.status}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 hover:bg-zinc-100 rounded-xl transition-colors text-zinc-400 hover:text-zinc-900">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-zinc-100 rounded-xl transition-colors text-zinc-400 hover:text-zinc-900">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-8 bg-zinc-50 rounded-[40px] border border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-zinc-400 shadow-sm">
                <Info className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-black text-zinc-900 tracking-tight">Need a specific document?</h4>
                <p className="text-xs text-zinc-500 font-medium">Request custom documents or certifications from HR.</p>
              </div>
            </div>
            <button className="px-8 py-4 bg-white border border-zinc-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-50 hover:border-zinc-950 transition-all shadow-sm">
              Request Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper for conditional classes
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default EmployeeDocuments;
