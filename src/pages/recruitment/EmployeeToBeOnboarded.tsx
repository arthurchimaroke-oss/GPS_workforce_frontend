import { useMemo, useState , useEffect } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { useEmployee } from "@/components/context/employeeContext";
import {
  Search,
  Eye,
  CheckCircle2,
  XCircle,
  Clock3,
  Mail,
  Phone,
  Building2,
  ArrowLeft,
  Download,
  Pencil,
} from "lucide-react";
import { useAuth } from "@/components/context/authContext";




const statusStyles = {
  Pending: "bg-amber-100 text-amber-700",
  Approved: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function EmployeeOnboardingReview() {
  const [search, setSearch] = useState("");
  const [submissions , setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const { fetch_all_submissions } = useEmployee();
  const {user , companyId} = useAuth();

  const filteredSubmissions = useMemo(() => {
    return submissions.filter(
      (item) =>
        item.first_name.toLowerCase().includes(search.toLowerCase()) ||
        item.last_name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) 
        // ||  item.department.toLowerCase().includes(search.toLowerCase())
    );
  }, [search , submissions]);

  useEffect(() => {
    const fetch_all_submission = async() => {
      try{
        let data =await fetch_all_submissions({user_id : user.user_id , company_id : companyId});
        console.log("the data from the backend is " , data)
        setSubmissions(data)
      }
      catch (error){

      }
    };

    fetch_all_submission();
  },[user?.user_id , companyId])

  if (selectedSubmission) {
    return (
      <SidebarLayout>
        <div className="space-y-6">
          <button
            onClick={() => setSelectedSubmission(null)}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Submissions
          </button>

          <div className="bg-card border rounded-2xl p-8 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
              <div>
                <h1 className="text-3xl font-bold">{selectedSubmission.first_name} {selectedSubmission.last_name}</h1>
                <p className="text-muted-foreground mt-1">
                  {selectedSubmission.position}
                </p>
              </div>

              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${statusStyles[selectedSubmission.status]}`}
              >
                {selectedSubmission.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <InfoCard icon={Mail} label="Email" value={selectedSubmission.email} />
              <InfoCard icon={Phone} label="Phone" value={selectedSubmission.phone} />
              <InfoCard icon={Building2} label="Department" value={selectedSubmission.department} />
              <InfoCard icon={Clock3} label="Start Date" value={selectedSubmission.startDate} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Section
                title="Employment Details"
                items={[
                  ["Position", selectedSubmission.position],
                  ["Salary", selectedSubmission.salary],
                  ["Department", selectedSubmission.department],
                  ["Start Date", selectedSubmission.startDate],
                ]}
              />

              <Section
                title="Personal Information"
                items={[
                  ["Address", selectedSubmission.address],
                  ["Emergency Contact", selectedSubmission.emergencyContact],
                  ["Tax ID", selectedSubmission.taxId],
                ]}
              />

              <Section
                title="Banking Information"
                items={[
                  ["Bank Name", selectedSubmission.bankName],
                  ["Account Number", selectedSubmission.accountNumber],
                ]}
              />

              <Section
                title="Documents"
                items={[["Offer Letter", "Download PDF"]]}
                download
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-10 pt-8 border-t">
              <button className="px-6 py-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-medium inline-flex items-center justify-center gap-2">
                <XCircle className="w-5 h-5" />
                Reject Submission
              </button>

              <button className="px-6 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 font-medium inline-flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Approve & Create Employee
              </button>
            </div>
          </div>
        </div>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Employee Onboarding Submissions</h1>
          <p className="text-muted-foreground mt-1">
            Review and approve employee onboarding submissions.
          </p>
        </div>

        <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, or department..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border bg-background"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/40 border-b">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Employee</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">FullName</th>
                  {/* <th className="text-left px-6 py-4 text-sm font-semibold">Position</th> */}
                  <th className="text-left px-6 py-4 text-sm font-semibold">Submitted</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Status</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredSubmissions.map((submission) => (
                  <tr
                    key={submission.id}
                    className="border-b hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-6 py-5">
                      <div>
                        <p className="font-semibold">{submission.id.slice(4,10)}</p>
                       
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div>
                        <p className="font-semibold">{submission.first_name} {submission.last_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {submission.email}
                        </p>
                      </div>
                    </td>

                    {/* <td className="px-6 py-5">{submission.department}</td> */}
                    {/* <td className="px-6 py-5">{submission.position}</td> */}
                    <td className="px-6 py-5">{submission.submitted_at}</td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[submission.status]}`}
                      >
                        {submission.status}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => setSelectedSubmission(submission)}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground hover:opacity-90"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}

function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="border rounded-2xl p-5 bg-muted/20">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <p className="font-semibold text-lg">{value}</p>
    </div>
  );
}

function Section({ title, items, download = false }) {
  return (
    <div className="border rounded-2xl p-6">
      <h3 className="font-bold text-lg mb-5">{title}</h3>

      <div className="space-y-4">
        {items.map(([label, value]) => (
          <div
            key={label}
            className="flex justify-between gap-4 border-b pb-3 last:border-0 last:pb-0"
          >
            <span className="text-muted-foreground">{label}</span>

            {download ? (
              <button className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                <Download className="w-4 h-4" />
                {value}
              </button>
            ) : (
              <span className="font-medium text-right">{value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
