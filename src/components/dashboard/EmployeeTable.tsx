import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const employees = [
  {
    name: "Pristia Candra",
    email: "lincom@unpixel.com",
    jobTitle: "UI UX Designer",
    lineManager: "@Pristiacandra",
    department: "Team Product",
    office: "Unpixel Office",
  },
  {
    name: "Hanna Baptista",
    email: "hanna@unpixel.com",
    jobTitle: "Graphic Designer",
    lineManager: "@Pristiacandra",
    department: "Team Product",
    office: "Unpixel Office",
  },
  {
    name: "Ahmad Rosser",
    email: "ahmad@unpixel.com",
    jobTitle: "Frontend Developer",
    lineManager: "@Pristiacandra",
    department: "Team Product",
    office: "Unpixel Office",
  },
  {
    name: "Zaire Dokidis",
    email: "zaire@unpixel.com",
    jobTitle: "Backend Developer",
    lineManager: "@Pristiacandra",
    department: "Team Product",
    office: "Unpixel Office",
  },
];

const EmployeeTable = () => (
  <div>
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
      <h3 className="text-lg font-semibold text-foreground">Employees</h3>
      <div className="relative w-full sm:w-64">
        <Input
          placeholder="Search employee"
          className="pl-10 focus-visible:ring-hr-teal"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hr-text-light" />
      </div>
    </div>

    {/* Filters */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
      {["All Offices", "All Job Titles", "All Status"].map((filter) => (
        <select
          key={filter}
          className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-hr-text focus:outline-none focus:ring-2 focus:ring-hr-teal"
        >
          <option>{filter}</option>
        </select>
      ))}
    </div>

    {/* Table */}
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-hr-text-light">
            <th className="text-left py-3 px-2 font-medium">Employee Name</th>
            <th className="text-left py-3 px-2 font-medium">Job Title</th>
            <th className="text-left py-3 px-2 font-medium">Line Manager</th>
            <th className="text-left py-3 px-2 font-medium">Department</th>
            <th className="text-left py-3 px-2 font-medium">Office</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.name} className="border-b border-border last:border-0">
              <td className="py-3 px-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-hr-teal/20 flex items-center justify-center text-xs font-semibold text-hr-teal">
                    {emp.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{emp.name}</p>
                    <p className="text-xs text-hr-text-light">{emp.email}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 px-2 text-hr-text">{emp.jobTitle}</td>
              <td className="py-3 px-2 text-hr-text">{emp.lineManager}</td>
              <td className="py-3 px-2 text-hr-text">{emp.department}</td>
              <td className="py-3 px-2 text-hr-text">{emp.office}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default EmployeeTable;
