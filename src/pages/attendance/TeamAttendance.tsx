import { useState } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Info,
  MoreVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";

const teamData = [
  { name: "Pristia Candra", email: "lincoln@unpixel.com", initials: "PC", type: "Fulltime", paidSchedule: "6h/8h", overtime: "2h", status: "-", dateCol: "6h" },
  { name: "Hanna Baptista", email: "hanna@unpixel.com", initials: "HB", type: "Fulltime", paidSchedule: "5h/8h", overtime: "1h", status: "APPROVE", dateCol: "5h" },
  { name: "Miracle Geidt", email: "miracle@unpixel.com", initials: "MG", type: "Fulltime", paidSchedule: "3h/8h", overtime: "1h", status: "APPROVE", dateCol: "3h" },
  { name: "Rayna Torff", email: "rayna@unpixel.com", initials: "RT", type: "Fulltime", paidSchedule: "7h/8h", overtime: "0h", status: "-", dateCol: "7h" },
  { name: "Giana Lipshutz", email: "giana@unpixel.com", initials: "GL", type: "Fulltime", paidSchedule: "8h/8h", overtime: "0h", status: "APPROVE", dateCol: "8h" },
];

const statusColors: Record<string, string> = {
  APPROVE: "bg-hr-teal/15 text-hr-teal",
};

const TeamAttendance = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <SidebarLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Team Attendance</h1>
          <p className="text-sm text-hr-text-light">Manage your Team Attendance</p>
        </div>

        {/* Info Banner */}
        <div className="flex items-center gap-3 bg-hr-teal/10 border border-hr-teal/20 rounded-xl px-4 py-3 mb-6">
          <div className="w-6 h-6 rounded-full bg-hr-teal flex items-center justify-center text-white flex-shrink-0">
            <Info className="w-3.5 h-3.5" />
          </div>
          <p className="text-sm text-hr-text">You can only update the attendance record within the last 31 days.</p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4">
          <div className="flex items-center justify-between h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
            01 Jan 2023 - 10 Mar 2023
            <CalendarDays className="w-4 h-4 text-hr-text-light" />
          </div>
          <select className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
            <option>All Record</option>
          </select>
          <select className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
            <option>All Location</option>
          </select>
          <select className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
            <option>All Status</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-hr-text-light">
                  <th className="text-left py-3 px-4 font-medium w-8"><input type="checkbox" className="rounded border-border" /></th>
                  <th className="text-left py-3 px-4 font-medium">Employee Name ↕</th>
                  <th className="text-left py-3 px-4 font-medium">Employee Type ↕</th>
                  <th className="text-left py-3 px-4 font-medium">Paid Time/ Work Schedule</th>
                  <th className="text-left py-3 px-4 font-medium">Overtime ↕</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">11 Apr</th>
                  <th className="text-right py-3 px-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {teamData.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="py-3 px-4"><input type="checkbox" className="rounded border-border" /></td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-hr-teal/20 flex items-center justify-center text-xs font-semibold text-hr-teal flex-shrink-0">
                          {row.initials}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{row.name}</p>
                          <p className="text-xs text-hr-text-light">{row.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-hr-text">{row.type}</td>
                    <td className="py-3 px-4 text-hr-text">{row.paidSchedule}</td>
                    <td className="py-3 px-4 text-hr-text">{row.overtime}</td>
                    <td className="py-3 px-4">
                      {row.status !== "-" ? (
                        <span className={cn("px-2.5 py-1 rounded-full text-[11px] font-semibold", statusColors[row.status])}>
                          {row.status}
                        </span>
                      ) : "-"}
                    </td>
                    <td className="py-3 px-4 text-hr-text">{row.dateCol}</td>
                    <td className="py-3 px-4 text-right">
                      <button className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white hover:opacity-80 ml-auto">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded flex items-center justify-center text-hr-text-light hover:bg-muted"><ChevronLeft className="w-4 h-4" /></button>
              <button className={cn("w-8 h-8 rounded flex items-center justify-center text-sm font-medium bg-hr-navy text-white")}>1</button>
              <button className="w-8 h-8 rounded flex items-center justify-center text-hr-text-light hover:bg-muted"><ChevronRight className="w-4 h-4" /></button>
            </div>
            <span className="text-sm text-hr-text-light">5 Result</span>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default TeamAttendance;
