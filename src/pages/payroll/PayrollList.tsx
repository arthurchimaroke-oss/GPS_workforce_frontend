import { useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

const payrollData = [
  { name: "Pristia Candra", email: "lincoln@unpixel.com", initials: "PC", id: "UN001", total: "$ 3,500", salary: "$ 3,500", actual: "$ 3,500", recurring: "$ 3,500", oneOff: "$0", offset: "$0", ot: "$0" },
  { name: "Hanna Baptista", email: "hanna@unpixel.com", initials: "HB", id: "UN002", total: "$ 3,500", salary: "$ 3,500", actual: "$ 3,500", recurring: "$ 3,500", oneOff: "$0", offset: "$0", ot: "$0" },
  { name: "Miracle Geidt", email: "miracle@unpixel.com", initials: "MG", id: "UN003", total: "$ 3,500", salary: "$ 3,500", actual: "$ 3,500", recurring: "$ 3,500", oneOff: "$0", offset: "$0", ot: "$0" },
  { name: "Rayna Torff", email: "rayna@unpixel.com", initials: "RT", id: "UN004", total: "$ 3,500", salary: "$ 3,500", actual: "$ 3,500", recurring: "$ 3,500", oneOff: "$0", offset: "$0", ot: "$0" },
  { name: "Giana Lipshutz", email: "giana@unpixel.com", initials: "GL", id: "UN005", total: "$ 3,500", salary: "$ 3,500", actual: "$ 3,500", recurring: "$ 3,500", oneOff: "$0", offset: "$0", ot: "$0" },
  { name: "James George", email: "james@unpixel.com", initials: "JG", id: "UN005", total: "$ 3,500", salary: "$ 3,500", actual: "$ 3,500", recurring: "$ 3,500", oneOff: "$0", offset: "$0", ot: "$0" },
  { name: "Jordyn George", email: "jordyn@unpixel.com", initials: "JG", id: "UN006", total: "$ 3,500", salary: "$ 3,500", actual: "$ 3,500", recurring: "$ 3,500", oneOff: "$0", offset: "$0", ot: "$0" },
  { name: "Skylar Herwitz", email: "skylar@unpixel.com", initials: "SH", id: "UN007", total: "$ 3,500", salary: "$ 3,500", actual: "$ 3,500", recurring: "$ 3,500", oneOff: "$0", offset: "$0", ot: "$0" },
  { name: "James George", email: "james@unpixel.com", initials: "JG", id: "UN008", total: "$ 3,500", salary: "$ 3,500", actual: "$ 3,500", recurring: "$ 3,500", oneOff: "$0", offset: "$0", ot: "$0" },
  { name: "Jordyn George", email: "jordyn@unpixel.com", initials: "JG", id: "UN009", total: "$ 3,500", salary: "$ 3,500", actual: "$ 3,500", recurring: "$ 3,500", oneOff: "$0", offset: "$0", ot: "$0" },
];

const PayrollList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <span className="text-xs inline-block px-2 py-1 rounded-lg bg-blue-100 text-blue-700 mb-2">Employer View</span>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Payroll</h1>
            <p className="text-sm text-hr-text-light">Your report payroll sofar</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-between h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text min-w-[220px]">
              01 Jan 2023 - 10 Mar 2023
              <CalendarDays className="w-4 h-4 text-hr-text-light ml-2" />
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-hr-navy text-white text-sm font-medium hover:opacity-90">
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-hr-text-light">
                  <th className="text-left py-3 px-4 font-medium w-8"><input type="checkbox" className="rounded border-border" /></th>
                  <th className="text-left py-3 px-4 font-medium">Employee Name ↕</th>
                  <th className="text-left py-3 px-4 font-medium">Employee ID ↕</th>
                  <th className="text-left py-3 px-4 font-medium">Total Comp</th>
                  <th className="text-left py-3 px-4 font-medium">Sallary ↕</th>
                  <th className="text-left py-3 px-4 font-medium">Actual ↕</th>
                  <th className="text-left py-3 px-4 font-medium">Recurring</th>
                  <th className="text-left py-3 px-4 font-medium">One-off</th>
                  <th className="text-left py-3 px-4 font-medium">Offset</th>
                  <th className="text-left py-3 px-4 font-medium">OT</th>
                </tr>
              </thead>
              <tbody>
                {payrollData.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50 cursor-pointer">
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
                    <td className="py-3 px-4 text-hr-text">{row.id}</td>
                    <td className="py-3 px-4 text-hr-text">{row.total}</td>
                    <td className="py-3 px-4 text-hr-text">{row.salary}</td>
                    <td className="py-3 px-4 text-hr-text">{row.actual}</td>
                    <td className="py-3 px-4 text-hr-text">{row.recurring}</td>
                    <td className="py-3 px-4 text-hr-text">{row.oneOff}</td>
                    <td className="py-3 px-4 text-hr-text">{row.offset}</td>
                    <td className="py-3 px-4 text-hr-text">{row.ot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
              <span>Showing 1 to 10 of 50 entries</span>
              <span className="font-medium text-foreground">Show 10 ▴</span>
            </div>
          </div>
        </div>
    </div>
  );
};

export default PayrollList;
