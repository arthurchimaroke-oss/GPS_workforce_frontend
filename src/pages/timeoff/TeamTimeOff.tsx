import { useState } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { Input } from "@/components/ui/input";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Download,
  Search,
  List,
  LayoutGrid,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

const teamRequests = [
  { name: "Pristia Candra", email: "lincoln@unpixel.com", initials: "PC", from: "01 Mar 2023", to: "03 Mar 2023", total: "3 Days", type: "Engagement", attachment: "-", status: "APPROVE" },
  { name: "Hanna Baptista", email: "hanna@unpixel.com", initials: "HB", from: "01 Mar 2023", to: "03 Mar 2023", total: "3 Days", type: "Engagement", attachment: "File.pdf", status: "APPROVE" },
  { name: "Miracle Geidt", email: "miracle@unpixel.com", initials: "MG", from: "01 Mar 2023", to: "03 Mar 2023", total: "3 Days", type: "Engagement", attachment: "File.pdf", status: "PENDING" },
  { name: "Rayna Torff", email: "rayna@unpixel.com", initials: "RT", from: "01 Mar 2023", to: "03 Mar 2023", total: "3 Days", type: "Engagement", attachment: "-", status: "APPROVE" },
  { name: "Giana Lipshutz", email: "giana@unpixel.com", initials: "GL", from: "01 Mar 2023", to: "03 Mar 2023", total: "3 Days", type: "Engagement", attachment: "File.pdf", status: "PENDING" },
  { name: "James George", email: "james@unpixel.com", initials: "JG", from: "01 Mar 2023", to: "03 Mar 2023", total: "3 Days", type: "Engagement", attachment: "-", status: "APPROVE" },
  { name: "Jordyn George", email: "jordyn@unpixel.com", initials: "JG", from: "01 Mar 2023", to: "03 Mar 2023", total: "3 Days", type: "Engagement", attachment: "File.pdf", status: "APPROVE" },
  { name: "Skylar Herwitz", email: "skylar@unpixel.com", initials: "SH", from: "01 Mar 2023", to: "03 Mar 2023", total: "3 Days", type: "Engagement", attachment: "File.pdf", status: "APPROVE" },
];

const statusColors: Record<string, string> = {
  APPROVE: "bg-hr-teal/15 text-hr-teal",
  PENDING: "bg-yellow-100 text-yellow-700",
};

const getCalendarDays = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDow = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  const prevMonthLast = new Date(year, month, 0).getDate();

  const days: { day: number; isCurrentMonth: boolean }[] = [];
  for (let i = startDow - 1; i >= 0; i--) {
    days.push({ day: prevMonthLast - i, isCurrentMonth: false });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, isCurrentMonth: true });
  }
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({ day: i, isCurrentMonth: false });
  }
  return days;
};

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const TeamTimeOff = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [calMonth, setCalMonth] = useState(3); // April
  const [calYear, setCalYear] = useState(2023);

  const calendarDays = getCalendarDays(calYear, calMonth);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handlePrevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
    else setCalMonth(calMonth - 1);
  };
  const handleNextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
    else setCalMonth(calMonth + 1);
  };

  return (
    <SidebarLayout>
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-foreground">Team Time Off</h1>
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Input placeholder="Search employee" className="pr-10 focus-visible:ring-hr-teal" />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hr-text-light" />
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-hr-teal text-white text-sm font-medium hover:opacity-90">
              <Download className="w-4 h-4" />
              Download CSV
            </button>
            <div className="flex rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => setViewMode("list")}
                className={cn("p-2", viewMode === "list" ? "bg-muted text-foreground" : "bg-background text-hr-text-light")}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("calendar")}
                className={cn("p-2", viewMode === "calendar" ? "bg-hr-teal text-white" : "bg-background text-hr-text-light")}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {viewMode === "calendar" ? (
          /* Calendar View */
          <div>
            <div className="flex items-center justify-between h-12 rounded-lg border border-border bg-background px-4 mb-4">
              <div className="flex items-center gap-2">
                <button onClick={handlePrevMonth} className="text-hr-text-light hover:text-foreground"><ChevronLeft className="w-4 h-4" /></button>
                <span className="text-sm font-medium text-foreground">{monthNames[calMonth]} {calYear}</span>
                <button onClick={handleNextMonth} className="text-hr-text-light hover:text-foreground"><ChevronRight className="w-4 h-4" /></button>
              </div>
              <CalendarDays className="w-4 h-4 text-hr-text-light" />
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="grid grid-cols-7 border-b border-border">
                {weekDays.map((d) => (
                  <div key={d} className="py-3 text-center text-sm font-medium text-hr-text-light border-r border-border last:border-r-0">
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7">
                {calendarDays.map((d, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-24 border-r border-b border-border last:border-r-0 p-2 text-sm",
                      d.isCurrentMonth ? "text-foreground" : "text-muted-foreground/40"
                    )}
                  >
                    <span className="font-medium">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* List View */
          <>
            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div className="flex items-center justify-between h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                01 Jan 2023 - 10 Mar 2023
                <CalendarDays className="w-4 h-4 text-hr-text-light" />
              </div>
              <select className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text">
                <option>All Type</option>
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
                      <th className="text-left py-3 px-4 font-medium">From ↕</th>
                      <th className="text-left py-3 px-4 font-medium">To ↕</th>
                      <th className="text-left py-3 px-4 font-medium">Total ↕</th>
                      <th className="text-left py-3 px-4 font-medium">Type ↕</th>
                      <th className="text-left py-3 px-4 font-medium">Attachment ↕</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamRequests.map((req, i) => (
                      <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50">
                        <td className="py-3 px-4"><input type="checkbox" className="rounded border-border" /></td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-hr-teal/20 flex items-center justify-center text-xs font-semibold text-hr-teal flex-shrink-0">
                              {req.initials}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{req.name}</p>
                              <p className="text-xs text-hr-text-light">{req.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-hr-text">{req.from}</td>
                        <td className="py-3 px-4 text-hr-text">{req.to}</td>
                        <td className="py-3 px-4 text-hr-text">{req.total}</td>
                        <td className="py-3 px-4 text-hr-text">{req.type}</td>
                        <td className="py-3 px-4 text-hr-text">
                          {req.attachment !== "-" ? (
                            <div className="flex items-center gap-1"><FileText className="w-3.5 h-3.5 text-hr-text-light" />{req.attachment}</div>
                          ) : "-"}
                        </td>
                        <td className="py-3 px-4">
                          <span className={cn("px-2.5 py-1 rounded-full text-[11px] font-semibold", statusColors[req.status])}>
                            {req.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-border">
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 rounded flex items-center justify-center text-hr-text-light hover:bg-muted"><ChevronLeft className="w-4 h-4" /></button>
                  {[1, 2, 3].map((p) => (
                    <button key={p} onClick={() => setCurrentPage(p)} className={cn("w-8 h-8 rounded flex items-center justify-center text-sm font-medium", currentPage === p ? "bg-hr-navy text-white" : "text-hr-text hover:bg-muted")}>{p}</button>
                  ))}
                  <span className="px-1 text-hr-text-light">...</span>
                  <button className="w-8 h-8 rounded flex items-center justify-center text-sm text-hr-text hover:bg-muted">10</button>
                  <button className="w-8 h-8 rounded flex items-center justify-center text-hr-text-light hover:bg-muted"><ChevronRight className="w-4 h-4" /></button>
                </div>
                <div className="flex items-center gap-2 text-sm text-hr-text-light">
                  <span>Showing 1 to 8 of 50 entries</span>
                  <span className="font-medium text-foreground">Show 8 ▴</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </SidebarLayout>
  );
};

export default TeamTimeOff;
