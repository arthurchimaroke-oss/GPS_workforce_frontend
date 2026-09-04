import { useState } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

const todos = [
  { task: "Collect Documents - Hard Copies", dueDate: "24 Mar 2023", person: "Jennifer Law", initials: "JL", type: "Onboarding" },
  { task: "Upload signed work contract", dueDate: "21 Jan 2023", person: "Dulce Philips", initials: "DP", type: "Onboarding" },
  { task: "Upload signed work contract", dueDate: "10 Jan 2023", person: "Miracle Franci", initials: "MF", type: "Onboarding" },
  { task: "Collect Documents - Hard Copies", dueDate: "01 Jan 2022", person: "Davis Curtis", initials: "DC", type: "Onboarding" },
];

const ChecklistTodos = () => {
  const [showDetail, setShowDetail] = useState(false);
  const [selectedTask, setSelectedTask] = useState(todos[0]);

  return (
    <SidebarLayout>
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Checklist - To Dos</h1>
            <p className="text-sm text-hr-text-light">These are some of the tasks that must be completed</p>
          </div>
          <div className="flex items-center gap-3">
            <select className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <div className="relative w-64">
              <input placeholder="Search what you need" className="w-full h-10 rounded-lg border border-border bg-background pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-hr-teal" />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hr-text-light" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-hr-text-light">
                <th className="text-left py-3 px-4 font-medium">Task</th>
                <th className="text-left py-3 px-4 font-medium">Due Date ↕</th>
                <th className="text-left py-3 px-4 font-medium">Checklist</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((t, i) => (
                <tr
                  key={i}
                  className="border-b border-border last:border-0 hover:bg-muted/50 cursor-pointer"
                  onClick={() => { setSelectedTask(t); setShowDetail(true); }}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-border flex-shrink-0" />
                      <span className="text-foreground">{t.task}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-hr-text">
                    <div className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5 text-hr-text-light" /> {t.dueDate}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-hr-teal/20 flex items-center justify-center text-[10px] font-semibold text-hr-teal">{t.initials}</div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{t.person}</p>
                        <p className="text-xs text-hr-text-light">{t.type}</p>
                      </div>
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
      </div>

      {/* Task Detail Slide-over */}
      {showDetail && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowDetail(false)} />
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 flex flex-col shadow-xl">
            <div className="p-8 flex-1">
              <h2 className="text-xl font-bold text-foreground mb-6">{selectedTask.task}</h2>

              <div className="space-y-5">
                <div>
                  <p className="text-sm text-hr-text-light mb-1">Due Date</p>
                  <p className="text-sm font-semibold text-foreground">13 Feb 2023</p>
                </div>

                <div>
                  <p className="text-sm text-hr-text-light mb-2">Onboarding For</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-hr-teal/20 flex items-center justify-center text-xs font-semibold text-hr-teal">{selectedTask.initials}</div>
                    <span className="text-sm font-medium text-foreground">{selectedTask.person}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-hr-text-light mb-2">Assignee</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-hr-teal/20 flex items-center justify-center text-xs font-semibold text-hr-teal">PC</div>
                    <span className="text-sm font-medium text-foreground">Pristia Candra (me)</span>
                  </div>
                </div>

                <div className="text-sm text-hr-text leading-relaxed">
                  <p>Collect all necessary hard-copy documents from the new hire:</p>
                  <ol className="list-decimal ml-5 mt-1 space-y-0.5">
                    <li>ID card photocopies.</li>
                    <li>Health check record.</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-border flex justify-end gap-3">
              <button onClick={() => setShowDetail(false)} className="px-6 py-2.5 rounded-lg border border-border text-sm font-medium text-hr-text hover:bg-muted">Cancel</button>
              <button className="px-6 py-2.5 rounded-lg bg-hr-navy text-white text-sm font-medium hover:opacity-90">Mark as Complete</button>
            </div>

            <button onClick={() => setShowDetail(false)} className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-hr-text-light hover:text-foreground">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </SidebarLayout>
  );
};

export default ChecklistTodos;
