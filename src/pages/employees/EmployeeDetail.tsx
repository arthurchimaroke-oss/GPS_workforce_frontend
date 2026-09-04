import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronDown,
  Mail,
  Phone,
  Globe,
  Pencil,
  Plus,
  Upload,
  FileText,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = ["General", "Job", "Payroll", "Documents", "Setting"];

const employeeData = {
  name: "Pristia Candra",
  jobTitle: "3D Designer",
  status: "ACTIVE",
  email: "lincoln@gmail.com",
  phone: "089318298493",
  timezone: "GMT +07:00",
  department: "Designer",
  office: "Unpixel Studio",
  lineManager: "Skylar Calzoni",
  personalInfo: {
    fullName: "Pristia Candra Nelson",
    gender: "Female",
    dateOfBirth: "23 May 1997",
    maritalStatus: "-",
    nationality: "Indonesia",
    personalTaxId: "-",
    emailAddress: "lincoln@gmail.com",
    socialInsurance: "-",
    healthInsurance: "Axa Insurance",
    phoneNumber: "089318298493",
  },
  address: {
    primaryAddress: "Banyumanik Street, Central Java. Semarang Indonesia",
    country: "Indonesia",
    stateProvince: "Central Java",
    city: "Semarang",
    postCode: "03125",
  },
  emergencyContact: {
    fullName: "Albert Jhonson",
    phoneNumber: "089831014011",
  },
  employment: {
    employeeId: "UN1203",
    serviceYear: "3 Years 7 Months",
    joinDate: "20 Aug 2019",
  },
  jobTimeline: [
    { effectiveDate: "20 Aug 2019", jobTitle: "UI UX Designer", positionType: "-", employmentType: "Fulltime", lineManager: "@skylar" },
  ],
  contractTimeline: [
    { contractNumber: "#12345", contractName: "Fulltime Remote", contractType: "Fulltime Remote", startDate: "20 Aug 2019", endDate: "-" },
  ],
  payroll: {
    employeeStatus: "Active",
    jobTitle: "Junior UI/UX Designer",
    employmentType: "Contractor",
    jobDate: "16 Feb 2020",
    geofencing: "30 Sep 2024",
    lastWorkingDate: "-",
    totalCompensation: "$3,729.00",
  },
  payslips: [
    { name: "Payslips_20 Aug.pdf" },
    { name: "Payslips_20 Oct.pdf" },
  ],
};

const EmployeeDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("General");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <SidebarLayout>
      <div>
        {/* Back header */}
        <button
          onClick={() => navigate("/employees")}
          className="flex items-center gap-2 text-foreground mb-6 hover:opacity-80"
        >
          <ChevronLeft className="w-5 h-5" />
          <h1 className="text-xl font-bold">Detail Employee</h1>
        </button>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left profile sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-24 h-24 rounded-full bg-hr-teal/20 mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-hr-teal">
                PC
              </div>
              <h2 className="text-lg font-bold text-foreground">{employeeData.name}</h2>
              <p className="text-sm text-hr-text-light mb-3">{employeeData.jobTitle}</p>

              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-hr-teal/15 text-hr-teal text-xs font-semibold mb-5">
                {employeeData.status}
                <ChevronDown className="w-3 h-3" />
              </div>

              <div className="space-y-3 text-left text-sm">
                <div className="flex items-center gap-3 text-hr-text">
                  <Mail className="w-4 h-4 text-hr-text-light flex-shrink-0" />
                  {employeeData.email}
                </div>
                <div className="flex items-center gap-3 text-hr-text">
                  <Phone className="w-4 h-4 text-hr-text-light flex-shrink-0" />
                  {employeeData.phone}
                </div>
                <div className="flex items-center gap-3 text-hr-text">
                  <Globe className="w-4 h-4 text-hr-text-light flex-shrink-0" />
                  {employeeData.timezone}
                </div>
              </div>

              <div className="border-t border-border mt-5 pt-4 space-y-3 text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-hr-text-light">Departement</p>
                    <p className="text-sm font-medium text-foreground">{employeeData.department}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-hr-text-light -rotate-90" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-hr-text-light">Office</p>
                    <p className="text-sm font-medium text-foreground">{employeeData.office}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-hr-text-light -rotate-90" />
                </div>
                <div>
                  <p className="text-xs text-hr-text-light">Line Manager</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-6 h-6 rounded-full bg-hr-teal/20 flex items-center justify-center text-[10px] font-semibold text-hr-teal">
                      SC
                    </div>
                    <span className="text-sm font-medium text-foreground">{employeeData.lineManager}</span>
                    <ChevronDown className="w-4 h-4 text-hr-text-light -rotate-90 ml-auto" />
                  </div>
                </div>
              </div>

              <button className="w-full mt-5 py-2.5 rounded-lg bg-hr-teal text-white text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90">
                Action <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right content area */}
          <div className="flex-1 min-w-0">
            {/* Tabs */}
            <div className="flex items-center gap-1 border-b border-border mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setIsEditing(false); }}
                  className={cn(
                    "px-4 py-2.5 text-sm font-medium transition-colors border-b-2",
                    activeTab === tab
                      ? "border-hr-teal text-hr-teal"
                      : "border-transparent text-hr-text-light hover:text-foreground"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {activeTab === "General" && !isEditing && (
              <div className="space-y-6">
                {/* Personal Info */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Personal Info</h3>
                    <button onClick={() => setIsEditing(true)} className="text-hr-text-light hover:text-foreground">
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                    {Object.entries(employeeData.personalInfo).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-hr-text-light capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                        <span className="font-medium text-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Address */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Address</h3>
                    <button className="text-hr-text-light hover:text-foreground">
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                    {Object.entries(employeeData.address).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-hr-text-light capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                        <span className="font-medium text-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Emergency Contact</h3>
                    <button className="text-hr-text-light hover:text-foreground">
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                    <div className="flex justify-between">
                      <span className="text-hr-text-light">Full Name</span>
                      <span className="font-medium text-foreground">{employeeData.emergencyContact.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-hr-text-light">Phone Number</span>
                      <span className="font-medium text-foreground">{employeeData.emergencyContact.phoneNumber}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "General" && isEditing && (
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Personal Info</h3>
                    <button className="text-hr-text-light hover:text-foreground">
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name <span className="text-destructive">*</span></label>
                      <Input defaultValue={employeeData.personalInfo.fullName} className="focus-visible:ring-hr-teal" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Gender <span className="text-destructive">*</span></label>
                        <select className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-hr-teal">
                          <option>Female</option>
                          <option>Male</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Date of Birth <span className="text-destructive">*</span></label>
                        <Input defaultValue={employeeData.personalInfo.dateOfBirth} className="focus-visible:ring-hr-teal" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Email Address <span className="text-destructive">*</span></label>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Nationality <span className="text-destructive">*</span></label>
                        <Input defaultValue={employeeData.personalInfo.emailAddress} className="focus-visible:ring-hr-teal" />
                        <select className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm mt-2 focus:outline-none focus:ring-2 focus:ring-hr-teal">
                          <option>Indonesia</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Phone Number <span className="text-destructive">*</span></label>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Health Care <span className="text-destructive">*</span></label>
                        <Input defaultValue={employeeData.personalInfo.phoneNumber} className="focus-visible:ring-hr-teal" />
                        <Input defaultValue={employeeData.personalInfo.healthInsurance} className="focus-visible:ring-hr-teal mt-2" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Marital Status <span className="text-destructive">*</span></label>
                        <Input placeholder="Input here" className="focus-visible:ring-hr-teal" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Personal Tax ID <span className="text-destructive">*</span></label>
                        <Input placeholder="Input here" className="focus-visible:ring-hr-teal" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Social Insurance <span className="text-destructive">*</span></label>
                      <Input placeholder="Input here" className="focus-visible:ring-hr-teal" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Job" && (
              <div className="space-y-6">
                {/* Employment Information */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Employment Information</h3>
                    <button className="text-hr-text-light hover:text-foreground"><Pencil className="w-4 h-4" /></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                    <div className="flex justify-between"><span className="text-hr-text-light">Employee ID</span><span className="font-medium text-foreground">{employeeData.employment.employeeId}</span></div>
                    <div className="flex justify-between"><span className="text-hr-text-light">Service Year</span><span className="font-medium text-foreground">{employeeData.employment.serviceYear}</span></div>
                    <div className="flex justify-between"><span className="text-hr-text-light">Join Date</span><span className="font-medium text-foreground">{employeeData.employment.joinDate}</span></div>
                  </div>
                </div>

                {/* Job Timeline */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Job Timeline</h3>
                    <button className="text-hr-text-light hover:text-foreground"><Plus className="w-4 h-4" /></button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="border-b border-border text-hr-text-light">
                        <th className="text-left py-2 px-2 font-medium">Effective Date</th>
                        <th className="text-left py-2 px-2 font-medium">Job Title</th>
                        <th className="text-left py-2 px-2 font-medium">Position Type</th>
                        <th className="text-left py-2 px-2 font-medium">Employment Type</th>
                        <th className="text-left py-2 px-2 font-medium">Line Manager</th>
                      </tr></thead>
                      <tbody>
                        {employeeData.jobTimeline.map((row, i) => (
                          <tr key={i} className="border-b border-border last:border-0">
                            <td className="py-2 px-2 text-hr-text">{row.effectiveDate}</td>
                            <td className="py-2 px-2 text-hr-text">{row.jobTitle}</td>
                            <td className="py-2 px-2 text-hr-text">{row.positionType}</td>
                            <td className="py-2 px-2 text-hr-text">{row.employmentType}</td>
                            <td className="py-2 px-2 text-hr-text">{row.lineManager}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Contract Timeline */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Contract Timeline</h3>
                    <button className="text-hr-text-light hover:text-foreground"><Plus className="w-4 h-4" /></button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="border-b border-border text-hr-text-light">
                        <th className="text-left py-2 px-2 font-medium">Contract Number</th>
                        <th className="text-left py-2 px-2 font-medium">Contract Name</th>
                        <th className="text-left py-2 px-2 font-medium">Contract Type</th>
                        <th className="text-left py-2 px-2 font-medium">Start Date</th>
                        <th className="text-left py-2 px-2 font-medium">End Date</th>
                      </tr></thead>
                      <tbody>
                        {employeeData.contractTimeline.map((row, i) => (
                          <tr key={i} className="border-b border-border last:border-0">
                            <td className="py-2 px-2 text-hr-text">{row.contractNumber}</td>
                            <td className="py-2 px-2 text-hr-text">{row.contractName}</td>
                            <td className="py-2 px-2 text-hr-text">{row.contractType}</td>
                            <td className="py-2 px-2 text-hr-text">{row.startDate}</td>
                            <td className="py-2 px-2 text-hr-text">{row.endDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Payroll" && (
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                    <div className="flex justify-between"><span className="text-hr-text-light">Employee Status</span><span className="font-medium text-foreground">{employeeData.payroll.employeeStatus}</span></div>
                    <div className="flex justify-between"><span className="text-hr-text-light">Job Title</span><span className="font-medium text-foreground">{employeeData.payroll.jobTitle}</span></div>
                    <div className="flex justify-between"><span className="text-hr-text-light">Employment Type</span><span className="font-medium text-foreground">{employeeData.payroll.employmentType}</span></div>
                    <div className="flex justify-between"><span className="text-hr-text-light">Job Date</span><span className="font-medium text-foreground">{employeeData.payroll.jobDate}</span></div>
                    <div className="flex justify-between"><span className="text-hr-text-light">Geofencing</span><span className="font-medium text-foreground">{employeeData.payroll.geofencing}</span></div>
                    <div className="flex justify-between"><span className="text-hr-text-light">Last Working Date</span><span className="font-medium text-foreground">{employeeData.payroll.lastWorkingDate}</span></div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-foreground">Total Compensation</span>
                    <span className="text-xl font-bold text-foreground">{employeeData.payroll.totalCompensation}</span>
                  </div>
                </div>

                {["Salary", "Recurring", "One-off", "Offset"].map((section) => (
                  <div key={section} className="bg-card border border-border rounded-xl p-6">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">{section}</span>
                      {section !== "Salary" && (
                        <div className="flex items-center gap-2">
                          <span className="text-foreground font-medium">$0</span>
                          <ChevronDown className="w-4 h-4 text-hr-text-light" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "Documents" && (
              <div className="space-y-6">
                {/* Personal Documents - uploaded state */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Personal Documents</h3>
                    <button className="text-hr-text-light hover:text-foreground"><Plus className="w-4 h-4" /></button>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-hr-text-light">
                        <th className="text-left py-2 px-2 font-medium">Document Name</th>
                        <th className="text-right py-2 px-2 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border last:border-0">
                        <td className="py-3 px-2 text-hr-text">CV_lincoln_v1.pdf</td>
                        <td className="py-3 px-2 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="w-8 h-8 rounded-lg bg-hr-teal flex items-center justify-center text-white hover:opacity-90">
                              <FileText className="w-4 h-4" />
                            </button>
                            <button className="w-8 h-8 rounded-lg bg-destructive flex items-center justify-center text-white hover:opacity-90">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Payslips */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Payslips</h3>
                    <button className="text-hr-text-light hover:text-foreground"><Plus className="w-4 h-4" /></button>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-hr-text-light">
                        <th className="text-left py-2 px-2 font-medium">Document Name</th>
                        <th className="text-right py-2 px-2 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeData.payslips.map((doc, i) => (
                        <tr key={i} className="border-b border-border last:border-0">
                          <td className="py-3 px-2 text-hr-text">{doc.name}</td>
                          <td className="py-3 px-2 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button className="w-8 h-8 rounded-lg bg-hr-teal flex items-center justify-center text-white hover:opacity-90">
                                <FileText className="w-4 h-4" />
                              </button>
                              <button className="w-8 h-8 rounded-lg bg-destructive flex items-center justify-center text-white hover:opacity-90">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "Setting" && (
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Account Settings</h3>
                    <button className="text-hr-text-light hover:text-foreground"><Pencil className="w-4 h-4" /></button>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-hr-text-light">Timezone</span>
                    <span className="font-medium text-foreground">GMT +07:00 Bangkok, Ha Noi, Jakarta</span>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Privacy</h3>
                    <button className="text-hr-text-light hover:text-foreground"><Pencil className="w-4 h-4" /></button>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-hr-text-light">Who can see your birthday on calendar?</span>
                    <select className="h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-hr-teal">
                      <option>Everyone</option>
                      <option>Only Me</option>
                      <option>My Team</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default EmployeeDetail;
