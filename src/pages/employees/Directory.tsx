import SidebarLayout from "@/components/layout/SidebarLayout";
import { Mail, Phone } from "lucide-react";

const directoryEmployees = [
  { name: "Angeline Beier", role: "Finance Manager", email: "angeline@gmail.com", phone: "0978412176", initials: "AB" },
  { name: "Alfredo George", role: "HR Manager", email: "george@gmail.com", phone: "089318298493", initials: "AG" },
  { name: "Davis Levin", role: "IT Helpdesk", email: "davis@gmail.com", phone: "089318298493", initials: "DL" },
  { name: "Carla Workman", role: "IT Manager", email: "carla@gmail.com", phone: "089318298493", initials: "CW" },
  { name: "Rayna Calzoni", role: "HR Specialist", email: "rayna@gmail.com", phone: "089318298493", initials: "RC" },
  { name: "Miracle Geidt", role: "Finance Specialist", email: "miracle@gmail.com", phone: "089318298493", initials: "MG" },
  { name: "Haylie Herwitz", role: "Account Manager", email: "haylie@gmail.com", phone: "089318298493", initials: "HH" },
  { name: "Omar Calzoni", role: "Admin Manager", email: "omar@gmail.com", phone: "089318298493", initials: "OC" },
  { name: "Omar Lipshutz", role: "Account Executive", email: "omar@gmail.com", phone: "089318298493", initials: "OL" },
  { name: "Kierra Levin", role: "Account Executive", email: "kierra@gmail.com", phone: "089318298493", initials: "KL" },
  { name: "Roger Saris", role: "Account Executive", email: "roger@gmail.com", phone: "089318298493", initials: "RS" },
  { name: "Phillip Press", role: "HR Specialist", email: "phillip@gmail.com", phone: "089318298493", initials: "PP" },
];

const Directory = () => (
  <SidebarLayout>
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-1">Directory</h1>
      <p className="text-sm text-hr-text-light mb-6">This is director board</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {directoryEmployees.map((emp) => (
          <div key={emp.name} className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-hr-teal/20 mx-auto mb-3 flex items-center justify-center text-lg font-bold text-hr-teal">
              {emp.initials}
            </div>
            <h3 className="font-semibold text-foreground">{emp.name}</h3>
            <p className="text-sm text-hr-text-light mb-4">{emp.role}</p>
            <div className="space-y-2 text-sm text-left">
              <div className="flex items-center gap-2 text-hr-text">
                <Mail className="w-4 h-4 text-hr-text-light flex-shrink-0" />
                <span className="truncate">{emp.email}</span>
              </div>
              <div className="flex items-center gap-2 text-hr-text">
                <Phone className="w-4 h-4 text-hr-text-light flex-shrink-0" />
                {emp.phone}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </SidebarLayout>
);

export default Directory;
