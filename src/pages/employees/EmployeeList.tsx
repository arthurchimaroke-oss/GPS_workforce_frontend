
// export default EmployeeList;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { useAuth } from "@/components/context/authContext";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  Search,
  Download,
  Plus,
  ChevronLeft,
  ChevronRight,
  Check,
  ChevronUp,
  CalendarDays,
  UserIcon,
  CheckIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEmployee } from "@/components/context/employeeContext";

type EmployeeStatus = "ACTIVE" | "ON BOARDING" | "PROBATION" | "ON LEAVE";

interface Employee {
  id: string;
  name: string;
  email: string;
  avatar: string;
  jobTitle: string;
  lineManager: string;
  department: string;
  office: string;
  status: EmployeeStatus;
  account: string;
}

const employees: Employee[] = [
  { id: "1", name: "Pristia Candra", email: "lincoln@unpixel.com", avatar: "PC", jobTitle: "UI UX Designer", lineManager: "@Pristiacandra", department: "Team Product", office: "Unpixel Office", status: "ACTIVE", account: "Activated" },
  { id: "2", name: "Hanna Baptista", email: "hanna@unpixel.com", avatar: "HB", jobTitle: "Graphic Designer", lineManager: "@Pristiacandra", department: "Team Product", office: "Unpixel Office", status: "ON BOARDING", account: "Activated" },
  { id: "3", name: "Miracle Geidt", email: "miracle@unpixel.com", avatar: "MG", jobTitle: "Finance", lineManager: "@Pristiacandra", department: "Team Product", office: "Unpixel Office", status: "PROBATION", account: "Need Invitation" },
  { id: "4", name: "Rayna Torff", email: "rayna@unpixel.com", avatar: "RT", jobTitle: "Project Manager", lineManager: "@Pristiacandra", department: "Team Product", office: "Unpixel Office", status: "ACTIVE", account: "Activated" },
  { id: "5", name: "Giana Lipshutz", email: "giana@unpixel.com", avatar: "GL", jobTitle: "Creative Director", lineManager: "@Pristiacandra", department: "Team Product", office: "Unpixel Office", status: "ON LEAVE", account: "Need Invitation" },
  { id: "6", name: "James George", email: "james@unpixel.com", avatar: "JG", jobTitle: "Lead Designer", lineManager: "@Pristiacandra", department: "Team Product", office: "Unpixel Office", status: "ACTIVE", account: "Activated" },
  { id: "7", name: "Jordyn George", email: "jordyn@unpixel.com", avatar: "JG", jobTitle: "IT Support", lineManager: "@Pristiacandra", department: "Team Product", office: "Unpixel Office", status: "ON BOARDING", account: "Activated" },
  { id: "8", name: "Skylar Herwitz", email: "skylar@unpixel.com", avatar: "SH", jobTitle: "3D Designer", lineManager: "@Pristiacandra", department: "Team Product", office: "Unpixel Office", status: "ACTIVE", account: "Activated" },
];

const statusColors: Record<EmployeeStatus, string> = {
  "ACTIVE": "bg-hr-teal/15 text-hr-teal",
  "ON BOARDING": "bg-yellow-100 text-yellow-700",
  "PROBATION": "bg-orange-100 text-orange-600",
  "ON LEAVE": "bg-red-100 text-red-600",
};

const statusOptions = ["All Status", "Active", "On Boarding", "Probation", "On Leave"];

const EmployeeList = () => {
  const { companyId , companyName } = useAuth();
  const { sendInvite } = useEmployee()
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [showNewProfile, setShowNewProfile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // New profile form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [salary, setSalary] = useState("");
  const [currency, setCurrency] = useState("");
  const [manager, setManager] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerMonth, setDatePickerMonth] = useState(0);
  const [datePickerYear, setDatePickerYear] = useState(2023);
  const [isSubmitting, setIsSubmitting] = useState(false);



  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      !searchQuery ||
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All Status" ||
      emp.status.toLowerCase() === statusFilter.toLowerCase().replace(" ", " ");
    return matchesSearch && matchesStatus;
  });

  const handleCreate = async () => {
    // Validation
    const errors: Record<string, string> = {};
    if (!firstName.trim()) errors.firstName = "This field is required.";
    if (!lastName.trim()) errors.lastName = "This field is required.";
    if (!emailAddress.trim()) errors.emailAddress = "This field is required.";
    if (!joinDate.trim()) errors.joinDate = "This field is required.";

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    const payload = {
      company_id: companyId,
      company_name : companyName,
      email: emailAddress.trim(),
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      join_date: joinDate.trim(),
      department: department.trim(),
      jobTitle: jobTitle.trim(),
      salary: parseInt(salary),
      currency: currency,
      manager: manager.trim(),
      employmentType: employmentType.trim()

    };

    setIsSubmitting(true);

    try {
      console.log("the payload is ", payload);

      await sendInvite(payload)
      setShowNewProfile(false);
      setFirstName("");
      setLastName("");
      setEmailAddress("");
      setJoinDate("");
      setFormErrors({});


      toast({
        title: "Invite sent successfully ",
        description: `${firstName} ${lastName} has been invited.`,
      });
      // Fallback if no toast library

    } catch (error) {
      console.error('Error sending invite:', error);
      setFormErrors(prev => ({
        ...prev,
        submit: error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };



  const daysInMonth = new Date(datePickerYear, datePickerMonth + 1, 0).getDate();
  const firstDayOfMonth = (new Date(datePickerYear, datePickerMonth, 1).getDay() + 6) % 7;
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const selectDate = (day: number) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    setJoinDate(`${day} ${months[datePickerMonth]} ${datePickerYear}`);
    setShowDatePicker(false);
  };

  return (
    <SidebarLayout>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Employees</h1>
            <p className="text-sm text-hr-text-light">Manage your Employee</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={() => setShowNewProfile(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-hr-navy text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              Add New
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Input
              placeholder="Search employee"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 focus-visible:ring-hr-teal"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hr-text-light" />
          </div>
          <select className="h-10 rounded-lg border border-border bg-background px-4 text-sm text-hr-text focus:outline-none focus:ring-2 focus:ring-hr-teal min-w-[140px]">
            <option>All Offices</option>
          </select>
          <select className="h-10 rounded-lg border border-border bg-background px-4 text-sm text-hr-text focus:outline-none focus:ring-2 focus:ring-hr-teal min-w-[140px]">
            <option>All Job Titles</option>
          </select>
          {/* Status dropdown (custom) */}
          <div className="relative">
            <button
              onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
              className="h-10 rounded-lg border border-border bg-background px-4 text-sm text-hr-text flex items-center gap-2 min-w-[140px] justify-between"
            >
              {statusFilter}
              <ChevronUp className={`w-4 h-4 transition-transform ${statusDropdownOpen ? "" : "rotate-180"}`} />
            </button>
            {statusDropdownOpen && (
              <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg z-10 min-w-[180px]">
                {statusOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setStatusFilter(option);
                      setStatusDropdownOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-hr-text hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    {option}
                    {statusFilter === option && (
                      <Check className="w-4 h-4 text-hr-teal" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-hr-text-light w-8">
                    <input type="checkbox" className="rounded border-border" />
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-hr-text-light">Employee Name ↕</th>
                  <th className="text-left py-3 px-4 font-medium text-hr-text-light">Job Title ↕</th>
                  <th className="text-left py-3 px-4 font-medium text-hr-text-light">Line Manager ↕</th>
                  <th className="text-left py-3 px-4 font-medium text-hr-text-light">Department ↕</th>
                  <th className="text-left py-3 px-4 font-medium text-hr-text-light">Office ↕</th>
                  <th className="text-left py-3 px-4 font-medium text-hr-text-light">Employee Status ↕</th>
                  <th className="text-left py-3 px-4 font-medium text-hr-text-light">Account ↕</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp) => (
                  <tr
                    key={emp.id}
                    onClick={() => navigate(`/employees/${emp.id}`)}
                    className="border-b border-border last:border-0 hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" className="rounded border-border" />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-hr-teal/20 flex items-center justify-center text-xs font-semibold text-hr-teal flex-shrink-0">
                          {emp.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{emp.name}</p>
                          <p className="text-xs text-hr-text-light">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-hr-text">{emp.jobTitle}</td>
                    <td className="py-3 px-4 text-hr-text">{emp.lineManager}</td>
                    <td className="py-3 px-4 text-hr-text">{emp.department}</td>
                    <td className="py-3 px-4 text-hr-text">{emp.office}</td>
                    <td className="py-3 px-4">
                      <span className={cn("px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase", statusColors[emp.status])}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-hr-text">{emp.account}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-1 py-4 border-t border-border">
            <button className="w-8 h-8 rounded flex items-center justify-center text-hr-text-light hover:bg-muted">
              <ChevronLeft className="w-4 h-4" />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  "w-8 h-8 rounded flex items-center justify-center text-sm font-medium transition-colors",
                  currentPage === page
                    ? "bg-hr-navy text-white"
                    : "text-hr-text hover:bg-muted"
                )}
              >
                {page}
              </button>
            ))}
            <span className="px-1 text-hr-text-light">...</span>
            <button className="w-8 h-8 rounded flex items-center justify-center text-sm text-hr-text hover:bg-muted">
              10
            </button>
            <button className="w-8 h-8 rounded flex items-center justify-center text-hr-text-light hover:bg-muted">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add New Offer / Profile */}
      {showNewProfile && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setShowNewProfile(false)}
          />

          <div className="fixed right-0 top-0 h-full w-96 bg-card border-l border-border z-50 flex flex-col shadow-xl">

            {/* Header */}
            <div className="px-7 pt-6 pb-5 border-b border-border">
              <div className="flex items-center gap-2.5 mb-1">
                <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                  <UserIcon className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <h2 className="text-sm font-medium text-foreground">Send Offer</h2>
              </div>
              <p className="text-xs text-muted-foreground">
                Fill in the details below to send an onboarding invite.
              </p>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-7 py-5 flex flex-col gap-6">

              {/* Personal Information */}
              <section>
                <p className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground mb-3">
                  Personal information
                </p>
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-xs text-muted-foreground block mb-1.5">
                        First name <span className="text-destructive">*</span>
                      </label>
                      <Input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Ada"
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground block mb-1.5">
                        Last name <span className="text-destructive">*</span>
                      </label>
                      <Input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Lovelace"
                        className="h-8 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1.5">
                      Email address <span className="text-destructive">*</span>
                    </label>
                    <Input
                      type="email"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      placeholder="ada@company.com"
                      className="h-8 text-sm"
                    />
                  </div>
                </div>
              </section>

              <hr className="border-border" />

              {/* Job Details */}
              <section>
                <p className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground mb-3">
                  Job details
                </p>
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-xs text-muted-foreground block mb-1.5">
                        Job title <span className="text-destructive">*</span>
                      </label>
                      <Input
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="Engineer"
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground block mb-1.5">
                        Department <span className="text-destructive">*</span>
                      </label>
                      <Input
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        placeholder="Product"
                        className="h-8 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1.5">
                      Employment type <span className="text-destructive">*</span>
                    </label>
                    <select
                      value={employmentType}
                      onChange={(e) => setEmploymentType(e.target.value)}
                      className="w-full h-8 text-sm border border-input rounded-md px-2.5 bg-background text-foreground appearance-none cursor-pointer"
                    >
                      <option value="">Select type</option>
                      <option value="FULL_TIME">Full-time</option>
                      <option value="PART_TIME">Part-time</option>
                      <option value="CONTRACT">Contract</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1.5">
                      Manager{" "}
                      <span className="text-[11px] text-muted-foreground/60">(optional)</span>
                    </label>
                    <Input
                      value={manager}
                      onChange={(e) => setManager(e.target.value)}
                      placeholder="Name or email"
                      className="h-8 text-sm"
                    />
                  </div>
                </div>
              </section>

              <hr className="border-border" />

              {/* Compensation & Start Date */}
              <section>
                <p className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground mb-3">
                  Compensation & start date
                </p>
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-[2fr_1fr] gap-2.5">
                    <div>
                      <label className="text-xs text-muted-foreground block mb-1.5">
                        Salary <span className="text-destructive">*</span>
                      </label>
                      <Input
                        type="number"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        placeholder="0.00"
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground block mb-1.5">
                        Currency <span className="text-destructive">*</span>
                      </label>
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full h-8 text-sm border border-input rounded-md px-2.5 bg-background text-foreground appearance-none cursor-pointer"
                      >
                        <option value="NGN">NGN</option>
                        <option value="USD">USD</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1.5">
                      Start date <span className="text-destructive">*</span>
                    </label>
                    <Input
                      type="date"
                      value={joinDate}
                      onChange={(e) => setJoinDate(e.target.value)}
                      className="h-8 text-sm cursor-pointer"
                    />
                  </div>
                </div>
              </section>

            </div>

            {/* Footer */}
            <div className="px-7 py-4 border-t border-border flex gap-2.5">
              <button
                onClick={() => setShowNewProfile(false)}
                disabled={isSubmitting}
                className="flex-1 h-9 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={isSubmitting}
                className="flex-[2] h-9 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-sm font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <CheckIcon className="w-3.5 h-3.5" />
                {isSubmitting ? "Sending..." : "Send offer"}
              </button>
            </div>

          </div>
        </>
      )}

    </SidebarLayout>
  );
};

export default EmployeeList;